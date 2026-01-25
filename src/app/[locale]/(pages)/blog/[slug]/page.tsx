import { sanityFetch } from "@/sanity/lib/live";
import { POST_DETAIL_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await sanityFetch({
    query: POST_DETAIL_QUERY,
    params: { slug },
  });

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  const ogImage = post.image
    ? urlFor(post.image).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [ogImage] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await sanityFetch({
    query: POST_DETAIL_QUERY,
    params: { slug },
  });

  if (!post) {
    notFound();
  }
  return <BlogDetail post={post} />;
}
