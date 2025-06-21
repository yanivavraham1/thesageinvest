// utils/github.ts
// Function to trigger GitHub Action via repository dispatch

interface GitHubDispatchPayload {
  slug: string;
  title: string;
  content: string;
}

export async function triggerGitHubAction(payload: GitHubDispatchPayload) {
  const { slug, title, content } = payload;

  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER; // e.g., "yourusername"
  const repoName = "thesageinvest"; // e.g., "your-blog-repo"

  if (!githubToken || !repoOwner || !repoName) {
    throw new Error("GitHub configuration missing");
  }

  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "create-mdx-file",
        client_payload: {
          slug,
          title,
          content,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${error}`);
  }

  return response;
}

// Updated API route with GitHub Action integration
// app/api/article/route.ts (add this to your existing route)
