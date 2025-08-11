import type { Metadata } from 'next';
import type { Locale } from '@/lib/types/i18n';

interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: Locale;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const defaultMetadata = {
  siteName: 'Pham Ngoc Hoang Nam - Portfolio',
  siteUrl: 'https://your-domain.com', // Replace with your actual domain
  defaultImage: '/assets/imgs/og-image.jpg',
  twitterHandle: '@your_twitter', // Replace with your Twitter handle
  author: 'Pham Ngoc Hoang Nam',
  email: 'nam23062002@gmail.com',
};

export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultMetadata.defaultImage,
    url = defaultMetadata.siteUrl,
    type = 'website',
    locale = 'vi',
    publishedTime,
    modifiedTime,
    author = defaultMetadata.author,
    section,
    tags = [],
  } = config;

  const fullTitle = title.includes(defaultMetadata.siteName) 
    ? title 
    : `${title} | ${defaultMetadata.siteName}`;

  const imageUrl = image.startsWith('http') ? image : `${defaultMetadata.siteUrl}${image}`;
  const canonicalUrl = url.startsWith('http') ? url : `${defaultMetadata.siteUrl}${url}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author, url: defaultMetadata.siteUrl }],
    creator: author,
    publisher: author,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: type,
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: defaultMetadata.twitterHandle,
      images: [imageUrl],
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'vi-VN': `${defaultMetadata.siteUrl}/vi${url.replace(defaultMetadata.siteUrl, '')}`,
        'en-US': `${defaultMetadata.siteUrl}/en${url.replace(defaultMetadata.siteUrl, '')}`,
      },
    },

    // Verification
    verification: {
      google: 'your-google-verification-code', // Replace with your Google verification code
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  };

  // Article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author],
      section,
      tags,
    };
  }

  return metadata;
}

// Predefined metadata for common pages
export const pageMetadata = {
  home: (locale: Locale): MetadataConfig => ({
    title: locale === 'vi' 
      ? 'Pham Ngoc Hoang Nam - Fullstack Developer' 
      : 'Pham Ngoc Hoang Nam - Fullstack Developer',
    description: locale === 'vi'
      ? 'Portfolio của Pham Ngoc Hoang Nam - Fullstack Developer chuyên về React, Node.js, và các công nghệ web hiện đại. Khám phá các dự án và kinh nghiệm của tôi.'
      : 'Portfolio of Pham Ngoc Hoang Nam - Fullstack Developer specializing in React, Node.js, and modern web technologies. Explore my projects and experience.',
    keywords: [
      'Pham Ngoc Hoang Nam',
      'Fullstack Developer',
      'React Developer',
      'Node.js Developer',
      'Web Developer',
      'Portfolio',
      'JavaScript',
      'TypeScript',
      'Next.js',
    ],
    url: '/',
    locale,
  }),

  about: (locale: Locale): MetadataConfig => ({
    title: locale === 'vi' ? 'Giới thiệu - Pham Ngoc Hoang Nam' : 'About - Pham Ngoc Hoang Nam',
    description: locale === 'vi'
      ? 'Tìm hiểu về Pham Ngoc Hoang Nam - Fullstack Developer với kinh nghiệm trong React, Node.js, và phát triển web. Xem kỹ năng, kinh nghiệm và thông tin liên hệ.'
      : 'Learn about Pham Ngoc Hoang Nam - Fullstack Developer with experience in React, Node.js, and web development. View skills, experience, and contact information.',
    keywords: [
      'About',
      'Skills',
      'Experience',
      'Fullstack Developer',
      'React',
      'Node.js',
      'Web Development',
    ],
    url: '/about',
    locale,
  }),

  portfolio: (locale: Locale): MetadataConfig => ({
    title: locale === 'vi' ? 'Dự án - Portfolio' : 'Projects - Portfolio',
    description: locale === 'vi'
      ? 'Khám phá các dự án web và ứng dụng di động mà tôi đã phát triển. Từ e-commerce đến ứng dụng doanh nghiệp, xem portfolio đầy đủ của tôi.'
      : 'Explore web and mobile projects I have developed. From e-commerce to enterprise applications, view my complete portfolio.',
    keywords: [
      'Portfolio',
      'Projects',
      'Web Development',
      'Mobile Development',
      'React Projects',
      'Node.js Projects',
    ],
    url: '/portfolio',
    locale,
  }),

  blog: (locale: Locale): MetadataConfig => ({
    title: locale === 'vi' ? 'Blog - Chia sẻ kiến thức' : 'Blog - Knowledge Sharing',
    description: locale === 'vi'
      ? 'Blog chia sẻ kiến thức về lập trình web, React, Node.js, và các công nghệ mới nhất. Tutorials, tips và kinh nghiệm thực tế từ một Fullstack Developer.'
      : 'Blog sharing knowledge about web programming, React, Node.js, and latest technologies. Tutorials, tips and practical experience from a Fullstack Developer.',
    keywords: [
      'Blog',
      'Programming',
      'Web Development',
      'React Tutorial',
      'Node.js Tutorial',
      'JavaScript',
      'TypeScript',
    ],
    url: '/blog',
    locale,
  }),

  contact: (locale: Locale): MetadataConfig => ({
    title: locale === 'vi' ? 'Liên hệ - Pham Ngoc Hoang Nam' : 'Contact - Pham Ngoc Hoang Nam',
    description: locale === 'vi'
      ? 'Liên hệ với Pham Ngoc Hoang Nam để thảo luận về dự án, cơ hội hợp tác hoặc tư vấn phát triển web. Email: nam23062002@gmail.com'
      : 'Contact Pham Ngoc Hoang Nam to discuss projects, collaboration opportunities or web development consulting. Email: nam23062002@gmail.com',
    keywords: [
      'Contact',
      'Hire Developer',
      'Web Development Services',
      'Freelance Developer',
      'Consultation',
    ],
    url: '/contact',
    locale,
  }),
};

// Generate blog post metadata
export function generateBlogPostMetadata(
  post: {
    title: string;
    excerpt: string;
    slug: string;
    tags: string[];
    publishedAt: Date;
    author: { name: string };
    featuredImage?: string;
  },
  locale: Locale
): MetadataConfig {
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, 'blog', 'tutorial', 'programming'],
    image: post.featuredImage || defaultMetadata.defaultImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    locale,
    publishedTime: post.publishedAt.toISOString(),
    author: post.author.name,
    section: 'Technology',
    tags: post.tags,
  };
}