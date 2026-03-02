// app/(admin)/blog/BlogManager.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import BlogManagerClient from "@/components/admin/blog/BlogManagerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoderToData | Posts",
  description: "Manage your blog posts",
};
export default async function BlogManager() {
  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params: {},
  });

  return <BlogManagerClient posts={posts} />;
}
