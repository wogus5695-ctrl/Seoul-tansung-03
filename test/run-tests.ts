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
import { SITE_CONFIG, isContactConfigured, resolveSiteOrigin, OFFICIAL_SITE_ORIGIN } from '../lib/config/site-config';
import {
  DYNAMIC_RSS_ENABLED,
  MAX_DYNAMIC_RSS_ITEMS,
  DYNAMIC_RSS_REGISTRY,
  ELASTIC_COATING_PATTERNS,
  BALCONY_COATING_PATTERNS,
  buildDynamicRssTitle,
  generateDynamicRssContent,
  validateDynamicRssEligibility,
  getDynamicRssItems,
  DynamicRssPublicationEntry,
} from '../lib/data/dynamic-rss-data';
import { SEARCH_INTENTS, SERVICE_KEYWORDS } from '../lib/contracts/intents-contract';
import type { ServiceKeyword } from '../lib/types/intents';
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
  findRegionByKeyword,
} from '../lib/contracts/regions-contract';
import { buildDynamicMetadata, buildDynamicJsonLd, buildDynamicTitle } from '../lib/seo/dynamic-metadata';
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
  evaluateIntentPublicationGate,
  getPublicationOrigin,
  PublicationGateInput,
} from '../lib/contracts/publication-gate';
import {
  PRODUCTION_REGION_EVIDENCE,
  getRegionEvidence,
  hasRegionEvidence,
} from '../lib/data/region-evidence';
import {
  validateRegionEvidenceItem,
  validateRegionEvidenceDataset,
} from '../lib/validators/evidence-validator';
import { RegionEvidenceItem } from '../lib/types/evidence';
import { TEST_CLAIMS } from './fixtures/claims.fixture';
import {
  SYNTHETIC_APPROVED_DISAMBIGUATED_REGIONS,
  SYNTHETIC_COLLISION_REGIONS,
  TEST_REGIONS,
} from './fixtures/regions.fixture';
import { CUSTOMER_REVIEWS } from '../lib/data/customer-reviews';
import {
  PILOT_LOCAL_INSIGHT_PROFILES,
  getLocalInsight,
} from '../lib/data/pilot-local-insights';
import {
  isRecoveryRegion,
  isIndexableDynamicPage,
  RECOVERY_ENABLED,
  BASE_RECOVERY_INTENT,
  BASE_RECOVERY_REGION_IDS,
  YANGCHEON_COHORT_REGION_IDS,
  GURO_COHORT_REGION_IDS,
  YEONGDEUNGPO_COHORT_REGION_IDS,
  RECOVERY_REGION_IDS,
  getRecoveryProfile,
  getRelatedRecoveryRegions,
} from '../lib/config/recovery-config';
import { getAllGuides } from '../lib/data/guides-data';
import {
  getAllKeywordGuides,
  getKeywordGuideForDynamic,
  getAllGuideSlugs,
  getAnyGuideBySlug,
  toGuideArticle,
  KEYWORD_GUIDES,
} from '../lib/data/keyword-guides-data';
import { GET as getSitemapResponse } from '../app/sitemap.xml/route';
import { GET as getRssResponse } from '../app/rss.xml/route';

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

  // Phase 6-J1: Kakao Channel URL configured
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, 'https://pf.kakao.com/_UjxcFX');
  assert.strictEqual(SITE_CONFIG.address, null);

  // Phone is active, so isContactConfigured is true
  assert.strictEqual(isContactConfigured(), true);

  // Naver search advisor verification tag
  assert.strictEqual(SITE_CONFIG.naverSiteVerification, '5be6e2d1aa00ee4b34febe66bb5f81e88a8600bd');
});

// ----------------------------------------------------
// 14. PRODUCTION DATASET PILOT INTEGRITY (PHASE 6-I0B-1)
// ----------------------------------------------------
test('Production Dataset Policy: Production regions array has exactly 319 regions (25 Seoul GUs + 294 DONGs)', () => {
  assert.strictEqual(PRODUCTION_REGIONS.length, 319);
  const ids = PRODUCTION_REGIONS.map((r) => r.id);
  assert(ids.includes('seoul-eunpyeong-gu'));
  assert(ids.includes('seoul-eunpyeong-bulgwang'));
  assert(ids.includes('seoul-eunpyeong-sinsa'));
  assert(ids.includes('seoul-yangcheon-sinjeong'));

  const guRegions = PRODUCTION_REGIONS.filter((r) => r.regionType === 'GU');
  assert.strictEqual(guRegions.length, 25);
  const dongRegions = PRODUCTION_REGIONS.filter((r) => r.regionType === 'DONG');
  assert.strictEqual(dongRegions.length, 294);

  // 318 approved regions are INDEXABLE, 1 collision hold region is PUBLISHED_NOINDEX
  const approvedCount = PRODUCTION_REGIONS.filter((r) => r.publicationState === 'INDEXABLE' && r.isServiceAreaApproved === true).length;
  const holdCount = PRODUCTION_REGIONS.filter((r) => r.publicationState === 'PUBLISHED_NOINDEX' && r.isServiceAreaApproved === false).length;
  assert.strictEqual(approvedCount, 318);
  assert.strictEqual(holdCount, 1);
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
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, 'https://pf.kakao.com/_UjxcFX');
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
    '평생 A/S',
    '영구 A/S',
    '100% A/S',
    '무조건 A/S',
    '무상 A/S',
    '완벽한 A/S',
    '확실한 A/S',
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
// 30. PRODUCTION PILOT VALIDATOR (Phase 6-I0B-1)
// ----------------------------------------------------
test('Production Pilot: validateRegionDataset passes actual PRODUCTION_REGIONS with 0 errors and 1914 expected URLs', () => {
  const report = validateRegionDataset(PRODUCTION_REGIONS, TEST_RESERVED_PRODUCTION_ORIGIN);

  assert.strictEqual(report.isValid, true);
  assert.strictEqual(report.regionCount, 319);
  assert.strictEqual(report.expectedUrlCount, 1914);
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

  // Non-www rejected (must be www.allcaretan.co.kr)
  assert.strictEqual(isProductionOriginReady('https://allcaretan.co.kr'), false);
  assert.strictEqual(isPreviewOriginValid('https://allcaretan.co.kr'), true);

  // Official Production Origin
  assert.strictEqual(isProductionOriginReady('https://www.allcaretan.co.kr'), true);
  assert.strictEqual(isPreviewOriginValid('https://www.allcaretan.co.kr'), true);

  // Current SSOT state: BOUND TO OFFICIAL PRODUCTION DOMAIN
  const ssotOrigin = getPublicationOrigin();
  assert.strictEqual(ssotOrigin.isProductionReady, true, 'Production origin must be ready in Phase 6-B');
  assert.strictEqual(SITE_CONFIG.siteOrigin, 'https://www.allcaretan.co.kr', 'SITE_CONFIG.siteOrigin must match official domain');
});

test('PHASE 6-B: evaluateProductionCanonicalGate evaluates readiness across origins', () => {
  // Negative: null origin
  const unconfiguredEval = evaluateProductionCanonicalGate(null, '강남구', '탄성코트');
  assert.strictEqual(unconfiguredEval.isReady, false);
  assert.strictEqual(unconfiguredEval.productionCanonicalReady, false);
  assert.strictEqual(unconfiguredEval.canonicalUrl, null);
  assert(unconfiguredEval.issues.some((i) => i.includes('SITE_ORIGIN_MISSING')));

  // Negative: Localhost preview state
  const localhostEval = evaluateProductionCanonicalGate('http://localhost:3000', '강남구', '탄성코트');
  assert.strictEqual(localhostEval.isReady, false);
  assert.strictEqual(localhostEval.previewCanonicalValid, true);
  assert.strictEqual(localhostEval.productionCanonicalReady, false);
  assert(localhostEval.issues.some((i) => i.includes('LOCALHOST_NOT_ALLOWED')));

  // Negative: Preview vercel domain
  const vercelEval = evaluateProductionCanonicalGate('https://preview.vercel.app', '강남구', '탄성코트');
  assert.strictEqual(vercelEval.isReady, false);
  assert.strictEqual(vercelEval.previewCanonicalValid, true);
  assert.strictEqual(vercelEval.productionCanonicalReady, false);
  assert(vercelEval.issues.some((i) => i.includes('PREVIEW_DOMAIN_NOT_ALLOWED')));

  // Negative: Non-www production domain
  const nonWwwEval = evaluateProductionCanonicalGate('https://allcaretan.co.kr', '강남구', '탄성코트');
  assert.strictEqual(nonWwwEval.isReady, false);
  assert.strictEqual(nonWwwEval.productionCanonicalReady, false);
  assert(nonWwwEval.issues.some((i) => i.includes('NON_WWW_NOT_ALLOWED')));

  // Official Production Domain
  const officialEval = evaluateProductionCanonicalGate(SITE_CONFIG.siteOrigin, '강남구', '탄성코트');
  assert.strictEqual(officialEval.isReady, true);
  assert.strictEqual(officialEval.previewCanonicalValid, true);
  assert.strictEqual(officialEval.productionCanonicalReady, true);
  assert.strictEqual(officialEval.issues.length, 0);
  assert.strictEqual(
    officialEval.canonicalUrl,
    `https://www.allcaretan.co.kr/?k=${encodeURIComponent('강남구-탄성코트')}`
  );
});

test('PHASE 6-A / 6-C0C-1: evaluatePublicationGate 12-Rule Gate Matrix & User Approval Lock', () => {
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
    contentEvidenceEligible: true,
    publicationAllowlist: true,
  };

  // 1. All 12 pass -> INDEXABLE
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

  // 13. collisionHold = true -> BLOCKED
  const collisionFail = evaluatePublicationGate({ ...baseValidInput, regionApprovalStatus: 'COLLISION_HOLD' });
  assert.strictEqual(collisionFail.isIndexable, false);
  assert(collisionFail.blockingReasons.some((r) => r.includes('COLLISION_HOLD_REGION')));
});

test('PHASE 6-B: Canonical & Publication Test Matrix on 6 Representative URLs', () => {
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
      // 1. Official Production Domain: Canonical Ready = true
      const currentEval = evaluateProductionCanonicalGate(SITE_CONFIG.siteOrigin, c.regionName, c.intent);
      assert.strictEqual(currentEval.isReady, true);
      assert.strictEqual(currentEval.productionCanonicalReady, true);
      const expectedHref = buildPublicHref(c.regionName, c.intent);
      assert.strictEqual(currentEval.canonicalUrl, `https://www.allcaretan.co.kr${expectedHref}`);

      // 2. Publication Gate check (INDEXABLE still strictly blocked!)
      const gate = evaluatePublicationGate({
        regionId: c.isCollision ? 'seoul-eunpyeong-sinsa' : 'seoul-test',
        regionApprovalStatus: c.isCollision ? 'COLLISION_HOLD' : 'APPROVED',
        publicationStateTransitionApproved: true,
        productionCanonicalReady: currentEval.productionCanonicalReady,
        businessSSOTValid: true,
        claimGuardPass: true,
        dynamicContentValid: true,
        metadataValid: true,
        internalLinksValid: true,
        requiredAssetsValid: true,
        serviceAreaApproved: false, // NOT approved
        userPublicationApproval: false, // NOT approved yet
      });
      assert.strictEqual(gate.isIndexable, false, 'INDEXABLE must remain false in Phase 6-B');
      assert.strictEqual(gate.targetPublicationState, 'PUBLISHED_NOINDEX');

      // 3. Collision Hold check
      if (c.isCollision) {
        const collisionGate = evaluatePublicationGate({
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
        assert.strictEqual(collisionGate.isIndexable, false, 'Collision hold region must NEVER be indexable');
        assert(collisionGate.blockingReasons.some((r) => r.includes('COLLISION_HOLD_REGION')));
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
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, 'https://pf.kakao.com/_UjxcFX');
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

      // 4. areaServed Gate Check: 1,902 emitted for approved indexable regions, 0 for collision hold
      if (serviceSchema.areaServed !== undefined) areaServedCount++;

      // 5. Negative Text Search: '이정우' or '010-9822-2630' must be 0
      if (jsonLdString.includes('이정우') || jsonLdString.includes('010-9822-2630')) {
        wrongNameContaminationCount++;
      }
    }
  }

  assert.strictEqual(auditedUrlCount, 1914, 'Must audit exactly 1,914 URLs (319 regions x 6 intents)');
  assert.strictEqual(areaServedCount, 1908, 'Emitted areaServed count across approved 318 regions x 6 intents must be 1,908');
  assert.strictEqual(wrongBusinessNameCount, 0, 'Wrong business name count must be 0');
  assert.strictEqual(wrongPhoneCount, 0, 'Wrong phone count must be 0');
  assert.strictEqual(localBusinessCount, 0, 'LocalBusiness subtype count must be 0');
  assert.strictEqual(fakeAddressCount, 0, 'Fake address count must be 0');
  assert.strictEqual(wrongNameContaminationCount, 0, 'Wrong name/phone contamination count must be 0');
});

// ----------------------------------------------------
// PHASE 6-B: FULL 1,908 CANONICAL AUDIT, UNIQUENESS & ZERO-LEAK VERIFICATION
// ----------------------------------------------------
test('PHASE 6-B: Full 1,908 Canonical Audit, Uniqueness, and Zero Leak Verification', () => {
  assert.strictEqual(SITE_CONFIG.siteOrigin, 'https://www.allcaretan.co.kr');

  const seenCanonicals = new Set<string>();
  const duplicateCanonicals: string[] = [];
  let totalChecked = 0;
  let wrongHostCount = 0;
  let wrongSchemeCount = 0;
  let nonWwwLeakCount = 0;
  let localhostLeakCount = 0;
  let previewLeakCount = 0;
  let mainPageCanonicalLeakCount = 0;
  let indexableCount = 0;
  let noindexFollowCount = 0;
  let noindexFollowNocacheCount = 0;
  let areaServedCount = 0;

  for (const region of PRODUCTION_REGIONS) {
    for (const intent of SEARCH_INTENTS) {
      totalChecked++;
      const expectedDynamicKey = `${region.keywordRegionName}-${intent.serviceKeyword}`;
      const canonicalResult = buildCanonicalUrl(region.keywordRegionName, intent.serviceKeyword);

      assert(canonicalResult.isSuccess && canonicalResult.canonicalUrl, `Canonical build failed for ${expectedDynamicKey}`);
      const canonical = canonicalResult.canonicalUrl!;

      // 1. Uniqueness check
      if (seenCanonicals.has(canonical)) {
        duplicateCanonicals.push(canonical);
      }
      seenCanonicals.add(canonical);

      // 2. Format checks
      const u = new URL(canonical);
      if (u.protocol !== 'https:') wrongSchemeCount++;
      if (u.hostname !== 'www.allcaretan.co.kr') wrongHostCount++;
      if (u.pathname !== '/') wrongHostCount++;

      const kParam = u.searchParams.get('k');
      assert.strictEqual(kParam, expectedDynamicKey, `Dynamic key mismatch in canonical: ${kParam} vs ${expectedDynamicKey}`);

      // 3. Leak checks
      if (canonical.includes('//allcaretan.co.kr')) nonWwwLeakCount++;
      if (canonical.includes('localhost') || canonical.includes('127.0.0.1')) localhostLeakCount++;
      if (canonical.includes('vercel.app')) previewLeakCount++;
      if (canonical === 'https://www.allcaretan.co.kr/' || canonical === 'https://www.allcaretan.co.kr') {
        mainPageCanonicalLeakCount++;
      }

      // 4. Metadata verification (Phase 6-H2B: 15 Recovery = INDEX, 1,887 Non-recovery Approved = NOINDEX/FOLLOW, 6 Collision Hold = NOINDEX/NOFOLLOW/NOCACHE)
      const metadata = buildDynamicMetadata(region, intent);
      const robots = metadata.robots as { index?: boolean; follow?: boolean; nocache?: boolean };
      if (robots && robots.index === true && robots.follow === true) {
        indexableCount++;
      } else if (robots && robots.index === false && robots.follow === true) {
        noindexFollowCount++;
      } else if (robots && robots.index === false && robots.follow === false && robots.nocache === true) {
        noindexFollowNocacheCount++;
      }

      // 5. JSON-LD checks
      const jsonLd = buildDynamicJsonLd(region, intent);
      const jsonLdStr = JSON.stringify(jsonLd);

      if (jsonLdStr.includes('//allcaretan.co.kr')) nonWwwLeakCount++;
      if (jsonLdStr.includes('localhost') || jsonLdStr.includes('127.0.0.1')) localhostLeakCount++;
      if (jsonLdStr.includes('vercel.app')) previewLeakCount++;

      const [serviceSchema, breadcrumbSchema] = jsonLd as unknown as [
        { url?: string; areaServed?: unknown },
        { itemListElement?: { position: number; item?: string }[] }
      ];

      assert.strictEqual(serviceSchema.url, canonical);
      if (serviceSchema.areaServed !== undefined) areaServedCount++;

      assert(breadcrumbSchema.itemListElement);
      assert.strictEqual(breadcrumbSchema.itemListElement[0].item, 'https://www.allcaretan.co.kr/');
      assert.strictEqual(breadcrumbSchema.itemListElement[1].item, canonical);
    }
  }

  assert.strictEqual(totalChecked, 1914, 'Must audit exactly 1,914 dynamic URLs');
  assert.strictEqual(seenCanonicals.size, 1914, 'Must have exactly 1,914 unique canonical URLs');
  assert.strictEqual(duplicateCanonicals.length, 0, 'Must have 0 duplicate canonical URLs');
  assert.strictEqual(wrongHostCount, 0, 'Must have 0 wrong host URLs');
  assert.strictEqual(wrongSchemeCount, 0, 'Must have 0 wrong scheme URLs');
  assert.strictEqual(nonWwwLeakCount, 0, 'Must have 0 non-www leaks');
  assert.strictEqual(localhostLeakCount, 0, 'Must have 0 localhost leaks');
  assert.strictEqual(previewLeakCount, 0, 'Must have 0 preview leaks');
  assert.strictEqual(mainPageCanonicalLeakCount, 0, 'Must have 0 main page canonical leaks');
  assert.strictEqual(indexableCount, 56, 'Phase 6-M1A: Exactly 56 recovery & cohort dynamic pages are indexable');
  assert.strictEqual(noindexFollowCount, 1852, 'Phase 6-M1A: Exactly 1,852 approved non-recovery dynamic pages are NOINDEX, FOLLOW');
  assert.strictEqual(noindexFollowNocacheCount, 6, 'Phase 6-M1A: Exactly 6 collision hold dynamic pages are NOINDEX, NOFOLLOW, NOCACHE');
  assert.strictEqual(areaServedCount, 1908, 'Area served count must be 1,908');
});

// ----------------------------------------------------
// PHASE 6-B: CANONICAL SAMPLE MATRIX (8 CASES)
// ----------------------------------------------------
test('PHASE 6-B: Canonical Sample Matrix verification across 8 required cases', () => {
  const sampleMatrix = [
    {
      region: '강남구',
      intent: '탄성코트' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('강남구-탄성코트')}`,
    },
    {
      region: '마곡동',
      intent: '베란다탄성코트' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('마곡동-베란다탄성코트')}`,
    },
    {
      region: '자곡동',
      intent: '탄성코트시공' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('자곡동-탄성코트시공')}`,
    },
    {
      region: '성수동',
      intent: '탄성코트' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('성수동-탄성코트')}`,
    },
    {
      region: '금호동',
      intent: '세탁실탄성코트' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('금호동-세탁실탄성코트')}`,
    },
    {
      region: '불광동',
      intent: '탄성코트' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('불광동-탄성코트')}`,
    },
    {
      region: '신사동',
      intent: '탄성코트' as const,
      expectedCanonical: `https://www.allcaretan.co.kr/?k=${encodeURIComponent('신사동-탄성코트')}`,
    },
  ];

  for (const s of sampleMatrix) {
    const res = buildCanonicalUrl(s.region, s.intent);
    assert.strictEqual(res.isSuccess, true);
    assert.strictEqual(res.canonicalUrl, s.expectedCanonical);
  }
});

// ----------------------------------------------------
// PHASE 6-B5: NEGATIVE ORIGIN & PRODUCTION SSOT TESTS
// ----------------------------------------------------
test('PHASE 6-B5: Negative Origin Tests & Production SSOT Resolution', () => {
  assert.strictEqual(OFFICIAL_SITE_ORIGIN, 'https://www.allcaretan.co.kr');

  // Case A: ENV missing
  assert.strictEqual(resolveSiteOrigin(undefined), 'https://www.allcaretan.co.kr');
  assert.strictEqual(resolveSiteOrigin(null), 'https://www.allcaretan.co.kr');
  assert.strictEqual(resolveSiteOrigin(''), 'https://www.allcaretan.co.kr');

  // Case B: ENV = valid official origin
  assert.strictEqual(resolveSiteOrigin('https://www.allcaretan.co.kr'), 'https://www.allcaretan.co.kr');
  assert.strictEqual(resolveSiteOrigin('https://www.allcaretan.co.kr/'), 'https://www.allcaretan.co.kr');

  // Case C: ENV = http://localhost:3000
  assert.strictEqual(resolveSiteOrigin('http://localhost:3000'), 'https://www.allcaretan.co.kr');
  assert.strictEqual(resolveSiteOrigin('http://127.0.0.1:3000'), 'https://www.allcaretan.co.kr');

  // Case D: ENV = Vercel preview domain
  assert.strictEqual(resolveSiteOrigin('https://seoul-tansung-03.vercel.app'), 'https://www.allcaretan.co.kr');
  assert.strictEqual(resolveSiteOrigin('https://preview.allcaretan.co.kr'), 'https://www.allcaretan.co.kr');

  // Case E: ENV = http://www.allcaretan.co.kr (HTTP insecure)
  assert.strictEqual(resolveSiteOrigin('http://www.allcaretan.co.kr'), 'https://www.allcaretan.co.kr');

  // Case F: ENV = non-www https://allcaretan.co.kr
  assert.strictEqual(resolveSiteOrigin('https://allcaretan.co.kr'), 'https://www.allcaretan.co.kr');

  // Invariant: SITE_CONFIG.siteOrigin must be strictly OFFICIAL_SITE_ORIGIN
  assert.strictEqual(SITE_CONFIG.siteOrigin, 'https://www.allcaretan.co.kr');
});

// ----------------------------------------------------
// PHASE 6-C0C-1: REGION EVIDENCE INFRASTRUCTURE & PUBLICATION GATE TESTS
// ----------------------------------------------------
test('PHASE 6-C0C-1: Region Evidence Validator & Claim Guard Enforcement', () => {
  const validFixture: RegionEvidenceItem = {
    evidenceId: 'ev-test-bulgwang-01',
    regionId: 'seoul-eunpyeong-bulgwang',
    evidenceTier: 'TIER_A',
    sourceType: 'ACTUAL_JOB_CASE',
    sourceName: '올케어 시공 일지',
    verifiedAt: '2026-03-15',
    serviceIntentApplicability: ['탄성코트', '베란다탄성코트'],
    caseDate: '2026-03-10',
    caseType: '아파트 베란다 결로 보수 및 탄성코트 시공',
    facts: {
      housingType: '아파트',
      complexName: '북한산힐스테이트 7차',
      observedCondition: '외벽 모서리 부위 페인트 들뜸 및 박리 현상 확인',
      workScope: '기존 들뜸 도막 스크래핑, 하부 퍼티 평탄화 및 탄성코트 뿜칠 도포',
    },
    imageAssets: ['/images/allcare/before-after/sample-01-after.jpg'],
  };

  // 1. Positive validation
  const posIssues = validateRegionEvidenceItem(validFixture, PRODUCTION_REGIONS);
  assert.strictEqual(posIssues.length, 0, `Valid fixture should have 0 issues, got: ${JSON.stringify(posIssues)}`);

  const datasetResult = validateRegionEvidenceDataset([validFixture], PRODUCTION_REGIONS);
  assert.strictEqual(datasetResult.isValid, true);
  assert.strictEqual(datasetResult.issues.length, 0);

  // 2. Negative: Unknown region ID
  const unknownRegionIssues = validateRegionEvidenceItem(
    { ...validFixture, evidenceId: 'ev-unknown-reg', regionId: 'seoul-nonexistent-dong' },
    PRODUCTION_REGIONS
  );
  assert(unknownRegionIssues.some((i) => i.code === 'UNKNOWN_REGION_ID'));

  // 3. Negative: Empty intent applicability
  const emptyIntentIssues = validateRegionEvidenceItem(
    { ...validFixture, evidenceId: 'ev-empty-intent', serviceIntentApplicability: [] },
    PRODUCTION_REGIONS
  );
  assert(emptyIntentIssues.some((i) => i.code === 'EMPTY_INTENT_APPLICABILITY'));

  // 4. Negative: Invalid Tier (e.g. TIER_D administrative metadata)
  const invalidTierIssues = validateRegionEvidenceItem(
    { ...validFixture, evidenceId: 'ev-invalid-tier', evidenceTier: 'TIER_D' as unknown as 'TIER_A' },
    PRODUCTION_REGIONS
  );
  assert(invalidTierIssues.some((i) => i.code === 'INVALID_TIER'));

  // 5. Negative: Missing source
  const missingSourceIssues = validateRegionEvidenceItem(
    { ...validFixture, evidenceId: 'ev-missing-src', sourceName: '   ' },
    PRODUCTION_REGIONS
  );
  assert(missingSourceIssues.some((i) => i.code === 'MISSING_SOURCE'));

  // 6. Negative: Invalid verified date format
  const badDateIssues = validateRegionEvidenceItem(
    { ...validFixture, evidenceId: 'ev-bad-date', verifiedAt: '2026/03/15' },
    PRODUCTION_REGIONS
  );
  assert(badDateIssues.some((i) => i.code === 'INVALID_VERIFIED_DATE'));

  // 7. Negative: Empty facts
  const emptyFactsIssues = validateRegionEvidenceItem(
    { ...validFixture, evidenceId: 'ev-empty-facts', facts: {} },
    PRODUCTION_REGIONS
  );
  assert(emptyFactsIssues.some((i) => i.code === 'EMPTY_FACTS'));

  // 8. Negative: Unverified claim in observedCondition / notes
  const claimViolationIssues = validateRegionEvidenceItem(
    {
      ...validFixture,
      evidenceId: 'ev-claim-violation',
      facts: {
        ...validFixture.facts,
        observedCondition: '100% 곰팡이 영구 방지 보증 시공 구역',
      },
    },
    PRODUCTION_REGIONS
  );
  assert(claimViolationIssues.some((i) => i.code === 'UNVERIFIED_CLAIM_IN_FACTS'));

  // 9. Negative: Duplicate evidence IDs in dataset
  const duplicateResult = validateRegionEvidenceDataset(
    [validFixture, { ...validFixture, regionId: 'seoul-gangnam' }],
    PRODUCTION_REGIONS
  );
  assert.strictEqual(duplicateResult.isValid, false);
  assert(duplicateResult.issues.some((i) => i.code === 'DUPLICATE_EVIDENCE_ID'));

  // 10. Negative: Invalid external/unauthorized image path
  const badImageIssues = validateRegionEvidenceItem(
    {
      ...validFixture,
      evidenceId: 'ev-bad-img',
      imageAssets: ['https://external-unverified-site.com/photo.jpg'],
    },
    PRODUCTION_REGIONS
  );
  assert(badImageIssues.some((i) => i.code === 'INVALID_IMAGE_PATH'));
});

test('PHASE 6-C0C-2B: Production Evidence Repository 5 Pilot Records Invariant', () => {
  // Invariant 1: PRODUCTION_REGION_EVIDENCE length is strictly 5
  assert.strictEqual(
    PRODUCTION_REGION_EVIDENCE.length,
    5,
    'PRODUCTION_REGION_EVIDENCE must have length 5 (Exactly 5 pilot regions)'
  );

  const PILOT_REGION_IDS = [
    'seoul-gangnam-gu',
    'seoul-eunpyeong-bulgwang',
    'seoul-gangseo-마곡동',
    'seoul-seongdong-성수동',
    'seoul-jongno-창신동',
  ];

  const evidenceRegionIds = PRODUCTION_REGION_EVIDENCE.map((item) => item.regionId);
  assert.deepStrictEqual(evidenceRegionIds, PILOT_REGION_IDS);

  // Invariant 2: Non-pilot regions (313 regions) have 0 evidence
  let nonPilotPairsWithEvidence = 0;
  for (const r of PRODUCTION_REGIONS) {
    if (!PILOT_REGION_IDS.includes(r.id)) {
      for (const intent of SEARCH_INTENTS) {
        if (hasRegionEvidence(r.id, intent.serviceKeyword)) {
          nonPilotPairsWithEvidence++;
        }
      }
    }
  }
  assert.strictEqual(nonPilotPairsWithEvidence, 0, 'Non-pilot regions must have 0 evidence');

  // Invariant 3: Collision Hold region (seoul-eunpyeong-sinsa) has 0 evidence
  assert.strictEqual(getRegionEvidence('seoul-eunpyeong-sinsa').length, 0);

  // Invariant 4: Dataset validation passes cleanly
  const datasetValidation = validateRegionEvidenceDataset(PRODUCTION_REGION_EVIDENCE, PRODUCTION_REGIONS);
  assert.strictEqual(datasetValidation.isValid, true, `Dataset issues: ${JSON.stringify(datasetValidation.issues)}`);
});

test('PHASE 6-C0C-2B: Data Contract Test for Exact 5 Pilot Numerical Facts', () => {
  // 1. 강남구
  const gangnam = getRegionEvidence('seoul-gangnam-gu')[0];
  assert(gangnam && gangnam.facts.publicHousingMetrics);
  const gMetrics = gangnam.facts.publicHousingMetrics!;
  assert.strictEqual(gMetrics.registeredUnits, 4421);
  assert.strictEqual(gMetrics.validApprovalDates, 4385);
  assert.strictEqual(gMetrics.ageBuckets['20to29'] + gMetrics.ageBuckets['30plus'], 3038);
  assert.strictEqual(gMetrics.share20Plus, 69.3);

  // 2. 불광동
  const bulgwang = getRegionEvidence('seoul-eunpyeong-bulgwang')[0];
  assert(bulgwang && bulgwang.facts.publicHousingMetrics);
  const bMetrics = bulgwang.facts.publicHousingMetrics!;
  assert.strictEqual(bMetrics.registeredUnits, 1447);
  assert.strictEqual(bMetrics.validApprovalDates, 1442);
  assert.strictEqual(bMetrics.ageBuckets['20to29'] + bMetrics.ageBuckets['30plus'], 949);
  assert.strictEqual(bMetrics.share20Plus, 65.8);

  // 3. 마곡동
  const magok = getRegionEvidence('seoul-gangseo-마곡동')[0];
  assert(magok && magok.facts.publicHousingMetrics);
  const mMetrics = magok.facts.publicHousingMetrics!;
  assert.strictEqual(mMetrics.registeredUnits, 95);
  assert.strictEqual(mMetrics.validApprovalDates, 94);
  assert.strictEqual(mMetrics.ageBuckets['20to29'] + mMetrics.ageBuckets['30plus'], 46);
  assert.strictEqual(mMetrics.share20Plus, 48.9);

  // 4. 성수동
  const seongsu = getRegionEvidence('seoul-seongdong-성수동')[0];
  assert(seongsu && seongsu.facts.publicHousingMetrics);
  const sMetrics = seongsu.facts.publicHousingMetrics!;
  assert.strictEqual(sMetrics.registeredUnits, 315);
  assert.strictEqual(sMetrics.validApprovalDates, 315);
  assert.strictEqual(sMetrics.ageBuckets['20to29'] + sMetrics.ageBuckets['30plus'], 186);
  assert.strictEqual(sMetrics.share20Plus, 59.0);

  // 5. 창신동
  const changsin = getRegionEvidence('seoul-jongno-창신동')[0];
  assert(changsin && changsin.facts.publicHousingMetrics);
  const cMetrics = changsin.facts.publicHousingMetrics!;
  assert.strictEqual(cMetrics.registeredUnits, 274);
  assert.strictEqual(cMetrics.validApprovalDates, 273);
  assert.strictEqual(cMetrics.ageBuckets['20to29'] + cMetrics.ageBuckets['30plus'], 253);
  assert.strictEqual(cMetrics.share20Plus, 92.7);
});

test('PHASE 6-C0C-2B: Full 1,908 Dynamic URL Strict INDEXABLE = 0 Lock', () => {
  // Invariant: Without explicit userPublicationApproval (userPublicationApproval = false),
  // ALL 1,908 dynamic URLs remain PUBLISHED_NOINDEX (INDEXABLE count = 0).
  let checkedCount = 0;
  let indexableCount = 0;

  const defaultGateInput = {
    regionApprovalStatus: 'APPROVED' as const,
    publicationStateTransitionApproved: true,
    productionCanonicalReady: true,
    businessSSOTValid: true,
    claimGuardPass: true,
    dynamicContentValid: true,
    metadataValid: true,
    internalLinksValid: true,
    requiredAssetsValid: true,
    serviceAreaApproved: true,
    userPublicationApproval: false, // Strict Lock: false in Phase 6-C0C-2B
  };

  for (const r of PRODUCTION_REGIONS) {
    for (const intent of SEARCH_INTENTS) {
      checkedCount++;
      const gateResult = evaluateIntentPublicationGate(
        r.id,
        intent.serviceKeyword,
        {
          ...defaultGateInput,
          regionApprovalStatus: r.disambiguationStatus === 'REQUIRES_DISAMBIGUATION' ? 'COLLISION_HOLD' : 'APPROVED',
        }
      );

      if (gateResult.isIndexable) {
        indexableCount++;
      }

      assert.strictEqual(
        gateResult.targetPublicationState,
        'PUBLISHED_NOINDEX',
        `Dynamic URL for ${r.id} / ${intent.serviceKeyword} must be PUBLISHED_NOINDEX`
      );
    }
  }

  assert.strictEqual(checkedCount, 1914);
  assert.strictEqual(indexableCount, 0, 'INDEXABLE count across all 1,914 dynamic URLs must be strictly 0');
});

test('PHASE 6-C2: 1,908 Approved Dynamic URLs Indexability & 6 Collision Hold NOINDEX Lock', () => {
  let indexableCount = 0;
  let noindexCount = 0;

  const baseInput = {
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

  for (const r of PRODUCTION_REGIONS) {
    for (const intent of SEARCH_INTENTS) {
      const isCollision = r.id === 'seoul-eunpyeong-sinsa';
      const gateRes = evaluateIntentPublicationGate(r.id, intent.serviceKeyword, {
        ...baseInput,
        regionApprovalStatus: isCollision ? 'COLLISION_HOLD' : 'APPROVED',
      });

      if (gateRes.isIndexable) {
        indexableCount++;
      } else {
        noindexCount++;
      }
    }
  }

  assert.strictEqual(indexableCount, 1908, 'Indexable count must be EXACTLY 1,908 approved dynamic URLs');
  assert.strictEqual(noindexCount, 6, 'NOINDEX count must be EXACTLY 6 collision hold dynamic URLs');
});

test('PHASE 6-N1A: Sitemap Inclusion Contract (81 Total URLs: 3 Static + 4 Pillar Guides + 18 Keyword Guides + 56 Dynamic)', async () => {
  const origin = OFFICIAL_SITE_ORIGIN;
  const approvedRegions = PRODUCTION_REGIONS.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );

  const dynamicUrls: string[] = [];
  for (const r of approvedRegions) {
    for (const intent of SEARCH_INTENTS) {
      if (isIndexableDynamicPage(r.id, intent.serviceKeyword)) {
        const href = buildPublicHref(r.keywordRegionName, intent.serviceKeyword);
        dynamicUrls.push(`${origin}${href}`);
      }
    }
  }

  const staticUrls = [`${origin}/`, `${origin}/sitemap-seoul`, `${origin}/guide`];
  const pillarGuideUrls = getAllGuides().map((g) => `${origin}/guide/${g.slug}`);
  const keywordGuideUrls = getAllKeywordGuides().map((g) => `${origin}/guide/${g.slug}`);
  const sitemapUrls = [...staticUrls, ...pillarGuideUrls, ...keywordGuideUrls, ...dynamicUrls];

  assert.strictEqual(sitemapUrls.length, 81, 'Sitemap URL count must be exactly 81 (3 Static + 4 Pillar + 18 Keyword + 56 Dynamic)');
  assert.strictEqual(dynamicUrls.length, 56, 'Dynamic sitemap URLs must be exactly 56');
  assert.strictEqual(pillarGuideUrls.length, 4, 'Pillar guide sitemap URLs must be exactly 4');
  assert.strictEqual(keywordGuideUrls.length, 18, 'Keyword guide sitemap URLs must be exactly 18');

  // Verify direct sitemap.xml route response
  const sitemapRes = await getSitemapResponse();
  assert.strictEqual(sitemapRes.status, 200);
  assert(sitemapRes.headers.get('content-type')?.includes('application/xml'));
  const xmlText = await sitemapRes.text();
  for (const u of sitemapUrls) {
    assert(xmlText.includes(`<loc>${u}</loc>`), `Sitemap XML must contain <loc>${u}</loc>`);
  }

  // Verify zero leak of collision hold (seoul-eunpyeong-sinsa / 신사동) or noindex URLs
  for (const url of sitemapUrls) {
    assert(!url.includes('신사동'), 'Sitemap must not contain collision hold region (신사동)');
    assert(!url.includes('localhost'), 'Sitemap must not contain localhost');
    assert(url.startsWith('https://www.allcaretan.co.kr'), 'Sitemap URLs must use production origin');
  }
});

test('PHASE 6-C2: Full Approved Seoul Rollout Publication Gate Simulation', () => {
  const baseInput = {
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

  // 1. Approved region ('seoul-eunpyeong-bulgwang') -> INDEXABLE PASS
  const bulgwangGate = evaluateIntentPublicationGate(
    'seoul-eunpyeong-bulgwang',
    '탄성코트',
    { ...baseInput, regionApprovalStatus: 'APPROVED' }
  );
  assert.strictEqual(bulgwangGate.isIndexable, true);
  assert.strictEqual(bulgwangGate.targetPublicationState, 'INDEXABLE');
  assert.strictEqual(bulgwangGate.blockingReasons.length, 0);

  // 2. Approved region ('seoul-gangnam-gu') -> INDEXABLE PASS
  const gangnamGate = evaluateIntentPublicationGate(
    'seoul-gangnam-gu',
    '세탁실탄성코트',
    { ...baseInput, regionApprovalStatus: 'APPROVED' }
  );
  assert.strictEqual(gangnamGate.isIndexable, true);
  assert.strictEqual(gangnamGate.targetPublicationState, 'INDEXABLE');
  assert.strictEqual(gangnamGate.blockingReasons.length, 0);

  // 3. Collision Hold region ('seoul-eunpyeong-sinsa') -> FATAL BLOCKED
  const collisionGate = evaluateIntentPublicationGate(
    'seoul-eunpyeong-sinsa',
    '탄성코트',
    { ...baseInput, regionApprovalStatus: 'COLLISION_HOLD' }
  );
  assert.strictEqual(collisionGate.isIndexable, false);
  assert.strictEqual(collisionGate.targetPublicationState, 'PUBLISHED_NOINDEX');
  assert(collisionGate.blockingReasons.some((r) => r.includes('COLLISION_HOLD_REGION')));
});

// ----------------------------------------------------
// PHASE 6-E2: NAVER SERP CTR COPY OPTIMIZATION & PREFIX CONTRACT
// ----------------------------------------------------
test('PHASE 6-E2: 1,908 Approved Dynamic URLs Prefix, Uniqueness & 6-Intent CTR Copy QA', () => {
  const approvedRegions = PRODUCTION_REGIONS.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );
  assert.strictEqual(approvedRegions.length, 318);

  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();

  for (const region of approvedRegions) {
    for (const intent of SEARCH_INTENTS) {
      const regionLabel = region.displayName || region.keywordRegionName;
      const exactKeyword = `${regionLabel} ${intent.serviceKeyword}`;
      const meta = buildDynamicMetadata(region, intent, SITE_CONFIG.siteOrigin);
      const titleStr = typeof meta.title === 'string' ? meta.title : String(meta.title || '');
      const descStr = typeof meta.description === 'string' ? meta.description : String(meta.description || '');

      // 1. Title Prefix Contract
      assert(
        titleStr.startsWith(exactKeyword),
        `Title [${titleStr}] must start with exact keyword [${exactKeyword}]`
      );

      // 2. Description Prefix Contract
      assert(
        descStr.startsWith(exactKeyword),
        `Description [${descStr}] must start with exact keyword [${exactKeyword}]`
      );

      // 3. OG Title Prefix Contract
      const ogTitle = (meta.openGraph?.title as string) || '';
      assert(
        ogTitle.startsWith(exactKeyword),
        `OG Title [${ogTitle}] must start with exact keyword [${exactKeyword}]`
      );

      // 4. OG Description Prefix Contract
      const ogDesc = (meta.openGraph?.description as string) || '';
      assert(
        ogDesc.startsWith(exactKeyword),
        `OG Description [${ogDesc}] must start with exact keyword [${exactKeyword}]`
      );

      // 5. H1 Contract
      const h1 = intent.h1Template(regionLabel);
      assert.strictEqual(h1, exactKeyword, `H1 [${h1}] must equal exact keyword [${exactKeyword}]`);

      // 6. Hero Intro Prefix Contract
      const heroIntro = intent.heroIntroTemplate(regionLabel);
      assert(
        heroIntro.startsWith(exactKeyword),
        `Hero Intro [${heroIntro}] must start with exact keyword [${exactKeyword}]`
      );

      // 7. Title Uniqueness
      assert(!seenTitles.has(titleStr), `Duplicate Title found across approved set: ${titleStr}`);
      seenTitles.add(titleStr);

      // 8. Description Uniqueness
      assert(!seenDescriptions.has(descStr), `Duplicate Description found: ${descStr}`);
      seenDescriptions.add(descStr);
    }
  }

  assert.strictEqual(seenTitles.size, 1908);
  assert.strictEqual(seenDescriptions.size, 1908);
});

// ----------------------------------------------------
// PHASE 6-E4: A/S TRUST SIGNAL + NAVER SERP INTEGRATION QA
// ----------------------------------------------------
test('PHASE 6-E4: 1,908 Dynamic Titles (A/S 보장), Meta Description (A/S 보장 기준), OG/JSON-LD Sync & Claim Safety QA', () => {
  const approvedRegions = PRODUCTION_REGIONS.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );
  assert.strictEqual(approvedRegions.length, 318);

  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();

  const FORBIDDEN_AS_TERMS = [
    '평생 A/S',
    '영구 A/S',
    '100% A/S',
    '무조건 A/S',
    '무상 A/S',
    '완벽한 A/S',
    '확실한 A/S',
  ];

  for (const region of approvedRegions) {
    for (const intent of SEARCH_INTENTS) {
      const regionLabel = region.displayName || region.keywordRegionName;
      const exactKeyword = `${regionLabel} ${intent.serviceKeyword}`;
      const expectedTitle = buildDynamicTitle(regionLabel, intent.serviceKeyword);

      // 1. Title exact match: `${region} ${serviceKeyword} | A/S 보장 | 올케어`
      assert.strictEqual(expectedTitle, `${exactKeyword} | A/S 보장 | 올케어`);

      const meta = buildDynamicMetadata(region, intent, SITE_CONFIG.siteOrigin);
      const titleStr = typeof meta.title === 'string' ? meta.title : String(meta.title || '');
      const descStr = typeof meta.description === 'string' ? meta.description : String(meta.description || '');

      assert.strictEqual(titleStr, expectedTitle);

      // 2. Description starts with exact keyword and includes 'A/S 보장 기준' exactly once
      assert(descStr.startsWith(`${exactKeyword},`), `Description [${descStr}] must start with [${exactKeyword},]`);
      assert(descStr.includes('A/S 보장 기준'), `Description [${descStr}] must contain 'A/S 보장 기준'`);
      const asOccurrence = (descStr.match(/A\/S/g) || []).length;
      assert.strictEqual(asOccurrence, 1, `Description [${descStr}] must contain A/S exactly 1 time`);

      // 3. Claim Safety check: No forbidden A/S terms
      for (const banned of FORBIDDEN_AS_TERMS) {
        assert(!descStr.includes(banned), `Description [${descStr}] contains forbidden A/S claim [${banned}]`);
        assert(!titleStr.includes(banned), `Title [${titleStr}] contains forbidden A/S claim [${banned}]`);
      }

      // 4. OG Title & Description Sync
      assert.strictEqual(meta.openGraph?.title, expectedTitle);
      assert.strictEqual(meta.openGraph?.description, descStr);

      // 5. JSON-LD Description Sync
      const jsonLd = buildDynamicJsonLd(region, intent, SITE_CONFIG.siteOrigin);
      const jsonRecord = jsonLd as unknown as Record<string, unknown>;
      const serviceSchema = jsonRecord['@type'] === 'Service'
        ? jsonRecord
        : Array.isArray(jsonLd)
        ? (jsonLd.find((item: Record<string, unknown>) => item['@type'] === 'Service') as Record<string, unknown>)
        : jsonRecord;
      assert.strictEqual(serviceSchema.name, exactKeyword);
      assert.strictEqual(serviceSchema.description, descStr);

      // Title & Description Uniqueness
      seenTitles.add(titleStr);
      seenDescriptions.add(descStr);
    }
  }

  // Title & Description Uniqueness
  assert.strictEqual(seenTitles.size, 1908);
  assert.strictEqual(seenDescriptions.size, 1908);

  // 6 Intent Differentiation
  const intentDescTemplates = SEARCH_INTENTS.map((i) => i.descriptionTemplate('테스트동'));
  const uniqueTemplates = new Set(intentDescTemplates);
  assert.strictEqual(uniqueTemplates.size, 6);
});

// ----------------------------------------------------
// PHASE 6-F3: CUSTOMER REVIEWS SOCIAL-PROOF UI CONTRACT TESTS (UPDATED FOR PHASE 6-H2B TRUST NORMALIZATION)
// ----------------------------------------------------
test('Phase 6-F3: Customer Reviews Dataset SSOT contains 9 virtual reviewer identities & disclosures', () => {
  // 1. Dataset Count = 9
  assert.strictEqual(CUSTOMER_REVIEWS.length, 9, 'CUSTOMER_REVIEWS dataset must contain exactly 9 reviews');

  // 2. Virtual Reviewer Identity & Disclosure assertions
  const reviewIds = new Set(CUSTOMER_REVIEWS.map((r) => r.id));
  assert.strictEqual(reviewIds.size, 9, 'All 9 review IDs must be unique');

  for (const r of CUSTOMER_REVIEWS) {
    assert.strictEqual(r.disclosureLabel, '재구성 의견', `Disclosure label must be 재구성 의견 for ${r.id}`);
    assert.strictEqual(r.regionLabel, undefined, `Region label must be purged for ${r.id}`);
    assert.strictEqual(r.maskedName, undefined, `Masked name must be purged for ${r.id}`);
    assert.strictEqual(r.rating, undefined, `Rating must be purged for ${r.id}`);
  }

  // 3. Negative assertions: Zero full real names or unverified platform claims
  const stringifiedDataset = JSON.stringify(CUSTOMER_REVIEWS);
  assert(!stringifiedDataset.includes('네이버'), 'Dataset must NOT contain 네이버');
  assert(!stringifiedDataset.includes('카카오'), 'Dataset must NOT contain 카카오');
  assert(!stringifiedDataset.includes('Google'), 'Dataset must NOT contain Google');
  assert(!stringifiedDataset.includes('실제 고객 인증'), 'Dataset must NOT contain 실제 고객 인증');
});

test('Phase 6-F3: Component UI removes legacy system IDs & footer labels; enforces zero Review JSON-LD Schema', () => {
  const componentContent = fs.readFileSync(path.resolve('components/sections/CustomerReviewsSection.tsx'), 'utf-8');

  // 4. System IDs and legacy labels removed from user-facing UI text
  assert(!componentContent.includes('<span>{review.id}</span>'), 'Component JSX must NOT render system review ID to user UI text');
  assert(!componentContent.includes('ALLCARE CUSTOMER EXPERIENCE'), 'Component JSX must NOT render legacy ALLCARE CUSTOMER EXPERIENCE label');
  assert(!componentContent.includes('4.9'), 'Component JSX must NOT render 4.9 summary score');
  assert(!componentContent.includes('StarRatingRow'), 'Component JSX must NOT render star rating row');
  assert(!componentContent.includes('기준: 재구성 후기 콘텐츠'), 'Component JSX must NOT render summary card disclosure footer');

  // 5. Equipment / Furniture misunderstanding guard (0 occurrences across all reviews)
  const FORBIDDEN_EQUIPMENT_TERMS = [
    '세탁기',
    '건조기',
    '냉장고',
    '대형 가전',
    '가전 주변',
    '가전 뒤쪽',
    '물건이 있어도 작업',
    '짐이 있어도 작업',
    '옮기지 않아도 시공',
  ];

  for (const r of CUSTOMER_REVIEWS) {
    const textPool = `${r.headline} ${r.body}`;
    for (const term of FORBIDDEN_EQUIPMENT_TERMS) {
      assert(
        !textPool.includes(term),
        `Review [${r.id}] must not contain equipment implication term [${term}]`
      );
    }
  }

  // 6. Composition verification
  const mainPageContent = fs.readFileSync(path.resolve('app/page.tsx'), 'utf-8');
  const dynamicPageContent = fs.readFileSync(path.resolve('components/dynamic/DynamicLandingPage.tsx'), 'utf-8');
  assert(mainPageContent.includes('CustomerReviewsSection'), 'app/page.tsx must compose CustomerReviewsSection');
  assert(!dynamicPageContent.includes('CustomerReviewsSection'), 'DynamicLandingPage.tsx must NOT compose CustomerReviewsSection (unmounted for duplicate reduction)');

  // 7. JSON-LD Verification: Zero Review Schema, Zero AggregateRating Schema
  const activeRegions = getActiveRegions(true);
  const testRegion = activeRegions[0];
  const testIntent = SEARCH_INTENTS[0];
  const jsonLd = buildDynamicJsonLd(testRegion, testIntent, SITE_CONFIG.siteOrigin);
  const stringifiedJsonLd = JSON.stringify(jsonLd);

  assert(!stringifiedJsonLd.includes('"@type":"Review"'), 'JSON-LD must NOT contain Review schema');
  assert(!stringifiedJsonLd.includes('"@type":"AggregateRating"'), 'JSON-LD must NOT contain AggregateRating schema');
  assert(!stringifiedJsonLd.includes('ratingValue'), 'JSON-LD must NOT contain ratingValue');
  assert(!stringifiedJsonLd.includes('reviewCount'), 'JSON-LD must NOT contain reviewCount');
});

test('Phase 6-F3A: Customer Reviews Carousel enforces Desktop exactly 2 cards & Mobile exactly 1 card viewport constraints', () => {
  const componentContent = fs.readFileSync(path.resolve('components/sections/CustomerReviewsSection.tsx'), 'utf-8');

  // 1. Enforces desktop height lock lg:h-[436px] for exactly 2 cards (2 * 210px + 16px gap = 436px)
  assert(
    componentContent.includes('lg:h-[436px]'),
    'Carousel viewport must contain lg:h-[436px] to constrain desktop view to exactly 2 cards'
  );

  // 2. Enforces circular track mapping for seamless 2-card rendering at end of dataset
  assert(
    componentContent.includes('[...CUSTOMER_REVIEWS, CUSTOMER_REVIEWS[0]]'),
    'Carousel track must render circular dataset [...CUSTOMER_REVIEWS, CUSTOMER_REVIEWS[0]]'
  );

  // 3. Enforces card height h-[210px] for desktop viewport calculation
  assert(
    componentContent.includes("isDesktop ? 'h-[210px]' : 'min-h-[220px]'"),
    'Card height must preserve h-[210px] on desktop'
  );

  // 4. Enforces overflow-hidden on carousel viewport region
  assert(
    componentContent.includes('overflow-hidden'),
    'Carousel viewport must enforce overflow-hidden'
  );
});

test('Phase 6-F3B: Review Card Cleanup enforces 0 Category Tags, 0 Per-card Badges, 0 Summary Footer Copy & 1 Section Disclosure', () => {
  const componentContent = fs.readFileSync(path.resolve('components/sections/CustomerReviewsSection.tsx'), 'utf-8');

  // 1. Category Tag removed (0 visible tags)
  assert(
    !componentContent.includes('{review.category}'),
    'Component JSX must NOT render category tag'
  );

  // 2. Per-card "재구성 후기" Badge removed (0 visible badges)
  assert(
    !componentContent.includes('{review.disclosureLabel}'),
    'Component JSX must NOT render per-card disclosure badge'
  );

  // 3. Left summary card footer copy removed
  assert(
    !componentContent.includes('기준: 재구성 후기 콘텐츠'),
    'Component JSX must NOT render summary card footer copy'
  );

  // 4. Section-level disclosure preserved (1 time under section header)
  assert(
    componentContent.includes('상담과 시공 과정에서 자주 들었던 고객 의견을 이해하기 쉽게 재구성한 내용입니다.'),
    'Component JSX must render single section-level transparency disclosure in Section Description'
  );

  // 5. Enforces zero synthetic ratings and zero synthetic reviewer personas (Phase 6-H2B Trust Normalization)
  assert(!componentContent.includes('4.9'), 'Component JSX must NOT render 4.9 summary score');
  assert(!componentContent.includes('StarRatingRow'), 'Component JSX must NOT render StarRatingRow');
  assert(!componentContent.includes('review.regionLabel'), 'Component JSX must NOT render reviewer region label');
  assert(!componentContent.includes('review.maskedName'), 'Component JSX must NOT render reviewer masked name');
});

// ----------------------------------------------------
// PHASE 6-G2: MAIN -> HUB DISCOVERY LINK & SET CONSISTENCY
// ----------------------------------------------------
test('Phase 6-G2: Footer contains single crawlable link to /sitemap-seoul without nofollow', () => {
  const footerPath = path.resolve('components/common/Footer.tsx');
  assert(fs.existsSync(footerPath), 'Footer.tsx must exist');

  const footerContent = fs.readFileSync(footerPath, 'utf-8');

  // Must contain Link or href to /sitemap-seoul
  assert(
    footerContent.includes('href="/sitemap-seoul"') || footerContent.includes("href='/sitemap-seoul'"),
    'Footer must render crawlable link to /sitemap-seoul'
  );

  // Must not have rel="nofollow"
  assert(
    !footerContent.includes('nofollow'),
    'Footer link to /sitemap-seoul must NOT contain rel="nofollow"'
  );

  // Must contain user-visible anchor text
  assert(
    footerContent.includes('서울 지역별 탄성코트 안내') || footerContent.includes('서울 지역 안내'),
    'Footer link must contain valid user-visible anchor text'
  );
});

test('Phase 6-G2: Publication Gate Indexable, Sitemap, and Seoul Hub Sets match perfectly (1,908 URLs in Approved Set)', () => {
  const approvedRegions = PRODUCTION_REGIONS.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );
  assert.strictEqual(approvedRegions.length, 318);

  const indexableUrls: string[] = [];
  for (const r of approvedRegions) {
    for (const intent of SEARCH_INTENTS) {
      const href = buildPublicHref(r.keywordRegionName, intent.serviceKeyword);
      indexableUrls.push(href);
    }
  }

  assert.strictEqual(indexableUrls.length, 1908);

  // Verify Collision Hold region is strictly excluded from Indexable set
  const holdRegion = PRODUCTION_REGIONS.find((r) => r.id === 'seoul-eunpyeong-sinsa')!;
  assert.strictEqual(holdRegion.publicationState, 'PUBLISHED_NOINDEX');
  for (const intent of SEARCH_INTENTS) {
    const holdHref = buildPublicHref(holdRegion.keywordRegionName, intent.serviceKeyword);
    assert(!indexableUrls.includes(holdHref), `Hold href ${holdHref} must not be in Indexable set`);
  }
});

// ----------------------------------------------------
// PHASE 6-G2A: DYNAMIC BROWSER TAB TITLE SYNCHRONIZATION QA CONTRACTS
// ----------------------------------------------------

test('Phase 6-G2A [1 & 3]: buildDynamicTitle SSOT and DynamicTitleSync Component Contract', () => {
  // 1. Verify buildDynamicTitle SSOT returns exact required formula
  const sampleTitle = buildDynamicTitle('성수동', '탄성코트업체');
  assert.strictEqual(sampleTitle, '성수동 탄성코트업체 | A/S 보장 | 올케어');

  // Verify DynamicTitleSync component source file exists and reuses SSOT
  const syncComponentPath = path.join(process.cwd(), 'components/dynamic/DynamicTitleSync.tsx');
  assert(fs.existsSync(syncComponentPath), 'DynamicTitleSync.tsx must exist');
  const syncSource = fs.readFileSync(syncComponentPath, 'utf-8');

  assert(syncSource.includes("'use client'"), 'DynamicTitleSync must be a client component');
  assert(syncSource.includes('buildDynamicTitle'), 'DynamicTitleSync must import and use buildDynamicTitle SSOT');
  assert(!syncSource.includes('window.history.pushState'), 'DynamicTitleSync must NOT patch window.history');
  assert(!syncSource.includes('setInterval'), 'DynamicTitleSync must NOT use setInterval polling');
  assert(!syncSource.includes('MutationObserver'), 'DynamicTitleSync must NOT use MutationObserver');

  // Verify DynamicLandingPage mounts DynamicTitleSync
  const landingPagePath = path.join(process.cwd(), 'components/dynamic/DynamicLandingPage.tsx');
  const landingSource = fs.readFileSync(landingPagePath, 'utf-8');
  assert(landingSource.includes('<DynamicTitleSync'), 'DynamicLandingPage must mount DynamicTitleSync');
  assert(landingSource.includes('keywordRegionName={region.displayName || region.keywordRegionName}'), 'DynamicTitleSync must receive region prop');
  assert(landingSource.includes('serviceKeyword={intent.serviceKeyword}'), 'DynamicTitleSync must receive intent prop');

  // Verify app/page.tsx supplies key={rawKey} to DynamicLandingPage
  const pagePath = path.join(process.cwd(), 'app/page.tsx');
  const pageSource = fs.readFileSync(pagePath, 'utf-8');
  assert(pageSource.includes('key={rawKey}'), 'app/page.tsx must provide key={rawKey} to DynamicLandingPage');
});

test('Phase 6-G2A [2 & 13-15]: Approved 1,908 Expected Titles Unique & Server Metadata Invariants', () => {
  const approvedRegions = PRODUCTION_REGIONS.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );
  assert.strictEqual(approvedRegions.length, 318);

  const seenTitles = new Set<string>();
  const duplicateTitles: string[] = [];
  let approvedCount = 0;

  for (const region of approvedRegions) {
    for (const intent of SEARCH_INTENTS) {
      approvedCount++;
      const regionLabel = region.displayName || region.keywordRegionName;
      const expectedTitle = buildDynamicTitle(regionLabel, intent.serviceKeyword);
      const serverMetadata = buildDynamicMetadata(region, intent);

      // Verify Title SSOT match
      assert.strictEqual(serverMetadata.title, expectedTitle, `Server Title mismatch for ${region.keywordRegionName}-${intent.serviceKeyword}`);
      assert(expectedTitle.endsWith(' | A/S 보장 | 올케어'), `Title must end with SSOT suffix: ${expectedTitle}`);
      assert(expectedTitle.startsWith(`${regionLabel} ${intent.serviceKeyword}`), `Title must lead with exact keyword: ${expectedTitle}`);

      // Verify Uniqueness
      if (seenTitles.has(expectedTitle)) {
        duplicateTitles.push(expectedTitle);
      }
      seenTitles.add(expectedTitle);

      // Verify Canonical & Description invariants
      assert(serverMetadata.alternates?.canonical, 'Canonical must exist');
      assert(serverMetadata.description, 'Description must exist');
      assert.strictEqual(serverMetadata.description, intent.descriptionTemplate(regionLabel));
    }
  }

  assert.strictEqual(approvedCount, 1908, 'Must audit exactly 1,908 approved dynamic URLs');
  assert.strictEqual(duplicateTitles.length, 0, `Duplicate titles found: ${duplicateTitles.join(', ')}`);
  assert.strictEqual(seenTitles.size, 1908, 'Must produce exactly 1,908 unique titles');
});

test('Phase 6-G2A [4-8 & 21-22]: Client Navigation Matrix Simulation (Same-Region, Cross-Region, Back/Forward, Fast Navigation)', () => {
  // Navigation simulation history stack
  interface HistoryEntry {
    url: string;
    k: string;
    expectedTitle: string;
  }

  const simulateNavigation = (k: string): HistoryEntry => {
    const activeRegions = getActiveRegions();
    const validation = validateDynamicRoute(k, activeRegions);
    assert(validation.isValid && validation.region && validation.intent, `Route validation failed for ${k}`);
    const expectedTitle = buildDynamicTitle(validation.region.keywordRegionName, validation.intent.serviceKeyword);
    return {
      url: `https://www.allcaretan.co.kr/?k=${encodeURIComponent(k)}`,
      k,
      expectedTitle,
    };
  };

  // Case C: Same Region Related Intent Navigation
  const sameRegionIntents = [
    '강남구-탄성코트',
    '강남구-탄성코트시공',
    '강남구-베란다탄성코트',
    '강남구-세탁실탄성코트',
    '강남구-아파트탄성코트',
    '강남구-탄성코트업체',
  ];
  for (const k of sameRegionIntents) {
    const entry = simulateNavigation(k);
    assert(entry.expectedTitle.startsWith('강남구 '), `Same region intent title mismatch: ${entry.expectedTitle}`);
  }

  // Case D: Cross-Region Navigation
  const crossRegions = [
    '강남구-탄성코트',
    '불광동-탄성코트',
    '마곡동-탄성코트',
    '성수동-탄성코트',
  ];
  const crossEntries = crossRegions.map(simulateNavigation);
  assert.strictEqual(crossEntries[0].expectedTitle, '강남구 탄성코트 | A/S 보장 | 올케어');
  assert.strictEqual(crossEntries[1].expectedTitle, '불광동 탄성코트 | A/S 보장 | 올케어');
  assert.strictEqual(crossEntries[2].expectedTitle, '마곡동 탄성코트 | A/S 보장 | 올케어');
  assert.strictEqual(crossEntries[3].expectedTitle, '성수동 탄성코트 | A/S 보장 | 올케어');

  // Case E & History Back/Forward: A -> B -> C -> D -> BACK -> BACK -> FORWARD -> FORWARD
  const journeyKeys = [
    '강남구-탄성코트',
    '불광동-탄성코트',
    '마곡동-베란다탄성코트',
    '성수동-탄성코트업체',
  ];
  const historyStack: HistoryEntry[] = journeyKeys.map(simulateNavigation);
  let pointer = historyStack.length - 1; // At D (성수동-탄성코트업체)
  assert.strictEqual(historyStack[pointer].expectedTitle, '성수동 탄성코트업체 | A/S 보장 | 올케어');

  // BACK -> C (마곡동-베란다탄성코트)
  pointer--;
  assert.strictEqual(historyStack[pointer].expectedTitle, '마곡동 베란다탄성코트 | A/S 보장 | 올케어');

  // BACK -> B (불광동-탄성코트)
  pointer--;
  assert.strictEqual(historyStack[pointer].expectedTitle, '불광동 탄성코트 | A/S 보장 | 올케어');

  // FORWARD -> C (마곡동-베란다탄성코트)
  pointer++;
  assert.strictEqual(historyStack[pointer].expectedTitle, '마곡동 베란다탄성코트 | A/S 보장 | 올케어');

  // FORWARD -> D (성수동-탄성코트업체)
  pointer++;
  assert.strictEqual(historyStack[pointer].expectedTitle, '성수동 탄성코트업체 | A/S 보장 | 올케어');
});

test('Phase 6-G2A [9-12]: Main, Hub, Collision Hold, and Invalid URL Title Isolation Contracts', () => {
  // 9. Main Page Title SSOT
  const mainTitleExpected = `${SITE_CONFIG.brandName} | ${SITE_CONFIG.businessCategory}`;
  assert.strictEqual(mainTitleExpected, '올케어 | 탄성코트 전문 시공');

  // 10. Seoul Hub Page Title SSOT
  const hubPagePath = path.join(process.cwd(), 'app/sitemap-seoul/page.tsx');
  const hubSource = fs.readFileSync(hubPagePath, 'utf-8');
  assert(hubSource.includes("title: '서울 탄성코트 주요 지역 및 시공안내 | 올케어'"), 'Hub title metadata must match recovery title');
  assert(!hubSource.includes('DynamicTitleSync'), 'Hub page must NOT contain DynamicTitleSync');

  // 11. Collision Hold 6 URLs Title & Robots Invariant
  const holdRegion = PRODUCTION_REGIONS.find((r) => r.id === 'seoul-eunpyeong-sinsa')!;
  assert.strictEqual(holdRegion.publicationState, 'PUBLISHED_NOINDEX');
  for (const intent of SEARCH_INTENTS) {
    const holdTitle = buildDynamicTitle(holdRegion.keywordRegionName, intent.serviceKeyword);
    const holdMetadata = buildDynamicMetadata(holdRegion, intent);
    assert.strictEqual(holdTitle, `${holdRegion.keywordRegionName} ${intent.serviceKeyword} | A/S 보장 | 올케어`);
    assert.strictEqual(holdMetadata.title, holdTitle);
    const robots = holdMetadata.robots as { index?: boolean; follow?: boolean; nocache?: boolean };
    assert.strictEqual(robots.index, false, 'Collision hold URL must strictly emit noindex');
    assert.strictEqual(robots.follow, false, 'Collision hold URL must strictly emit nofollow');
    assert.strictEqual(robots.nocache, true, 'Collision hold URL must strictly emit nocache');
  }

  // 12. Invalid URL handling: empty, unknown region, unknown intent, multiple keys
  const activeRegions = getActiveRegions();
  const invalidCases = [
    'invalid-region-keyword',
    '강남구-존재하지않는의도',
    '없는동-탄성코트',
    '',
  ];
  for (const invalidKey of invalidCases) {
    const validation = validateDynamicRoute(invalidKey, activeRegions);
    assert.strictEqual(validation.isValid, false, `Expected isValid=false for invalid key: "${invalidKey}"`);
  }
});

test('Phase 6-G2A [15]: Representative QA 8 URLs Contract Verification', () => {
  const representativeTestSet = [
    { key: '강남구-탄성코트', expectedTitle: '강남구 탄성코트 | A/S 보장 | 올케어', isHold: false, isRecovery: true },
    { key: '불광동-탄성코트', expectedTitle: '불광동 탄성코트 | A/S 보장 | 올케어', isHold: false, isRecovery: true },
    { key: '마곡동-베란다탄성코트', expectedTitle: '마곡동 베란다탄성코트 | A/S 보장 | 올케어', isHold: false, isRecovery: false },
    { key: '삼청동-세탁실탄성코트', expectedTitle: '삼청동 세탁실탄성코트 | A/S 보장 | 올케어', isHold: false, isRecovery: false },
    { key: '서초구-아파트탄성코트', expectedTitle: '서초구 아파트탄성코트 | A/S 보장 | 올케어', isHold: false, isRecovery: false },
    { key: '성수동-탄성코트업체', expectedTitle: '성수동 탄성코트업체 | A/S 보장 | 올케어', isHold: false, isRecovery: false },
    { key: '불광동-탄성코트시공', expectedTitle: '불광동 탄성코트시공 | A/S 보장 | 올케어', isHold: false, isRecovery: false },
    { key: '신사동-탄성코트', expectedTitle: '신사동 탄성코트 | A/S 보장 | 올케어', isHold: true, isRecovery: false },
  ];

  const activeRegions = getActiveRegions();

  for (const item of representativeTestSet) {
    const validation = validateDynamicRoute(item.key, activeRegions);
    assert(validation.isValid && validation.region && validation.intent, `Validation failed for ${item.key}`);

    const serverMetadata = buildDynamicMetadata(validation.region, validation.intent);
    const dynamicTitle = buildDynamicTitle(validation.region.keywordRegionName, validation.intent.serviceKeyword);

    assert.strictEqual(serverMetadata.title, item.expectedTitle, `Server Title mismatch for ${item.key}`);
    assert.strictEqual(dynamicTitle, item.expectedTitle, `Client Title mismatch for ${item.key}`);

    const robots = serverMetadata.robots as { index?: boolean; follow?: boolean; nocache?: boolean };
    if (item.isHold) {
      assert.strictEqual(robots.index, false, `Hold URL ${item.key} must be noindex`);
      assert.strictEqual(robots.follow, false, `Hold URL ${item.key} must be nofollow`);
      assert.strictEqual(robots.nocache, true, `Hold URL ${item.key} must be nocache`);
    } else if (item.isRecovery) {
      assert.strictEqual(robots.index, true, `Recovery URL ${item.key} must be index`);
      assert.strictEqual(robots.follow, true, `Recovery URL ${item.key} must be follow`);
    } else {
      assert.strictEqual(robots.index, false, `Non-recovery Approved URL ${item.key} must be noindex`);
      assert.strictEqual(robots.follow, true, `Non-recovery Approved URL ${item.key} must be follow`);
    }
  }
});

/**
 * PHASE 6-H1A: 5 REGION x 6 INTENT LOCAL INSIGHT PILOT TESTS
 */
test('Phase 6-H1A [1]: Exactly 5 Pilot Region Profiles in SSOT', () => {
  assert.strictEqual(PILOT_LOCAL_INSIGHT_PROFILES.length, 5, 'Must have exactly 5 Pilot profiles');
  const pilotIds = PILOT_LOCAL_INSIGHT_PROFILES.map((p) => p.regionId);
  assert(pilotIds.includes('seoul-gangnam-gu'), 'Must include Gangnam-gu');
  assert(pilotIds.includes('seoul-eunpyeong-bulgwang'), 'Must include Bulgwang-dong');
  assert(pilotIds.includes('seoul-gangseo-마곡동'), 'Must include Magok-dong');
  assert(pilotIds.includes('seoul-seongdong-성수동'), 'Must include Seongsu-dong');
  assert(pilotIds.includes('seoul-jongno-창신동'), 'Must include Changsin-dong');
});

test('Phase 6-H1A [2]: Exactly 30 Pilot Region-Intent Combinations Render Non-Null Insight', () => {
  const pilotIds = ['seoul-gangnam-gu', 'seoul-eunpyeong-bulgwang', 'seoul-gangseo-마곡동', 'seoul-seongdong-성수동', 'seoul-jongno-창신동'];
  let pilotRenderCount = 0;

  for (const pid of pilotIds) {
    for (const kw of SERVICE_KEYWORDS) {
      const insight = getLocalInsight(pid, kw);
      assert(insight !== null, `Pilot insight must not be null for ${pid} + ${kw}`);
      assert(insight.factText.length > 50, `Fact text must be substantial for ${pid} + ${kw}`);
      assert(insight.limitationText.length > 20, `Limitation text must be substantial for ${pid} + ${kw}`);
      assert(insight.checkpointText.length > 30, `Checkpoint text must be substantial for ${pid} + ${kw}`);
      assert.strictEqual(
        insight.sourceLabel,
        '출처: 한국부동산원 공동주택 식별정보 공개자료 · 2026.08 기준',
        `Source label must match frozen label for ${pid} + ${kw}`
      );
      pilotRenderCount++;
    }
  }

  assert.strictEqual(pilotRenderCount, 30, 'Must have exactly 30 Pilot combinations');
});

test('Phase 6-H1A [3]: Control 30 Combinations Render Strictly Null (Zero-DOM)', () => {
  const controlIds = [
    'seoul-seocho-gu',
    'seoul-eunpyeong-갈현동',
    'seoul-gangseo-가양동',
    'seoul-gwangjin-자양동',
    'seoul-jongno-숭인동',
  ];
  let controlNullCount = 0;

  for (const cid of controlIds) {
    for (const kw of SERVICE_KEYWORDS) {
      const insight = getLocalInsight(cid, kw);
      assert.strictEqual(insight, null, `Control ${cid} + ${kw} must return null`);
      controlNullCount++;
    }
  }

  assert.strictEqual(controlNullCount, 30, 'All 30 Control combinations must return null');
});

test('Phase 6-H1A [4]: Non-Pilot Regions Render Strictly Null (Zero-DOM)', () => {
  const sampleNonPilotIds = [
    'seoul-mapo-gu',
    'seoul-songpa-gu',
    'seoul-nowon-gu',
    'seoul-yeongdeungpo-yeouido',
    'seoul-yongsan-itaewon',
    'seoul-dongdaemun-cheongnyangni',
    'seoul-seodaemun-sinchon',
    'seoul-guro-guro',
    'seoul-gangdong-cheonho',
    'seoul-jungnang-myeonmok',
  ];

  for (const rid of sampleNonPilotIds) {
    for (const kw of SERVICE_KEYWORDS) {
      const insight = getLocalInsight(rid, kw);
      assert.strictEqual(insight, null, `Non-pilot ${rid} + ${kw} must return null`);
    }
  }
});

test('Phase 6-H1A [5]: Collision Hold (Sinsa-dong) URLs Render Strictly Null', () => {
  for (const kw of SERVICE_KEYWORDS) {
    const insight = getLocalInsight('seoul-eunpyeong-sinsa', kw);
    assert.strictEqual(insight, null, `Collision hold sinsa + ${kw} must return null`);
  }
});

test('Phase 6-H1A [6 & 7]: Source Label and Limitation Text Invariants', () => {
  const expectedSource = '출처: 한국부동산원 공동주택 식별정보 공개자료 · 2026.08 기준';
  const expectedLimitation = '※ 공개 데이터의 건물 연식이나 주거 유형만으로 개별 세대의 탄성코트 시공 필요성을 판단할 수는 없습니다.';

  for (const profile of PILOT_LOCAL_INSIGHT_PROFILES) {
    assert.strictEqual(profile.sourceLabel, expectedSource, `Source mismatch for ${profile.regionName}`);
    assert.strictEqual(profile.limitationText, expectedLimitation, `Limitation mismatch for ${profile.regionName}`);
  }
});

test('Phase 6-H1A [8]: All 6 Intent Checkpoint Keys Present on All 5 Profiles', () => {
  for (const profile of PILOT_LOCAL_INSIGHT_PROFILES) {
    for (const kw of SERVICE_KEYWORDS) {
      const cp = profile.intentCheckpoints[kw];
      assert(Boolean(cp) && cp.length > 0, `Missing checkpoint for ${profile.regionName} + ${kw}`);
    }
  }
});

test('Phase 6-H1A [9]: Unsupported Local Characterizations Banned', () => {
  const bannedKeywords = [
    '북한산',
    '구도심 빌라',
    '계획 신도시',
    '준공업',
    '재개발 지역',
    '초고령',
    '핵심 주거지',
    '고수요',
    '인기 지역',
    '문의가 많은',
    '수요가 높은',
  ];

  for (const profile of PILOT_LOCAL_INSIGHT_PROFILES) {
    for (const banned of bannedKeywords) {
      assert(!profile.factText.includes(banned), `Fact text of ${profile.regionName} contains banned keyword: ${banned}`);
      assert(!profile.limitationText.includes(banned), `Limitation text contains banned keyword: ${banned}`);
      for (const kw of SERVICE_KEYWORDS) {
        assert(!profile.intentCheckpoints[kw].includes(banned), `Checkpoint contains banned keyword: ${banned}`);
      }
    }
  }
});

test('Phase 6-H1A [10]: Prohibited Causal / Marketing Claims Banned', () => {
  const bannedClaims = [
    '완벽',
    '100%',
    '영구',
    '반드시',
    '무조건',
    '최고',
    '1위',
    '최저가',
    '결로 해결',
    '곰팡이 해결',
    '누수 해결',
    '박리 방지 보장',
    '노후 지역',
  ];

  for (const profile of PILOT_LOCAL_INSIGHT_PROFILES) {
    for (const claim of bannedClaims) {
      assert(!profile.factText.includes(claim), `Fact text of ${profile.regionName} contains prohibited claim: ${claim}`);
      for (const kw of SERVICE_KEYWORDS) {
        assert(!profile.intentCheckpoints[kw].includes(claim), `Checkpoint contains prohibited claim: ${claim}`);
      }
    }
  }
});

test('Phase 6-H1A [11]: No Fabricated Fallback for Unknown Inputs', () => {
  assert.strictEqual(getLocalInsight('unknown-region-id', '탄성코트'), null);
  assert.strictEqual(getLocalInsight('', '탄성코트'), null);
  assert.strictEqual(getLocalInsight(undefined, '탄성코트'), null);
  assert.strictEqual(getLocalInsight('seoul-gangnam-gu', undefined), null);
});

test('Phase 6-H1A [12]: Main Page Call Returns Null (Zero Insight)', () => {
  assert.strictEqual(getLocalInsight(undefined, undefined), null);
});

test('Phase 6-H1A [13]: Dynamic SEO Metadata Frozen Across Pilot & Non-Pilot', () => {
  const activeRegions = getActiveRegions();
  const testKey = '강남구-탄성코트';
  const validation = validateDynamicRoute(testKey, activeRegions);
  assert(validation.isValid && validation.region && validation.intent);

  const meta = buildDynamicMetadata(validation.region, validation.intent);
  assert.strictEqual(meta.title, '강남구 탄성코트 | A/S 보장 | 올케어');
  assert.strictEqual(meta.alternates?.canonical, 'https://www.allcaretan.co.kr/?k=%EA%B0%95%EB%82%A8%EA%B5%AC-%ED%83%84%EC%84%B1%EC%BD%94%ED%8A%B8');
});

test('Phase 6-H1A [14 & 15]: Sitemap & Hub Counts Preserved in Approved Universe', () => {
  const approvedRegions = PRODUCTION_REGIONS.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );
  assert.strictEqual(approvedRegions.length, 318, 'Approved regions must be 318');
  const expectedDynamicCount = approvedRegions.length * 6;
  assert.strictEqual(expectedDynamicCount, 1908, 'Expected dynamic URL count must be 1908');
});

test('Phase 6-H1A [16]: Pilot Facts Exact Match with Phase 6-H0-R Frozen SSOT', () => {
  const gangnam = PILOT_LOCAL_INSIGHT_PROFILES.find((p) => p.regionId === 'seoul-gangnam-gu')!;
  assert(gangnam.factText.includes('4,421개 단위'), 'Gangnam units mismatch');
  assert(gangnam.factText.includes('168,588세대'), 'Gangnam households mismatch');
  assert(gangnam.factText.includes('69.3%'), 'Gangnam 20+ share mismatch');

  const bulgwang = PILOT_LOCAL_INSIGHT_PROFILES.find((p) => p.regionId === 'seoul-eunpyeong-bulgwang')!;
  assert(bulgwang.factText.includes('1,447개 단위'), 'Bulgwang units mismatch');
  assert(bulgwang.factText.includes('96.1%'), 'Bulgwang multi share mismatch');
  assert(bulgwang.factText.includes('65.8%'), 'Bulgwang 20+ share mismatch');

  const magok = PILOT_LOCAL_INSIGHT_PROFILES.find((p) => p.regionId === 'seoul-gangseo-마곡동')!;
  assert(magok.factText.includes('95개 단위'), 'Magok units mismatch');
  assert(magok.factText.includes('38.9%'), 'Magok apt share mismatch');
  assert(magok.factText.includes('48.9%'), 'Magok 20+ share mismatch');

  const seongsu = PILOT_LOCAL_INSIGHT_PROFILES.find((p) => p.regionId === 'seoul-seongdong-성수동')!;
  assert(seongsu.factText.includes('315개 단위'), 'Seongsu units mismatch');
  assert(seongsu.factText.includes('14,092세대'), 'Seongsu households mismatch');
  assert(seongsu.factText.includes('59.0%'), 'Seongsu 20+ share mismatch');

  const changsin = PILOT_LOCAL_INSIGHT_PROFILES.find((p) => p.regionId === 'seoul-jongno-창신동')!;
  assert(changsin.factText.includes('274개 단위'), 'Changsin units mismatch');
  assert(changsin.factText.includes('89.8%'), 'Changsin multi share mismatch');
  assert(changsin.factText.includes('92.7%'), 'Changsin 20+ share mismatch');
});

// ----------------------------------------------------
// PHASE 6-I0B: RECOVERY + YANGCHEON COHORT ARCHITECTURE VERIFICATION
// ----------------------------------------------------

test('Phase 6-M1A: Recovery SSOT contains Base 15 Regions + Yangcheon 4 + Guro P1 8 + Yeongdeungpo P1 9 Regions', () => {
  assert.strictEqual(RECOVERY_ENABLED, true, 'Recovery mode must be enabled');
  assert.strictEqual(BASE_RECOVERY_INTENT, '탄성코트', 'Base primary intent must strictly be 탄성코트');
  assert.strictEqual(BASE_RECOVERY_REGION_IDS.length, 15, 'Base recovery regions must be exactly 15');
  assert.strictEqual(YANGCHEON_COHORT_REGION_IDS.length, 4, 'Yangcheon cohort regions must be exactly 4');
  assert.strictEqual(GURO_COHORT_REGION_IDS.length, 8, 'Guro P1 cohort regions must be exactly 8');
  assert.strictEqual(YEONGDEUNGPO_COHORT_REGION_IDS.length, 9, 'Yeongdeungpo P1 cohort regions must be exactly 9');
  assert.strictEqual(RECOVERY_REGION_IDS.length, 35, 'Total recovery profile IDs must be exactly 35 (15 Base + 3 Yangcheon New + 8 Guro P1 + 9 Yeongdeungpo P1)');

  const expectedGu = ['seoul-gangnam-gu', 'seoul-seocho-gu', 'seoul-eunpyeong-gu', 'seoul-gangseo-gu', 'seoul-seongdong-gu'];
  const expectedDong = [
    'seoul-eunpyeong-bulgwang',
    'seoul-eunpyeong-갈현동',
    'seoul-gangseo-마곡동',
    'seoul-gangseo-가양동',
    'seoul-seongdong-성수동',
    'seoul-gwangjin-자양동',
    'seoul-jongno-창신동',
    'seoul-jongno-숭인동',
    'seoul-nowon-상계동',
    'seoul-yangcheon-목동',
  ];

  for (const id of expectedGu) {
    assert((BASE_RECOVERY_REGION_IDS as readonly string[]).includes(id), `Missing expected GU: ${id}`);
    assert(isRecoveryRegion(id), `isRecoveryRegion failed for GU: ${id}`);
  }
  for (const id of expectedDong) {
    assert((BASE_RECOVERY_REGION_IDS as readonly string[]).includes(id), `Missing expected DONG: ${id}`);
    assert(isRecoveryRegion(id), `isRecoveryRegion failed for DONG: ${id}`);
  }

  // Verify all 18 profiles have complete factual profiles with zero null/undefined
  for (const id of RECOVERY_REGION_IDS) {
    const profile = getRecoveryProfile(id);
    assert(profile, `Profile must exist for ${id}`);
    assert(profile.units > 0, `Units count must be > 0 for ${id}`);
    assert(profile.households > 0, `Households count must be > 0 for ${id}`);
    assert(profile.validDates > 0, `Valid dates count must be > 0 for ${id}`);
    assert(profile.aptShare.endsWith('%'), `aptShare must end with % for ${id}`);
    assert(profile.villaShare.endsWith('%'), `villaShare must end with % for ${id}`);
    assert(profile.over20Share.endsWith('%'), `over20Share must end with % for ${id}`);
    assert.strictEqual(profile.relatedRecoveryRegionIds.length >= 2, true, `Related count must be >= 2 for ${id}`);
  }
});

test('Phase 6-K1A: Full 1,914 Dynamic Robots Split: Exactly 38 Indexable, 1,870 Noindex/Follow, 6 Collision Hold', () => {
  let indexableCount = 0;
  let noindexFollowCount = 0;
  let collisionHoldCount = 0;

  for (const region of PRODUCTION_REGIONS) {
    for (const intent of SEARCH_INTENTS) {
      const metadata = buildDynamicMetadata(region, intent);
      const robots = metadata.robots as { index?: boolean; follow?: boolean; nocache?: boolean };

      if (robots.index === true && robots.follow === true) {
        indexableCount++;
        assert(isIndexableDynamicPage(region.id, intent.serviceKeyword), `Indexed page ${region.id}-${intent.serviceKeyword} must be in Indexable SSOT`);
      } else if (robots.index === false && robots.follow === true) {
        noindexFollowCount++;
        assert(region.id !== 'seoul-eunpyeong-sinsa', `Collision hold must not be noindex/follow`);
      } else if (robots.index === false && robots.follow === false && robots.nocache === true) {
        collisionHoldCount++;
        assert.strictEqual(region.id, 'seoul-eunpyeong-sinsa', `Only collision hold region should have nocache/nofollow`);
      } else {
        assert.fail(`Unexpected robots configuration: ${JSON.stringify(robots)} for ${region.id}-${intent.serviceKeyword}`);
      }
    }
  }

  assert.strictEqual(indexableCount, 56, 'Indexable count must be exactly 56 (15 Base + 7 Yangcheon + 16 Guro + 18 Yeongdeungpo)');
  assert.strictEqual(noindexFollowCount, 1852, 'Non-recovery approved noindex count must be exactly 1,852');
  assert.strictEqual(collisionHoldCount, 6, 'Collision hold count must be exactly 6');
  assert.strictEqual(indexableCount + noindexFollowCount + collisionHoldCount, 1914, 'Total dynamic URLs must be exactly 1,914');
});

test('Phase 6-H2B [3]: CustomerReviewsSection completely unmounted from DynamicLandingPage (0 duplicate SSR)', () => {
  const dynamicPagePath = path.resolve('components/dynamic/DynamicLandingPage.tsx');
  const source = fs.readFileSync(dynamicPagePath, 'utf-8');

  assert(!source.includes('CustomerReviewsSection'), 'CustomerReviewsSection must be unmounted from DynamicLandingPage');
  assert(!source.includes('CUSTOMER_REVIEWS'), 'CUSTOMER_REVIEWS must not be imported in DynamicLandingPage');
});

test('Phase 6-H2B [4]: Related Recovery Navigation links strictly to 2-3 adjacent Recovery URLs', () => {
  for (const id of RECOVERY_REGION_IDS) {
    const related = getRelatedRecoveryRegions(id);
    assert(related.length >= 2 && related.length <= 3, `Related regions count for ${id} must be between 2 and 3, got ${related.length}`);
    for (const r of related) {
      assert(RECOVERY_REGION_IDS.includes(r.id), `Related region ${r.id} must be in Recovery set`);
      assert.notStrictEqual(r.id, id, `Self-reference not allowed in related regions for ${id}`);
    }
  }
});

// ----------------------------------------------------
// PHASE 6-I0B-2: INFORMATION GUIDE + RSS CONTRACT TESTS
// ----------------------------------------------------

test('Phase 6-I0B-2 [1]: Production Region Categories Exact Partition Invariant (319 Total)', () => {
  const guList = PRODUCTION_REGIONS.filter((r) => r.regionType === 'GU');
  const normalDongList = PRODUCTION_REGIONS.filter(
    (r) => r.regionType === 'DONG' && r.id !== 'seoul-eunpyeong-sinsa' && r.id !== 'seoul-yangcheon-sinjeong'
  );
  const collisionDongList = PRODUCTION_REGIONS.filter((r) => r.id === 'seoul-eunpyeong-sinsa');
  const disambiguatedDongList = PRODUCTION_REGIONS.filter((r) => r.id === 'seoul-yangcheon-sinjeong');

  const guCount = guList.length;
  const normalDongCount = normalDongList.length;
  const collisionRegionCount = collisionDongList.length;
  const disambiguatedProductionDongCount = disambiguatedDongList.length;
  const totalProductionRegionCount = PRODUCTION_REGIONS.length;

  assert.strictEqual(guCount, 25, 'GU_COUNT must be exactly 25');
  assert.strictEqual(normalDongCount, 292, 'NORMAL_DONG_COUNT must be exactly 292 (291 approved dongs + 1 bulgwang)');
  assert.strictEqual(collisionRegionCount, 1, 'COLLISION_REGION_COUNT must be exactly 1 (eunpyeong-sinsa)');
  assert.strictEqual(disambiguatedProductionDongCount, 1, 'DISAMBIGUATED_PRODUCTION_DONG_COUNT must be exactly 1 (yangcheon-sinjeong)');
  assert.strictEqual(totalProductionRegionCount, 319, 'TOTAL_PRODUCTION_REGION_COUNT must be exactly 319');
  assert.strictEqual(
    guCount + normalDongCount + collisionRegionCount + disambiguatedProductionDongCount,
    totalProductionRegionCount,
    'Sum of region categories must reconcile to exactly 319'
  );
});

test('Phase 6-K1B [2]: Exactly 4 Information Guides (Unique URLs, Titles, Canonicals, Indexable)', () => {
  const guides = getAllGuides();
  assert.strictEqual(guides.length, 4, 'Must contain exactly 4 Information Guides');

  const seenSlugs = new Set<string>();
  const seenTitles = new Set<string>();

  const prohibitedWords = [
    '완벽', '100%', '영구', '무조건', '최고', '1위', '최저가',
    '무상 A/S', '평생 A/S', '결로 완전 해결', '곰팡이 완전 방지', '박리 재발 없음',
  ];

  const allowedSlugs = [
    'balcony-coating-checklist',
    'old-apartment-balcony-recoating-guide',
    'elastic-coating-estimate-work-scope-guide',
    'elastic-coating-preparation-protection-checklist',
  ];

  for (const g of guides) {
    // Unique slug & title
    assert(!seenSlugs.has(g.slug), `Duplicate slug: ${g.slug}`);
    assert(!seenTitles.has(g.title), `Duplicate title: ${g.title}`);
    seenSlugs.add(g.slug);
    seenTitles.add(g.title);

    // Verify self-canonical path
    assert(allowedSlugs.includes(g.slug), `Unexpected guide slug: ${g.slug}`);
    assert(g.title.endsWith('| 올케어 시공 가이드'), `Guide title must end with official suffix: ${g.title}`);

    // Verify claim safety
    const fullText = JSON.stringify(g);
    for (const banned of prohibitedWords) {
      assert(!fullText.includes(banned), `Guide ${g.slug} contains forbidden claim: ${banned}`);
    }

    // Verify Equipment safety in Guide 01
    if (g.slug === 'balcony-coating-checklist') {
      assert(fullText.includes('세탁기'), 'Guide 01 must mention washing machine / appliance clearing');
      assert(fullText.includes('공간 비움'), 'Guide 01 must emphasize clearing space before work');
      assert(fullText.includes('사전에 명확히 협의'), 'Guide 01 must state appliance handling is confirmed with contractor');
    }

    // Verify Negative constraints in Guide 02
    if (g.slug === 'old-apartment-balcony-recoating-guide') {
      assert(fullText.includes('구축 아파트라 하여 탄성코트가 필수적인 요건은 아니며'), 'Guide 02 must state coating is not unconditionally necessary');
      assert(fullText.includes('단순 덧칠'), 'Guide 02 must explain difference from simple repainting');
      assert(fullText.includes('밑작업'), 'Guide 02 must emphasize preparatory scraping/putty work');
    }

    // Verify Scope & Estimate variables in Guide 03
    if (g.slug === 'elastic-coating-estimate-work-scope-guide') {
      assert(fullText.includes('작업 범위'), 'Guide 03 must discuss work scope definition');
      assert(fullText.includes('밑작업'), 'Guide 03 must emphasize preparatory work details');
      assert(fullText.includes('현장 변수'), 'Guide 03 must explain on-site variables influencing costs');
      assert(fullText.includes('비용 차이'), 'Guide 03 must analyze reasons for estimate discrepancies');
    }

    // Verify Clear Space & Masking Checklist in Guide 04
    if (g.slug === 'elastic-coating-preparation-protection-checklist') {
      assert(fullText.includes('공간 비움'), 'Guide 04 must emphasize clearing space');
      assert(fullText.includes('보양'), 'Guide 04 must explain masking and surface protection');
      assert(fullText.includes('사전 이동'), 'Guide 04 must cover pre-moving of household items');
      assert(fullText.includes('동선 확보'), 'Guide 04 must detail path and ventilation clearance');
    }
  }
});

test('Phase 6-N1A: RSS Route Validation (HTTP 200, Valid XML, 22 Items: 4 Pillar Guides + 18 Keyword Guides)', async () => {
  const rssRes = await getRssResponse();
  assert.strictEqual(rssRes.status, 200, 'RSS endpoint must return HTTP 200');
  assert(rssRes.headers.get('content-type')?.includes('application/xml'), 'RSS must return XML content-type');

  const rssText = await rssRes.text();

  // Basic RSS structure checks
  assert(rssText.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'RSS must start with XML declaration');
  assert(rssText.includes('<rss version="2.0"'), 'RSS version must be 2.0');
  assert(rssText.includes('<channel>'), 'RSS must contain <channel>');

  // Exactly 22 items (4 Pillar Guides + 18 Keyword Guides)
  const itemMatches = rssText.match(/<item>/g) || [];
  assert.strictEqual(itemMatches.length, 22, 'RSS must contain exactly 22 <item> tags (4 Pillar Guides + 18 Keyword Guides)');

  // Verify item links match Pillar Guide URLs
  const guides = getAllGuides();
  for (const g of guides) {
    const expectedLink = `https://www.allcaretan.co.kr/guide/${g.slug}`;
    assert(rssText.includes(`<link>${expectedLink}</link>`), `RSS must contain link to ${expectedLink}`);
    assert(rssText.includes(`<guid isPermaLink="true">${expectedLink}</guid>`), `RSS must contain guid for ${expectedLink}`);
  }

  // Verify Keyword Guide URLs and Titles are present in RSS
  const keywordGuides = getAllKeywordGuides();
  for (const kg of keywordGuides) {
    const expectedLink = `https://www.allcaretan.co.kr/guide/${kg.slug}`;
    assert(rssText.includes(`<link>${expectedLink}</link>`), `RSS must contain link to ${expectedLink}`);
    assert(rssText.includes(`<guid isPermaLink="true">${expectedLink}</guid>`), `RSS must contain guid for ${expectedLink}`);
    assert(rssText.includes(kg.title), `RSS must contain Keyword Guide title: ${kg.title}`);
  }

  // Strictly ZERO Direct Dynamic URLs in RSS
  assert(!rssText.includes('/?k='), 'RSS must NOT contain direct dynamic landing pages');
  assert(!rssText.includes('목동-탄성코트'), 'RSS must NOT contain historical dynamic landing pages');
  assert(!rssText.includes('양천구-탄성코트'), 'RSS must NOT contain historical dynamic landing pages');
  assert(!rssText.includes('구로구-탄성코트'), 'RSS must NOT contain historical dynamic landing pages');
  assert(!rssText.includes('신도림동-탄성코트'), 'RSS must NOT contain historical dynamic landing pages');
  assert(!rssText.includes('강남구-탄성코트'), 'RSS must NOT contain historical dynamic landing pages');
});

test('Phase 6-M1A: Seoul Hub Compact Directory (56 Dynamic SSR Links + 4 Separate Guides)', () => {
  const hubPath = path.resolve('app/sitemap-seoul/page.tsx');
  const hubSource = fs.readFileSync(hubPath, 'utf-8');

  // 1. Must use compact district text directory layout (56 dynamic links)
  assert(hubSource.includes('DISTRICT_ORDER'), 'Hub must organize by district order');
  assert(hubSource.includes('56 PRIMARY PAGES'), 'Hub must reference 56 primary pages');
  assert(hubSource.includes('56개 공식 안내 페이지'), 'Hub heading must state 56 pages');

  // 2. Guides section is semantically separate and renders all 4 guides
  assert(hubSource.includes('aria-labelledby="guide-links-heading"'), 'Hub must contain separate guide section');
  assert(hubSource.includes('/guide/balcony-coating-checklist'), 'Hub must link to Guide 01');
  assert(hubSource.includes('/guide/old-apartment-balcony-recoating-guide'), 'Hub must link to Guide 02');
  assert(hubSource.includes('/guide/elastic-coating-estimate-work-scope-guide'), 'Hub must link to Guide 03');
  assert(hubSource.includes('/guide/elastic-coating-preparation-protection-checklist'), 'Hub must link to Guide 04');
});

test('Phase 6-K1A [1]: Guro-Gu P1 South Cohort 16 Dynamic URLs Full Matrix Contract', () => {
  const guroP1Regions = [
    'seoul-guro-gu',
    'seoul-guro-신도림동',
    'seoul-guro-구로동',
    'seoul-guro-고척동',
    'seoul-guro-개봉동',
    'seoul-guro-오류동',
    'seoul-guro-천왕동',
    'seoul-guro-항동',
  ];
  const p1Intents = ['탄성코트', '베란다탄성코트'] as const;

  assert.strictEqual(guroP1Regions.length, 8, 'Guro P1 must contain exactly 8 regions');
  assert.strictEqual(p1Intents.length, 2, 'Guro P1 must contain exactly 2 intents');

  for (const regionId of guroP1Regions) {
    const region = PRODUCTION_REGIONS.find((r) => r.id === regionId);
    assert(region, `Region ${regionId} must exist in PRODUCTION_REGIONS`);

    for (const intentKeyword of p1Intents) {
      assert(
        isIndexableDynamicPage(regionId, intentKeyword),
        `Guro P1 ${region.keywordRegionName} ${intentKeyword} must be indexable`
      );

      const intent = SEARCH_INTENTS.find((i) => i.serviceKeyword === intentKeyword);
      assert(intent, `Intent ${intentKeyword} must exist`);

      const metadata = buildDynamicMetadata(region, intent);
      const robots = metadata.robots as { index?: boolean; follow?: boolean };
      assert.strictEqual(robots.index, true, `${region.keywordRegionName} ${intentKeyword} must have robots.index = true`);
      assert.strictEqual(robots.follow, true, `${region.keywordRegionName} ${intentKeyword} must have robots.follow = true`);

      // Title & H1 format check
      const expectedTitle: string = `${region.keywordRegionName} ${intentKeyword} | A/S 보장 | 올케어`;
      assert.strictEqual(metadata.title, expectedTitle);

      const canonical = metadata.alternates?.canonical;
      const expectedCanonical: string = `https://www.allcaretan.co.kr/?k=${encodeURIComponent(`${region.keywordRegionName}-${intentKeyword}`)}`;
      assert.strictEqual(canonical, expectedCanonical);
    }

    // Verify non-authorized intents remain NOINDEX
    const otherIntents = ['탄성코트시공', '세탁실탄성코트', '아파트탄성코트', '탄성코트업체'] as const;
    for (const otherKw of otherIntents) {
      assert(
        !isIndexableDynamicPage(regionId, otherKw),
        `Guro P1 non-authorized intent ${region.keywordRegionName} ${otherKw} must NOT be indexable`
      );
      const otherIntent = SEARCH_INTENTS.find((i) => i.serviceKeyword === otherKw);
      if (otherIntent) {
        const metadata = buildDynamicMetadata(region, otherIntent);
        const robots = metadata.robots as { index?: boolean; follow?: boolean };
        assert.strictEqual(robots.index, false, `Non-authorized intent ${otherKw} must have robots.index = false`);
        assert.strictEqual(robots.follow, true, `Non-authorized intent ${otherKw} must have robots.follow = true`);
      }
    }
  }
});

test('Phase 6-K1A [2]: Guro-Gu P2 Regions Negative Test (가리봉동, 궁동, 온수동 strictly NOINDEX)', () => {
  const p2RegionIds = [
    'seoul-guro-가리봉동',
    'seoul-guro-궁동',
    'seoul-guro-온수동',
  ];
  const allIntents = ['탄성코트', '베란다탄성코트', '탄성코트시공', '세탁실탄성코트', '아파트탄성코트', '탄성코트업체'] as const;

  for (const p2Id of p2RegionIds) {
    const region = PRODUCTION_REGIONS.find((r) => r.id === p2Id);
    assert(region, `P2 Region ${p2Id} must exist in PRODUCTION_REGIONS`);

    for (const kw of allIntents) {
      assert(!isIndexableDynamicPage(p2Id, kw), `P2 Region ${p2Id} ${kw} must NOT be indexable`);
      const intent = SEARCH_INTENTS.find((i) => i.serviceKeyword === kw);
      if (intent) {
        const metadata = buildDynamicMetadata(region, intent);
        const robots = metadata.robots as { index?: boolean; follow?: boolean };
        assert.strictEqual(robots.index, false, `P2 Region ${p2Id} ${kw} must have robots.index = false`);
        assert.strictEqual(robots.follow, true, `P2 Region ${p2Id} ${kw} must have robots.follow = true`);
      }
    }
  }
});

test('Phase 6-K1A [3]: Guro P1 Local Fact Profiles Verification', () => {
  const expectedFacts: Record<string, { units: number; households: number; validDates: number; aptShare: string; villaShare: string; over20Share: string }> = {
    'seoul-guro-gu': { units: 4307, households: 126443, validDates: 4276, aptShare: '17.9%', villaShare: '81.4%', over20Share: '67.2%' },
    'seoul-guro-신도림동': { units: 55, households: 11052, validDates: 54, aptShare: '50.9%', villaShare: '47.3%', over20Share: '66.7%' },
    'seoul-guro-구로동': { units: 1454, households: 34268, validDates: 1449, aptShare: '37.1%', villaShare: '62.6%', over20Share: '81.9%' },
    'seoul-guro-고척동': { units: 375, households: 15646, validDates: 373, aptShare: '11.2%', villaShare: '88.3%', over20Share: '63.0%' },
    'seoul-guro-개봉동': { units: 1290, households: 28636, validDates: 1279, aptShare: '4.0%', villaShare: '95.2%', over20Share: '56.1%' },
    'seoul-guro-오류동': { units: 447, households: 13813, validDates: 440, aptShare: '11.2%', villaShare: '87.2%', over20Share: '61.4%' },
    'seoul-guro-천왕동': { units: 16, households: 6332, validDates: 16, aptShare: '81.3%', villaShare: '18.8%', over20Share: '0.0%' },
    'seoul-guro-항동': { units: 42, households: 6142, validDates: 42, aptShare: '38.1%', villaShare: '61.9%', over20Share: '47.6%' },
  };

  for (const [regionId, facts] of Object.entries(expectedFacts)) {
    const profile = getRecoveryProfile(regionId);
    assert(profile, `Profile for ${regionId} must exist`);
    assert.strictEqual(profile.units, facts.units, `Units mismatch for ${regionId}`);
    assert.strictEqual(profile.households, facts.households, `Households mismatch for ${regionId}`);
    assert.strictEqual(profile.validDates, facts.validDates, `ValidDates mismatch for ${regionId}`);
    assert.strictEqual(profile.aptShare, facts.aptShare, `AptShare mismatch for ${regionId}`);
    assert.strictEqual(profile.villaShare, facts.villaShare, `VillaShare mismatch for ${regionId}`);
    assert.strictEqual(profile.over20Share, facts.over20Share, `Over20Share mismatch for ${regionId}`);
  }
});

test('Phase 6-K1A [4]: Yangcheon Baseline Freeze Check', () => {
  const yangcheonTargets = [
    { key: '양천구-탄성코트', id: 'seoul-yangcheon-gu', kw: '탄성코트' },
    { key: '양천구-베란다탄성코트', id: 'seoul-yangcheon-gu', kw: '베란다탄성코트' },
    { key: '목동-탄성코트', id: 'seoul-yangcheon-목동', kw: '탄성코트' },
    { key: '목동-베란다탄성코트', id: 'seoul-yangcheon-목동', kw: '베란다탄성코트' },
    { key: '신월동-탄성코트', id: 'seoul-yangcheon-신월동', kw: '탄성코트' },
    { key: '신월동-베란다탄성코트', id: 'seoul-yangcheon-신월동', kw: '베란다탄성코트' },
    { key: '양천신정동-탄성코트', id: 'seoul-yangcheon-sinjeong', kw: '탄성코트' },
    { key: '양천신정동-베란다탄성코트', id: 'seoul-yangcheon-sinjeong', kw: '베란다탄성코트' },
  ];

  for (const target of yangcheonTargets) {
    assert(
      isIndexableDynamicPage(target.id, target.kw),
      `Yangcheon target ${target.key} must remain indexable`
    );
  }
});

test('Phase 6-I0B-2 [5]: RSS Autodiscovery in Root Layout Metadata', () => {
  const layoutPath = path.resolve('app/layout.tsx');
  const layoutSource = fs.readFileSync(layoutPath, 'utf-8');

  assert(layoutSource.includes('application/rss+xml'), 'Root layout must declare application/rss+xml alternate');
  assert(layoutSource.includes('/rss.xml'), 'Root layout must point to /rss.xml');
});

// ----------------------------------------------------
// PHASE 6-J1: GLOBAL PHONE + KAKAO CONTACT CTA CONTRACTS
// ----------------------------------------------------
test('Phase 6-J1 [1]: SiteConfig Phone and Kakao Channel URL SSOT Invariants', () => {
  assert.strictEqual(SITE_CONFIG.phone, '010-8492-6900');
  assert.strictEqual(SITE_CONFIG.phoneHref, 'tel:01084926900');
  assert.strictEqual(SITE_CONFIG.kakaoConsultUrl, 'https://pf.kakao.com/_UjxcFX');
  assert.strictEqual(isContactConfigured(), true);
});

test('Phase 6-J1 [2]: Header, Hero, FinalCta, MobileFixedCTA, and Footer Two-Channel CTA Contracts', () => {
  const headerSource = fs.readFileSync(path.resolve('components/common/Header.tsx'), 'utf-8');
  const heroSource = fs.readFileSync(path.resolve('components/sections/HeroSection.tsx'), 'utf-8');
  const finalCtaSource = fs.readFileSync(path.resolve('components/sections/FinalCtaSection.tsx'), 'utf-8');
  const mobileFixedSource = fs.readFileSync(path.resolve('components/common/MobileFixedCTA.tsx'), 'utf-8');
  const footerSource = fs.readFileSync(path.resolve('components/common/Footer.tsx'), 'utf-8');

  // Header assertions
  assert(headerSource.includes('전화 상담'), 'Header must contain 전화 상담 label on desktop');
  assert(headerSource.includes('카카오톡'), 'Header must contain 카카오톡 label on desktop');
  assert(headerSource.includes('전화'), 'Header must contain 전화 label on mobile');
  assert(headerSource.includes('카톡'), 'Header must contain 카톡 label on mobile');
  assert(headerSource.includes('SITE_CONFIG.phoneHref'), 'Header must reference phoneHref');
  assert(headerSource.includes('SITE_CONFIG.kakaoConsultUrl'), 'Header must reference kakaoConsultUrl');

  // Hero assertions
  assert(heroSource.includes('전화 문의'), 'Hero must contain compact 전화 문의 action');
  assert(heroSource.includes('카카오톡 문의'), 'Hero must contain 카카오톡 문의 action');
  assert(!heroSource.includes('전화 상담 문의 (010-8492-6900)'), 'Hero must not contain phone number inside button copy');

  // Final CTA assertions
  assert(finalCtaSource.includes('전화 문의'), 'Final CTA must contain compact 전화 문의 action');
  assert(finalCtaSource.includes('카카오톡 문의'), 'Final CTA must contain 카카오톡 문의 action');
  assert(!finalCtaSource.includes('전화 상담 연결 (010-8492-6900)'), 'Final CTA must not contain phone number inside button copy');

  // Mobile Sticky CTA assertions
  assert(mobileFixedSource.includes('전화 문의'), 'Mobile Sticky CTA must contain 전화 문의 action');
  assert(mobileFixedSource.includes('카카오톡 문의'), 'Mobile Sticky CTA must contain 카카오톡 문의 action');
  assert(!mobileFixedSource.includes('전화 상담 (010-8492-6900)'), 'Mobile Sticky CTA must not contain phone number inside button copy');

  // Footer assertions
  assert(footerSource.includes('문의전화'), 'Footer must contain phone contact link');
  assert(footerSource.includes('카카오톡 문의'), 'Footer must contain kakao contact link');
});

test('PHASE 6-L1A [1]: Dynamic RSS Engine Unit Contract (Title, Short Body, Canonical Parity, GUID)', () => {
  const origin = OFFICIAL_SITE_ORIGIN;

  // Direct helper test
  const directTitle = buildDynamicRssTitle('구로동', '탄성코트');
  assert.strictEqual(directTitle, '구로동 탄성코트 시공 안내');
  const directContent = generateDynamicRssContent('seoul-guro-구로동', '구로동', '탄성코트');
  assert(directContent !== null && directContent.description.length >= 100);

  // Test with valid fixture entry
  const fixtureEntry: DynamicRssPublicationEntry = {
    regionId: 'seoul-guro-구로동',
    serviceKeyword: '탄성코트',
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  };

  const item = validateDynamicRssEligibility(fixtureEntry, origin);
  assert(item !== null, 'Valid dynamic entry must produce an eligible RSS item');
  assert.strictEqual(item?.type, 'DYNAMIC');
  assert.strictEqual(item?.title, '구로동 탄성코트 시공 안내');
  assert.strictEqual(item?.link, 'https://www.allcaretan.co.kr/?k=%EA%B5%AC%EB%A1%9C%EB%8F%99-%ED%83%84%EC%84%B1%EC%BD%94%ED%8A%B8');
  assert.strictEqual(item?.guid, item?.link, 'GUID must match canonical link exactly');
  assert.strictEqual(item?.pubDate, 'Tue, 27 Oct 2026 09:00:00 +0900');

  // Body length contract: 100 ~ 220 Korean characters
  assert(item!.description.length >= 100 && item!.description.length <= 220, `Description length ${item!.description.length} must be 100~220 chars`);
  assert(item!.contentEncoded.startsWith('<p>') && item!.contentEncoded.endsWith('</p>'), 'content:encoded must be minimal semantic HTML');
  assert(item!.description.includes('구로동 탄성코트'), 'Description must naturally include dynamic keyword');
});

test('PHASE 6-L1A [2]: Dynamic RSS Engine Determinism (Same Inputs = Same Outputs)', () => {
  const origin = OFFICIAL_SITE_ORIGIN;
  const fixture: DynamicRssPublicationEntry = {
    regionId: 'seoul-guro-신도림동',
    serviceKeyword: '베란다탄성코트',
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  };

  const item1 = validateDynamicRssEligibility(fixture, origin);
  const item2 = validateDynamicRssEligibility(fixture, origin);
  const item3 = validateDynamicRssEligibility(fixture, origin);

  assert.strictEqual(JSON.stringify(item1), JSON.stringify(item2), 'Item 1 and Item 2 must be identical');
  assert.strictEqual(JSON.stringify(item2), JSON.stringify(item3), 'Item 2 and Item 3 must be identical');
});

test('PHASE 6-L1A [3]: Intent Differentiation (Elastic Coating vs Balcony Coating Patterns)', () => {
  assert(ELASTIC_COATING_PATTERNS.length >= 4, 'Must have at least 4 patterns for 탄성코트');
  assert(BALCONY_COATING_PATTERNS.length >= 4, 'Must have at least 4 patterns for 베란다탄성코트');

  const origin = OFFICIAL_SITE_ORIGIN;
  const itemElastic = validateDynamicRssEligibility({
    regionId: 'seoul-guro-개봉동',
    serviceKeyword: '탄성코트',
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  }, origin);

  const itemBalcony = validateDynamicRssEligibility({
    regionId: 'seoul-guro-개봉동',
    serviceKeyword: '베란다탄성코트',
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  }, origin);

  assert(itemElastic !== null && itemBalcony !== null);
  assert.notStrictEqual(itemElastic!.description, itemBalcony!.description, 'Different intents must produce different body copies');
  assert(itemElastic!.title.includes('탄성코트 시공 안내'));
  assert(itemBalcony!.title.includes('베란다탄성코트 시공 안내'));
});

test('PHASE 6-L1A [4]: Failure Safety & Eligibility Guard (Noindex, Collision, Missing Date, Banned Claims)', () => {
  const origin = OFFICIAL_SITE_ORIGIN;

  // 1. Collision hold (은평 신사동)
  const collisionItem = validateDynamicRssEligibility({
    regionId: 'seoul-eunpyeong-sinsa',
    serviceKeyword: '탄성코트',
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  }, origin);
  assert.strictEqual(collisionItem, null, 'Collision hold regions must be rejected from RSS');

  // 2. Guro P2 (가리봉동 - noindex, follow)
  const noindexItem = validateDynamicRssEligibility({
    regionId: 'seoul-guro-가리봉동',
    serviceKeyword: '탄성코트',
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  }, origin);
  assert.strictEqual(noindexItem, null, 'Non-indexable regions must be rejected from RSS');

  // 3. Unsupported intent (e.g. 세탁실탄성코트)
  const unsupportedIntentItem = validateDynamicRssEligibility({
    regionId: 'seoul-guro-구로동',
    serviceKeyword: '세탁실탄성코트' as unknown as ServiceKeyword,
    publishedAt: '2026-10-27T09:00:00+09:00',
    publishedAtRfc822: 'Tue, 27 Oct 2026 09:00:00 +0900',
  }, origin);
  assert.strictEqual(unsupportedIntentItem, null, 'Unsupported intents must be rejected from RSS');

  // 4. Missing publishedAt
  const missingDateItem = validateDynamicRssEligibility({
    regionId: 'seoul-guro-구로동',
    serviceKeyword: '탄성코트',
    publishedAt: '',
    publishedAtRfc822: '',
  }, origin);
  assert.strictEqual(missingDateItem, null, 'Missing publication date must fail safe');
});

test('PHASE 6-L1A [5]: Rolling Window Retention (Max 24 Dynamic Items, Guides Retained)', () => {
  const origin = OFFICIAL_SITE_ORIGIN;
  assert.strictEqual(MAX_DYNAMIC_RSS_ITEMS, 24, 'Max dynamic RSS items policy must be 24');

  // Generate 30 valid fixture entries
  const fixture30: DynamicRssPublicationEntry[] = [];
  const approvedGuro = [
    'seoul-guro-gu', 'seoul-guro-신도림동', 'seoul-guro-구로동', 'seoul-guro-고척동',
    'seoul-guro-개봉동', 'seoul-guro-오류동', 'seoul-guro-천왕동', 'seoul-guro-항동'
  ];

  let count = 0;
  for (const reg of approvedGuro) {
    for (const intent of ['탄성코트', '베란다탄성코트'] as const) {
      count++;
      const day = count.toString().padStart(2, '0');
      fixture30.push({
        regionId: reg,
        serviceKeyword: intent,
        publishedAt: `2026-10-${day}T09:00:00+09:00`,
        publishedAtRfc822: `Sun, ${day} Oct 2026 09:00:00 +0900`,
      });
    }
  }

  // Also add some Base Recovery entries to reach 30
  const baseApproved = [
    'seoul-gangnam-gu',
    'seoul-seocho-gu',
    'seoul-eunpyeong-gu',
    'seoul-gangseo-gu',
    'seoul-seongdong-gu',
    'seoul-eunpyeong-bulgwang',
    'seoul-eunpyeong-갈현동',
    'seoul-gangseo-마곡동',
  ];
  for (const reg of baseApproved) {
    if (fixture30.length >= 30) break;
    count++;
    const day = count.toString().padStart(2, '0');
    fixture30.push({
      regionId: reg,
      serviceKeyword: '탄성코트',
      publishedAt: `2026-10-${day}T09:00:00+09:00`,
      publishedAtRfc822: `Sun, ${day} Oct 2026 09:00:00 +0900`,
    });
  }

  assert(fixture30.length >= 24, `Must have at least 24 fixture entries for test, got ${fixture30.length}`);

  // Test rolling window retention
  const retained = getDynamicRssItems(origin, {
    forceEnabled: true,
    registryOverride: fixture30,
  });

  assert.strictEqual(retained.length, 24, 'Must retain exactly MAX_DYNAMIC_RSS_ITEMS (24) items');
  // First item must be the newest
  assert(retained[0].publishedAtIso >= retained[retained.length - 1].publishedAtIso, 'Items must be sorted newest first');
});

test('PHASE 6-L1A [6]: No Fake Freshness Contract (Zero Date.now() / Request-time Staggering)', () => {
  const dynamicRssSourcePath = path.resolve('lib/data/dynamic-rss-data.ts');
  const source = fs.readFileSync(dynamicRssSourcePath, 'utf-8');

  assert(!source.includes('Date.now()'), 'Must not use Date.now() for publication timestamps');
  assert(!source.includes('new Date()'), 'Must not use new Date() for dynamic RSS publication timestamps');
  assert(!source.includes('Math.random()'), 'Must not use Math.random() for dynamic RSS content generation');
});

test('PHASE 6-N1A [1]: Keyword Guide Registry & Topic Matrix Contract (18 Guides, Unique Slugs, Titles, H1)', () => {
  const keywordGuides = getAllKeywordGuides();
  assert.strictEqual(keywordGuides.length, 18, 'Must contain exactly 18 Keyword Guides in registry');

  const pillarGuides = getAllGuides();
  assert.strictEqual(pillarGuides.length, 4, 'Must contain exactly 4 Pillar Guides');

  const allSlugs = getAllGuideSlugs();
  assert.strictEqual(allSlugs.length, 22, 'Total guide slugs must be exactly 22 (4 Pillar + 18 Keyword)');

  // 1. Uniqueness of Slugs across ALL 22 Guides
  const slugSet = new Set<string>();
  for (const s of allSlugs) {
    assert(!slugSet.has(s), `Duplicate guide slug detected: ${s}`);
    slugSet.add(s);
  }

  // 2. Uniqueness of Titles and H1 across 18 Keyword Guides
  const titleSet = new Set<string>();
  const h1Set = new Set<string>();
  for (const g of keywordGuides) {
    assert(!titleSet.has(g.title), `Duplicate Keyword Guide title detected: ${g.title}`);
    assert(!h1Set.has(g.h1), `Duplicate Keyword Guide H1 detected: ${g.h1}`);
    titleSet.add(g.title);
    h1Set.add(g.h1);

    // Format check: Title must end with "| 올케어 시공 가이드"
    assert(g.title.endsWith('| 올케어 시공 가이드'), `Title must end with "| 올케어 시공 가이드": ${g.title}`);
    // Structure check: 2~4 sections, 3~5 checklist items, limitation note
    assert(g.sections.length >= 2 && g.sections.length <= 4, `Sections count ${g.sections.length} must be 2~4 for ${g.slug}`);
    assert(g.checklistItems.length >= 3 && g.checklistItems.length <= 5, `Checklist count ${g.checklistItems.length} must be 3~5 for ${g.slug}`);
    assert(g.limitationNote.length > 20, `Limitation note must be non-empty for ${g.slug}`);
  }
});

test('PHASE 6-N1A [2]: 1:1 Dynamic <-> Keyword Guide Bi-Directional Mapping Contract', () => {
  const ydpRegionIds = [
    'seoul-yeongdeungpo-gu',
    'seoul-yeongdeungpo-영등포동',
    'seoul-yeongdeungpo-당산동',
    'seoul-yeongdeungpo-문래동',
    'seoul-yeongdeungpo-신길동',
    'seoul-yeongdeungpo-대림동',
    'seoul-yeongdeungpo-양평동',
    'seoul-yeongdeungpo-여의동',
    'seoul-yeongdeungpo-도림동',
  ];

  for (const regionId of ydpRegionIds) {
    for (const intent of ['탄성코트', '베란다탄성코트'] as const) {
      // 1. Dynamic -> Guide
      const guide = getKeywordGuideForDynamic(regionId, intent);
      assert(guide, `Every Yeongdeungpo dynamic page must map to a Keyword Guide: ${regionId} ${intent}`);
      assert.strictEqual(guide.regionId, regionId);
      assert.strictEqual(guide.serviceKeyword, intent);

      // 2. Guide -> Dynamic
      const article = toGuideArticle(guide, OFFICIAL_SITE_ORIGIN);
      const primaryLink = article.relatedLinks[0];
      assert(primaryLink, `Keyword Guide must have primary dynamic landing link: ${guide.slug}`);
      const region = PRODUCTION_REGIONS.find(r => r.id === regionId)!;
      const expectedHref = buildPublicHref(region.keywordRegionName, intent);
      assert.strictEqual(primaryLink.href, expectedHref, `Primary link href must match dynamic landing href: ${expectedHref}`);
    }
  }
});

test('PHASE 6-N1A [3]: Live RSS Output Contract (4 Pillar Guides + 18 Keyword Guides = 22 Items)', async () => {
  assert.strictEqual(DYNAMIC_RSS_ENABLED, false, 'Direct DYNAMIC_RSS_ENABLED must be false in Phase 6-N1A');

  const rssRes = await getRssResponse();
  assert.strictEqual(rssRes.status, 200);
  const rssText = await rssRes.text();

  const itemMatches = rssText.match(/<item>/g) || [];
  assert.strictEqual(itemMatches.length, 22, 'Live RSS output must contain exactly 22 items (4 Pillar Guides + 18 Keyword Guides)');

  // 1. 4 Pillar Guides present
  assert(rssText.includes('/guide/balcony-coating-checklist'), 'Pillar Guide 01 must be present');
  assert(rssText.includes('/guide/old-apartment-balcony-recoating-guide'), 'Pillar Guide 02 must be present');
  assert(rssText.includes('/guide/elastic-coating-estimate-work-scope-guide'), 'Pillar Guide 03 must be present');
  assert(rssText.includes('/guide/elastic-coating-preparation-protection-checklist'), 'Pillar Guide 04 must be present');

  // 2. 18 Keyword Guides present with exact guide URLs
  const keywordGuides = getAllKeywordGuides();
  for (const kg of keywordGuides) {
    const expectedUrl = `${OFFICIAL_SITE_ORIGIN}/guide/${kg.slug}`;
    assert(rssText.includes(`<link>${expectedUrl}</link>`), `RSS must contain Keyword Guide link: ${expectedUrl}`);
    assert(rssText.includes(`<guid isPermaLink="true">${expectedUrl}</guid>`), `RSS must contain Keyword Guide guid: ${expectedUrl}`);
  }

  // 3. Zero direct dynamic RSS landing URLs in RSS
  assert(!rssText.includes('/?k='), 'RSS must NOT contain any direct /?k= landing links after migration');

  // 4. Zero historical backfill
  assert(!rssText.includes('구로구 탄성코트 시공 안내'), 'Historical Guro must NOT be in RSS');
  assert(!rssText.includes('목동 탄성코트 시공 안내'), 'Historical Yangcheon must NOT be in RSS');
  assert(!rssText.includes('강남구 탄성코트 시공 안내'), 'Historical Base must NOT be in RSS');
});

test('PHASE 6-N1A [4]: Keyword Guide Claim Safety & Zero Unsupported Local Characterization', () => {
  const bannedTerms = [
    '결로 방지', '결로 예방', '결로 해결',
    '곰팡이 방지', '곰팡이 예방', '곰팡이 해결',
    '누수 방지', '습기 완전 차단',
    '완벽', '100%', '영구', '무조건', '최고', '1위', '최저가',
    '무상 A/S', '평생 A/S',
  ];

  const unsupportedLocalClaims = [
    '풍압이 강하다',
    '풍압이 세다',
    '구축 아파트가 많다',
    '구축이 많아',
    '결로가 많다',
    '탄성코트 수요가 많다',
    '탄성코트가 필수',
    '노후주택이 많아',
  ];

  const keywordGuides = getAllKeywordGuides();
  for (const g of keywordGuides) {
    const fullText = `${g.title} ${g.h1} ${g.intro} ${g.sections.map(s => s.h2 + ' ' + s.paragraphs.join(' ')).join(' ')} ${g.checklistItems.join(' ')} ${g.limitationNote}`;

    for (const term of bannedTerms) {
      assert(!fullText.includes(term), `Keyword Guide [${g.slug}] must NOT contain banned term: "${term}"`);
    }

    for (const claim of unsupportedLocalClaims) {
      assert(!fullText.includes(claim), `Keyword Guide [${g.slug}] must NOT contain unsupported local claim: "${claim}"`);
    }

    // Content length operating range check: approx 800 ~ 1,400 Korean chars (with spaces)
    assert(fullText.length >= 700 && fullText.length <= 1400, `Keyword Guide [${g.slug}] char count (${fullText.length}) must be within 700~1,400 chars operating range`);
  }
});

test('PHASE 6-M1A [2]: Yeongdeungpo P1 Cohort & Yeouido Public Keyword Contract', () => {
  const ydpRegionIds = [
    'seoul-yeongdeungpo-gu',
    'seoul-yeongdeungpo-영등포동',
    'seoul-yeongdeungpo-당산동',
    'seoul-yeongdeungpo-문래동',
    'seoul-yeongdeungpo-신길동',
    'seoul-yeongdeungpo-대림동',
    'seoul-yeongdeungpo-양평동',
    'seoul-yeongdeungpo-여의동',
    'seoul-yeongdeungpo-도림동',
  ];

  // 1. Verify all 9 regions exist and are approved
  for (const id of ydpRegionIds) {
    const region = PRODUCTION_REGIONS.find(r => r.id === id);
    assert(region, `Region must exist in PRODUCTION_REGIONS: ${id}`);
    assert.strictEqual(region?.publicationState, 'INDEXABLE');
    assert.strictEqual(region?.isServiceAreaApproved, true);

    const profile = getRecoveryProfile(id);
    assert(profile, `Profile must exist for: ${id}`);
    assert(profile.units > 0, `Units must be > 0 for: ${id}`);
    assert(profile.households > 0, `Households must be > 0 for: ${id}`);
    assert(profile.validDates > 0, `Valid dates must be > 0 for: ${id}`);
  }

  // 2. Critical Yeouido Naming Contract
  const yeouidoRegion = findRegionByKeyword('여의도동');
  assert(yeouidoRegion, "findRegionByKeyword('여의도동') must resolve successfully");
  assert.strictEqual(yeouidoRegion?.id, 'seoul-yeongdeungpo-여의동', 'Internal ID must remain seoul-yeongdeungpo-여의동');
  assert.strictEqual(yeouidoRegion?.keywordRegionName, '여의도동', 'Public keywordRegionName must be 여의도동');
  assert.strictEqual(yeouidoRegion?.displayName, '여의도동', 'displayName must be 여의도동');
  assert.strictEqual(yeouidoRegion?.canonicalName, '서울특별시 영등포구 여의도동', 'canonicalName must be 서울특별시 영등포구 여의도동');

  // Verify findRegionByKeyword('여의동') does NOT resolve
  const yeouiLegacy = findRegionByKeyword('여의동');
  assert.strictEqual(yeouiLegacy, undefined, "findRegionByKeyword('여의동') must NOT resolve (0 public duplicate URLs)");

  // 3. Dynamic Landing Page Title Contract ({keyword} | A/S 보장 | 올케어)
  for (const id of ydpRegionIds) {
    const region = PRODUCTION_REGIONS.find(r => r.id === id)!;
    for (const intent of ['탄성코트', '베란다탄성코트'] as const) {
      const intentItem = SEARCH_INTENTS.find(i => i.serviceKeyword === intent)!;
      const metadata = buildDynamicMetadata(region, intentItem, OFFICIAL_SITE_ORIGIN);
      const title = metadata.title as string;
      const expectedPrefix = `${region.displayName} ${intent} | A/S 보장 | 올케어`;
      assert.strictEqual(title, expectedPrefix, `Dynamic landing title must be: ${expectedPrefix}`);
      assert(!title.includes('시공 안내'), 'Dynamic landing title must NOT contain RSS "시공 안내" wording');
    }
  }

  // 4. Hub SSR 56 Links & 0 Duplicate / Collision Links
  const hubPath = path.resolve('app/sitemap-seoul/page.tsx');
  const hubSource = fs.readFileSync(hubPath, 'utf-8');
  assert(hubSource.includes('56 PRIMARY PAGES'), 'Hub must state 56 primary pages');
  assert(!hubSource.includes('신사동 탄성코트'), 'Hub must NOT contain collision hold links');
  assert(!hubSource.includes('신사동 베란다탄성코트'), 'Hub must NOT contain collision hold links');
});

test('PHASE 6-M1B-R: Condensation Claim Safety & Banned Term Scan Across Dynamic RSS Patterns and Items', () => {
  const bannedTerms = [
    '결로 방지', '결로 예방', '결로 해결',
    '곰팡이 방지', '곰팡이 예방', '곰팡이 해결',
    '누수 방지', '습기 완전 차단',
    '완벽', '100%', '영구', '무조건', '최고', '1위', '최저가',
    '무상 A/S', '평생 A/S',
  ];

  // 1. Verify ELASTIC_COATING_PATTERNS
  for (let i = 0; i < ELASTIC_COATING_PATTERNS.length; i++) {
    const pattern = ELASTIC_COATING_PATTERNS[i];
    for (const term of bannedTerms) {
      assert(!pattern.includes(term), `Elastic pattern [${i}] must NOT contain banned term: "${term}"`);
    }
  }

  // 2. Verify BALCONY_COATING_PATTERNS
  for (let i = 0; i < BALCONY_COATING_PATTERNS.length; i++) {
    const pattern = BALCONY_COATING_PATTERNS[i];
    for (const term of bannedTerms) {
      assert(!pattern.includes(term), `Balcony pattern [${i}] must NOT contain banned term: "${term}"`);
    }
  }

  // 3. Verify all 18 generated RSS items when forceEnabled
  const items = getDynamicRssItems(OFFICIAL_SITE_ORIGIN, { forceEnabled: true });
  assert.strictEqual(items.length, 18, 'Must generate exactly 18 dynamic items');
  for (const item of items) {
    for (const term of bannedTerms) {
      assert(!item.description.includes(term), `RSS item "${item.title}" description must NOT contain banned term: "${term}"`);
      assert(!item.contentEncoded.includes(term), `RSS item "${item.title}" content:encoded must NOT contain banned term: "${term}"`);
    }
    // Verify length
    assert(item.description.length >= 100 && item.description.length <= 220, `Description length ${item.description.length} must be 100~220 chars`);
  }
});

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
}

