/**
 * Central Image Registry Contract Types
 *
 * User-provided assets only.
 * Prohibits AI generation, stock downloads, or fake placeholders.
 * Strictly separates Hero and SERP Candidate images.
 */

export type ImageRegistryStatus =
  | 'WAITING_FOR_USER_ASSET'
  | 'READY'
  | 'DISABLED';

export type AssetRequirement =
  | 'REQUIRED'  // Essential for full page render; if WAITING, production readiness FAILS
  | 'OPTIONAL';  // Can be cleanly hidden if asset is not ready

export type AssetCategory =
  | 'HERO'
  | 'SERP_CANDIDATE'
  | 'PROBLEM'
  | 'BEFORE'
  | 'AFTER'
  | 'SPACE'
  | 'PROCESS'
  | 'PORTFOLIO'
  | 'TEXTURE';

export interface ImageDimensions {
  readonly width: number;
  readonly height: number;
}

export interface ImageAssetSlot {
  readonly id: string;
  readonly category: AssetCategory;
  readonly requirement: AssetRequirement;
  readonly status: ImageRegistryStatus;
  readonly altText: string;
  readonly recommendedDimensions: ImageDimensions;
  readonly src?: string;
  readonly note?: string;
}
