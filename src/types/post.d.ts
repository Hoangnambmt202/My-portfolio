/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityImageBlock {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanityCodeBlock {
  _type: "code";
  language?: string;
  code: string;
  filename?: string;
}

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
  readTime?: string;
  slug: {
    current: string;
  };
  publishedAt: string;
}
