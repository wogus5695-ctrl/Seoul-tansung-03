import http from 'http';
import { PRODUCTION_REGIONS } from '../lib/contracts/regions-contract';
import { SERVICE_KEYWORDS } from '../lib/contracts/intents-contract';

interface AuditItem {
  regionId: string;
  regionType: string;
  keywordRegionName: string;
  sigugun?: string;
  serviceKeyword: string;
  dynamicKey: string;
  path: string;
}

const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 25,
});

function fetchHtml(path: string): Promise<{ statusCode: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        agent,
        timeout: 10000,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode || 0,
            body: data,
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout on ${path}`));
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

async function runAudit() {
  console.log('====================================================');
  console.log('  STARTING PHASE 5-B2B FULL 1,908 URL SSR E2E AUDIT ');
  console.log('====================================================\n');

  // 1. Build Full 1,908 URL Audit List from PRODUCTION_REGIONS x SERVICE_KEYWORDS
  const auditList: AuditItem[] = [];
  const seenPaths = new Set<string>();
  const duplicatePaths: string[] = [];

  for (const region of PRODUCTION_REGIONS) {
    for (const kw of SERVICE_KEYWORDS) {
      const dynamicKey = `${region.keywordRegionName}-${kw}`;
      const path = `/?k=${encodeURIComponent(dynamicKey)}`;

      if (seenPaths.has(path)) {
        duplicatePaths.push(path);
      }
      seenPaths.add(path);

      auditList.push({
        regionId: region.id,
        regionType: region.regionType,
        keywordRegionName: region.keywordRegionName,
        sigugun: region.sigugun,
        serviceKeyword: kw,
        dynamicKey,
        path,
      });
    }
  }

  console.log(`Generated Audit List count: ${auditList.length} (Expected: 1908)`);
  console.log(`Unique Paths: ${seenPaths.size}`);
  console.log(`Duplicate Paths: ${duplicatePaths.length}`);

  if (auditList.length !== 1908 || seenPaths.size !== 1908 || duplicatePaths.length > 0) {
    console.error('FAIL: URL Generation mismatch!');
    process.exit(1);
  }

  // Metrics
  let http200Count = 0;
  let http404Count = 0;
  let http500Count = 0;
  let httpRedirectCount = 0;
  let timeoutCount = 0;

  let titlePassCount = 0;
  let descPassCount = 0;
  let h1PassCount = 0;
  let singleH1Count = 0;

  let robotsStrictPassCount = 0;
  let indexLeakCount = 0;

  let canonicalPresentCount = 0;
  let canonicalWrongCount = 0;

  let totalFaqItems = 0;
  let totalRelatedIntentLinks = 0;
  let brokenRelatedLinksCount = 0;

  let businessSsotPassCount = 0;
  let phoneCtaPassCount = 0;
  let kakaoLeakCount = 0;

  let jsonLdPassCount = 0;
  let localBusinessLeakCount = 0;
  let areaServedCount = 0;

  let parentGuLeakCount = 0;
  let forbiddenUrlCount = 0;
  let fakeLocalClaimCount = 0;

  const failureLog: Array<{ path: string; errors: string[] }> = [];

  // Controlled Concurrency: 15 workers
  const CONCURRENCY = 15;
  let currentIndex = 0;
  let completedCount = 0;

  async function worker() {
    while (currentIndex < auditList.length) {
      const itemIndex = currentIndex++;
      const item = auditList[itemIndex];

      let res: { statusCode: number; body: string } | null = null;
      let retries = 0;

      while (retries < 2) {
        try {
          res = await fetchHtml(item.path);
          break;
        } catch (err: unknown) {
          retries++;
          if (retries >= 2) {
            timeoutCount++;
            const msg = err instanceof Error ? err.message : String(err);
            failureLog.push({ path: item.path, errors: [`Fetch failed: ${msg}`] });
          }
        }
      }

      if (!res) {
        completedCount++;
        continue;
      }

      const errors: string[] = [];

      // 1. HTTP Status
      if (res.statusCode === 200) {
        http200Count++;
      } else if (res.statusCode === 404) {
        http404Count++;
        errors.push(`Status 404`);
      } else if (res.statusCode >= 500) {
        http500Count++;
        errors.push(`Status ${res.statusCode}`);
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        httpRedirectCount++;
        errors.push(`Redirect ${res.statusCode}`);
      } else {
        errors.push(`Unexpected status ${res.statusCode}`);
      }

      const body = res.body;

      // 2. Title Contract: Must start with exact dynamic keyword
      const expectedKeyword = `${item.keywordRegionName} ${item.serviceKeyword}`;
      const titleMatch = body.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '';
      if (title.startsWith(expectedKeyword)) {
        titlePassCount++;
      } else {
        errors.push(`Title does not start with '${expectedKeyword}' (got: '${title}')`);
      }

      // 3. Description Contract: Must start with exact dynamic keyword
      const descMatch =
        body.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
        body.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
      const desc = descMatch ? descMatch[1] : '';
      if (desc.startsWith(expectedKeyword)) {
        descPassCount++;
      } else {
        errors.push(`Description does not start with '${expectedKeyword}' (got: '${desc}')`);
      }

      // 4. H1 Contract: Exact H1 count = 1 and text equals exact keyword
      const h1Matches = Array.from(body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi));
      if (h1Matches.length === 1) {
        singleH1Count++;
        const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
        if (h1Text === expectedKeyword) {
          h1PassCount++;
        } else {
          errors.push(`H1 text mismatch: expected '${expectedKeyword}', got '${h1Text}'`);
        }
      } else {
        errors.push(`H1 count is ${h1Matches.length} (expected 1)`);
      }

      // 5. Robots: strictly noindex, nofollow, nocache
      const robotsMatch = body.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
      const robotsContent = robotsMatch ? robotsMatch[1] : '';
      if (
        robotsContent.includes('noindex') &&
        robotsContent.includes('nofollow') &&
        robotsContent.includes('nocache')
      ) {
        robotsStrictPassCount++;
      } else {
        errors.push(`Robots header not strictly noindex, nofollow, nocache: '${robotsContent}'`);
      }
      if (robotsContent.includes('index') && !robotsContent.includes('noindex')) {
        indexLeakCount++;
      }

      // 6. Canonical link
      const canonicalMatch = body.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
      if (canonicalMatch) {
        canonicalPresentCount++;
        const canonicalUrl = canonicalMatch[1];
        if (
          !canonicalUrl.includes(encodeURIComponent(item.dynamicKey)) &&
          !canonicalUrl.includes(item.dynamicKey)
        ) {
          canonicalWrongCount++;
          errors.push(`Canonical URL does not match dynamic key: '${canonicalUrl}'`);
        }
        if (canonicalUrl === 'http://localhost:3000/' || canonicalUrl.endsWith('.invalid/')) {
          errors.push(`Canonical incorrectly points to main page: '${canonicalUrl}'`);
        }
      } else {
        errors.push(`Canonical tag missing`);
      }

      // 7. FAQ count: exactly 5 items
      const faqSchemaMatches = Array.from(body.matchAll(/"@type":\s*"Question"/g));
      totalFaqItems += faqSchemaMatches.length;
      if (faqSchemaMatches.length !== 5) {
        errors.push(`FAQ count in schema is ${faqSchemaMatches.length} (expected 5)`);
      }

      // 8. Related Intent links: exactly 5 related intents
      const otherIntents = SERVICE_KEYWORDS.filter((k) => k !== item.serviceKeyword);
      let pageRelatedCount = 0;
      for (const otherKw of otherIntents) {
        const expectedRelKey = `${item.keywordRegionName}-${otherKw}`;
        const encodedRelKey = encodeURIComponent(expectedRelKey);
        if (body.includes(encodedRelKey) || body.includes(expectedRelKey)) {
          pageRelatedCount++;
        } else {
          brokenRelatedLinksCount++;
          errors.push(`Missing related intent link for '${expectedRelKey}'`);
        }
      }
      totalRelatedIntentLinks += pageRelatedCount;

      // 9. Parent GU leak check into DONG public key:
      if (item.regionType === 'DONG' && item.sigugun) {
        const forbiddenCompound = `${item.sigugun} ${item.keywordRegionName}`;
        const forbiddenHyphen = `${item.sigugun}-${item.keywordRegionName}`;
        if (
          title.includes(forbiddenCompound) ||
          title.includes(forbiddenHyphen) ||
          desc.includes(forbiddenCompound) ||
          desc.includes(forbiddenHyphen) ||
          body.includes(`h1>${forbiddenCompound}`) ||
          body.includes(`k=${encodeURIComponent(forbiddenHyphen)}`)
        ) {
          parentGuLeakCount++;
          errors.push(`Parent GU leak detected: '${forbiddenCompound}'`);
        }
      }

      // 10. Forbidden URL check:
      if (
        body.includes('/?k=%EC%84%9C%EC%9A%B8-') ||
        body.includes('/?k=서울-') ||
        body.includes('/?k=서울특별시-')
      ) {
        forbiddenUrlCount++;
        errors.push(`Forbidden SIDO prepended URL pattern detected`);
      }

      // 11. Business SSOT
      const hasBrand = body.includes('올케어');
      const hasPhone = body.includes('010-8492-6900');
      const hasBizNum = body.includes('405-15-02677');
      const hasRep = body.includes('김재현');
      if (hasBrand && hasPhone && hasBizNum && hasRep) {
        businessSsotPassCount++;
      } else {
        errors.push(`Business SSOT missing items: brand=${hasBrand}, phone=${hasPhone}, num=${hasBizNum}, rep=${hasRep}`);
      }

      // 12. Phone CTA
      if (body.includes('tel:01084926900')) {
        phoneCtaPassCount++;
      } else {
        errors.push(`Phone CTA tel:01084926900 missing`);
      }
      if (body.includes('pf.kakao.com') || body.includes('kakao.com/me/')) {
        kakaoLeakCount++;
        errors.push(`Fake Kakao link detected`);
      }

      // 13. JSON-LD
      if (body.includes('application/ld+json')) {
        jsonLdPassCount++;
        if (body.includes('"@type": "LocalBusiness"') || body.includes('"@type":"LocalBusiness"')) {
          localBusinessLeakCount++;
          errors.push(`Forbidden LocalBusiness subtype detected`);
        }
        if (body.includes('"areaServed"')) {
          areaServedCount++;
          errors.push(`Unexpected areaServed emitted before INDEXABLE approval`);
        }
      } else {
        errors.push(`JSON-LD script missing`);
      }

      // 14. Fake Local Claims
      if (
        body.includes('에서 자주 발생') ||
        body.includes('아파트의 특징') ||
        body.includes('실제 시공 사례')
      ) {
        fakeLocalClaimCount++;
        errors.push(`Fake local claim detected in body`);
      }

      if (errors.length > 0) {
        failureLog.push({ path: item.path, errors });
      }

      completedCount++;
      if (completedCount % 200 === 0 || completedCount === auditList.length) {
        console.log(`Progress: ${completedCount} / 1908 URLs audited (${Math.round((completedCount / 1908) * 100)}%)`);
      }
    }
  }

  // Launch workers
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  console.log('\n====================================================');
  console.log('           AUDIT EXECUTION COMPLETE                 ');
  console.log('====================================================\n');

  console.log(`Total URLs Audited: ${completedCount}`);
  console.log(`HTTP 200 OK: ${http200Count} / 1908`);
  console.log(`HTTP 404: ${http404Count}`);
  console.log(`HTTP 500: ${http500Count}`);
  console.log(`HTTP Redirects: ${httpRedirectCount}`);
  console.log(`Timeouts / Errors: ${timeoutCount}`);

  console.log(`\nTitle Prefix Matches: ${titlePassCount} / 1908`);
  console.log(`Description Prefix Matches: ${descPassCount} / 1908`);
  console.log(`Single H1 Tags: ${singleH1Count} / 1908`);
  console.log(`H1 Exact Matches: ${h1PassCount} / 1908`);

  console.log(`\nRobots Strictly noindex, nofollow, nocache: ${robotsStrictPassCount} / 1908`);
  console.log(`Index Leaks: ${indexLeakCount}`);
  console.log(`Canonical Tags Present: ${canonicalPresentCount} / 1908`);
  console.log(`Canonical Wrong URLs: ${canonicalWrongCount}`);

  console.log(`\nTotal Rendered FAQ Items: ${totalFaqItems} (Expected: 9540)`);
  console.log(`Total Related Intent Links: ${totalRelatedIntentLinks} (Expected: 9540)`);
  console.log(`Broken Related Links: ${brokenRelatedLinksCount}`);

  console.log(`\nBusiness SSOT Passed: ${businessSsotPassCount} / 1908`);
  console.log(`Phone CTA tel:01084926900 Passed: ${phoneCtaPassCount} / 1908`);
  console.log(`Fake Kakao Leaks: ${kakaoLeakCount}`);

  console.log(`\nJSON-LD Scripts: ${jsonLdPassCount} / 1908`);
  console.log(`LocalBusiness Subtype Leaks: ${localBusinessLeakCount}`);
  console.log(`Unexpected areaServed Count: ${areaServedCount}`);

  console.log(`\nParent GU Leaks into DONG Public Key: ${parentGuLeakCount}`);
  console.log(`Forbidden URL Patterns: ${forbiddenUrlCount}`);
  console.log(`Fake Local Claims: ${fakeLocalClaimCount}`);

  if (failureLog.length > 0) {
    console.error(`\nTOTAL FAILURES DETECTED: ${failureLog.length}`);
    console.error('First 5 failure samples:');
    console.error(JSON.stringify(failureLog.slice(0, 5), null, 2));
    process.exit(1);
  } else {
    console.log('\nALL 1,908 DYNAMIC URLS AUDITED WITH ZERO DEFECTS (100% PERFECT)!');
  }
}

runAudit();
