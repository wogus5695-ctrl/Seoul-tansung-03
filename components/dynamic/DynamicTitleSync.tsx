'use client';

import { useEffect } from 'react';
import { buildDynamicTitle } from '../../lib/contracts/intents-contract';
import { SITE_CONFIG } from '../../lib/config/site-config';
import { validateDynamicRoute } from '../../lib/url/url-builder';
import { getActiveRegions } from '../../lib/contracts/regions-contract';

interface DynamicTitleSyncProps {
  readonly keywordRegionName: string;
  readonly serviceKeyword: string;
}

/**
 * Client-Side Dynamic Browser Tab Title Synchronizer (Phase 6-G2A)
 *
 * Ensures that during client-side navigation (next/link, history back/forward,
 * same-pathname query param updates), the browser tab title (document.title)
 * remains strictly synchronized 1:1 with the Current Dynamic Key SSOT:
 *   `${regionName} ${serviceKeyword} | A/S 보장 | 올케어`
 *
 * Cleanup Contract:
 * - When unmounting to Main Page ('/'), restores Main Title SSOT (`올케어 | 탄성코트 전문 시공`).
 * - When unmounting to an invalid route, sets Not Found Title SSOT (`페이지를 찾을 수 없습니다 | 올케어`).
 * - When unmounting to another route (e.g. '/sitemap-seoul'), defers to that route's server metadata.
 */
export function DynamicTitleSync({
  keywordRegionName,
  serviceKeyword,
}: DynamicTitleSyncProps) {
  useEffect(() => {
    // 1. Immediately synchronize document.title with Current Dynamic Key SSOT
    const currentDynamicTitle = buildDynamicTitle(keywordRegionName, serviceKeyword);
    document.title = currentDynamicTitle;

    // 2. Cleanup handler to prevent stale dynamic title when navigating away
    return () => {
      if (typeof window === 'undefined') return;

      try {
        const url = new URL(window.location.href);

        // Only evaluate if destination is on the root path ('/')
        if (url.pathname === '/') {
          const destinationK = url.searchParams.get('k');

          if (!destinationK) {
            // Navigated to Main Page ('/') without dynamic param -> Restore Main Title SSOT
            document.title = `${SITE_CONFIG.brandName} | ${SITE_CONFIG.businessCategory}`;
          } else {
            // Navigated to an invalid dynamic param -> Set Not Found Title SSOT
            const activeRegions = getActiveRegions();
            const validation = validateDynamicRoute(destinationK, activeRegions);
            if (!validation.isValid || !validation.region || !validation.intent) {
              document.title = '페이지를 찾을 수 없습니다 | 올케어';
            }
            // If destinationK is valid, the incoming DynamicLandingPage will sync its own title
          }
        }
        // If url.pathname is not '/' (e.g. '/sitemap-seoul'), Next.js route metadata handles it natively
      } catch {
        // Fallback safety
      }
    };
  }, [keywordRegionName, serviceKeyword]);

  return null;
}
