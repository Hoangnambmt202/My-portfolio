// Blog related types
import { BaseEntity } from './common';

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  readingTime: number; // in minutes
  views: number;
}

export interface Author {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type BlogCategory = 
  | 'technology'
  | 'tutorial'
  | 'thoughts'
  | 'news'
  | 'case-study'
  | 'other';

export interface Comment extends BaseEntity {
  postId: string;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  content: string;
  approved: boolean;
  parentId?: string; // for replies
} 