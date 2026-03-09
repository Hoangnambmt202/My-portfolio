import React from "react";

interface SEOArticleSchemaProps {
  post: {
    title: string;
    excerpt?: string;
    publishedAt: string;
    _updatedAt: string;
    image?: {
      asset?: {
        url?: string;
      };
    };
    author?: {
      name: string;
    };
  };
  url: string;
}

export function SEOArticleSchema({ post, url }: SEOArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.image?.asset?.url ? [post.image.asset.url] : [],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Coder To Data",
      url: "https://codertodata.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "Coder To Data",
      logo: {
        "@type": "ImageObject",
        url: "https://codertodata.dev/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
