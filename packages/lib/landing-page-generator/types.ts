// packages/lib/landing-page-generator/types.ts
export interface LandingPageGeneratorOptions {
  template: string;
  product: string;
  additionalContext: string;
  userId: string;
}

export interface LandingPageGeneratorResult {
  redirectUrl: string;
  success: boolean;
}
