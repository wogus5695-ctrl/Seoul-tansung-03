import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { PRODUCTION_REGIONS } from '../lib/contracts/regions-contract';
import { SEARCH_INTENTS } from '../lib/contracts/intents-contract';
import { OFFICIAL_SITE_ORIGIN } from '../lib/config/site-config';
import { buildCanonicalUrl, buildPublicHref } from '../lib/url/url-builder';
import { hasRegionEvidence, PRODUCTION_REGION_EVIDENCE } from '../lib/data/region-evidence';

async function generateExcel() {
  console.log('Generating Naver SearchAdvisor Excel Workbook (Phase 6-C2 Full Approved Rollout)...');

  const exportsDir = path.resolve(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
  }

  const fileName = '260928_올케어_탄성코트_전체공개_URL_네이버서치어드바이저.xlsx';
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
  // SHEET 1: PILOT_SUBMISSION (Historical 5 Pilot Direct Targets)
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
      crawlTarget: 'YES (PRIORITY)',
      stage: 'PILOT',
      notes: 'Initial 5-URL Publication Pilot Priority Direct Target',
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

      const hasEv = hasRegionEvidence(r.id, serviceKeyword, PRODUCTION_REGION_EVIDENCE);

      const isIndexable = !isCollision;
      const stage = isCollision ? 'HOLD' : 'LIVE';

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
        indexable: isIndexable ? 'YES' : 'NO',
        robots: isIndexable ? 'index,follow' : 'noindex,nofollow,nocache',
        sitemapIncluded: isIndexable ? 'YES' : 'NO',
        crawlTarget: isIndexable ? 'OPTIONAL (Sitemap Coverage)' : 'NO',
        stage,
        notes: isCollision
          ? 'Collision Hold Region (Strict NOINDEX)'
          : hasEv
          ? 'Phase 6-C2 Approved Publication + Tier-C Evidence'
          : 'Phase 6-C2 Approved Publication (INDEXABLE)',
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
    { param: 'Seoul Hub URL', val: `${OFFICIAL_SITE_ORIGIN}/sitemap-seoul`, notes: 'HTML Directory for Crawlers' },
    { param: 'Total Production Regions', val: '318', notes: '25 GUs + 293 DONGs' },
    { param: 'Approved Production Regions', val: '317', notes: 'All Approved for Full Publication' },
    { param: 'Collision Hold Regions', val: '1', notes: '은평구 신사동 (seoul-eunpyeong-sinsa)' },
    { param: 'Total Dynamic URLs', val: '1,908', notes: '318 Regions x 6 Intents' },
    { param: 'Indexable Dynamic URLs', val: '1,902', notes: '317 Approved Regions x 6 Intents' },
    { param: 'NOINDEX Dynamic URLs', val: '6', notes: 'Strict Collision Hold Lock (은평구 신사동)' },
    { param: 'Production Evidence Regions', val: '5', notes: '강남구, 불광동, 마곡동, 성수동, 창신동' },
    { param: 'Sitemap Dynamic Entries', val: '1,902', notes: 'Exact 1,902 Approved Dynamic URLs' },
    { param: 'Sitemap Total URL Count', val: '1,904', notes: '1 Main + 1 Hub + 1,902 Dynamic URLs' },
    { param: 'SearchAdvisor Site Registration', val: 'DONE', notes: 'Verified' },
    { param: 'SearchAdvisor Ownership Verification', val: 'DONE', notes: 'Meta tag verified' },
    { param: 'SearchAdvisor Sitemap Submission', val: 'SUBMISSION READY (1,904 URLs)', notes: 'USER MANUAL ACTION REQUIRED' },
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
    { step: '3', item: 'sitemap.xml Live 정상 수신 검증', status: 'PASS (1,904 URLs)', actor: 'ANTIGRAVITY', guide: 'HTTP 200 OK & 1,904 URLs Valid XML' },
    { step: '4', item: 'sitemap-seoul (허브) Live 검증', status: 'PASS (1,902 Links)', actor: 'ANTIGRAVITY', guide: 'HTTP 200 OK & 1,902 Approved HTML Links' },
    { step: '5', item: '네이버 서치어드바이저 Sitemap 제출', status: 'USER ACTION REQUIRED', actor: 'USER', guide: 'https://www.allcaretan.co.kr/sitemap.xml 제출 (최우선 작업)' },
    { step: '6', item: 'Pilot 5 URL 수집요청 (선택사항)', status: 'OPTIONAL', actor: 'USER', guide: 'PILOT_SUBMISSION 시트 5개 키워드 우선 수집요청' },
    { step: '7', item: 'URL 검사 및 수집 현황 관찰', status: 'PENDING', actor: 'USER', guide: 'sitemap 제출 후 24~72시간 내 크롤링 수집 현황 점검' },
    { step: '8', item: '색인(Index) 수치 증가 모니터링', status: 'PENDING', actor: 'USER', guide: 'site:www.allcaretan.co.kr 색인 수치 증가 확인' },
    { step: '9', item: '서울 지역별 키워드 노출 관찰', status: 'PENDING', actor: 'USER', guide: '서울 25개 자치구 탄성코트 키워드 순위 관찰' },
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

  // Also update original filename for backward compatibility
  const legacyFileName = '260928_올케어_탄성코트_동적키워드_URL_네이버서치어드바이저.xlsx';
  const legacyFilePath = path.join(exportsDir, legacyFileName);
  await workbook.xlsx.writeFile(legacyFilePath);
  console.log(`Legacy Excel file updated at: ${legacyFilePath}`);

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

  let indexableYesCount = 0;
  let indexableNoCount = 0;
  if (rSheet2) {
    rSheet2.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const indexableVal = row.getCell(14).value; // Column N (Indexable)
        if (indexableVal === 'YES') indexableYesCount++;
        else if (indexableVal === 'NO') indexableNoCount++;
      }
    });
  }

  console.log(`Indexable YES Count: ${indexableYesCount} (Expected: 1902)`);
  console.log(`Indexable NO Count: ${indexableNoCount} (Expected: 6)`);

  if (
    readWb.worksheets.length === 4 &&
    rSheet1Count === 6 &&
    rSheet2Count === 1909 &&
    indexableYesCount === 1902 &&
    indexableNoCount === 6
  ) {
    console.log('WORKBOOK REOPEN VALIDATION: PASS 100%');
  } else {
    throw new Error('WORKBOOK REOPEN VALIDATION FAILED!');
  }
}

generateExcel().catch((err) => {
  console.error(err);
  process.exit(1);
});
