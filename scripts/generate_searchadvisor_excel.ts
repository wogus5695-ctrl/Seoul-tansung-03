import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { PRODUCTION_REGIONS } from '../lib/contracts/regions-contract';
import { SEARCH_INTENTS } from '../lib/contracts/intents-contract';
import { OFFICIAL_SITE_ORIGIN } from '../lib/config/site-config';
import { isPilotIndexableKey } from '../lib/contracts/publication-gate';
import { buildCanonicalUrl, buildPublicHref } from '../lib/url/url-builder';
import { hasRegionEvidence, PRODUCTION_REGION_EVIDENCE } from '../lib/data/region-evidence';

async function generateExcel() {
  console.log('Generating Naver SearchAdvisor Excel Workbook...');

  const exportsDir = path.resolve(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  const fileName = '260928_올케어_탄성코트_동적키워드_URL_네이버서치어드바이저.xlsx';
  const filePath = path.join(exportsDir, fileName);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Allcare SEO System';
  workbook.lastModifiedBy = 'Allcare SEO System';
  workbook.created = new Date();

  // Color Palette
  const headerFill: ExcelJS.Fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE7D9C1' }, // Warm Sage / Sand
  };
  const headerFont: Partial<ExcelJS.Font> = {
    name: 'Malgun Gothic',
    size: 10,
    bold: true,
    color: { argb: 'FF3E443B' },
  };

  // ----------------------------------------------------
  // SHEET 1: PILOT_SUBMISSION
  // ----------------------------------------------------
  const sheet1 = workbook.addWorksheet('PILOT_SUBMISSION', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  sheet1.columns = [
    { header: '번호', key: 'no', width: 8 },
    { header: '권역', key: 'sido', width: 10 },
    { header: '지역유형', key: 'regionType', width: 10 },
    { header: '지역명', key: 'regionName', width: 14 },
    { header: '작업명', key: 'serviceKeyword', width: 18 },
    { header: '동적키워드', key: 'dynamicKeyword', width: 22 },
    { header: 'Decoded URL', key: 'decodedUrl', width: 45 },
    { header: 'Encoded URL', key: 'encodedUrl', width: 55 },
    { header: 'Canonical URL', key: 'canonicalUrl', width: 55 },
    { header: 'Evidence 적용', key: 'evidenceApplied', width: 14 },
    { header: 'Indexable', key: 'indexable', width: 12 },
    { header: 'Robots', key: 'robots', width: 16 },
    { header: 'Sitemap 포함', key: 'sitemapIncluded', width: 14 },
    { header: 'SearchAdvisor 수집요청 대상', key: 'crawlTarget', width: 26 },
    { header: 'Publication Stage', key: 'stage', width: 18 },
    { header: '비고', key: 'notes', width: 30 },
  ];

  const pilotList = [
    { regionId: 'seoul-gangnam-gu', regionName: '강남구', regionType: 'GU', sido: '서울' },
    { regionId: 'seoul-eunpyeong-bulgwang', regionName: '불광동', regionType: 'DONG', sido: '서울' },
    { regionId: 'seoul-gangseo-마곡동', regionName: '마곡동', regionType: 'DONG', sido: '서울' },
    { regionId: 'seoul-seongdong-성수동', regionName: '성수동', regionType: 'DONG', sido: '서울' },
    { regionId: 'seoul-jongno-창신동', regionName: '창신동', regionType: 'DONG', sido: '서울' },
  ];

  let pilotNo = 1;
  for (const p of pilotList) {
    const serviceKeyword = '탄성코트';
    const dynamicKeyword = `${p.regionName} ${serviceKeyword}`;
    const publicHref = buildPublicHref(p.regionName, serviceKeyword);
    const decodedUrl = `${OFFICIAL_SITE_ORIGIN}/?k=${p.regionName}-${serviceKeyword}`;
    const encodedUrl = `${OFFICIAL_SITE_ORIGIN}${publicHref}`;
    const canonicalRes = buildCanonicalUrl(p.regionName, serviceKeyword, OFFICIAL_SITE_ORIGIN);
    const canonicalUrl = canonicalRes.canonicalUrl || encodedUrl;

    sheet1.addRow({
      no: pilotNo++,
      sido: p.sido,
      regionType: p.regionType,
      regionName: p.regionName,
      serviceKeyword,
      dynamicKeyword,
      decodedUrl,
      encodedUrl,
      canonicalUrl,
      evidenceApplied: 'YES',
      indexable: 'YES',
      robots: 'index,follow',
      sitemapIncluded: 'YES',
      crawlTarget: 'YES',
      stage: 'PILOT',
      notes: 'Phase 6-C1 5-URL Publication Pilot Direct Target',
    });
  }

  // ----------------------------------------------------
  // SHEET 2: FULL_DYNAMIC_URL_INVENTORY
  // ----------------------------------------------------
  const sheet2 = workbook.addWorksheet('FULL_DYNAMIC_URL_INVENTORY', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  sheet2.columns = [
    { header: '번호', key: 'no', width: 8 },
    { header: '권역', key: 'sido', width: 10 },
    { header: 'Parent GU', key: 'parentGu', width: 16 },
    { header: '지역유형', key: 'regionType', width: 10 },
    { header: '지역명', key: 'regionName', width: 14 },
    { header: '작업명', key: 'serviceKeyword', width: 18 },
    { header: '동적키워드', key: 'dynamicKeyword', width: 22 },
    { header: 'Decoded URL', key: 'decodedUrl', width: 45 },
    { header: 'Encoded URL', key: 'encodedUrl', width: 55 },
    { header: 'Canonical URL', key: 'canonicalUrl', width: 55 },
    { header: 'Approval Status', key: 'approvalStatus', width: 16 },
    { header: 'Collision Hold', key: 'collisionHold', width: 14 },
    { header: 'Evidence 적용', key: 'evidenceApplied', width: 14 },
    { header: 'Indexable', key: 'indexable', width: 12 },
    { header: 'Robots', key: 'robots', width: 22 },
    { header: 'Sitemap 포함', key: 'sitemapIncluded', width: 14 },
    { header: 'SearchAdvisor 수집요청 대상', key: 'crawlTarget', width: 26 },
    { header: 'Publication Stage', key: 'stage', width: 18 },
    { header: '비고', key: 'notes', width: 35 },
  ];

  let fullNo = 1;
  for (const r of PRODUCTION_REGIONS) {
    const parentGu = r.sigugun || r.displayName;
    const isCollision = r.id === 'seoul-eunpyeong-sinsa' || r.disambiguationKey === 'eunpyeong';

    for (const intent of SEARCH_INTENTS) {
      const serviceKeyword = intent.serviceKeyword;
      const dynamicKeyword = `${r.keywordRegionName} ${serviceKeyword}`;
      const publicHref = buildPublicHref(r.keywordRegionName, serviceKeyword);
      const decodedUrl = `${OFFICIAL_SITE_ORIGIN}/?k=${r.keywordRegionName}-${serviceKeyword}`;
      const encodedUrl = `${OFFICIAL_SITE_ORIGIN}${publicHref}`;
      const canonicalRes = buildCanonicalUrl(r.keywordRegionName, serviceKeyword, OFFICIAL_SITE_ORIGIN);
      const canonicalUrl = canonicalRes.canonicalUrl || encodedUrl;

      const isAllowlisted = isPilotIndexableKey(r.keywordRegionName, serviceKeyword);
      const hasEv = hasRegionEvidence(r.id, serviceKeyword, PRODUCTION_REGION_EVIDENCE);

      let stage = 'NOINDEX';
      if (isCollision) stage = 'HOLD';
      else if (isAllowlisted) stage = 'PILOT';

      sheet2.addRow({
        no: fullNo++,
        sido: r.sido,
        parentGu,
        regionType: r.regionType,
        regionName: r.displayName,
        serviceKeyword,
        dynamicKeyword,
        decodedUrl,
        encodedUrl,
        canonicalUrl,
        approvalStatus: isCollision ? 'COLLISION_HOLD' : 'APPROVED',
        collisionHold: isCollision ? 'YES' : 'NO',
        evidenceApplied: hasEv ? 'YES' : 'NO',
        indexable: isAllowlisted ? 'YES' : 'NO',
        robots: isAllowlisted ? 'index,follow' : 'noindex,nofollow,nocache',
        sitemapIncluded: isAllowlisted ? 'YES' : 'NO',
        crawlTarget: isAllowlisted ? 'YES' : 'NO',
        stage,
        notes: isAllowlisted
          ? 'Phase 6-C1 Pilot Target (INDEXABLE)'
          : isCollision
          ? 'Collision Hold Region (Strict NOINDEX)'
          : hasEv
          ? 'Tier-C Evidence Present (Publication Hold)'
          : 'Candidate URL (NOINDEX)',
      });
    }
  }

  // ----------------------------------------------------
  // SHEET 3: SITEMAP_SUMMARY
  // ----------------------------------------------------
  const sheet3 = workbook.addWorksheet('SITEMAP_SUMMARY');

  sheet3.columns = [
    { header: '항목 (Parameter)', key: 'param', width: 35 },
    { header: '설정값 (Value)', key: 'val', width: 45 },
    { header: '비고 (Notes)', key: 'notes', width: 40 },
  ];

  const summaryData = [
    { param: 'Official Production Domain', val: OFFICIAL_SITE_ORIGIN, notes: 'Strict HTTPS Canonical Domain' },
    { param: 'Sitemap XML URL', val: `${OFFICIAL_SITE_ORIGIN}/sitemap.xml`, notes: 'Naver SearchAdvisor Submission Target' },
    { param: 'Seoul Hub URL', val: `${OFFICIAL_SITE_ORIGIN}/sitemap-seoul`, notes: 'HTML Directory Directory for Crawlers' },
    { param: 'Total Production Regions', val: '318', notes: '25 GUs + 293 DONGs' },
    { param: 'Approved Production Regions', val: '317', notes: 'Excludes 1 Collision Hold' },
    { param: 'Collision Hold Regions', val: '1', notes: '은평구 신사동 (seoul-eunpyeong-sinsa)' },
    { param: 'Total Dynamic URLs', val: '1,908', notes: '318 Regions x 6 Intents' },
    { param: 'Indexable Dynamic URLs', val: '5', notes: 'Exact 5 Pilot Dynamic URLs' },
    { param: 'NOINDEX Dynamic URLs', val: '1,903', notes: 'Strict noindex, nofollow, nocache' },
    { param: 'Production Evidence Regions', val: '5', notes: '강남구, 불광동, 마곡동, 성수동, 창신동' },
    { param: 'Sitemap Total URL Count', val: '7', notes: '2 Static/Hub + 5 Pilot Dynamic URLs' },
    { param: 'SearchAdvisor Site Registration', val: 'DONE', notes: 'Verified in Phase 6-C0' },
    { param: 'SearchAdvisor Ownership Verification', val: 'DONE', notes: 'Meta tag verified' },
    { param: 'SearchAdvisor Sitemap Submission', val: 'NOT YET SUBMITTED', notes: 'USER MANUAL ACTION REQUIRED' },
    { param: 'SearchAdvisor Crawl Request Target', val: '5 Pilot URLs', notes: 'USER MANUAL ACTION REQUIRED' },
  ];

  for (const row of summaryData) {
    sheet3.addRow(row);
  }

  // ----------------------------------------------------
  // SHEET 4: SEARCHADVISOR_CHECKLIST
  // ----------------------------------------------------
  const sheet4 = workbook.addWorksheet('SEARCHADVISOR_CHECKLIST');

  sheet4.columns = [
    { header: '단계 (Step)', key: 'step', width: 8 },
    { header: '작업 항목 (Check Item)', key: 'item', width: 35 },
    { header: '상태 (Status)', key: 'status', width: 25 },
    { header: '담당자 / 작업주체 (Actor)', key: 'actor', width: 22 },
    { header: '비고 및 가이드 (Action Guide)', key: 'guide', width: 45 },
  ];

  const checklistData = [
    { step: '1', item: '네이버 서치어드바이저 사이트 등록', status: 'DONE', actor: 'USER', guide: 'https://www.allcaretan.co.kr 등록 완료' },
    { step: '2', item: '사이트 소유 확인 (HTML 태그)', status: 'DONE', actor: 'USER', guide: 'HTML meta tag 검증 완료' },
    { step: '3', item: 'sitemap.xml Live 정상 수신 검증', status: 'PASS', actor: 'ANTIGRAVITY', guide: 'HTTP 200 OK & 7 URLs Valid XML' },
    { step: '4', item: 'sitemap-seoul (허브) Live 검증', status: 'PASS', actor: 'ANTIGRAVITY', guide: 'HTTP 200 OK & 5 Pilot HTML Links' },
    { step: '5', item: '네이버 서치어드바이저 Sitemap 제출', status: 'USER ACTION REQUIRED', actor: 'USER', guide: 'https://www.allcaretan.co.kr/sitemap.xml 제출' },
    { step: '6', item: 'Pilot 5 URL 수집요청', status: 'USER ACTION REQUIRED', actor: 'USER', guide: 'PILOT_SUBMISSION 시트 5개 Encoded URL 개별 요청' },
    { step: '7', item: 'URL 검사 및 수집 현황 관찰', status: 'PENDING', actor: 'USER', guide: '제출 후 24~48시간 내 수집 상태 점검' },
    { step: '8', item: '색인(Index) 반응 모니터링', status: 'PENDING', actor: 'USER', guide: 'site:www.allcaretan.co.kr 검색으로 색인 확인' },
    { step: '9', item: '키워드 검색 노출 관찰', status: 'PENDING', actor: 'USER', guide: '강남구 탄성코트 등 5개 키워드 순위 관찰' },
    { step: '10', item: 'SERP Snippet & Thumbnail 관찰', status: 'PENDING', actor: 'USER', guide: '네이버 검색결과 스니펫 및 썸네일 노출 점검' },
  ];

  for (const row of checklistData) {
    sheet4.addRow(row);
  }

  // Style Header Rows across all 4 sheets
  [sheet1, sheet2, sheet3, sheet4].forEach((ws) => {
    const headerRow = ws.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = headerFill;
      cell.font = headerFont;
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    headerRow.height = 24;
    ws.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: ws.columnCount },
    };
  });

  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file generated successfully at: ${filePath}`);

  // ----------------------------------------------------
  // WORKBOOK REOPEN VALIDATION
  // ----------------------------------------------------
  console.log('\n--- VALIDATING GENERATED EXCEL WORKBOOK ---');
  const readWb = new ExcelJS.Workbook();
  await readWb.xlsx.readFile(filePath);

  console.log(`Sheet Count: ${readWb.worksheets.length} (Expected: 4)`);
  const rSheet1 = readWb.getWorksheet('PILOT_SUBMISSION');
  const rSheet2 = readWb.getWorksheet('FULL_DYNAMIC_URL_INVENTORY');

  const rSheet1Count = rSheet1 ? rSheet1.rowCount : 0;
  const rSheet2Count = rSheet2 ? rSheet2.rowCount : 0;

  console.log(`PILOT_SUBMISSION Row Count: ${rSheet1Count - 1} (Expected: 5)`);
  console.log(`FULL_DYNAMIC_URL_INVENTORY Row Count: ${rSheet2Count - 1} (Expected: 1908)`);

  if (readWb.worksheets.length === 4 && rSheet1Count === 6 && rSheet2Count === 1909) {
    console.log('WORKBOOK REOPEN VALIDATION: PASS 100%');
  } else {
    throw new Error('WORKBOOK REOPEN VALIDATION FAILED!');
  }
}

generateExcel().catch((err) => {
  console.error(err);
  process.exit(1);
});
