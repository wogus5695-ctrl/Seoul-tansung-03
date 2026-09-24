/**
 * Publication State & Quality Gate Eligibility Contract Types
 */

import { ContentStatus } from './intents';
import { PublicationState } from './regions';

export interface QualityGateIssue {
  readonly code: string;
  readonly message: string;
  readonly field?: string;
}

export interface QualityGateEvaluationInput {
  readonly regionValid: boolean;
  readonly intentValid: boolean;
  readonly routeUnique: boolean;
  readonly publicRouteUnique: boolean;
  readonly regionDisambiguationValid: boolean;
  readonly siteOriginConfigured: boolean;
  readonly absoluteCanonicalValid: boolean;
  readonly metadataComplete: boolean;
  readonly requiredContentComplete: boolean;
  readonly contentStatus: ContentStatus;
  readonly unverifiedClaimCount: number;
  readonly requiredAssetsReady: boolean;
  readonly internalLinksValid: boolean;
  readonly noRegionCollision: boolean;
}

export interface QualityGateResult {
  readonly isEligibleForIndex: boolean;
  readonly targetState: PublicationState;
  readonly errors: readonly QualityGateIssue[];
  readonly warnings: readonly QualityGateIssue[];
}
