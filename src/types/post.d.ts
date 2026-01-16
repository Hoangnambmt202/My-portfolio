/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Post {
  _id: string;
  title: string;
  body?: any;
  views?: number;
  tags?: string[];
  author?: {
    name: string;
  };
  excerpt: string;
  description?: string;
  category?: string;
  date?: string;
  image?: SanityImageSource;
  readingTime?: string;
  slug: {
    current: string;
  };
    publishedAt: string;
}
