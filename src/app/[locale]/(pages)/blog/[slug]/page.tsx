import { sanityFetch } from "@/sanity/lib/live";
import { POST_DETAIL_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};


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
