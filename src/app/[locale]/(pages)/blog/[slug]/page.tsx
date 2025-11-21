import { client } from "@/lib/sanity/sanity";
import { singlePostQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";
import { setRequestLocale } from 'next-intl/server';
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};
export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  // 2. Set locale cho server component
  setRequestLocale(locale);

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

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
}
