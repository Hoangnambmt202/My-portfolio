/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SanityImageBlock {
  _type: "image";
  asset: {
    _id: string;
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
export interface Author {
  name: string;
  slug: {
    current: string;
  };
  bio?: string;
  avatar?: SanityImageSource;
}
export interface Category {
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}
export interface Image {
  _type: "image";
  asset: {
    _ref?: string;
    _id?: string;
    url?: string;
    _type?: "reference" | "sanity.imageAsset";
    metadata?: any;
  };
  alt?: string;
  crop?: any;
  hotspot?: any;
}
export interface Post {
  _id: string;
  title: string;
  body?: any;
  views?: number;
  tags?: string[];
  author?: Author;
  excerpt: string;
  status: "draft" | "published" | "scheduled";
  description?: string;
  category?: Category[];
  date: {
    _type: string;
    current: string;
  };
  image?: Image;
  slug:
    | {
        current: string;
      }
    | string;
  publishedAt: string;
}
