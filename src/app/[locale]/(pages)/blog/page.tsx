import { client } from "@/lib/sanity/sanity";
import { allPostsQuery } from "@/lib/sanity/queries";
import BlogList from "./BlogList"; // Import đúng đường dẫn component trên
import { setRequestLocale } from 'next-intl/server';

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  // 1. Await params (Next.js 15)
  const { locale } = await params;

  // 2. Enable static rendering for this locale (optional but recommended)
  setRequestLocale(locale);

  // 3. Fetch data
  const posts = await client.fetch(allPostsQuery);

  // 4. Render Client Component
  // Locale sẽ được tự động lấy trong BlogList qua useLocale() của next-intl
  return <BlogList posts={posts} />;
}