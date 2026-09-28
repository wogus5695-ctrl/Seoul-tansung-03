import ReactDOMServer from 'react-dom/server';
import { getActiveRegions } from '../lib/contracts/regions-contract';
import { validateDynamicRoute, buildPublicHref } from '../lib/url/url-builder';
import { buildDynamicMetadata } from '../lib/seo/dynamic-metadata';
import Page from '../app/page';
import { GET as getSitemapRoute } from '../app/sitemap.xml/route';

async function runQA() {
  console.log('====================================================');
  console.log('  PHASE 6-D2 REGION EVIDENCE VISUAL REMOVAL QA      ');
  console.log('====================================================\n');

  const activeRegions = getActiveRegions(false);

  // Representative URLs to test (5 Evidence Regions + 2 Non-Evidence Regions + 1 Collision Hold)
  const sampleKeys = [
    { name: 'A. Evidence: 강남구 탄성코트', key: '강남구-탄성코트', expectedKeyword: '강남구 탄성코트', isIndexable: true },
    { name: 'B. Evidence: 불광동 탄성코트', key: '불광동-탄성코트', expectedKeyword: '불광동 탄성코트', isIndexable: true },
    { name: 'C. Evidence: 마곡동 베란다탄성코트', key: '마곡동-베란다탄성코트', expectedKeyword: '마곡동 베란다탄성코트', isIndexable: true },
    { name: 'D. Evidence: 성수동 탄성코트업체', key: '성수동-탄성코트업체', expectedKeyword: '성수동 탄성코트업체', isIndexable: true },
    { name: 'E. Evidence: 창신동 탄성코트', key: '창신동-탄성코트', expectedKeyword: '창신동 탄성코트', isIndexable: true },
    { name: 'F. Non-Evidence: 서초구 탄성코트', key: '서초구-탄성코트', expectedKeyword: '서초구 탄성코트', isIndexable: true },
    { name: 'G. Non-Evidence: 삼청동 세탁실탄성코트', key: '삼청동-세탁실탄성코트', expectedKeyword: '삼청동 세탁실탄성코트', isIndexable: true },
    { name: 'H. Collision Hold: 신사동 탄성코트', key: '신사동-탄성코트', expectedKeyword: '신사동 탄성코트', isIndexable: false },
  ];

  const zeroDomBannedStrings = [
    'LOCAL DATA CHECK',
    '공동주택 데이터로 보는 시공 전 체크포인트',
    '공식 공개 주거 데이터',
    'DATA FACT & LIMITATION',
    '공동주택 등록 단위',
    '20년 이상 비율',
  ];

  console.log('--- 1. ZERO-DOM EVIDENCE AUDIT & EXACT KEYWORD COUNT TABLE ---');
  console.log('| URL | Exact Keyword | Visible Count | Evidence DOM | Robots | Verdict |');
  console.log('|---|---|---|---|---|---|');

  for (const sample of sampleKeys) {
    const validation = validateDynamicRoute(sample.key, activeRegions);
    if (!validation.isValid || !validation.region || !validation.intent) {
      console.error(`❌ Validation failed for key: ${sample.key}`);
      process.exit(1);
    }

    const pageElement = await Page({ searchParams: Promise.resolve({ k: sample.key }) });
    const rawHtml = ReactDOMServer.renderToString(pageElement);

    // Assert ZERO-DOM requirement
    for (const banned of zeroDomBannedStrings) {
      if (rawHtml.includes(banned)) {
        console.error(`❌ Banned evidence text "${banned}" found in rendered HTML for ${sample.key}!`);
        process.exit(1);
      }
    }

    // Strip <script>...</script> and <style>...</style> tags before checking visible text
    const noScriptHtml = rawHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    const visibleText = noScriptHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

    // Count exact occurrences of exact keyword in visible body text
    const keyword = sample.expectedKeyword;
    const regex = new RegExp(keyword, 'g');
    const matches = visibleText.match(regex) || [];
    const count = matches.length;

    const metadata = await buildDynamicMetadata(validation.region, validation.intent);
    const robotsObj = metadata.robots as { index?: boolean } | undefined;
    const isIndex = robotsObj?.index !== false;

    const isCountPass = count >= 4 && count <= 7;
    const isRobotsPass = sample.isIndexable ? isIndex === true : isIndex === false;

    const verdict = isCountPass && isRobotsPass ? 'PASS' : 'WARN';

    console.log(
      `| /?k=${sample.key} | ${keyword} | ${count}회 | 0 DOM | index=${isIndex} | ${verdict} |`
    );
  }

  console.log('\n--- 2. METADATA, ROBOTS & CANONICAL AUDIT ---');
  for (const sample of sampleKeys) {
    const validation = validateDynamicRoute(sample.key, activeRegions)!;
    const metadata = await buildDynamicMetadata(validation.region!, validation.intent!);

    const robotsObj = metadata.robots as { index?: boolean } | undefined;
    const isIndex = robotsObj?.index !== false;
    const canonical = metadata.alternates?.canonical ? String(metadata.alternates.canonical) : undefined;

    const expectedCanonical = `https://www.allcaretan.co.kr${buildPublicHref(
      validation.region!.keywordRegionName,
      validation.intent!.serviceKeyword
    )}`;

    console.log(`Key: /?k=${sample.key}`);
    console.log(`  Title: ${metadata.title}`);
    console.log(`  Robots: index=${isIndex}`);
    console.log(`  Canonical: ${canonical}`);

    if (sample.isIndexable && !isIndex) {
      console.error(`❌ Expected index=true for ${sample.key} but got false`);
      process.exit(1);
    }
    if (!sample.isIndexable && isIndex) {
      console.error(`❌ Expected index=false (Collision hold) for ${sample.key} but got true`);
      process.exit(1);
    }
    if (canonical !== expectedCanonical) {
      console.error(`❌ Mismatched canonical for ${sample.key}. Got: ${canonical}, Expected: ${expectedCanonical}`);
      process.exit(1);
    }
  }

  console.log('\n--- 3. FULL DATASET INDEXABILITY & SITEMAP AUDIT ---');
  let indexableCount = 0;
  let noindexCount = 0;

  for (const region of activeRegions) {
    for (const intentKey of ['탄성코트', '탄성코트시공', '베란다탄성코트', '세탁실탄성코트', '아파트탄성코트', '탄성코트업체']) {
      const dynamicKey = `${region.keywordRegionName}-${intentKey}`;
      const validation = validateDynamicRoute(dynamicKey, activeRegions);
      if (validation.isValid && validation.region && validation.intent) {
        const meta = await buildDynamicMetadata(validation.region, validation.intent);
        const robotsObj = meta.robots as { index?: boolean } | undefined;
        if (robotsObj?.index !== false) {
          indexableCount++;
        } else {
          noindexCount++;
        }
      }
    }
  }

  console.log(`Total Indexable Dynamic URLs: ${indexableCount}`);
  console.log(`Total NOINDEX Collision Hold URLs: ${noindexCount}`);

  if (indexableCount !== 1902) {
    console.error(`❌ Expected exactly 1,902 INDEXABLE URLs, got ${indexableCount}`);
    process.exit(1);
  }
  if (noindexCount !== 6) {
    console.error(`❌ Expected exactly 6 NOINDEX Collision Hold URLs, got ${noindexCount}`);
    process.exit(1);
  }

  // Check Sitemap entries
  const sitemapResponse = await getSitemapRoute();
  const sitemapXml = await sitemapResponse.text();
  const urlMatches = sitemapXml.match(/<url>/g) || [];
  console.log(`Total Sitemap Entries: ${urlMatches.length}`);

  if (urlMatches.length !== 1904) {
    console.error(`❌ Expected exactly 1,904 Sitemap entries, got ${urlMatches.length}`);
    process.exit(1);
  }

  console.log('\n====================================================');
  console.log('  ALL QA AUDITS PASSED SUCCESSFULLY! (PHASE 6-D2)   ');
  console.log('====================================================');
}

runQA().catch((err) => {
  console.error('QA script error:', err);
  process.exit(1);
});
