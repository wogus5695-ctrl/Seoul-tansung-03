import http from 'http';

const SAMPLES = [
  { type: 'GU', name: '강남구', gu: '강남구', intent: '탄성코트' },
  { type: 'GU', name: '은평구', gu: '은평구', intent: '세탁실탄성코트' },
  { type: 'NORMALIZED_ADMIN_GROUP', name: '창신동', gu: '종로구', intent: '탄성코트시공' },
  { type: 'ADMIN_ONLY', name: '청운효자동', gu: '종로구', intent: '베란다탄성코트' },
  { type: 'ADMIN_AND_LEGAL', name: '사직동', gu: '종로구', intent: '아파트탄성코트' },
  { type: 'LEGAL_ONLY', name: '갈월동', gu: '용산구', intent: '탄성코트업체' },
  { type: 'SPECIAL_APPROVED', name: '성수동', gu: '성동구', intent: '탄성코트' },
  { type: 'SPECIAL_APPROVED', name: '금호동', gu: '성동구', intent: '세탁실탄성코트' },
  { type: 'APPROVED_PILOT_DONG', name: '불광동', gu: '은평구', intent: '탄성코트' },
  { type: 'COLLISION_HOLD_PILOT', name: '신사동', gu: '은평구', intent: '탄성코트' }
];

const ALL_INTENTS = [
  '탄성코트',
  '탄성코트시공',
  '베란다탄성코트',
  '세탁실탄성코트',
  '아파트탄성코트',
  '탄성코트업체'
];

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
  });
}

async function runQa() {
  console.log('=== STARTING PHASE 5-B2A SAMPLE RUNTIME QA ===\n');
  const results = [];

  // 1. Root / Regression Check
  console.log('--- 1. MAIN PAGE / CHECK ---');
  const rootRes = await fetchUrl('/');
  const rootOk = rootRes.statusCode === 200 &&
                 rootRes.body.includes('올케어') &&
                 rootRes.body.includes('010-8492-6900') &&
                 rootRes.body.includes('405-15-02677') &&
                 rootRes.body.includes('김재현');
  console.log(`Root / Status: ${rootRes.statusCode} | Business SSOT: ${rootOk ? 'OK' : 'FAIL'}`);

  // 2. Sample Dynamic URLs
  console.log('\n--- 2. DYNAMIC URL SAMPLES CHECK ---');
  for (const item of SAMPLES) {
    const key = `${item.name}-${item.intent}`;
    const encodedKey = encodeURIComponent(key);
    const path = `/?k=${encodedKey}`;

    const res = await fetchUrl(path);
    const body = res.body;

    const errors = [];
    if (res.statusCode !== 200) {
      errors.push(`Status ${res.statusCode}`);
    }

    // Title
    const titleMatch = body.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    if (!title.includes(`${item.name} ${item.intent}`)) {
      errors.push(`Title missing '${item.name} ${item.intent}' (got: '${title}')`);
    }

    // Description
    const descMatch = body.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
                      body.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
    const desc = descMatch ? descMatch[1] : '';
    if (!desc.includes(`${item.name} ${item.intent}`)) {
      errors.push(`Description missing '${item.name} ${item.intent}'`);
    }

    // H1
    const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
    if (!h1.includes(item.name) || !h1.includes(item.intent)) {
      errors.push(`H1 missing name or intent (got: '${h1}')`);
    }

    // Robots
    const robotsMatch = body.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
    const robots = robotsMatch ? robotsMatch[1] : '';
    if (!robots.includes('noindex') || !robots.includes('nofollow') || !robots.includes('nocache')) {
      errors.push(`Robots header not strictly noindex, nofollow, nocache (got: '${robots}')`);
    }

    // Canonical link
    const canonicalMatch = body.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    if (!canonicalMatch) {
      errors.push('Canonical tag missing');
    }

    // FAQ count
    const faqSchemaMatches = (body.match(/"@type":\s*"Question"/g) || []).length;
    if (faqSchemaMatches !== 5) {
      // also check DOM faq triggers if any
    }

    // Related intents check: exactly 5 related intents pointing to same item.name
    const otherIntents = ALL_INTENTS.filter(i => i !== item.intent);
    for (const other of otherIntents) {
      const expectedKey = `${item.name}-${other}`;
      const expectedEncoded = encodeURIComponent(expectedKey);
      if (!body.includes(expectedEncoded) && !body.includes(expectedKey)) {
        errors.push(`Missing related intent link for '${other}'`);
      }
    }

    // Business SSOT exact checks
    if (!body.includes('올케어')) errors.push('Brand name 올케어 missing');
    if (!body.includes('010-8492-6900')) errors.push('Phone 010-8492-6900 missing');
    if (!body.includes('405-15-02677')) errors.push('Business number 405-15-02677 missing');
    if (!body.includes('김재현')) errors.push('Representative 김재현 missing');

    const result = {
      type: item.type,
      name: item.name,
      intent: item.intent,
      path,
      statusCode: res.statusCode,
      title,
      robots,
      errors
    };
    results.push(result);

    console.log(`[${result.errors.length === 0 ? 'PASS' : 'FAIL'}] ${item.type} | ${item.name} (${item.intent}) -> ${res.statusCode} | Robots: ${robots}`);
    if (result.errors.length > 0) {
      console.log('   Errors:', result.errors);
    }
  }

  const allPassed = results.every(r => r.errors.length === 0) && rootOk;
  console.log(`\n=== SAMPLE QA RESULT: ${allPassed ? 'ALL PASS' : 'FAILURES DETECTED'} ===`);
  if (!allPassed) {
    process.exit(1);
  }
}

runQa();
