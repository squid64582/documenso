import { Duration } from '@/lib/duration'
import { getModelClient, getDefaultMode } from '@/lib/models'
import { LLMModel, LLMModelConfig } from '@/lib/models'
import ratelimit from '@/lib/ratelimit'
import { streamObject, LanguageModel, CoreMessage } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const maxDuration = 120 // Longer timeout for page generation

// Define schema for the landing page output
const landingPageSchema = z.object({
  code: z.string().describe('The complete Next.js page component code'),
  filePath: z
    .string()
    .describe(
      'The file path where this component should be saved in the repository',
    ),
  additionalFiles: z
    .array(
      z.object({
        path: z.string(),
        content: z.string(),
      }),
    )
    .describe('Any additional files needed (components, styles, etc.)'),
  commentary: z
    .string()
    .describe('Explanation of the implementation and any important notes'),
  template: z.string().describe('The template used for generation'),
})

const rateLimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 10
const ratelimitWindow = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : '1d'

export async function POST(req: NextRequest) {
  try {
    const {
      user_id,
      template,
      productDetails,
      brandKit,
      custom_prompt,
      model,
      config,
      repo_path,
      github_info,
    } = await req.json()

    // Apply rate limiting
    const limit = !config?.apiKey
      ? await ratelimit(user_id, rateLimitMaxRequests, ratelimitWindow)
      : false

    if (limit) {
      return NextResponse.json(
        { error: 'You have reached your request limit for the day.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.amount.toString(),
            'X-RateLimit-Remaining': limit.remaining.toString(),
            'X-RateLimit-Reset': limit.reset.toString(),
          },
        },
      )
    }

    // Create a system prompt for Next.js landing page generation
    const systemPrompt = `
You are a landing page generator for Next.js Headless Shopify stores. 
Your task is to create a complete Next.js page component based on the provided template, product details, and brand kit.

TEMPLATE STRUCTURE:
${JSON.stringify(template.structure, null, 2)}

PRODUCT DETAILS:
${JSON.stringify(productDetails, null, 2)}

BRAND KIT:
${JSON.stringify(brandKit, null, 2)}

CUSTOM INSTRUCTIONS:
${custom_prompt}

IMPORTANT REQUIREMENTS:
1. Generate a complete Next.js page component that will be placed at: ${repo_path || 'pages/landing/[product].tsx'}
2. Use TypeScript and modern React patterns (functional components, hooks)
3. Ensure the page is responsive and follows the brand kit guidelines
4. Include proper data fetching from Shopify using getStaticProps or getServerSideProps as appropriate
5. Implement proper SEO metadata
6. Use TailwindCSS for styling
7. Ensure the code is well-structured and commented

The output should be production-ready code that can be directly committed to the repository.
`

    // Configure the model
    const selectedModel: LLMModel =
      model ||
      ({
        id: 'claude-3-5-sonnet-20240620',
        providerId: 'anthropic',
      } as LLMModel)
    const modelConfig = config || {
      temperature: 0.7,
      apiKey: process.env.ANTHROPIC_API_KEY,
    }

    const {
      model: modelNameString,
      apiKey: modelApiKey,
      ...modelParams
    } = modelConfig
    const modelClient = getModelClient(selectedModel, modelConfig)

    // Create a message for the AI
    const messages: CoreMessage[] = [
      {
        role: 'user',
        content: `Generate a Next.js landing page for the product "${productDetails.title}" using the specified template and brand guidelines. ${custom_prompt}`,
      },
    ]

    console.log('Generating landing page for user:', user_id)
    console.log('Using model:', selectedModel)

    // Generate the landing page
    const stream = await streamObject({
      model: modelClient as LanguageModel,
      schema: landingPageSchema,
      system: systemPrompt,
      messages,
      mode: getDefaultMode(selectedModel),
      ...modelParams,
    })

    return stream.toTextStreamResponse()
  } catch (error: any) {
    console.error('Error generating landing page:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 },
    )
  }
}
