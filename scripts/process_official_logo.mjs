import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const officialSourcePath = 'C:/Users/wogus/.gemini/antigravity/brain/b329bfe8-a746-4224-8a4b-9750b5908c3a/.user_uploaded/media_1790055148119.png';
const masterCopyPath = path.resolve('public/images/allcare/official-allcare-logo.png');

async function processOfficialLogo() {
  if (!fs.existsSync(officialSourcePath)) {
    console.error('OFFICIAL LOGO SOURCE = NOT FOUND');
    process.exit(1);
  }

  const meta = await sharp(officialSourcePath).metadata();
  console.log('Source Image Metadata:', {
    width: meta.width,
    height: meta.height,
    format: meta.format,
    channels: meta.channels,
    space: meta.space,
  });

  // Copy official source intact to master logo path (ZERO modification, exact copy)
  fs.copyFileSync(officialSourcePath, masterCopyPath);
  console.log(`Copied intact source to ${masterCopyPath}`);

  // Favicon and Icon generation strictly using proportional resize of the entire master image
  // NO background removal, NO symbol extraction, NO alpha keying

  // 1. icon-512.png (512x512)
  await sharp(masterCopyPath)
    .resize(512, 512, { fit: 'fill' })
    .png()
    .toFile(path.resolve('public/icon-512.png'));
  console.log('Saved public/icon-512.png (512x512)');

  // 2. icon-192.png (192x192)
  await sharp(masterCopyPath)
    .resize(192, 192, { fit: 'fill' })
    .png()
    .toFile(path.resolve('public/icon-192.png'));
  console.log('Saved public/icon-192.png (192x192)');

  // 3. apple-touch-icon.png (180x180)
  await sharp(masterCopyPath)
    .resize(180, 180, { fit: 'fill' })
    .png()
    .toFile(path.resolve('public/apple-touch-icon.png'));
  console.log('Saved public/apple-touch-icon.png (180x180)');

  // 4. Multi-size favicon.ico (16x16, 32x32, 48x48)
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of sizes) {
    const buf = await sharp(masterCopyPath)
      .resize(size, size, { fit: 'fill' })
      .png()
      .toBuffer();
    pngBuffers.push({ size, buf });
  }

  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  const entryBuffers = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(item.size, 0); // width
    entry.writeUInt8(item.size, 1); // height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buf.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data
    offset += item.buf.length;
    entryBuffers.push(entry);
  }

  const icoBuffer = Buffer.concat([
    header,
    ...entryBuffers,
    ...pngBuffers.map((p) => p.buf),
  ]);

  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.resolve('app/favicon.ico'), icoBuffer);
  console.log('Saved public/favicon.ico and app/favicon.ico');

  // Clean up wrong extracted assets
  const wrongAssets = [
    'public/images/allcare/logo-symbol.png',
    'public/images/allcare/logo-horizontal.png',
    'public/images/allcare/logo-solid.png',
    'public/images/allcare/logo.png',
    'scripts/process_brand_assets.mjs',
  ];
  for (const wrong of wrongAssets) {
    const fullWrong = path.resolve(wrong);
    if (fs.existsSync(fullWrong)) {
      fs.unlinkSync(fullWrong);
      console.log(`Removed wrong asset: ${wrong}`);
    }
  }

  console.log('PHASE 3-E2 Official Master Logo and Favicons successfully processed!');
}

processOfficialLogo().catch(console.error);
