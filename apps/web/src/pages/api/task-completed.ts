import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@documenso/prisma';

interface TaskOutput {
  brand_kit_id: string | number;
  task_name: string;
  task_output: Record<string, unknown>;
}

interface VisualElementsOutput {
  logo_url?: string;
  colors?: {
    primary_color?: string;
    secondary_color?: string;
    accent_color?: string;
    neutral_color_dark?: string;
    neutral_color_light?: string;
    other_color_1?: string;
    other_color_2?: string;
    other_color_3?: string;
    other_color_4?: string;
  };
  typography?: {
    primary_typeface_headings?: string;
    primary_typeface_body?: string;
    h1_size?: string;
    h1_line_height?: string;
    h1_font_weight?: string;
    h2_size?: string;
    h2_line_height?: string;
    h2_font_weight?: string;
    h3_size?: string;
    h3_line_height?: string;
    h3_font_weight?: string;
    h4_size?: string;
    h4_line_height?: string;
    h4_font_weight?: string;
    h5_size?: string;
    h5_line_height?: string;
    h5_font_weight?: string;
    body_text_size?: string;
    body_text_line_height?: string;
    body_text_font_weight?: string;
    small_text_size?: string;
    small_text_line_height?: string;
    small_text_font_weight?: string;
  };
  images?: string[];
  logo_description?: string;
}

interface CategorizedImagesOutput {
  categorized_images?: Array<{
    image_url: string;
    category: string;
  }>;
}

interface ImageryStyleOutput {
  overall_style_analysis?: string;
  style_guidelines?: string;
  image_details?: Array<{
    image_url: string;
    category: string;
    description: string;
  }>;
  new_image_suggestions?: string[];
  imagery_style?: string;
}

interface BrandVoiceOutput {
  brand_voice_summary?: string;
  tone_characteristics?: {
    formality_level?: string;
    emotional_tone?: string;
    technical_level?: string;
    personality_traits?: string[];
  };
  key_messaging_themes?: string[];
  value_propositions?: string[];
  target_audience?: {
    primary_audience?: string;
    secondary_audiences?: string[];
    audience_pain_points_addressed?: string[];
  };
  language_patterns?: {
    common_adjectives?: string[];
    common_verbs?: string[];
    industry_jargon?: string[];
    sentence_complexity?: string;
    average_sentence_length?: string;
  };
  persuasion_techniques?: string[];
  call_to_action_patterns?: string[];
  brand_voice_guidelines?: {
    do?: string[];
    dont?: string[];
  };
  brand_name?: string;
  brand_description?: string;
  mission_statement?: string;
  vision_statement?: string;
  brand_values?: unknown;
  messaging_guidelines?: string;
}

interface CompetitiveAnalysisOutput {
  industry?: string;
  brand_name?: string;
  brand_focus?: Array<{
    focus_area: string;
    icon: string;
    importance: string;
    color: string;
  }>;
  target_audience?: {
    primary: string;
    secondary: string;
    icon: string;
    color: string;
  };
  market_position?: {
    segment: string;
    focus: string;
    icon: string;
    color: string;
  };
  competitors?: Array<{
    name: string;
    color: string;
    description: string;
    strengths: string[];
    weaknesses: string[];
  }>;
  comparison_data?: Array<Record<string, number | string>>;
}

interface MarketPositioningOutput {
  positioning_elements?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  positioning_insights?: Array<{
    title: string;
    icon: string;
    color: string;
    description: string;
  }>;
  strategic_recommendations?: Array<{
    title: string;
    description: string;
    icon: string;
    priority: string;
  }>;
  conclusion?: string;
  target_audience?: unknown;
  market_position?: unknown;
}

interface StrategicRecommendationsOutput {
  product_inventory_check?: {
    total_products_found: number;
    products_missing_from_previous_task: Array<{
      product_name: string;
      product_url: string;
      product_description: string;
    }>;
    all_products_captured: boolean;
  };
  product_copywriting?: Array<{
    product_name: string;
    product_url: string;
    original_description: string;
    new_copy_elements: {
      primary_headlines: string[];
      sub_headlines: string[];
      one_sentence_benefits: string[];
      credibility_statements: string[];
      mini_mechanisms: string[];
      email_subject_lines: string[];
      calls_to_action: string[];
      email_marketing_templates: Array<{
        subject_line: string;
        email_body: string;
      }>;
    };
  }>;
  positioning_elements?: unknown;
  positioning_insights?: unknown;
  recommendations?: unknown;
  conclusion?: string;
}

interface BrandKitSummary {
  brand_url?: string;
  brand_identity?: Record<string, unknown>;
  visual_identity?: Record<string, unknown>;
  market_research?: Record<string, unknown>;
  strategic_recommendations?: Record<string, unknown>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brand_kit_id, task_name, task_output } = req.body;

    // Validate required fields
    if (!brand_kit_id || !task_name || !task_output) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Received task completion for ${task_name} in brand kit ${brand_kit_id}`);

    // Convert brand_kit_id to integer if it's a string
    const brandKitId = typeof brand_kit_id === 'string' ? parseInt(brand_kit_id, 10) : brand_kit_id;

    // Store the task output in the database
    await prisma.taskOutput.create({
      data: {
        brandKitId,
        taskName: task_name,
        output: task_output,
        createdAt: new Date(),
      },
    });

    // Process the task output based on the task name
    await processTaskOutput(brandKitId, task_name, task_output);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing task completion:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function processTaskOutput(
  brandKitId: number,
  taskName: string,
  taskOutput: Record<string, unknown>,
) {
  // Check if the brand kit exists
  const brandKit = await prisma.brandKit.findUnique({
    where: { id: brandKitId },
  });

  if (!brandKit) {
    // Create a new brand kit if it doesn't exist
    await prisma.brandKit.create({
      data: {
        id: brandKitId,
        status: 'processing',
        brandUrl: '', // Required field based on schema
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } else {
    // Update the brand kit's updated_at timestamp
    await prisma.brandKit.update({
      where: { id: brandKitId },
      data: { updatedAt: new Date() },
    });
  }

  // Process different task types
  switch (taskName) {
    case 'extract_visual_elements_task':
    case 'categorize_images_task':
    case 'analyze_imagery_style_task':
      await processVisualIdentity(
        brandKitId,
        taskName,
        taskOutput as VisualElementsOutput | ImageryStyleOutput,
      );
      break;

    case 'analyze_brand_voice_task':
      await processBrandIdentity(brandKitId, taskOutput as BrandVoiceOutput);
      break;

    case 'conduct_competitive_analysis_task':
    case 'determine_market_positioning_task':
      await processMarketResearch(
        brandKitId,
        taskName,
        taskOutput as CompetitiveAnalysisOutput | MarketPositioningOutput,
      );
      break;

    case 'product_copywriting_task':
      await processStrategicRecommendations(
        brandKitId,
        taskOutput as StrategicRecommendationsOutput,
      );
      break;

    case 'brand_kit_summary':
      await processBrandKitSummary(brandKitId, taskOutput as BrandKitSummary);
      break;

    default:
      console.log(`No specific processing for task: ${taskName}`);
  }
}

async function processVisualIdentity(
  brandKitId: number,
  taskName: string,
  taskOutput: VisualElementsOutput | ImageryStyleOutput,
) {
  // Find existing visual identity or create a new one
  const existingVisualIdentity = await prisma.visualIdentity.findUnique({
    where: { brandKitId },
  });

  const data: Record<string, unknown> = {};

  if (taskName === 'extract_visual_elements_task') {
    const visualOutput = taskOutput as VisualElementsOutput;
    data.logoUrl = visualOutput.logo_url;
    data.colors = visualOutput.colors;
    data.typography = visualOutput.typography;
    data.images = visualOutput.images;
    data.logoDescription = visualOutput.logo_description;
  } else if (taskName === 'analyze_imagery_style_task') {
    const imageryOutput = taskOutput as ImageryStyleOutput;
    data.overallStyleAnalysis = imageryOutput.overall_style_analysis;
    data.styleGuidelines = imageryOutput.style_guidelines;
    data.imageDetails = imageryOutput.image_details;
    data.newImageSuggestions = imageryOutput.new_image_suggestions;
    data.imageryStyle = imageryOutput.imagery_style;
  }

  if (existingVisualIdentity) {
    await prisma.visualIdentity.update({
      where: { brandKitId },
      data,
    });
  } else {
    await prisma.visualIdentity.create({
      data: {
        brandKitId,
        ...data,
      },
    });
  }
}

async function processBrandIdentity(brandKitId: number, taskOutput: BrandVoiceOutput) {
  const existingBrandIdentity = await prisma.brandIdentity.findUnique({
    where: { brandKitId },
  });

  const data = {
    brandName: taskOutput.brand_name || 'Unknown Brand',
    brandDescription: taskOutput.brand_description,
    missionStatement: taskOutput.mission_statement,
    visionStatement: taskOutput.vision_statement,
    coreValues: taskOutput.brand_values ? JSON.stringify(taskOutput.brand_values) : null,
    toneOfVoice: taskOutput.tone_characteristics
      ? JSON.stringify(taskOutput.tone_characteristics)
      : null,
    messagingGuidelines: taskOutput.brand_voice_guidelines
      ? JSON.stringify(taskOutput.brand_voice_guidelines)
      : null,
  };

  if (existingBrandIdentity) {
    await prisma.brandIdentity.update({
      where: { brandKitId },
      data,
    });
  } else {
    await prisma.brandIdentity.create({
      data: {
        brandKitId,
        ...data,
      },
    });
  }
}

async function processMarketResearch(
  brandKitId: number,
  taskName: string,
  taskOutput: CompetitiveAnalysisOutput | MarketPositioningOutput,
) {
  const existingMarketResearch = await prisma.marketResearch.findUnique({
    where: { brandKitId },
  });

  const data: Record<string, unknown> = {};

  if (taskName === 'conduct_competitive_analysis_task') {
    const compAnalysis = taskOutput as CompetitiveAnalysisOutput;
    data.industry = compAnalysis.industry;
    data.brandName = compAnalysis.brand_name;
    data.brandFocus = compAnalysis.brand_focus;
    data.targetAudience = compAnalysis.target_audience;
    data.marketPosition = compAnalysis.market_position;
    data.competitors = compAnalysis.competitors;
    data.comparisonData = compAnalysis.comparison_data;
  } else if (taskName === 'determine_market_positioning_task') {
    const positioningOutput = taskOutput as MarketPositioningOutput;
    data.positioningElements = positioningOutput.positioning_elements;
    data.positioningInsights = positioningOutput.positioning_insights;
    data.strategicRecommendations = positioningOutput.strategic_recommendations;
    data.conclusion = positioningOutput.conclusion;
    data.targetAudience = positioningOutput.target_audience;
    data.marketPosition = positioningOutput.market_position;
  }

  if (existingMarketResearch) {
    await prisma.marketResearch.update({
      where: { brandKitId },
      data,
    });
  } else {
    await prisma.marketResearch.create({
      data: {
        brandKitId,
        ...data,
      },
    });
  }
}

async function processStrategicRecommendations(
  brandKitId: number,
  taskOutput: StrategicRecommendationsOutput,
) {
  const existingRecommendations = await prisma.strategicRecommendations.findUnique({
    where: { brandKitId },
  });

  const data = {
    productInventoryCheck: taskOutput.product_inventory_check,
    productCopywriting: taskOutput.product_copywriting,
    positioningElements: taskOutput.positioning_elements,
    positioningInsights: taskOutput.positioning_insights,
    recommendations: taskOutput.recommendations,
    conclusion: taskOutput.conclusion,
  };

  if (existingRecommendations) {
    await prisma.strategicRecommendations.update({
      where: { brandKitId },
      data,
    });
  } else {
    await prisma.strategicRecommendations.create({
      data: {
        brandKitId,
        ...data,
      },
    });
  }
}

async function processBrandKitSummary(brandKitId: number, summary: BrandKitSummary) {
  // Update the brand kit status to completed
  await prisma.brandKit.update({
    where: { id: brandKitId },
    data: {
      status: 'completed',
      brandUrl: summary.brand_url || '',
      brandIdentity: summary.brand_identity,
      visualIdentity: summary.visual_identity,
      marketResearch: summary.market_research,
      strategicRecommendations: summary.strategic_recommendations,
    },
  });

  // Update shop installation if applicable
  if (summary.brand_url) {
    try {
      const shopDomain = new URL(summary.brand_url).hostname;

      const shopInstallation = await prisma.shopInstallation.findFirst({
        where: {
          shopDomain,
        },
      });

      if (shopInstallation) {
        await prisma.shopInstallation.update({
          where: { id: shopInstallation.id },
          data: {
            brandKitId,
          },
        });
      }
    } catch (error) {
      console.error('Error updating shop installation:', error);
    }
  }
}
