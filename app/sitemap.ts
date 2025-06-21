import { getPosts } from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const posts = (await getPosts()) ?? [];

  const postEntries: MetadataRoute.Sitemap = posts.map(
    ({ slug, updatedAt }) => ({
      url: `${baseUrl}/articles/${slug}`,
      lastModified: updatedAt?.toISOString(),
    })
  );

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/articles`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    {
      url: `${baseUrl}/policy/terms-of-use`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/policy/cookies`,
      lastModified: new Date().toISOString(),
    },
    { url: `${baseUrl}/meitav`, lastModified: new Date().toISOString() },
    {
      url: `${baseUrl}/meitav/success`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/tools/compound-interest-calculator`,
      lastModified: new Date().toISOString(),
    },
    ...postEntries,
  ];
}
