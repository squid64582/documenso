// packages/lib/landing-page-generator/generate.ts
import { LandingPageGeneratorOptions, LandingPageGeneratorResult } from './types';

/**
 * Generates a landing page using the soom-fragments service
 */
export async function generateLandingPage(
  options: LandingPageGeneratorOptions,
): Promise<LandingPageGeneratorResult> {
  const { template, product, additionalContext, userId } = options;

  // Prepare the prompt for the landing page
  const prompt = `Generate a professional landing page for ${product}. ${additionalContext}. 
  Use the ${template} style template. Include sections for features, benefits, call-to-action, 
  and testimonials. Make it responsive and modern.`;

  try {
    // Store the data in localStorage to be picked up by the fragments app
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'documenso_landing_page_data',
        JSON.stringify({
          prompt,
          template: 'html', // Use the HTML template from soom-fragments
          userId,
          timestamp: Date.now(),
        }),
      );
    }

    return {
      redirectUrl: '/fragments',
      success: true,
    };
  } catch (error) {
    console.error('Error generating landing page:', error);
    throw new Error('Failed to generate landing page');
  }
}
