import { LandingPageOutput } from '@/lib/sandbox/nextjs-preview'
import { Octokit } from '@octokit/rest'

export async function commitLandingPageToGitHub(
  landingPage: LandingPageOutput,
  options: {
    token: string
    owner: string
    repo: string
    branch?: string
    commitMessage?: string
  },
) {
  const {
    token,
    owner,
    repo,
    branch = 'main',
    commitMessage = 'Add generated landing page',
  } = options

  const octokit = new Octokit({ auth: token })

  // Get the latest commit SHA
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  })

  const latestCommitSha = refData.object.sha

  // Create a new tree with the landing page files
  const files = [
    {
      path: landingPage.filePath,
      content: landingPage.code,
      mode: '100644', // File mode (standard file)
    },
    ...landingPage.additionalFiles.map((file) => ({
      path: file.path,
      content: file.content,
      mode: '100644',
    })),
  ]

  const { data: treeData } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: latestCommitSha,
    tree: files.map((file) => ({
      path: file.path,
      mode: '100644' as const,
      type: 'blob',
      content: file.content,
    })),
  })

  // Create a commit
  const { data: commitData } = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: treeData.sha,
    parents: [latestCommitSha],
  })

  // Update the reference
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: commitData.sha,
  })

  return {
    commitSha: commitData.sha,
    files: files.map((file) => file.path),
  }
}
