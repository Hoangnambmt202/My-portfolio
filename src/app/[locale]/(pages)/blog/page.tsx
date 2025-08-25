// app/[locale]/blog/page.tsx
import { client } from "@/lib/sanity/sanity";
import { allPostsQuery } from "@/lib/sanity/queries";
import BlogList from "@/app/[locale]/(pages)/blog/BlogList";

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);
  return <BlogList posts={posts} />;
}
