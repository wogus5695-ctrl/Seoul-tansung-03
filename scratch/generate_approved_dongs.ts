import fs from 'fs';
import path from 'path';
import { SEOUL_DONG_MANIFEST_RECORDS } from '../lib/manifest/seoul-region-manifest';

const GU_ID_MAP: Record<string, string> = {
  '종로구': 'seoul-jongno-gu',
  '중구': 'seoul-jung-gu',
  '용산구': 'seoul-yongsan-gu',
  '성동구': 'seoul-seongdong-gu',
  '광진구': 'seoul-gwangjin-gu',
  '동대문구': 'seoul-dongdaemun-gu',
  '중랑구': 'seoul-jungnang-gu',
  '성북구': 'seoul-seongbuk-gu',
  '강북구': 'seoul-gangbuk-gu',
  '도봉구': 'seoul-dobong-gu',
  '노원구': 'seoul-nowon-gu',
  '은평구': 'seoul-eunpyeong-gu',
  '서대문구': 'seoul-seodaemun-gu',
  '마포구': 'seoul-mapo-gu',
  '양천구': 'seoul-yangcheon-gu',
  '강서구': 'seoul-gangseo-gu',
  '구로구': 'seoul-guro-gu',
  '금천구': 'seoul-geumcheon-gu',
  '영등포구': 'seoul-yeongdeungpo-gu',
  '동작구': 'seoul-dongjak-gu',
  '관악구': 'seoul-gwanak-gu',
  '서초구': 'seoul-seocho-gu',
  '강남구': 'seoul-gangnam-gu',
  '송파구': 'seoul-songpa-gu',
  '강동구': 'seoul-gangdong-gu',
};

// Filter strictly approved DONGs, excluding Bulgwang (already in PRODUCTION_REGIONS)
const approvedDongs = SEOUL_DONG_MANIFEST_RECORDS.filter(
  (r) => r.approvalStatus === 'APPROVED' && r.includeInApprovedSet && r.publicCandidate !== '불광동'
);

console.log('Generating records for approved DONGs count:', approvedDongs.length);

if (approvedDongs.length !== 291) {
  throw new Error(`Expected 291 approved DONG records, got ${approvedDongs.length}`);
}

const lines: string[] = [];
lines.push(`/**`);
lines.push(` * Seoul Approved DONG Production Dataset (Phase 5-B2A Rollout)`);
lines.push(` *`);
lines.push(` * Exactly 291 Approved DONG records (292 Approved DONGs minus existing Bulgwang pilot).`);
lines.push(` * All records are PUBLISHED_NOINDEX, source: 'production', rolloutStage: 'pilot'.`);
lines.push(` */`);
lines.push(``);
lines.push(`import { RegionItem } from '../types/regions';`);
lines.push(``);
lines.push(`export const SEOUL_APPROVED_DONG_REGIONS: readonly RegionItem[] = [`);

for (const d of approvedDongs) {
  const parentId = GU_ID_MAP[d.parentGu];
  if (!parentId) {
    throw new Error(`Missing GU parent ID for ${d.parentGu}`);
  }

  lines.push(`  {`);
  lines.push(`    id: ${JSON.stringify(d.regionRecordId)},`);
  lines.push(`    regionType: 'DONG',`);
  lines.push(`    parentRegionId: ${JSON.stringify(parentId)},`);
  lines.push(`    canonicalName: ${JSON.stringify(d.canonicalName)},`);
  lines.push(`    displayName: ${JSON.stringify(d.publicCandidate)},`);
  lines.push(`    keywordRegionName: ${JSON.stringify(d.publicCandidate)},`);
  lines.push(`    routeKey: ${JSON.stringify(d.routeKeyCandidate)},`);
  lines.push(`    sido: '서울',`);
  lines.push(`    sigugun: ${JSON.stringify(d.parentGu)},`);
  lines.push(`    dong: ${JSON.stringify(d.publicCandidate)},`);
  lines.push(`    nearbyRegionIds: [],`);
  lines.push(`    disambiguationStatus: 'NOT_REQUIRED',`);
  lines.push(`    source: 'production',`);
  lines.push(`    rolloutStage: 'pilot',`);
  lines.push(`    isSyntheticFixture: false,`);
  lines.push(`    publicationState: 'PUBLISHED_NOINDEX',`);
  lines.push(`    isServiceAreaApproved: false,`);
  lines.push(`  },`);
}

lines.push(`];`);
lines.push(``);

const targetPath = path.resolve('lib/contracts/seoul-approved-dongs.ts');
fs.writeFileSync(targetPath, lines.join('\n'), 'utf8');
console.log('Successfully wrote', targetPath);
