import { sanityFetch } from "@/sanity/lib/live";
import { POST_DETAIL_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";
import type { Metadata } from "next";
import { SEOArticleSchema } from "@/components/seo/SEOArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CanonicalTag } from "@/components/seo/CanonicalTag";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  const { data: post } = await sanityFetch({
    query: POST_DETAIL_QUERY,
    params: { slug },
  });

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  const url = `https://codertodata.dev/${locale}/blog/${slug}`;

  return {
    title: { absolute: post.title },
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale } = await params;

  const { data: post } = await sanityFetch({
    query: POST_DETAIL_QUERY,
    params: { slug },
  });

  if (!post) {
    notFound();
  }

  const currentUrl = `https://codertodata.dev/${locale}/blog/${slug}`;
  const breadcrumbItems = [
    { name: "Home", item: `https://codertodata.dev/${locale}` },
    { name: "Blog", item: `https://codertodata.dev/${locale}/blog` },
    { name: post.title, item: currentUrl },
  ];

  return (
    <>
      <CanonicalTag url={currentUrl} />
      <SEOArticleSchema post={post} url={currentUrl} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogDetail post={post} />
    </>
  );
}
