import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export async function GET() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  const feedContext = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Coder To Data Blog</title>
    <link>https://codertodata.dev</link>
    <description>Articles about web development, Next.js, and DevOps</description>
    <language>en</language>
    <atom:link href="https://codertodata.dev/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post: {
          title: string;
          slug: string;
          excerpt: string;
          publishedAt: string;
        }) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>https://codertodata.dev/en/blog/${post.slug}</link>
        <guid isPermaLink="true">https://codertodata.dev/en/blog/${post.slug}</guid>
        <description><![CDATA[${post.excerpt || ""}]]></description>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      </item>
    `,
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(feedContext, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
