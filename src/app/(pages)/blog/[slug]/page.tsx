"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useLoading } from "@/lib/hooks/useStores";

// Mock blog data - in real app, this would come from API/CMS
const mockBlogPosts = [
  {
    id: 1,
    slug: "getting-started-with-react-18",
    title: "Getting Started with React 18",
    excerpt: "Learn about the new features and improvements in React 18",
    content: `
# Getting Started with React 18

React 18 introduces several groundbreaking features that revolutionize how we build React applications. In this comprehensive guide, we'll explore the most important updates and how to implement them in your projects.

## What's New in React 18?

### 1. Concurrent Features
React 18 introduces concurrent features that allow React to interrupt, pause, resume, or abandon rendering work. This makes your app more responsive by preventing blocking renders.

### 2. Automatic Batching
React 18 automatically batches multiple state updates into a single re-render for better performance, even inside promises, timeouts, and native event handlers.

### 3. Suspense Improvements
Enhanced Suspense support for data fetching, with better integration with concurrent features.

## Key Features Deep Dive

### Concurrent Rendering
\`\`\`javascript
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
\`\`\`

### useTransition Hook
The \`useTransition\` hook lets you mark updates as transitions, which tells React that they can be interrupted and avoid going back to Suspense fallbacks.

\`\`\`javascript
import { useTransition, useState } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
\`\`\`

## Conclusion

React 18 represents a major step forward in React's evolution. The concurrent features, automatic batching, and improved Suspense make applications more responsive and provide better user experiences.

Start migrating your applications today and take advantage of these powerful new features!
    `,
    featuredImage: "/assets/imgs/blog1.jpg",
    publishedAt: new Date("2024-01-15"),
    readingTime: 8,
    category: "technology",
    tags: ["React", "JavaScript", "Frontend", "React 18"],
    views: 1250,
    author: {
      name: "Pham Ngoc Hoang Nam",
      email: "nam23062002@gmail.com",
      avatar: "/assets/imgs/Nam_1.jpg",
      bio: "Fullstack Developer passionate about modern web technologies"
    }
  },
  {
    id: 2,
    slug: "building-responsive-web-applications",
    title: "Building Responsive Web Applications",
    excerpt: "Best practices for creating responsive and mobile-friendly websites",
    content: `
# Building Responsive Web Applications

In today's multi-device world, creating responsive web applications is not just a nice-to-have feature—it's essential. This comprehensive guide will walk you through the best practices and techniques for building truly responsive applications.

## Understanding Responsive Design

Responsive web design is an approach that makes web pages render well on a variety of devices and window or screen sizes. It uses flexible layouts, images, and cascading style sheet media queries.

### Core Principles

1. **Fluid Grids**: Use relative units instead of fixed pixels
2. **Flexible Images**: Images that scale with the layout
3. **Media Queries**: CSS techniques to apply different styles for different devices

## Conclusion

Building responsive web applications requires careful planning and attention to detail. By following these best practices and leveraging modern CSS features, you can create applications that work beautifully across all devices.
    `,
    featuredImage: "/assets/imgs/blog2.jpg",
    publishedAt: new Date("2024-01-10"),
    readingTime: 12,
    category: "tutorial",
    tags: ["CSS", "Responsive Design", "Mobile", "Web Development"],
    views: 980,
    author: {
      name: "Pham Ngoc Hoang Nam",
      email: "nam23062002@gmail.com",
      avatar: "/assets/imgs/Nam_1.jpg",
      bio: "Fullstack Developer passionate about modern web technologies"
    }
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { setLoading } = useLoading() as { setLoading: (loading: boolean, message?: string) => void };
  type BlogPost = typeof mockBlogPosts[number];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    
    // Simulate loading time
    const loadPost = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the post by slug
      const foundPost = mockBlogPosts.find(p => p.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Get related posts (same category, excluding current post)
        const related = mockBlogPosts
          .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
        
        // Increment views (in real app, this would be an API call)
        foundPost.views += 1;
      }
      
      setIsLoading(false);
    };

    loadPost();
  }, [params.slug]);

  const handleBackClick = () => {
    setLoading(true, 'Quay lại danh sách blog...');
  };

  const handleRelatedPostClick = (postTitle: string) => {
    setLoading(true, `Đang tải "${postTitle}"...`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center items-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg"
            >
              Đang tải bài viết...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/blog"
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 pt-8"
        >
          <Link 
            href="/blog"
            onClick={handleBackClick}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <motion.svg
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
            <span className="group-hover:underline">{t('common.back')} </span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-12"
        >
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-64 md:h-96 bg-gray-200 flex items-center justify-center"
          >
            <span className="text-gray-500">Featured Image</span>
          </motion.div>

          <div className="p-8">
            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <span>{t('blog.publishedOn')} {post.publishedAt.toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readingTime} {t('blog.readingTime')}</span>
              <span>•</span>
              <span>{post.views} views</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              {post.title}
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {post.tags.map((tag: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\n/g, '<br>')
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
                    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
                    .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-8 mb-4 text-gray-800">$1</h3>')
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-10 mb-6 text-gray-800">$1</h2>')
                    .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mt-12 mb-8 text-gray-800">$1</h1>')
                }}
              />
            </motion.div>
          </div>
        </motion.article>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{post.author.name}</h3>
              <p className="text-gray-600 mb-4">{post.author.bio}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">LinkedIn</a>
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">GitHub</a>
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <AnimatePresence>
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      onClick={() => handleRelatedPostClick(relatedPost.title)}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 block"
                    >
                      <div className="h-32 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Image</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{relatedPost.readingTime} {t('blog.readingTime')}</span>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.views} views</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Comments Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
          
          {/* Comment Form */}
          <form className="mb-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Write your comment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </motion.button>
          </form>

          {/* Sample Comments */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="border-b border-gray-200 pb-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">John Doe</h4>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700">
                    Great article! The explanation of concurrent features in React 18 is very clear and helpful. 
                    I&apos;m excited to implement these in my next project.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="border-b border-gray-200 pb-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-gray-700">
                    Thanks for the migration guide! It made updating my project to React 18 much smoother.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}