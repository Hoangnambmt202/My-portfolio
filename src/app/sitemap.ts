import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { SITEMAP_POSTS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://codertodata.dev";
  const { data: posts } = await sanityFetch({ query: SITEMAP_POSTS_QUERY });

  const blogPosts = posts.map((post: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/en/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPostsVi = posts.map(
    (post: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/vi/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/vi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vi/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPosts,
    ...blogPostsVi,
  ];
}
