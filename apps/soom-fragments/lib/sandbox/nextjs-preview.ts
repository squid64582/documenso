import { Sandbox } from '@e2b/code-interpreter'

export interface LandingPageOutput {
  code: string
  filePath: string
  additionalFiles: Array<{
    path: string
    content: string
  }>
  commentary: string
  template: string
}

export async function createNextjsPreview(
  landingPage: LandingPageOutput,
  apiKey?: string,
) {
  // Create a sandbox using the same approach as in app/api/sandbox/route.ts
  const sbx = await Sandbox.create('nextjs', {
    metadata: { template: 'nextjs' },
    timeoutMs: 10 * 60 * 1000, // 10 minutes
    apiKey: apiKey || process.env.E2B_API_KEY,
  })

  try {
    // Create the main landing page file
    await sbx.files.write(landingPage.filePath, landingPage.code)

    // Create any additional files
    for (const file of landingPage.additionalFiles) {
      // Ensure directory exists
      const dirPath = file.path.split('/').slice(0, -1).join('/')
      if (dirPath) {
        await sbx.files.makeDir(dirPath)
      }
      await sbx.files.write(file.path, file.content)
    }

    // Install dependencies if needed
    await sbx.commands.run('npm install')

    // Start the Next.js dev server
    await sbx.commands.run('npm run dev')

    // Get the preview URL
    const previewUrl = `https://${sbx.getHost(3000)}`

    return {
      url: previewUrl,
      sbxId: sbx.sandboxId,
      template: 'nextjs',
    }
  } catch (error) {
    console.error('Error creating preview:', error)
    throw error
  }
}
