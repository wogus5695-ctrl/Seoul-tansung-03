import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userSourcePath = 'C:/Users/wogus/.gemini/antigravity/brain/b329bfe8-a746-4224-8a4b-9750b5908c3a/.user_uploaded/media_1790056733553.png';
const brandDir = path.resolve('public/images/allcare');
const sourceCopyPath = path.join(brandDir, 'official-horizontal-logo-source.png');
const transparentPath = path.join(brandDir, 'allcare-signature.png');

async function processHorizontalLogo() {
  if (!fs.existsSync(userSourcePath)) {
    console.error('OFFICIAL HORIZONTAL LOGO = NOT FOUND');
    process.exit(1);
  }

  // 1. Copy original source intact
  fs.copyFileSync(userSourcePath, sourceCopyPath);
  console.log(`Copied original source to: ${sourceCopyPath}`);

  // 2. Read image
  const img = sharp(sourceCopyPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Image dimensions:', info.width, info.height, 'Channels:', info.channels);

  // 3. Create transparent web derivative
  // Background is pure white [254-255, 254-255, 254-255].
  // Foreground green is approximately [120, 188, 55].
  const out = Buffer.alloc(info.width * info.height * 4);

  // Background color reference
  const bgR = 255;
  const bgG = 255;
  const bgB = 255;

  // Typical green color for edge color recovery
  const fgR = 121;
  const fgG = 188;
  const fgB = 55;

  for (let i = 0; i < info.width * info.height; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Check if pixel is pure/near-pure background white
    if (r >= 250 && g >= 250 && b >= 250) {
      out[idx] = fgR;
      out[idx + 1] = fgG;
      out[idx + 2] = fgB;
      out[idx + 3] = 0; // Fully transparent
      continue;
    }

    // Measure darkness/colorfulness relative to white
    // Green has very low Blue (around 55) compared to White (255)
    // and moderate Red (around 121) compared to White (255).
    // Delta from white in Blue channel is the strongest signal for alpha.
    const deltaB = (bgB - b) / (bgB - fgB);
    const deltaR = (bgR - r) / (bgR - fgR);
    // Use maximum delta to ensure smooth edge capture
    let alpha = Math.max(deltaB, deltaR);
    alpha = Math.max(0, Math.min(1, alpha));

    // If alpha is high (>= 0.95), treat as full opacity
    if (alpha >= 0.95) {
      out[idx] = r;
      out[idx + 1] = g;
      out[idx + 2] = b;
      out[idx + 3] = 255;
    } else {
      // Unmultiply white to prevent white fringe/halo on non-white backgrounds
      const a = alpha;
      const unR = Math.max(0, Math.min(255, Math.round((r - (1 - a) * bgR) / a)));
      const unG = Math.max(0, Math.min(255, Math.round((g - (1 - a) * bgG) / a)));
      const unB = Math.max(0, Math.min(255, Math.round((b - (1 - a) * bgB) / a)));

      out[idx] = unR;
      out[idx + 1] = unG;
      out[idx + 2] = unB;
      out[idx + 3] = Math.round(a * 255);
    }
  }

  await sharp(out, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(transparentPath);

  console.log(`Saved transparent logo to: ${transparentPath}`);
}

processHorizontalLogo().catch(console.error);
