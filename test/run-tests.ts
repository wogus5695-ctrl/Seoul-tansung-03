/**
 * Allcare Test Suite (PHASE 2-B HARDENED)
 *
 * Verifies:
 * - Same-Name Region Collision & Disambiguation Status
 * - Absolute Canonical URL Hardening
 * - Quality Gate: Domain, Placeholder, Unverified Claims, Collision
 * - Claim Guard: 3-Tier hierarchy
 * - Full regression of Phase 2 Core Contracts
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { SITE_CONFIG, isContactConfigured } from '../lib/config/site-config';
import { SEARCH_INTENTS, SERVICE_KEYWORDS } from '../lib/contracts/intents-contract';
import {
  SEOUL_DONG_MANIFEST_RECORDS,
  SEOUL_GU_MANIFEST_RECORDS,
  getManifestCounts,
} from '../lib/manifest/seoul-region-manifest';
import {
  PRODUCTION_REGIONS,
  getActiveRegions,
  shouldEmitAreaServed,
  validateInternalIdUniqueness,
  validatePublicDynamicKeyUniqueness,
} from '../lib/contracts/regions-contract';
import { buildDynamicMetadata, buildDynamicJsonLd } from '../lib/seo/dynamic-metadata';
import {
  evaluateImageProductionReadiness,
  evaluateMainVisualReadiness,
  evaluateBeforeAfterCases,
  INITIAL_IMAGE_REGISTRY,
} from '../lib/contracts/image-registry';
import { assertNoUnverifiedClaims, filterProductionSafeClaims, validateClaimSafety } from '../lib/guards/claim-guard';
import { evaluateQualityGate } from '../lib/guards/quality-gate';
import {
  buildCanonicalUrl,
  buildDynamicKey,
  buildPublicHref,
  parseDynamicKey,
  validateDynamicRoute,
} from '../lib/url/url-builder';
import { validateRegionDataset } from '../lib/validators/region-dataset-validator';
import { ImageAssetSlot } from '../lib/types/images';
import {
  normalizeCanonicalQuery,
  isProductionOriginReady,
  isPreviewOriginValid,
  evaluateProductionCanonicalGate,
  evaluatePublicationGate,
  getPublicationOrigin,
  PublicationGateInput,
} from '../lib/contracts/publication-gate';
import { TEST_CLAIMS } from './fixtures/claims.fixture';
import {
  SYNTHETIC_APPROVED_DISAMBIGUATED_REGIONS,
  SYNTHETIC_COLLISION_REGIONS,
  TEST_REGIONS,
} from './fixtures/regions.fixture';

/**
 * RFC 2606 / RFC 6761 Reserved Test-Only Origins.
 * Guaranteed to NEVER resolve or be registered on the public internet.
 * MUST NEVER enter SITE_CONFIG or production environments.
 */
const TEST_RESERVED_PRODUCTION_ORIGIN = 'https://production-origin.invalid';
const TEST_RESERVED_INSECURE_ORIGIN = 'http://insecure-origin.invalid';

console.log('====================================================');
console.log('  RUNNING ALLCARE PHASE 2-B HARDENED CONTRACT TESTS ');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passCount++;
  } catch (err: unknown) {
    console.error(`[FAIL] ${name}`);
    console.error(err);
    failCount++;
  }
}

// ----------------------------------------------------
// 1. URL BUILDER ROUND TRIP (keywordRegionName based)
// ----------------------------------------------------
test('URL Builder: Region + Intent -> Dynamic Key -> Public href -> parse round-trip matches', () => {
  for (const region of TEST_REGIONS) {
    for (const intent of SEARCH_INTENTS) {
      const dynamicKey = buildDynamicKey(region.keywordRegionName, intent.serviceKeyword);
      assert.strictEqual(dynamicKey, `${region.keywordRegionName}-${intent.serviceKeyword}`);

      const href = buildPublicHref(region.keywordRegionName, intent.serviceKeyword);
      assert(href.startsWith('/?k='));

      const parsed = parseDynamicKey(dynamicKey);
      assert(parsed !== null, `Failed to parse dynamicKey: ${dynamicKey}`);
      assert.strictEqual(parsed.regionName, region.keywordRegionName);
      assert.strictEqual(parsed.serviceKeyword, intent.serviceKeyword);
    }
  }
});

// ----------------------------------------------------
// 2. SERP PREFIX CONTRACT
// ----------------------------------------------------
test('SERP Prefix: Title, Description, H1, Hero Intro all start with Exact Dynamic Keyword', () => {
  const testRegion = '테스트동';

  for (const intent of SEARCH_INTENTS) {
    const expectedExactKeyword = `${testRegion} ${intent.serviceKeyword}`;

    const title = intent.titleTemplate(testRegion);
    assert(
      title.startsWith(expectedExactKeyword),
      `Title [${title}] must start with exact keyword [${expectedExactKeyword}]`
    );

    const desc = intent.descriptionTemplate(testRegion);
    assert(
      desc.startsWith(expectedExactKeyword),
      `Description [${desc}] must start with exact keyword [${expectedExactKeyword}]`
    );

    const h1 = intent.h1Template(testRegion);
    assert(
      h1.startsWith(expectedExactKeyword),
      `H1 [${h1}] must start with exact keyword [${expectedExactKeyword}]`
    );

    const heroIntro = intent.heroIntroTemplate(testRegion);
    assert(
      heroIntro.startsWith(expectedExactKeyword),
      `Hero Intro [${heroIntro}] must start with exact keyword [${expectedExactKeyword}]`
    );
  }
});

// ----------------------------------------------------
// 3. SAME-NAME REGION COLLISION (Synthetic Fixture)
// ----------------------------------------------------
test('Same-Name Region Collision: Detects duplicate keywordRegionName across different parents', () => {
  const collisionResult = validatePublicDynamicKeyUniqueness(SYNTHETIC_COLLISION_REGIONS);
  assert.strictEqual(collisionResult.isUnique, false);
  assert.strictEqual(collisionResult.collisions.length, 1);
  assert.strictEqual(collisionResult.collisions[0].keywordRegionName, '중앙동');
  assert(collisionResult.collisions[0].regionIds.includes('city-a-jungang'));
  assert(collisionResult.collisions[0].regionIds.includes('city-b-jungang'));

  // Internal ID uniqueness is intact even when public names collide
  const idResult = validateInternalIdUniqueness(SYNTHETIC_COLLISION_REGIONS);
  assert.strictEqual(idResult.isUnique, true);
});

// ----------------------------------------------------
// 4. APPROVED DISAMBIGUATED REGION TEST
// ----------------------------------------------------
test('Approved Disambiguation: Differentiated keywordRegionNames resolve route collisions cleanly', () => {
  const approvedResult = validatePublicDynamicKeyUniqueness(SYNTHETIC_APPROVED_DISAMBIGUATED_REGIONS);
  assert.strictEqual(approvedResult.isUnique, true);
  assert.strictEqual(approvedResult.collisions.length, 0);

  // Generates separate public hrefs for both
  const hrefA = buildPublicHref(
    SYNTHETIC_APPROVED_DISAMBIGUATED_REGIONS[0].keywordRegionName,
    '탄성코트'
  );
  const hrefB = buildPublicHref(
    SYNTHETIC_APPROVED_DISAMBIGUATED_REGIONS[1].keywordRegionName,
    '탄성코트'
  );
  assert.notStrictEqual(hrefA, hrefB);
});

// ----------------------------------------------------
// 5. DISAMBIGUATION BLOCK TEST (Quality Gate)
// ----------------------------------------------------
test('Disambiguation Block: REQUIRES_DISAMBIGUATION blocks INDEXABLE promotion', () => {
  const gateResult = evaluateQualityGate({
    regionValid: true,
    intentValid: true,
    routeUnique: true,
    publicRouteUnique: true,
    regionDisambiguationValid: false, // Disambiguation pending
    siteOriginConfigured: true,
    absoluteCanonicalValid: true,
    metadataComplete: true,
    requiredContentComplete: true,
    contentStatus: 'APPROVED',
    unverifiedClaimCount: 0,
    requiredAssetsReady: true,
    internalLinksValid: true,
    noRegionCollision: false,
  });

  assert.strictEqual(gateResult.isEligibleForIndex, false);
  assert.strictEqual(gateResult.targetState, 'DRAFT'); // Fatal error forces DRAFT
  assert(gateResult.errors.some((e) => e.code === 'REGION_DISAMBIGUATION_REQUIRED'));
});

// ----------------------------------------------------
// 6. CANONICAL CONTRACT HARDENING
// ----------------------------------------------------
test('Canonical Hardening: siteOrigin null returns explicit failure; valid origin returns absolute URL', () => {
  // Unconfigured origin must NOT return relative URL or fake domain
  const unconfiguredResult = buildCanonicalUrl('테스트동', '탄성코트', null);
  assert.strictEqual(unconfiguredResult.isSuccess, false);
  assert.strictEqual(unconfiguredResult.canonicalUrl, null);
  assert.strictEqual(unconfiguredResult.error, 'SITE_ORIGIN_UNCONFIGURED');

  // Valid origin returns absolute HTTPS canonical
  const configuredResult = buildCanonicalUrl(
    '테스트동',
    '탄성코트',
    'https://allcare-coating.co.kr'
  );
  assert.strictEqual(configuredResult.isSuccess, true);
  assert(configuredResult.canonicalUrl !== null);
  assert(configuredResult.canonicalUrl!.startsWith('https://allcare-coating.co.kr/?k='));
});

// ----------------------------------------------------
// 7. QUALITY GATE: SITE_ORIGIN_CONFIGURED
// ----------------------------------------------------
test('Quality Gate: Unconfigured SITE_ORIGIN blocks INDEXABLE promotion', () => {
  const gateResult = evaluateQualityGate({
    regionValid: true,
    intentValid: true,
    routeUnique: true,
    publicRouteUnique: true,
    regionDisambiguationValid: true,
    siteOriginConfigured: false, // No production domain yet
    absoluteCanonicalValid: false,
    metadataComplete: true,
    requiredContentComplete: true,
    contentStatus: 'APPROVED',
    unverifiedClaimCount: 0,
    requiredAssetsReady: true,
    internalLinksValid: true,
    noRegionCollision: true,
  });

  assert.strictEqual(gateResult.isEligibleForIndex, false);
  assert.strictEqual(gateResult.targetState, 'PUBLISHED_NOINDEX');
  assert(gateResult.errors.some((e) => e.code === 'SITE_ORIGIN_UNCONFIGURED'));
});

// ----------------------------------------------------
// 8. QUALITY GATE: PLACEHOLDER CONTENT BLOCK
// ----------------------------------------------------
test('Quality Gate: PLACEHOLDER content blocks INDEXABLE promotion', () => {
  const gateResult = evaluateQualityGate({
    regionValid: true,
    intentValid: true,
    routeUnique: true,
    publicRouteUnique: true,
    regionDisambiguationValid: true,
    siteOriginConfigured: true,
    absoluteCanonicalValid: true,
    metadataComplete: true,
    requiredContentComplete: true,
    contentStatus: 'PLACEHOLDER', // Contract verification sample, not approved marketing copy
    unverifiedClaimCount: 0,
    requiredAssetsReady: true,
    internalLinksValid: true,
    noRegionCollision: true,
  });

  assert.strictEqual(gateResult.isEligibleForIndex, false);
  assert.strictEqual(gateResult.targetState, 'PUBLISHED_NOINDEX');
  assert(gateResult.errors.some((e) => e.code === 'PLACEHOLDER_CONTENT_NOT_ALLOWED'));
});

// ----------------------------------------------------
// 9. QUALITY GATE: UNSAFE CLAIMS BLOCK
// ----------------------------------------------------
test('Quality Gate: UNVERIFIED_CLAIM presence blocks INDEXABLE promotion', () => {
  const gateResult = evaluateQualityGate({
    regionValid: true,
    intentValid: true,
    routeUnique: true,
    publicRouteUnique: true,
    regionDisambiguationValid: true,
    siteOriginConfigured: true,
    absoluteCanonicalValid: true,
    metadataComplete: true,
    requiredContentComplete: true,
    contentStatus: 'APPROVED',
    unverifiedClaimCount: 2, // 2 unverified claims present
    requiredAssetsReady: true,
    internalLinksValid: true,
    noRegionCollision: true,
  });

  assert.strictEqual(gateResult.isEligibleForIndex, false);
  assert.strictEqual(gateResult.targetState, 'PUBLISHED_NOINDEX');
  assert(gateResult.errors.some((e) => e.code === 'UNVERIFIED_CLAIMS_PRESENT'));
});

// ----------------------------------------------------
// 10. CLAIM GUARD: 3-TIER HIERARCHY
// ----------------------------------------------------
test('Claim Guard: 3-Tier hierarchy validates Category (T1), Metadata (T2), and Lint (T3)', () => {
  const safeClaims = filterProductionSafeClaims(TEST_CLAIMS);
  assert.strictEqual(safeClaims.length, 3);
  assert.strictEqual(assertNoUnverifiedClaims(safeClaims), true);

  // Tier 1 Failure (UNVERIFIED_CLAIM)
  const unverifiedItem = TEST_CLAIMS.find((c) => c.category === 'UNVERIFIED_CLAIM')!;
  const resT1 = validateClaimSafety(unverifiedItem);
  assert.strictEqual(resT1.isSafe, false);
  assert.strictEqual(resT1.tierFailed, 1);

  // Tier 2 Failure (VERIFIED_FACT without documented sourceType)
  const missingSourceItem = {
    id: 't2-missing',
    category: 'VERIFIED_FACT' as const,
    statement: '도막 두께를 1.5mm로 균일하게 도포합니다.',
    sourceType: 'NONE' as const,
  };
  const resT2 = validateClaimSafety(missingSourceItem);
  assert.strictEqual(resT2.isSafe, false);
  assert.strictEqual(resT2.tierFailed, 2);

  // Tier 3 Failure (Prohibited phrase lint)
  const falseCausalItem = {
    id: 't3-phrase',
    category: 'GENERAL_GUIDANCE' as const,
    statement: '환기를 주기적으로 하면 곰팡이 100% 방지됩니다.',
  };
  const resT3 = validateClaimSafety(falseCausalItem);
  assert.strictEqual(resT3.isSafe, false);
  assert.strictEqual(resT3.tierFailed, 3);
});

// ----------------------------------------------------
// 11. INVALID URL POLICY
// ----------------------------------------------------
test('Invalid URL: Detects missing, malformed, unknown region, unknown intent', () => {
  assert.strictEqual(validateDynamicRoute('', TEST_REGIONS).isValid, false);
  assert.strictEqual(validateDynamicRoute('테스트동탄성코트', TEST_REGIONS).isValid, false);
  assert.strictEqual(validateDynamicRoute('부산해운대-탄성코트', TEST_REGIONS).isValid, false);
  assert.strictEqual(validateDynamicRoute('테스트동-줄눈시공', TEST_REGIONS).isValid, false);

  const valid = validateDynamicRoute('테스트동-탄성코트', TEST_REGIONS);
  assert.strictEqual(valid.isValid, true);
  assert.strictEqual(valid.region?.displayName, '테스트동');
  assert.strictEqual(valid.intent?.serviceKeyword, '탄성코트');
});

// ----------------------------------------------------
// 12. IMAGE REGISTRY PRODUCTION & SERP ASSET READINESS
// ----------------------------------------------------
test('Image Registry: All Required assets including SERP_CANDIDATE are READY in Phase 3-E1', () => {
  // Phase 3-C: All 6 Main Page Visual Assets are READY with real user files
  const mainVisualReadiness = evaluateMainVisualReadiness(INITIAL_IMAGE_REGISTRY);
  assert.strictEqual(mainVisualReadiness.isReady, true);
  assert.strictEqual(mainVisualReadiness.waitingSlots.length, 0);

  // Phase 3-E1: Full site production readiness passes with SERP_CANDIDATE ready
  const fullReadiness = evaluateImageProductionReadiness(INITIAL_IMAGE_REGISTRY);
  assert.strictEqual(fullReadiness.isReady, true);
  assert.strictEqual(fullReadiness.missingRequiredSlots.length, 0);

  const serpSlot = INITIAL_IMAGE_REGISTRY.find((s) => s.id === 'SERP_CANDIDATE');
  assert.strictEqual(serpSlot?.status, 'READY');
  assert.strictEqual(serpSlot?.src, '/images/allcare/og-thumbnail.jpg');

  // Verify regression guard: If any REQUIRED slot reverts to WAITING, production readiness fails
  const revertedSlots: ImageAssetSlot[] = INITIAL_IMAGE_REGISTRY.map((slot) => {
    if (slot.id === 'SERP_CANDIDATE') {
      return { ...slot, status: 'WAITING_FOR_USER_ASSET', src: undefined };
    }
    return slot;
  });
  const revertedReadiness = evaluateImageProductionReadiness(revertedSlots);
  assert.strictEqual(revertedReadiness.isReady, false);
  assert(revertedReadiness.missingRequiredSlots.includes('SERP_CANDIDATE'));
});

// ----------------------------------------------------
// 12-B. BEFORE & AFTER PAIR COMPLETENESS IN PRODUCTION
// ----------------------------------------------------
test('Before & After: Production policy hides incomplete single-sided cases', () => {
  // Scenario 1: Case 01 both ready, Case 02 only Before ready (After missing), Case 03 waiting
  const partiallyReadyRegistry: ImageAssetSlot[] = INITIAL_IMAGE_REGISTRY.map((slot) => {
    if (slot.id === 'BEFORE_AFTER_01_BEFORE' || slot.id === 'BEFORE_AFTER_01_AFTER') {
      return { ...slot, status: 'READY', src: '/img/ba-1.webp' };
    }
    if (slot.id === 'BEFORE_AFTER_02_BEFORE') {
      return { ...slot, status: 'READY', src: '/img/ba-2-before.webp' };
    }
    if (slot.id === 'BEFORE_AFTER_02_AFTER' || slot.id.startsWith('BEFORE_AFTER_03')) {
      return { ...slot, status: 'WAITING_FOR_USER_ASSET', src: undefined };
    }
    return slot;
  });

  const prodCases = evaluateBeforeAfterCases(partiallyReadyRegistry, true);
  const case01 = prodCases.find((c) => c.caseId === 'case-01');
  const case02 = prodCases.find((c) => c.caseId === 'case-02');
  const case03 = prodCases.find((c) => c.caseId === 'case-03');

  assert.strictEqual(case01?.isCaseActive, true);
  assert.strictEqual(case02?.isCaseActive, false); // Hidden because only Before is ready!
  assert.strictEqual(case03?.isCaseActive, false); // Hidden because both are waiting

  // In development, all cases can show with placeholders
  const devCases = evaluateBeforeAfterCases(partiallyReadyRegistry, false);
  assert.strictEqual(devCases.every((c) => c.isCaseActive), true);

  // Scenario 2: With current actual INITIAL_IMAGE_REGISTRY, all 3 cases are READY and active
  const actualProdCases = evaluateBeforeAfterCases(INITIAL_IMAGE_REGISTRY, true);
  assert.strictEqual(actualProdCases.every((c) => c.isCaseActive), true);
});

// ----------------------------------------------------
// 13. SITE CONFIG & CONTACT SAFETY (PHASE 3-E1)
// ----------------------------------------------------
test('Site Config: Official business and phone configured while pending channels remain safe', () => {
  // Official information provided by user in Phase 3-E1
  assert.strictEqual(SITE_CONFIG.brandName, '올케어');
  assert.strictEqual(SITE_CONFIG.brandNameEn, 'ALLCARE');
  assert.strictEqual(SITE_CONFIG.businessName, '올케어서비스');
  assert.strictEqual(SITE_CONFIG.representativeName, '김재현');
  assert.strictEqual(SITE_CONFIG.businessNumber, '405-15-02677');
  assert.strictEqual(SITE_CONFIG.phone, '010-8492-6900');
  assert.strictEqual(SITE_CONFIG.phoneHref, 'tel:01084926900');

  // Safety invariants: Kakao is strictly null until user provides real URL
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, null);
  assert.strictEqual(SITE_CONFIG.address, null);

  // Phone is active, so isContactConfigured is true
  assert.strictEqual(isContactConfigured(), true);
});

// ----------------------------------------------------
// 14. PRODUCTION DATASET PILOT INTEGRITY (PHASE 5-B2A)
// ----------------------------------------------------
test('Production Dataset Policy: Production regions array has exactly 318 regions (25 Seoul GUs + 293 DONGs)', () => {
  assert.strictEqual(PRODUCTION_REGIONS.length, 318);
  const ids = PRODUCTION_REGIONS.map((r) => r.id);
  assert(ids.includes('seoul-eunpyeong-gu'));
  assert(ids.includes('seoul-eunpyeong-bulgwang'));
  assert(ids.includes('seoul-eunpyeong-sinsa'));

  const guRegions = PRODUCTION_REGIONS.filter((r) => r.regionType === 'GU');
  assert.strictEqual(guRegions.length, 25);
  const dongRegions = PRODUCTION_REGIONS.filter((r) => r.regionType === 'DONG');
  assert.strictEqual(dongRegions.length, 293);

  // All 318 regions are PUBLISHED_NOINDEX and not service area approved
  for (const r of PRODUCTION_REGIONS) {
    assert.strictEqual(r.source, 'production');
    assert.strictEqual(r.rolloutStage, 'pilot');
    assert.strictEqual(r.isSyntheticFixture, false);
    assert.strictEqual(r.publicationState, 'PUBLISHED_NOINDEX');
    assert.strictEqual(r.isServiceAreaApproved, false);
  }
});

// ----------------------------------------------------
// 15. OFFICIAL LOGO & FAVICON INTEGRITY (PHASE 3-E2)
// ----------------------------------------------------
test('Official Logo & Favicon: Master official logo present and all wrong asset variants removed', () => {
  const officialLogoPath = path.resolve('public/images/allcare/official-allcare-logo.png');
  assert(fs.existsSync(officialLogoPath), 'official-allcare-logo.png must exist');
  assert(fs.statSync(officialLogoPath).size > 100000, 'official-allcare-logo.png must be master high-res');

  // Verify all wrong synthesized/extracted assets are eradicated
  const forbiddenAssets = [
    'public/images/allcare/logo-symbol.png',
    'public/images/allcare/logo-horizontal.png',
    'public/images/allcare/logo-solid.png',
    'public/images/allcare/logo.png',
  ];
  for (const forbidden of forbiddenAssets) {
    assert(!fs.existsSync(path.resolve(forbidden)), `Forbidden asset ${forbidden} must not exist`);
  }

  // Verify favicons and app icon exist
  assert(fs.existsSync(path.resolve('public/favicon.ico')), 'public/favicon.ico must exist');
  assert(fs.existsSync(path.resolve('app/favicon.ico')), 'app/favicon.ico must exist');
  assert(fs.existsSync(path.resolve('public/apple-touch-icon.png')), 'apple-touch-icon.png must exist');
  assert(fs.existsSync(path.resolve('public/icon-192.png')), 'icon-192.png must exist');
  assert(fs.existsSync(path.resolve('public/icon-512.png')), 'icon-512.png must exist');
});

// ----------------------------------------------------
// 16. OFFICIAL HORIZONTAL SIGNATURE LOGO (PHASE 3-E3)
// ----------------------------------------------------
test('Official Horizontal Signature: Master horizontal source and transparent derivative present', () => {
  const sourcePath = path.resolve('public/images/allcare/official-horizontal-logo-source.png');
  const transparentPath = path.resolve('public/images/allcare/allcare-signature.png');

  assert(fs.existsSync(sourcePath), 'official-horizontal-logo-source.png must exist');
  assert(fs.statSync(sourcePath).size > 100000, 'source must be high-res');

  assert(fs.existsSync(transparentPath), 'allcare-signature.png must exist');
  assert(fs.statSync(transparentPath).size > 10000, 'derivative must be valid');
});

// ----------------------------------------------------
// 17. DYNAMIC ENGINE: 6 INTENTS RESOLUTION & EXACT KEYWORD PREFIX
// ----------------------------------------------------
test('Dynamic Engine: All 6 intents resolve cleanly and strictly prefix Title, Description, H1', () => {
  const activeRegions = getActiveRegions(true);
  const testRegion = activeRegions.find((r) => r.keywordRegionName === '테스트동')!;
  assert(testRegion, 'Test region 테스트동 must exist in activeRegions');

  for (const intent of SEARCH_INTENTS) {
    const rawKey = `${testRegion.keywordRegionName}-${intent.serviceKeyword}`;
    const validation = validateDynamicRoute(rawKey, activeRegions);

    assert.strictEqual(validation.isValid, true, `Route ${rawKey} must be valid`);
    assert.strictEqual(validation.region?.keywordRegionName, '테스트동');
    assert.strictEqual(validation.intent?.id, intent.id);

    const exactKeyword = `${testRegion.keywordRegionName} ${intent.serviceKeyword}`;
    const meta = buildDynamicMetadata(testRegion, intent);

    // Title Prefix Contract
    assert(typeof meta.title === 'string', 'Title must be string');
    assert(
      meta.title!.startsWith(exactKeyword),
      `Title for ${intent.serviceKeyword} must start with "${exactKeyword}", got "${meta.title}"`
    );

    // Description Prefix Contract
    assert(typeof meta.description === 'string', 'Description must be string');
    assert(
      meta.description!.startsWith(exactKeyword),
      `Description for ${intent.serviceKeyword} must start with "${exactKeyword}", got "${meta.description}"`
    );

    // H1 Contract
    const h1 = intent.h1Template(testRegion.keywordRegionName);
    assert.strictEqual(h1, exactKeyword, `H1 must exactly equal "${exactKeyword}"`);

    // Hero Intro contains exact dynamic keyword
    const heroIntro = intent.heroIntroTemplate(testRegion.keywordRegionName);
    assert(
      heroIntro.startsWith(exactKeyword),
      `Hero Intro must start with exact keyword "${exactKeyword}", got "${heroIntro}"`
    );
  }
});

// ----------------------------------------------------
// 18. DYNAMIC ENGINE: 5 UNIQUE FAQS PER INTENT (30 DISTINCT FAQS)
// ----------------------------------------------------
test('Dynamic Engine: Each intent contains exactly 5 distinct, verified FAQ items (30 total)', () => {
  const allQuestionIds = new Set<string>();
  const allQuestions = new Set<string>();

  for (const intent of SEARCH_INTENTS) {
    assert.strictEqual(
      intent.faqItems.length,
      5,
      `Intent ${intent.serviceKeyword} must have exactly 5 FAQ items, got ${intent.faqItems.length}`
    );

    for (const faq of intent.faqItems) {
      assert(faq.id.length > 0, 'FAQ ID must not be empty');
      assert(faq.question.length > 10, 'FAQ Question must be substantial');
      assert(faq.answer.length > 15, 'FAQ Answer must be substantial');

      assert(!allQuestionIds.has(faq.id), `Duplicate FAQ ID: ${faq.id}`);
      assert(!allQuestions.has(faq.question), `Duplicate FAQ Question: ${faq.question}`);

      allQuestionIds.add(faq.id);
      allQuestions.add(faq.question);
    }
  }

  assert.strictEqual(allQuestions.size, 30, 'Total unique FAQs across 6 intents must be exactly 30');
});

// ----------------------------------------------------
// 19. DYNAMIC ENGINE: INVALID ROUTE 404 DETECTION
// ----------------------------------------------------
test('Dynamic Engine: Invalid routes (unknown region, unknown intent, malformed, empty) fail strictly', () => {
  const activeRegions = getActiveRegions(true);

  // 1. Unknown Region
  const resUnknownRegion = validateDynamicRoute('미등록동-탄성코트', activeRegions);
  assert.strictEqual(resUnknownRegion.isValid, false);
  assert.strictEqual(resUnknownRegion.error, 'UNKNOWN_REGION');

  // 2. Unknown Intent
  const resUnknownIntent = validateDynamicRoute('테스트동-미등록키워드', activeRegions);
  assert.strictEqual(resUnknownIntent.isValid, false);
  assert.strictEqual(resUnknownIntent.error, 'UNKNOWN_INTENT');

  // 3. Malformed Key (no hyphen separator)
  const resMalformed = validateDynamicRoute('테스트동탄성코트', activeRegions);
  assert.strictEqual(resMalformed.isValid, false);
  assert.strictEqual(resMalformed.error, 'MALFORMED_KEY');

  // 4. Empty Key
  const resEmpty = validateDynamicRoute('', activeRegions);
  assert.strictEqual(resEmpty.isValid, false);
  assert.strictEqual(resEmpty.error, 'MISSING_KEY');
});

// ----------------------------------------------------
// 20. DYNAMIC ENGINE: ROBOTS NOINDEX & JSON-LD INTEGRITY
// ----------------------------------------------------
test('Dynamic Engine: Test fixture pages emit NOINDEX and valid JSON-LD schemas', () => {
  const activeRegions = getActiveRegions(true);
  const testRegion = activeRegions.find((r) => r.keywordRegionName === '테스트동')!;
  const testIntent = SEARCH_INTENTS[0];

  // Test fixture must be NOINDEX
  const meta = buildDynamicMetadata(testRegion, testIntent, null);
  assert.deepStrictEqual(meta.robots, { index: false, follow: false, nocache: true });

  // JSON-LD schemas: Service, BreadcrumbList, FAQPage
  const jsonLd = buildDynamicJsonLd(testRegion, testIntent, TEST_RESERVED_PRODUCTION_ORIGIN);
  assert.strictEqual(jsonLd.length, 3);

  const [serviceSchema, breadcrumbSchema, faqSchema] = jsonLd as unknown as [
    { '@type': string; name: string; provider: { '@type': string; name: string; legalName: string; telephone?: string } },
    { '@type': string; itemListElement: { name: string; item?: string }[] },
    { '@type': string; mainEntity: unknown[] }
  ];
  assert.strictEqual(serviceSchema['@type'], 'Service');
  assert.strictEqual(serviceSchema.name, '테스트동 탄성코트');
  assert.strictEqual(serviceSchema.provider['@type'], 'Organization');
  assert.strictEqual(serviceSchema.provider.name, '올케어');
  assert.strictEqual(serviceSchema.provider.legalName, '올케어서비스');
  assert.strictEqual(serviceSchema.provider.telephone, '010-8492-6900');

  // Breadcrumb strictly 2 items per Phase 4-A2 Section 13
  assert.strictEqual(breadcrumbSchema['@type'], 'BreadcrumbList');
  assert.strictEqual(breadcrumbSchema.itemListElement.length, 2);
  assert.strictEqual(breadcrumbSchema.itemListElement[0].name, '홈');
  assert.strictEqual(breadcrumbSchema.itemListElement[1].name, '테스트동 탄성코트');

  assert.strictEqual(faqSchema['@type'], 'FAQPage');
  assert.strictEqual(faqSchema.mainEntity.length, 5);
});

// ----------------------------------------------------
// 21. BUSINESS SSOT CONTRACT TEST (Phase 4-A2)
// ----------------------------------------------------
test('Business SSOT: Official values locked across SiteConfig and dynamic providers', () => {
  assert.strictEqual(SITE_CONFIG.brandName, '올케어');
  assert.strictEqual(SITE_CONFIG.businessName, '올케어서비스');
  assert.strictEqual(SITE_CONFIG.representativeName, '김재현');
  assert.strictEqual(SITE_CONFIG.businessNumber, '405-15-02677');
  assert.strictEqual(SITE_CONFIG.phone, '010-8492-6900');
  assert.strictEqual(SITE_CONFIG.phoneHref, 'tel:01084926900');
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, null);
  assert.strictEqual(SITE_CONFIG.asPolicy, null);
});

// ----------------------------------------------------
// 22. CLAIM GUARD EXTENSION: BANNED UNVERIFIED CLAIMS AUDIT (Phase 4-A2)
// ----------------------------------------------------
test('Claim Guard Extension: Zero unverified performance, warranty, or direct team claims in intents', () => {
  const BANNED_TERMS = [
    '결로 방지',
    '결로 해결',
    '결로 저항성',
    '곰팡이 방지',
    '곰팡이 재발 방지',
    '곰팡이 차단',
    '단열',
    '단열 세라믹',
    '고단열',
    '세라믹 성능',
    '친환경 시험성적',
    '친환경 등급',
    '열기 저항성',
    '부식 방지',
    '오염 차단',
    '1년 내 박리',
    '무상 하자 점검',
    '직영팀',
    '본사 직영팀',
    '직영 책임시공',
    '하청 없음',
    'A/S 보장',
    '공식 AS',
    '정밀 분사',
    '균일 도막 보장',
    '특정 압력',
    '특정 도막 두께',
  ];

  for (const intent of SEARCH_INTENTS) {
    const textPool: string[] = [
      intent.titleTemplate('테스트동'),
      intent.descriptionTemplate('테스트동'),
      intent.h1Template('테스트동'),
      intent.heroIntroTemplate('테스트동'),
      intent.userIntent,
      intent.primaryProblem,
      ...intent.decisionTopics,
      ...intent.faqItems.map((f) => f.question),
      ...intent.faqItems.map((f) => f.answer),
    ];

    for (const text of textPool) {
      for (const banned of BANNED_TERMS) {
        assert(
          !text.includes(banned),
          `Intent [${intent.serviceKeyword}] contains banned claim [${banned}] in: "${text}"`
        );
      }
    }
  }
});

// ----------------------------------------------------
// 23. REGION DISPLAY POLICY TEST (Phase 4-A2)
// ----------------------------------------------------
test('Region Display Policy: Public Breadcrumb & Schema do not expose parent administrative hierarchy', () => {
  const activeRegions = getActiveRegions(true);
  const testRegion = activeRegions.find((r) => r.keywordRegionName === '테스트동')!;
  const testIntent = SEARCH_INTENTS[0];

  const jsonLd = buildDynamicJsonLd(testRegion, testIntent, TEST_RESERVED_PRODUCTION_ORIGIN);
  const [, breadcrumbSchema] = jsonLd as unknown as [
    unknown,
    { itemListElement: { name: string }[] }
  ];

  // Breadcrumb Schema must have only 2 items: 홈, 테스트동 탄성코트
  assert.strictEqual(breadcrumbSchema.itemListElement.length, 2);
  const names = breadcrumbSchema.itemListElement.map((e) => e.name);
  assert(names.includes('홈'));
  assert(names.includes('테스트동 탄성코트'));

  // Must NOT expose parent hierarchy (e.g. 테스트시, 테스트구, 서울특별시, 강남구) in Breadcrumb
  assert(!names.some((n) => n.includes('테스트특별시')));
  assert(!names.some((n) => n.includes('테스트구')));
  assert(!names.some((n) => n.includes('서울특별시')));
  assert(!names.some((n) => n.includes('강남구')));
});

// ----------------------------------------------------
// 24. STRUCTURED DATA SAFETY: PROVIDER IS STRICTLY ORGANIZATION (Phase 4-A3)
// ----------------------------------------------------
test('Structured Data Safety: Provider is Organization and LocalBusiness subtypes are banned without address', () => {
  const activeRegions = getActiveRegions(true);
  const testRegion = activeRegions.find((r) => r.keywordRegionName === '테스트동')!;
  const testIntent = SEARCH_INTENTS[0];

  const jsonLd = buildDynamicJsonLd(testRegion, testIntent, TEST_RESERVED_PRODUCTION_ORIGIN);
  const [serviceSchema] = jsonLd as unknown as [
    { '@type': string; provider: { '@type': string; name: string; legalName: string; telephone?: string; address?: unknown } }
  ];

  // Invariant A: When address is null, LocalBusiness subtypes are strictly banned
  assert.strictEqual(SITE_CONFIG.address, null, 'SITE_CONFIG.address must be null in current phase');
  const BANNED_LOCAL_BUSINESS_TYPES = [
    'LocalBusiness',
    'HomeAndConstructionBusiness',
    'HousePainter',
    'GeneralContractor',
    'ProfessionalService',
  ];
  assert(!BANNED_LOCAL_BUSINESS_TYPES.includes(serviceSchema.provider['@type']));
  assert.strictEqual(serviceSchema.provider['@type'], 'Organization');

  // Invariant B: Address field must NOT exist when address is null
  assert.strictEqual(serviceSchema.provider.address, undefined);

  // Invariant C: Provider fields derive strictly from SITE_CONFIG
  assert.strictEqual(serviceSchema.provider.name, SITE_CONFIG.brandName);
  assert.strictEqual(serviceSchema.provider.legalName, SITE_CONFIG.businessName);
  assert.strictEqual(serviceSchema.provider.telephone, SITE_CONFIG.phone);
});

// ----------------------------------------------------
// 25. STRUCTURED DATA AREA SERVED GATE: PRODUCTION VS FIXTURE (Phase 4-A3 & Phase 6-A2)
// ----------------------------------------------------
test('Area Served Gate: Differentiates production requirements from fixture rules', () => {
  const activeRegions = getActiveRegions(true);
  const fixtureRegion = activeRegions.find((r) => r.keywordRegionName === '테스트동')!;
  assert.strictEqual(fixtureRegion.isSyntheticFixture, true, 'Fixture region must have isSyntheticFixture=true');
  assert.strictEqual(fixtureRegion.source, 'fixture', 'Fixture region must have source=fixture');

  // 1. Fixture rule: permitted in development / test (!isProduction)
  assert.strictEqual(shouldEmitAreaServed(fixtureRegion, false), true);
  // Fixture blocked in production build
  assert.strictEqual(shouldEmitAreaServed(fixtureRegion, true), false);

  // 2. Production Region Gate Rules:
  // Case A: APPROVED + PUBLISHED_NOINDEX + serviceAreaApproved false => areaServed undefined
  const unapprovedProdRegion = {
    id: 'prod-gangnam-samseong',
    regionType: 'DONG' as const,
    canonicalName: '서울특별시 강남구 삼성동',
    displayName: '삼성동',
    keywordRegionName: '삼성동',
    routeKey: '삼성동',
    sido: '서울',
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED' as const,
    source: 'production' as const,
    isSyntheticFixture: false,
    rolloutStage: 'pilot' as const,
    publicationState: 'PUBLISHED_NOINDEX' as const,
    isServiceAreaApproved: false, // NOT approved
  };
  assert.strictEqual(shouldEmitAreaServed(unapprovedProdRegion, true, 'APPROVED'), false);

  // Case B: APPROVED + INDEXABLE + serviceAreaApproved false => areaServed undefined
  const unapprovedAreaIndexable = {
    ...unapprovedProdRegion,
    publicationState: 'INDEXABLE' as const,
    isServiceAreaApproved: false,
  };
  assert.strictEqual(shouldEmitAreaServed(unapprovedAreaIndexable, true, 'APPROVED'), false);

  // Case C: APPROVED + INDEXABLE + serviceAreaApproved true => areaServed allowed
  const approvedProdRegion = {
    ...unapprovedProdRegion,
    publicationState: 'INDEXABLE' as const,
    isServiceAreaApproved: true,
  };
  assert.strictEqual(shouldEmitAreaServed(approvedProdRegion, true, 'APPROVED'), true);

  // Case D: COLLISION_HOLD => areaServed forbidden even if INDEXABLE and serviceAreaApproved true
  const collisionHoldRegion = {
    ...approvedProdRegion,
    disambiguationStatus: 'REQUIRES_DISAMBIGUATION' as const,
  };
  assert.strictEqual(shouldEmitAreaServed(collisionHoldRegion, true, 'COLLISION_HOLD'), false);

  // 3. Schema emission test:
  // When shouldEmitAreaServed is false, areaServed is omitted from Service schema
  const jsonLdWithoutArea = buildDynamicJsonLd(unapprovedProdRegion, SEARCH_INTENTS[0], TEST_RESERVED_PRODUCTION_ORIGIN);
  const [serviceWithoutArea] = jsonLdWithoutArea as unknown as [{ areaServed?: unknown }];
  assert.strictEqual(serviceWithoutArea.areaServed, undefined);
});

// ----------------------------------------------------
// 26. 6 INTENTS FINAL DIFFERENTIATION CONTRACT (Phase 4-B)
// ----------------------------------------------------
test('Intent Differentiation: All 6 intents feature distinct searcher questions, H2s, descriptions, and decision topics', () => {
  const testRegion = '테스트동';
  const questions = new Set<string>();
  const h2s = new Set<string>();
  const descriptions = new Set<string>();
  const problems = new Set<string>();

  for (const intent of SEARCH_INTENTS) {
    // 1. Searcher Question is defined and unique
    assert(intent.searcherQuestion, `Intent [${intent.serviceKeyword}] must have searcherQuestion`);
    assert(!questions.has(intent.searcherQuestion), `Duplicate question: ${intent.searcherQuestion}`);
    questions.add(intent.searcherQuestion);

    // 2. Problem H2 is defined and unique
    assert(intent.problemH2Template, `Intent [${intent.serviceKeyword}] must have problemH2Template`);
    const h2 = intent.problemH2Template(testRegion);
    assert(!h2s.has(h2), `Duplicate H2: ${h2}`);
    h2s.add(h2);

    // 3. Description is unique and starts with Exact Dynamic Keyword
    const desc = intent.descriptionTemplate(testRegion);
    assert(!descriptions.has(desc), `Duplicate description: ${desc}`);
    descriptions.add(desc);
    assert(desc.startsWith(`${testRegion} ${intent.serviceKeyword}`));

    // 4. Primary Problem is unique
    assert(!problems.has(intent.primaryProblem), `Duplicate primary problem: ${intent.primaryProblem}`);
    problems.add(intent.primaryProblem);

    // 5. Decision topics has exactly 3 substantial items
    assert.strictEqual(intent.decisionTopics.length, 3);
  }

  assert.strictEqual(questions.size, 6);
  assert.strictEqual(h2s.size, 6);
  assert.strictEqual(descriptions.size, 6);
  assert.strictEqual(problems.size, 6);
});

// ----------------------------------------------------
// 28. SERVICE KEYWORDS CONTRACT: EXACT 6 KEYWORDS ONLY
// ----------------------------------------------------
test('Service Keywords Contract: Exactly 6 keywords matching official AllCare scope', () => {
  assert.strictEqual(SERVICE_KEYWORDS.length, 6);

  const EXPECTED_SERVICE_KEYWORDS = [
    '탄성코트',
    '탄성코트시공',
    '베란다탄성코트',
    '세탁실탄성코트',
    '아파트탄성코트',
    '탄성코트업체',
  ];

  assert.deepStrictEqual([...SERVICE_KEYWORDS], EXPECTED_SERVICE_KEYWORDS);

  const UNKNOWN_FORBIDDEN_KEYWORDS = [
    '베란다곰팡이',
    '결로방지페인트',
    '곰팡이방지페인트',
  ];

  for (const unknown of UNKNOWN_FORBIDDEN_KEYWORDS) {
    assert(
      !SERVICE_KEYWORDS.some((kw) => (kw as string) === unknown),
      `Forbidden/unknown keyword detected: ${unknown}`
    );
    assert(
      !SEARCH_INTENTS.some((i) => (i.serviceKeyword as string) === unknown),
      `Forbidden/unknown keyword in SEARCH_INTENTS: ${unknown}`
    );
  }
});

// ----------------------------------------------------
// 28. REGION DATASET VALIDATOR: VALID 3-PILOT DATASET (Phase 4-C1)
// ----------------------------------------------------
test('Region Dataset Validator: Correctly audits valid production pilot dataset (3 regions x 6 intents = 18 URLs)', () => {
  const samplePilotDataset = [
    {
      id: 'pilot-region-a',
      regionType: 'DONG' as const,
      canonicalName: '파일럿시 일반동',
      displayName: '일반동',
      keywordRegionName: '일반동',
      routeKey: '일반동',
      sido: '경기',
      sigugun: '파일럿시',
      dong: '일반동',
      nearbyRegionIds: [],
      disambiguationStatus: 'NOT_REQUIRED' as const,
      source: 'production' as const,
      rolloutStage: 'pilot' as const,
      isSyntheticFixture: false,
      publicationState: 'PUBLISHED_NOINDEX' as const,
      isServiceAreaApproved: false,
    },
    {
      id: 'pilot-region-b',
      regionType: 'DONG' as const,
      canonicalName: '파일럿시 특정동',
      displayName: '특정동',
      keywordRegionName: '파일럿특정동',
      routeKey: 'pilot-teukjeong',
      sido: '경기',
      sigugun: '파일럿시',
      dong: '특정동',
      nearbyRegionIds: [],
      disambiguationKey: 'pilot',
      disambiguationStatus: 'APPROVED' as const,
      source: 'production' as const,
      rolloutStage: 'pilot' as const,
      isSyntheticFixture: false,
      publicationState: 'PUBLISHED_NOINDEX' as const,
      isServiceAreaApproved: false,
    },
    {
      id: 'pilot-region-c',
      regionType: 'DONG' as const,
      canonicalName: '파일럿시 영업동',
      displayName: '영업동',
      keywordRegionName: '영업동',
      routeKey: '영업동',
      sido: '경기',
      sigugun: '파일럿시',
      dong: '영업동',
      nearbyRegionIds: [],
      disambiguationStatus: 'NOT_REQUIRED' as const,
      source: 'production' as const,
      rolloutStage: 'pilot' as const,
      isSyntheticFixture: false,
      publicationState: 'PUBLISHED_NOINDEX' as const,
      isServiceAreaApproved: false,
    },
  ];

  const report = validateRegionDataset(samplePilotDataset, TEST_RESERVED_PRODUCTION_ORIGIN);
  assert.strictEqual(report.isValid, true);
  assert.strictEqual(report.regionCount, 3);
  assert.strictEqual(report.expectedUrlCount, 18);
  assert.strictEqual(report.intentCount, 6);
  assert.strictEqual(report.errors.length, 0);
  assert.strictEqual(report.summary.canonicalReady, true);
});

// ----------------------------------------------------
// 29. REGION DATASET VALIDATOR: ERROR DETECTION (Phase 4-C1)
// ----------------------------------------------------
test('Region Dataset Validator: Detects duplicate IDs, route collisions, dynamic key collisions, invalid parent, and unapproved disambiguation', () => {
  const invalidDataset = [
    {
      id: 'region-dup',
      regionType: 'DONG' as const,
      canonicalName: '지역 A 중앙동',
      displayName: '중앙동',
      keywordRegionName: '중앙동', // Collision with next
      routeKey: 'jungang',        // Collision with next
      sido: '경기',
      nearbyRegionIds: [],
      disambiguationStatus: 'NOT_REQUIRED' as const,
      source: 'production' as const,
      rolloutStage: 'pilot' as const,
      isSyntheticFixture: false,
      publicationState: 'PUBLISHED_NOINDEX' as const,
    },
    {
      id: 'region-dup', // Duplicate ID
      regionType: 'DONG' as const,
      canonicalName: '지역 B 중앙동',
      displayName: '중앙동',
      keywordRegionName: '중앙동', // Collides with above
      routeKey: 'jungang',        // Collides with above
      sido: '강원',
      parentRegionId: 'non-existent-parent', // Orphaned parent
      nearbyRegionIds: [],
      disambiguationStatus: 'REQUIRES_DISAMBIGUATION' as const,
      source: 'production' as const,
      rolloutStage: 'pilot' as const,
      isSyntheticFixture: false,
      publicationState: 'INDEXABLE' as const, // Blocks INDEXABLE due to disambiguation
    },
  ];

  const report = validateRegionDataset(invalidDataset, null);
  assert.strictEqual(report.isValid, false);
  assert(report.errors.some((e) => e.code === 'DUPLICATE_REGION_ID'));
  assert(report.errors.some((e) => e.code === 'DUPLICATE_ROUTE_KEY'));
  assert(report.errors.some((e) => e.code === 'DYNAMIC_KEY_COLLISION'));
  assert(report.errors.some((e) => e.code === 'INVALID_PARENT_REGION'));
  assert(report.errors.some((e) => e.code === 'DISAMBIGUATION_PENDING_INDEXABLE_BLOCKED'));
});

// ----------------------------------------------------
// 30. PRODUCTION PILOT VALIDATOR (Phase 5-B2A)
// ----------------------------------------------------
test('Production Pilot: validateRegionDataset passes actual PRODUCTION_REGIONS with 0 errors and 1908 expected URLs', () => {
  const report = validateRegionDataset(PRODUCTION_REGIONS, TEST_RESERVED_PRODUCTION_ORIGIN);

  assert.strictEqual(report.isValid, true);
  assert.strictEqual(report.regionCount, 318);
  assert.strictEqual(report.expectedUrlCount, 1908);
  assert.strictEqual(report.intentCount, 6);
  assert.strictEqual(report.errors.length, 0);
  assert.strictEqual(report.summary.duplicateRegionIds.length, 0);
  assert.strictEqual(report.summary.duplicateRoutes.length, 0);
  assert.strictEqual(report.summary.duplicateDynamicKeys.length, 0);
  assert.strictEqual(report.summary.invalidParents.length, 0);
  assert.strictEqual(report.summary.invalidRegionTypes.length, 0);
});

// ----------------------------------------------------
// 31. URL STRUCTURE ASSERTION (Phase 4-C2 Section 28)
// ----------------------------------------------------
test('URL Structure Assertion: DONG Region Public URL does not prepend Parent GU or SIDO', () => {
  const bulgwang = PRODUCTION_REGIONS.find((r) => r.id === 'seoul-eunpyeong-bulgwang')!;
  const sinsa = PRODUCTION_REGIONS.find((r) => r.id === 'seoul-eunpyeong-sinsa')!;

  assert(bulgwang && sinsa, 'Bulgwang and Sinsa regions must exist');

  for (const intent of SEARCH_INTENTS) {
    const bulgwangKey = buildDynamicKey(bulgwang.keywordRegionName, intent.serviceKeyword);
    const sinsaKey = buildDynamicKey(sinsa.keywordRegionName, intent.serviceKeyword);

    // Expected public keys: {동}-{작업명}
    assert.strictEqual(bulgwangKey, `불광동-${intent.serviceKeyword}`);
    assert.strictEqual(sinsaKey, `신사동-${intent.serviceKeyword}`);

    // Forbidden patterns: parent GU or SIDO must NEVER be prepended
    assert(!bulgwangKey.includes('은평구-불광동'), `Forbidden parent-child key: ${bulgwangKey}`);
    assert(!sinsaKey.includes('은평구-신사동'), `Forbidden parent-child key: ${sinsaKey}`);
    assert(!bulgwangKey.includes('서울-'), `Forbidden SIDO key: ${bulgwangKey}`);
    assert(!sinsaKey.includes('서울-'), `Forbidden SIDO key: ${sinsaKey}`);

    const bulgwangHref = buildPublicHref(bulgwang.keywordRegionName, intent.serviceKeyword);
    assert.strictEqual(bulgwangHref, `/?k=${encodeURIComponent(`불광동-${intent.serviceKeyword}`)}`);
  }
});

// ----------------------------------------------------
// 32. SINSA FUTURE COLLISION GUARD (Phase 4-C2 Section 29)
// ----------------------------------------------------
test('Sinsa Future Collision Guard: Injected duplicate Sinsa-dong triggers DYNAMIC_KEY_COLLISION', () => {
  const duplicateSinsaDataset = [
    ...PRODUCTION_REGIONS,
    {
      id: 'seoul-gangnam-sinsa', // A second Sinsa-dong in Gangnam-gu
      regionType: 'DONG' as const,
      parentRegionId: 'seoul',
      canonicalName: '서울특별시 강남구 신사동',
      displayName: '신사동',
      keywordRegionName: '신사동', // COLLISION with eunpyeong sinsa!
      routeKey: 'gangnam-sinsa',
      sido: '서울',
      sigugun: '강남구',
      dong: '신사동',
      nearbyRegionIds: [],
      disambiguationKey: 'gangnam',
      disambiguationStatus: 'REQUIRES_DISAMBIGUATION' as const,
      source: 'production' as const,
      rolloutStage: 'pilot' as const,
      isSyntheticFixture: false,
      publicationState: 'PUBLISHED_NOINDEX' as const,
      isServiceAreaApproved: false,
    },
  ];

  const report = validateRegionDataset(duplicateSinsaDataset, TEST_RESERVED_PRODUCTION_ORIGIN);
  assert.strictEqual(report.isValid, false);
  assert(report.summary.duplicateDynamicKeys.includes('신사동'));
  assert(
    report.errors.some(
      (e) => e.code === 'DYNAMIC_KEY_COLLISION' && e.message.includes('신사동')
    )
  );
});

// ----------------------------------------------------
// 34. MASTER REGION MANIFEST: MATHEMATICAL INVARIANTS & RECONCILED COUNTS LOCK
// ----------------------------------------------------
test('Master Region Manifest: Mathematical Invariants & Reconciled Counts Lock (Phase 5-A4)', () => {
  const counts = getManifestCounts();

  // Invariant A: Total Manifest Records = Sum of Exclusive Final Status Counts
  const exclusiveDongSum =
    counts.approvedDongRecords +
    counts.microReviewRecords +
    counts.specialReviewRecords +
    counts.collisionHoldRecords;
  assert.strictEqual(
    counts.totalDongRecords,
    exclusiveDongSum,
    `Invariant A failed: totalDongRecords (${counts.totalDongRecords}) must equal sum of exclusive status counts (${exclusiveDongSum})`
  );
  assert.strictEqual(counts.totalDongRecords, 425);
  assert.strictEqual(counts.approvedDongRecords, 292);
  assert.strictEqual(counts.microReviewRecords, 119);
  assert.strictEqual(counts.specialReviewRecords, 3);
  assert.strictEqual(counts.collisionHoldRecords, 11);
  assert.strictEqual(counts.totalGuRecords, 25);
  assert.strictEqual(counts.approvedGuRecords, 25);
  assert.strictEqual(counts.totalApprovedRegions, 317);

  // Invariant B: Approved Public Keyword Duplicates = 0
  const approvedRecords = [
    ...SEOUL_GU_MANIFEST_RECORDS.filter((r) => r.includeInApprovedSet),
    ...SEOUL_DONG_MANIFEST_RECORDS.filter((r) => r.includeInApprovedSet),
  ];
  assert.strictEqual(approvedRecords.length, 317);

  const seenKeywords = new Set<string>();
  const duplicateKeywords: string[] = [];
  for (const r of approvedRecords) {
    if (seenKeywords.has(r.publicCandidate)) {
      duplicateKeywords.push(r.publicCandidate);
    }
    seenKeywords.add(r.publicCandidate);
  }
  assert.strictEqual(
    duplicateKeywords.length,
    0,
    `Invariant B failed: Duplicate public keywords in Approved Set: ${duplicateKeywords.join(', ')}`
  );

  // Invariant C: Approved RouteKey Duplicates = 0
  const seenRouteKeys = new Set<string>();
  const duplicateRouteKeys: string[] = [];
  for (const r of approvedRecords) {
    if (seenRouteKeys.has(r.routeKeyCandidate)) {
      duplicateRouteKeys.push(r.routeKeyCandidate);
    }
    seenRouteKeys.add(r.routeKeyCandidate);
  }
  assert.strictEqual(
    duplicateRouteKeys.length,
    0,
    `Invariant C failed: Duplicate routeKeyCandidate in Approved Set: ${duplicateRouteKeys.join(', ')}`
  );

  // Invariant D: Approved URL Count = Approved Public Region Count * 6
  assert.strictEqual(
    counts.totalApprovedRegions * 6,
    1902,
    'Invariant D failed: 317 approved regions * 6 intents must equal 1902 URLs'
  );

  // Invariant E: Collision Group Public Key Count = 5
  const collisionRecords = SEOUL_DONG_MANIFEST_RECORDS.filter(
    (r) => r.collisionStatus === 'HOLD'
  );
  assert.strictEqual(collisionRecords.length, 11);
  const collisionPublicKeys = new Set(collisionRecords.map((r) => r.publicCandidate));
  assert.strictEqual(
    collisionPublicKeys.size,
    5,
    'Invariant E failed: Exactly 5 unique public collision keywords (신사동, 삼성동, 신정동, 신원동, 충정로)'
  );
  assert.deepStrictEqual(
    Array.from(collisionPublicKeys).sort(),
    ['삼성동', '신사동', '신원동', '신정동', '충정로'].sort()
  );

  // Invariant F: No GU+DONG Public URL
  for (const r of SEOUL_DONG_MANIFEST_RECORDS) {
    assert(
      !r.publicCandidate.includes('-'),
      `Invariant F failed: Public candidate cannot contain hyphens: ${r.publicCandidate}`
    );
    assert(
      !r.publicCandidate.startsWith('서울'),
      `Invariant F failed: Public candidate cannot start with SIDO: ${r.publicCandidate}`
    );
    assert(
      !/(강남|강동|강북|강서|관악|광진|구로|금천|노원|도봉|동대문|동작|마포|서대문|서초|성동|성북|송파|양천|영등포|용산|은평|종로구|중랑)구/.test(
        r.publicCandidate
      ),
      `Invariant F failed: Public candidate cannot be synthetic GU+DONG: ${r.publicCandidate}`
    );
  }
});
// ----------------------------------------------------
// PHASE 6-A: CANONICAL QUERY NORMALIZATION & GATES
// ----------------------------------------------------

test('PHASE 6-A: normalizeCanonicalQuery strips tracking parameters, fragments, and duplicate keys', () => {
  // Empty & Root
  assert.strictEqual(normalizeCanonicalQuery(''), '/');
  assert.strictEqual(normalizeCanonicalQuery('/'), '/');
  assert.strictEqual(normalizeCanonicalQuery('  '), '/');

  // Basic query
  const expectedSamsung = `/?k=${encodeURIComponent('삼성동-탄성코트')}`;
  assert.strictEqual(normalizeCanonicalQuery('/?k=삼성동-탄성코트'), expectedSamsung);
  assert.strictEqual(normalizeCanonicalQuery(`/?k=${encodeURIComponent('삼성동-탄성코트')}`), expectedSamsung);

  // Tracking query parameters stripped
  assert.strictEqual(
    normalizeCanonicalQuery('/?k=삼성동-탄성코트&utm_source=naver&utm_medium=cpc&utm_campaign=brand'),
    expectedSamsung
  );
  assert.strictEqual(
    normalizeCanonicalQuery('/?fbclid=IwAR3...&k=삼성동-탄성코트&gclid=CjwKCA...'),
    expectedSamsung
  );

  // Fragments stripped
  assert.strictEqual(
    normalizeCanonicalQuery('/?k=삼성동-탄성코트#faq-section'),
    expectedSamsung
  );
  assert.strictEqual(
    normalizeCanonicalQuery('/?k=삼성동-탄성코트&utm_source=test#contact'),
    expectedSamsung
  );

  // Duplicate k parameters (first one wins)
  assert.strictEqual(
    normalizeCanonicalQuery('/?k=삼성동-탄성코트&k=강남구-탄성코트'),
    expectedSamsung
  );

  // Missing k parameter -> root fallback
  assert.strictEqual(normalizeCanonicalQuery('/?utm_source=naver'), '/');
  assert.strictEqual(normalizeCanonicalQuery('/?fbclid=xyz'), '/');
});

test('PHASE 6-A: Origin Classification & Production Canonical Readiness Matrix', () => {
  // Unconfigured / Empty
  assert.strictEqual(isProductionOriginReady(null), false);
  assert.strictEqual(isProductionOriginReady(undefined), false);
  assert.strictEqual(isProductionOriginReady(''), false);
  assert.strictEqual(isPreviewOriginValid(null), false);

  // Localhost / Loopback
  assert.strictEqual(isProductionOriginReady('http://localhost:3000'), false);
  assert.strictEqual(isProductionOriginReady('https://localhost:3000'), false);
  assert.strictEqual(isProductionOriginReady('http://127.0.0.1:3000'), false);
  assert.strictEqual(isPreviewOriginValid('http://localhost:3000'), true);

  // Preview domains
  assert.strictEqual(isProductionOriginReady('https://allcare-test.vercel.app'), false);
  assert.strictEqual(isProductionOriginReady('https://allcare-preview-build.domain.com'), false);
  assert.strictEqual(isPreviewOriginValid('https://allcare-test.vercel.app'), true);

  // Insecure HTTP domain
  assert.strictEqual(isProductionOriginReady(TEST_RESERVED_INSECURE_ORIGIN), false);
  assert.strictEqual(isPreviewOriginValid(TEST_RESERVED_INSECURE_ORIGIN), true);

  // Valid HTTPS Custom Production Domain (RFC-reserved test domain)
  assert.strictEqual(isProductionOriginReady(TEST_RESERVED_PRODUCTION_ORIGIN), true);
  assert.strictEqual(isPreviewOriginValid(TEST_RESERVED_PRODUCTION_ORIGIN), true);

  // Current SSOT state: UNCONFIGURED
  const ssotOrigin = getPublicationOrigin();
  assert.strictEqual(ssotOrigin.isProductionReady, false, 'Production origin must be unconfigured at Phase 6-A');
  assert.strictEqual(SITE_CONFIG.siteOrigin, null, 'SITE_CONFIG.siteOrigin must be null');
});

test('PHASE 6-A: evaluateProductionCanonicalGate evaluates readiness across origins', () => {
  // Current unconfigured state
  const unconfiguredEval = evaluateProductionCanonicalGate(null, '강남구', '탄성코트');
  assert.strictEqual(unconfiguredEval.isReady, false);
  assert.strictEqual(unconfiguredEval.productionCanonicalReady, false);
  assert.strictEqual(unconfiguredEval.canonicalUrl, null);
  assert(unconfiguredEval.issues.some((i) => i.includes('SITE_ORIGIN_MISSING')));

  // Localhost preview state
  const localhostEval = evaluateProductionCanonicalGate('http://localhost:3000', '강남구', '탄성코트');
  assert.strictEqual(localhostEval.isReady, false);
  assert.strictEqual(localhostEval.previewCanonicalValid, true);
  assert.strictEqual(localhostEval.productionCanonicalReady, false);
  assert(localhostEval.issues.some((i) => i.includes('LOCALHOST_NOT_ALLOWED')));

  // Preview vercel domain
  const vercelEval = evaluateProductionCanonicalGate('https://preview.vercel.app', '강남구', '탄성코트');
  assert.strictEqual(vercelEval.isReady, false);
  assert.strictEqual(vercelEval.previewCanonicalValid, true);
  assert.strictEqual(vercelEval.productionCanonicalReady, false);
  assert(vercelEval.issues.some((i) => i.includes('PREVIEW_DOMAIN_NOT_ALLOWED')));

  // Hypothetical Valid HTTPS Production Domain
  const validProdEval = evaluateProductionCanonicalGate(TEST_RESERVED_PRODUCTION_ORIGIN, '강남구', '탄성코트');
  assert.strictEqual(validProdEval.isReady, true);
  assert.strictEqual(validProdEval.previewCanonicalValid, true);
  assert.strictEqual(validProdEval.productionCanonicalReady, true);
  assert.strictEqual(validProdEval.issues.length, 0);
  assert.strictEqual(
    validProdEval.canonicalUrl,
    `${TEST_RESERVED_PRODUCTION_ORIGIN}/?k=${encodeURIComponent('강남구-탄성코트')}`
  );
});

test('PHASE 6-A: evaluatePublicationGate 11-Rule Gate Matrix & User Approval Lock', () => {
  const baseValidInput: PublicationGateInput = {
    regionId: 'seoul-gangnam',
    regionApprovalStatus: 'APPROVED',
    publicationStateTransitionApproved: true,
    productionCanonicalReady: true,
    businessSSOTValid: true,
    claimGuardPass: true,
    dynamicContentValid: true,
    metadataValid: true,
    internalLinksValid: true,
    requiredAssetsValid: true,
    serviceAreaApproved: true,
    userPublicationApproval: true,
  };

  // 1. All 11 pass -> INDEXABLE
  const passResult = evaluatePublicationGate(baseValidInput);
  assert.strictEqual(passResult.isIndexable, true);
  assert.strictEqual(passResult.targetPublicationState, 'INDEXABLE');
  assert.strictEqual(passResult.blockingReasons.length, 0);

  // 2. CRITICAL: userPublicationApproval = false -> BLOCKED
  const noUserApproval = evaluatePublicationGate({
    ...baseValidInput,
    userPublicationApproval: false,
  });
  assert.strictEqual(noUserApproval.isIndexable, false);
  assert.strictEqual(noUserApproval.targetPublicationState, 'PUBLISHED_NOINDEX');
  assert(noUserApproval.blockingReasons.some((r) => r.includes('USER_APPROVAL_PENDING')));

  // 3. COLLISION_HOLD Region (e.g. 신사동) -> FATAL REJECTION even if user approves
  const collisionHoldResult = evaluatePublicationGate({
    ...baseValidInput,
    regionId: 'seoul-eunpyeong-sinsa',
    regionApprovalStatus: 'COLLISION_HOLD',
  });
  assert.strictEqual(collisionHoldResult.isIndexable, false);
  assert.strictEqual(collisionHoldResult.targetPublicationState, 'PUBLISHED_NOINDEX');
  assert(collisionHoldResult.blockingReasons.some((r) => r.includes('COLLISION_HOLD_REGION')));

  // 4. productionCanonicalReady = false -> BLOCKED
  const noProdCanonical = evaluatePublicationGate({
    ...baseValidInput,
    productionCanonicalReady: false,
  });
  assert.strictEqual(noProdCanonical.isIndexable, false);
  assert(noProdCanonical.blockingReasons.some((r) => r.includes('PRODUCTION_CANONICAL_NOT_READY')));

  // 5. businessSSOTValid = false -> BLOCKED
  const noSSOT = evaluatePublicationGate({ ...baseValidInput, businessSSOTValid: false });
  assert.strictEqual(noSSOT.isIndexable, false);
  assert(noSSOT.blockingReasons.some((r) => r.includes('BUSINESS_SSOT_INVALID')));

  // 6. claimGuardPass = false -> BLOCKED
  const claimFail = evaluatePublicationGate({ ...baseValidInput, claimGuardPass: false });
  assert.strictEqual(claimFail.isIndexable, false);
  assert(claimFail.blockingReasons.some((r) => r.includes('CLAIM_GUARD_FAILED')));

  // 7. dynamicContentValid = false -> BLOCKED
  const dynamicFail = evaluatePublicationGate({ ...baseValidInput, dynamicContentValid: false });
  assert.strictEqual(dynamicFail.isIndexable, false);
  assert(dynamicFail.blockingReasons.some((r) => r.includes('DYNAMIC_CONTENT_INVALID')));

  // 8. metadataValid = false -> BLOCKED
  const metaFail = evaluatePublicationGate({ ...baseValidInput, metadataValid: false });
  assert.strictEqual(metaFail.isIndexable, false);
  assert(metaFail.blockingReasons.some((r) => r.includes('METADATA_INVALID')));

  // 9. internalLinksValid = false -> BLOCKED
  const linksFail = evaluatePublicationGate({ ...baseValidInput, internalLinksValid: false });
  assert.strictEqual(linksFail.isIndexable, false);
  assert(linksFail.blockingReasons.some((r) => r.includes('INTERNAL_LINKS_INVALID')));

  // 10. requiredAssetsValid = false -> BLOCKED
  const assetsFail = evaluatePublicationGate({ ...baseValidInput, requiredAssetsValid: false });
  assert.strictEqual(assetsFail.isIndexable, false);
  assert(assetsFail.blockingReasons.some((r) => r.includes('REQUIRED_ASSETS_INVALID')));

  // 11. serviceAreaApproved = false -> BLOCKED
  const areaFail = evaluatePublicationGate({ ...baseValidInput, serviceAreaApproved: false });
  assert.strictEqual(areaFail.isIndexable, false);
  assert(areaFail.blockingReasons.some((r) => r.includes('SERVICE_AREA_NOT_APPROVED')));

  // 12. publicationStateTransitionApproved = false -> BLOCKED
  const stateFail = evaluatePublicationGate({ ...baseValidInput, publicationStateTransitionApproved: false });
  assert.strictEqual(stateFail.isIndexable, false);
  assert(stateFail.blockingReasons.some((r) => r.includes('STATE_TRANSITION_NOT_APPROVED')));
});

test('PHASE 6-A: Canonical & Publication Test Matrix on 6 Representative URLs', () => {
  const representativeCases = [
    { name: 'Main Page', regionName: null, intent: null, isCollision: false },
    { name: '강남구-탄성코트', regionName: '강남구', intent: '탄성코트' as const, isCollision: false },
    { name: '창신동-탄성코트', regionName: '창신동', intent: '탄성코트' as const, isCollision: false },
    { name: '마곡동-탄성코트', regionName: '마곡동', intent: '탄성코트' as const, isCollision: false },
    { name: '성수동-탄성코트', regionName: '성수동', intent: '탄성코트' as const, isCollision: false },
    { name: '신사동-탄성코트', regionName: '신사동', intent: '탄성코트' as const, isCollision: true },
  ];

  for (const c of representativeCases) {
    if (c.regionName && c.intent) {
      // 1. Current State: UNCONFIGURED origin
      const currentEval = evaluateProductionCanonicalGate(SITE_CONFIG.siteOrigin, c.regionName, c.intent);
      assert.strictEqual(currentEval.isReady, false);
      assert.strictEqual(currentEval.canonicalUrl, null);

      // 2. Mock Production Domain (RFC-reserved test domain)
      const mockOrigin = TEST_RESERVED_PRODUCTION_ORIGIN;
      const mockEval = evaluateProductionCanonicalGate(mockOrigin, c.regionName, c.intent);
      assert.strictEqual(mockEval.isReady, true);
      const expectedHref = buildPublicHref(c.regionName, c.intent);
      assert.strictEqual(mockEval.canonicalUrl, `${mockOrigin}${expectedHref}`);

      // 3. Collision Hold check
      if (c.isCollision) {
        const gate = evaluatePublicationGate({
          regionId: 'seoul-eunpyeong-sinsa',
          regionApprovalStatus: 'COLLISION_HOLD',
          publicationStateTransitionApproved: true,
          productionCanonicalReady: true,
          businessSSOTValid: true,
          claimGuardPass: true,
          dynamicContentValid: true,
          metadataValid: true,
          internalLinksValid: true,
          requiredAssetsValid: true,
          serviceAreaApproved: true,
          userPublicationApproval: true,
        });
        assert.strictEqual(gate.isIndexable, false, 'Collision hold region must NEVER be indexable');
        assert(gate.blockingReasons.some((r) => r.includes('COLLISION_HOLD_REGION')));
      }
    }
  }
});

// ----------------------------------------------------
// PHASE 6-A2: BUSINESS SSOT LOCK & NEGATIVE SEARCH TEST
// ----------------------------------------------------
test('PHASE 6-A2: Business SSOT exact lock & negative value search in runtime/config', () => {
  // Exact user-confirmed values
  assert.strictEqual(SITE_CONFIG.brandName, '올케어');
  assert.strictEqual(SITE_CONFIG.businessName, '올케어서비스');
  assert.strictEqual(SITE_CONFIG.representativeName, '김재현');
  assert.strictEqual(SITE_CONFIG.businessNumber, '405-15-02677');
  assert.strictEqual(SITE_CONFIG.phone, '010-8492-6900');
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, null);
  assert.strictEqual(SITE_CONFIG.address, null);

  // Negative Search: '이정우' or '010-9822-2630' must NEVER exist in SITE_CONFIG
  const configDump = JSON.stringify(SITE_CONFIG);
  assert(!configDump.includes('이정우'), "Runtime SITE_CONFIG must not contain '이정우'");
  assert(!configDump.includes('010-9822-2630'), "Runtime SITE_CONFIG must not contain '010-9822-2630'");

  // No fake production domains
  assert(!configDump.includes('allcare-paint.kr'));
  assert(!configDump.includes('allcare-coating.co.kr'));
  assert(!configDump.includes('allcare.kr'));
});

// ----------------------------------------------------
// PHASE 6-A2: FULL 1,908 DYNAMIC URL SCHEMA & BUSINESS INTEGRITY AUDIT
// ----------------------------------------------------
test('PHASE 6-A2: Full 1,908 Dynamic URL Schema & Business SSOT exhaustive audit', () => {
  let auditedUrlCount = 0;
  let areaServedCount = 0;
  let wrongBusinessNameCount = 0;
  let wrongPhoneCount = 0;
  let localBusinessCount = 0;
  let fakeAddressCount = 0;
  let wrongNameContaminationCount = 0;

  for (const region of PRODUCTION_REGIONS) {
    for (const intent of SEARCH_INTENTS) {
      auditedUrlCount++;
      const jsonLd = buildDynamicJsonLd(region, intent, null);
      const jsonLdString = JSON.stringify(jsonLd);

      const [serviceSchema] = jsonLd as unknown as [
        {
          '@type': string;
          provider: {
            '@type': string;
            name: string;
            legalName: string;
            telephone?: string;
            address?: unknown;
          };
          areaServed?: unknown;
        }
      ];

      // 1. Provider SSOT Check
      if (serviceSchema.provider.name !== '올케어') wrongBusinessNameCount++;
      if (serviceSchema.provider.legalName !== '올케어서비스') wrongBusinessNameCount++;
      if (serviceSchema.provider.telephone !== '010-8492-6900') wrongPhoneCount++;

      // 2. Structured Data Provider Type: strictly Organization
      if (serviceSchema.provider['@type'] !== 'Organization') localBusinessCount++;
      if (serviceSchema['@type'] !== 'Service') localBusinessCount++;
      if (jsonLdString.includes('LocalBusiness')) localBusinessCount++;

      // 3. Fake Address Check: must be undefined
      if (serviceSchema.provider.address !== undefined) fakeAddressCount++;

      // 4. areaServed Gate Check: must be 0 emitted across all 1,908 URLs
      if (serviceSchema.areaServed !== undefined) areaServedCount++;

      // 5. Negative Text Search: '이정우' or '010-9822-2630' must be 0
      if (jsonLdString.includes('이정우') || jsonLdString.includes('010-9822-2630')) {
        wrongNameContaminationCount++;
      }
    }
  }

  assert.strictEqual(auditedUrlCount, 1908, 'Must audit exactly 1,908 URLs (318 regions x 6 intents)');
  assert.strictEqual(areaServedCount, 0, 'Emitted areaServed count across all 1,908 URLs must be strictly 0');
  assert.strictEqual(wrongBusinessNameCount, 0, 'Wrong business name count must be 0');
  assert.strictEqual(wrongPhoneCount, 0, 'Wrong phone count must be 0');
  assert.strictEqual(localBusinessCount, 0, 'LocalBusiness subtype count must be 0');
  assert.strictEqual(fakeAddressCount, 0, 'Fake address count must be 0');
  assert.strictEqual(wrongNameContaminationCount, 0, 'Wrong name/phone contamination count must be 0');
});

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
}
