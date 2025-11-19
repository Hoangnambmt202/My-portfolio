import { client } from "@/lib/sanity/sanity";
import { singlePostQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string; locale: string }>; 
}) {
  const { slug, locale } = await props.params; 

  const post = await client.fetch(singlePostQuery, { slug });

  if (!post) {
    notFound();
  }

  const relatedPosts = await client.fetch(
    `*[_type == "post" && slug.current != $slug][0..2]{
      _id, 
      title, 
      "slug": slug.current, 
      excerpt, 
      publishedAt,
      "readingTime": round(length(pt::text(content)) / 5 / 180),
      views
    }`,
    { slug }
  );

  return <BlogDetail post={post} relatedPosts={relatedPosts} locale={locale} />;
}
