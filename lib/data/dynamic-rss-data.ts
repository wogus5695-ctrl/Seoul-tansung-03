/**
 * Dynamic Keyword RSS Engine & SSOT Registry
 * Phase 6-L1A Local Implementation
 *
 * Responsibilities:
 * - Dynamic RSS publication registry (SSOT)
 * - Approved deterministic copy patterns (탄성코트 / 베란다탄성코트)
 * - Deterministic pattern selection (no pseudo-random calls, no AI runtime generation)
 * - Eligibility validation against core project SSOT (isIndexableDynamicPage, collision, etc.)
 * - Stable canonical URL & GUID generation
 * - Rolling window retention enforcement (max 24 dynamic items)
 * - Safe feature gate (disabled by default in Phase 6-L1A)
 */

import { PRODUCTION_REGIONS } from '../contracts/regions-contract';
import { isIndexableDynamicPage } from '../config/recovery-config';
import { buildCanonicalUrl } from '../url/url-builder';
import { ServiceKeyword } from '../types/intents';

// Feature gate: Dynamic RSS output remains disabled in Phase 6-L1A
export const DYNAMIC_RSS_ENABLED = false;

// Retention policy: maximum dynamic RSS items retained in the rolling window
export const MAX_DYNAMIC_RSS_ITEMS = 24;

export interface DynamicRssPublicationEntry {
  readonly regionId: string;
  readonly serviceKeyword: ServiceKeyword;
  /**
   * Explicit factual ISO 8601 publication date when the page became indexable.
   * Format: YYYY-MM-DDTHH:mm:ss+09:00
   * MUST NEVER be generated dynamically via runtime date calls or request timestamps.
   */
  readonly publishedAt: string;
  /**
   * Explicit RFC 822 format for RSS feeds.
   * Example: 'Mon, 26 Oct 2026 09:00:00 +0900'
   */
  readonly publishedAtRfc822: string;
  /**
   * Optional manual override pattern index. If omitted, deterministic hash is used.
   */
  readonly patternIndex?: number;
}

/**
 * Production Dynamic RSS Publication Registry
 *
 * Phase 6-L1A: Strictly EMPTY (0 entries).
 * No historical URLs (Base Recovery 15, Yangcheon 7, Guro 16) are backfilled.
 */
export const DYNAMIC_RSS_REGISTRY: readonly DynamicRssPublicationEntry[] = [];

export interface NormalizedRssItem {
  readonly type: 'GUIDE' | 'DYNAMIC';
  readonly title: string;
  readonly link: string;
  readonly guid: string;
  readonly pubDate: string; // RFC 822
  readonly description: string;
  readonly contentEncoded: string;
  readonly category: string;
  readonly author: string;
  readonly publishedAtIso: string;
}

// ---------------------------------------------------------------------------
// Approved Copy Patterns (100 ~ 220 chars, 2~3 sentences, claim-safe)
// ---------------------------------------------------------------------------

export const ELASTIC_COATING_PATTERNS: readonly string[] = [
  '{keyword} 전에는 베란다 및 세탁실 벽면의 기존 도막 들뜸과 균열 상태를 먼저 확인하는 것이 좋습니다. 현장 벽면 여건에 따라 들뜬 칠 정리와 균열 보수 공정을 선별적으로 점검하고 시공 범위를 확정해야 합니다. 시공 직후에는 도막이 안정적으로 마를 수 있도록 충분한 자연 환기 환경을 마련하시기 바랍니다.',
  '{keyword} 진행 시에는 벽체 박리 부위와 모서리 미세 크랙 여부를 사전에 꼼꼼히 점검해 두어야 합니다. 벽면 상태에 맞춰 바탕면 정리와 퍼티 메꿈 등 필요한 밑작업 범위를 사전에 협의하는 것이 안전합니다. 통행로와 시설물에 도료가 튀지 않도록 작업 동선과 보양 범위도 함께 확인해 두시기 바랍니다.',
  '{keyword} 견적을 비교하기 전에는 시공 대상 공간의 벽면 오염도와 기존 칠의 부착 강도를 육안으로 살펴보는 것이 필요합니다. 모든 현장이 동일한 보수를 필요로 하는 것은 아니므로 실제 상태에 맞춘 전처리 공정이 포함되었는지 확인해야 합니다. 시공 당일에는 원활한 작업을 위해 이동 가능한 집기를 미리 정리해 두는 것이 권장됩니다.',
  '{keyword} 시공을 계획할 때는 창틀 주변과 외벽 접촉면의 실금 및 도막 탈락 흔적을 미리 파악해 두어야 합니다. 현장 여건에 따라 적합한 보수 범위와 시설물 커버링 보양 수준이 달라지므로 사전 소통이 중요합니다. 도료가 자연 건조되는 동안 창문을 열어 규칙적으로 환기할 수 있는 일정을 조율하시기 바랍니다.',
];

export const BALCONY_COATING_PATTERNS: readonly string[] = [
  '{keyword} 전에는 창호 샤시 접합부와 외벽 모서리의 기존 페인트 들뜸 여부를 면밀히 확인하는 것이 좋습니다. 외부 온도와 맞닿는 베란다 특성상 현장 벽면 상태에 맞춘 바탕면 정리와 정밀 보양 공정이 사전에 협의되어야 합니다. 시공 당일에는 세탁기와 건조기 등 대형 가전의 분리 이동 여부를 작업자와 명확히 조율하시기 바랍니다.',
  '{keyword} 시공을 준비할 때는 베란다 천장과 배관 주변의 크랙 및 과거 칠 벗겨짐 흔적을 사전에 점검해야 합니다. 시설물과 바닥 타일에 분사 도료가 묻지 않도록 꼼꼼한 마스킹 테이프 보양 범위를 확인하는 것이 마감 품질에 중요합니다. 시공 후에는 도막 안착을 위해 임의 난방보다는 자연 바람을 통한 환기 관리를 권장합니다.',
  '{keyword} 견적 상담 시에는 다용도실과 세탁실 벽면의 잔여 습기와 도막 들뜸 범위를 미리 살펴보는 것이 현명합니다. 현장 상태에 따라 필요한 부실 도막 정리와 메꿈 작업 범위가 상이하므로 포함 내역을 꼼꼼히 대조해야 합니다. 분사 작업자의 안전한 작업 공간 확보를 위해 선반 소품과 생활 집기를 미리 반출해 두시기 바랍니다.',
  '{keyword} 계획 시에는 창틀 실리콘 경계면과 세탁기 뒷벽 등 사각지대의 벽면 상태를 사전에 확인해 두는 것이 바람직합니다. 대형 가전이 설치된 공간은 안전한 이동 방안과 도포 가능 범위를 사전 협의해야 시공 분쟁을 방지할 수 있습니다. 뿜칠 완료 후에는 충분한 자연 통풍을 유지하여 표면이 균일하게 건조되도록 환경을 관리해야 합니다.',
];

const PROHIBITED_WORDS = [
  '완벽', '100%', '영구', '무조건', '최고', '1위', '최저가',
  '무상 A/S', '평생 A/S', '결로 완전 해결', '곰팡이 완전 방지', '박리 재발 없음',
  '수요가 많습니다', '시공이 필요합니다', '결로가 많습니다', '문의가 많습니다',
];

/**
 * Stable deterministic 32-bit hash function for string inputs.
 */
function stableHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Builds the official Dynamic RSS Title.
 * Format: {동적키워드} 시공 안내
 */
export function buildDynamicRssTitle(keywordRegionName: string, serviceKeyword: string): string {
  return `${keywordRegionName} ${serviceKeyword} 시공 안내`;
}

/**
 * Generates the deterministic short content for a Dynamic RSS item.
 */
export function generateDynamicRssContent(
  regionId: string,
  keywordRegionName: string,
  serviceKeyword: ServiceKeyword,
  explicitPatternIndex?: number
): { description: string; contentEncoded: string } | null {
  const dynamicKeyword = `${keywordRegionName} ${serviceKeyword}`;

  let patternPool: readonly string[];
  if (serviceKeyword === '탄성코트') {
    patternPool = ELASTIC_COATING_PATTERNS;
  } else if (serviceKeyword === '베란다탄성코트') {
    patternPool = BALCONY_COATING_PATTERNS;
  } else {
    // Unsupported intent for Dynamic RSS (Fail-safe)
    return null;
  }

  const patternIdx =
    typeof explicitPatternIndex === 'number' &&
    explicitPatternIndex >= 0 &&
    explicitPatternIndex < patternPool.length
      ? explicitPatternIndex
      : stableHash(`${regionId}-${serviceKeyword}`) % patternPool.length;

  const rawTemplate = patternPool[patternIdx];
  const bodyText = rawTemplate.replace(/\{keyword\}/g, dynamicKeyword);

  // Length contract check: 100 ~ 220 characters
  if (bodyText.length < 100 || bodyText.length > 220) {
    return null;
  }

  // Claim safety check
  for (const banned of PROHIBITED_WORDS) {
    if (bodyText.includes(banned)) {
      return null;
    }
  }

  const description = bodyText;
  const contentEncoded = `<p>${bodyText}</p>`;

  return { description, contentEncoded };
}

/**
 * Validates whether a dynamic page entry is strictly eligible for RSS publication.
 */
export function validateDynamicRssEligibility(
  entry: DynamicRssPublicationEntry,
  origin: string
): NormalizedRssItem | null {
  // 1. Region check
  const region = PRODUCTION_REGIONS.find((r) => r.id === entry.regionId);
  if (!region) return null;

  // 2. Collision hold check (e.g. seoul-eunpyeong-sinsa)
  if (region.id === 'seoul-eunpyeong-sinsa' || region.publicationState === 'PUBLISHED_NOINDEX') {
    return null;
  }

  // 3. Supported intent check
  if (entry.serviceKeyword !== '탄성코트' && entry.serviceKeyword !== '베란다탄성코트') {
    return null;
  }

  // 4. Indexability gate SSOT check
  if (!isIndexableDynamicPage(region.id, entry.serviceKeyword)) {
    return null;
  }

  // 5. Published date check (must be non-empty valid ISO string)
  if (!entry.publishedAt || !entry.publishedAtRfc822) {
    return null;
  }

  // 6. Build Title
  const title = buildDynamicRssTitle(region.keywordRegionName, entry.serviceKeyword);

  // 7. Build Canonical Link & GUID
  const canonicalRes = buildCanonicalUrl(region.keywordRegionName, entry.serviceKeyword, origin);
  if (!canonicalRes.isSuccess || !canonicalRes.canonicalUrl || !canonicalRes.canonicalUrl.startsWith('https://')) {
    return null;
  }
  const link = canonicalRes.canonicalUrl;

  // 8. Generate safe body content
  const content = generateDynamicRssContent(
    region.id,
    region.keywordRegionName,
    entry.serviceKeyword,
    entry.patternIndex
  );
  if (!content) return null;

  return {
    type: 'DYNAMIC',
    title,
    link,
    guid: link, // Canonical URL is the stable permalink GUID
    pubDate: entry.publishedAtRfc822,
    description: content.description,
    contentEncoded: content.contentEncoded,
    category: '시공 정보 안내',
    author: '올케어',
    publishedAtIso: entry.publishedAt,
  };
}

/**
 * Retrieves all eligible Dynamic RSS items subject to feature gating and rolling window retention.
 */
export function getDynamicRssItems(
  origin: string,
  options?: {
    forceEnabled?: boolean;
    registryOverride?: readonly DynamicRssPublicationEntry[];
  }
): NormalizedRssItem[] {
  const isEnabled = options?.forceEnabled ?? DYNAMIC_RSS_ENABLED;
  if (!isEnabled) {
    return [];
  }

  const registry = options?.registryOverride ?? DYNAMIC_RSS_REGISTRY;
  const validItems: NormalizedRssItem[] = [];

  for (const entry of registry) {
    const item = validateDynamicRssEligibility(entry, origin);
    if (item) {
      validItems.push(item);
    }
  }

  // Sort: newest first (based on ISO string)
  validItems.sort((a, b) => {
    const dateCmp = b.publishedAtIso.localeCompare(a.publishedAtIso);
    if (dateCmp !== 0) return dateCmp;
    // Tie-breaker: alphabetical by title
    return a.title.localeCompare(b.title);
  });

  // Apply rolling window retention: latest MAX_DYNAMIC_RSS_ITEMS
  return validItems.slice(0, MAX_DYNAMIC_RSS_ITEMS);
}
