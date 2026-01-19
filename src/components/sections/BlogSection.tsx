import { POSTS_QUERY } from "@/sanity/lib/queries";
import BlogClient from "../client/BlogClient";
import { sanityFetch } from "@/sanity/lib/live";

// const options = { cache: "no-store" };

export default async function BlogSection() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY, params: {} });

  return <BlogClient posts={posts} />;
}
