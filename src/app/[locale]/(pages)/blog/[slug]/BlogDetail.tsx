"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useLoading } from "@/lib/hooks/useStores";
import { BlogPost } from "@/lib/types/blog";

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
}

export default function BlogDetail({ post, relatedPosts, locale }: BlogDetailProps) {
  const { t } = useTranslation();
  const { setLoading } = useLoading();

  const handleBackClick = () => {
    setLoading(true, "Quay lại danh sách blog...");
  };

  const handleRelatedPostClick = (postTitle: string) => {
    setLoading(true, `Đang tải "${postTitle}"...`);
  };

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
            href={`/${locale}/blog`}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </motion.svg>
            <span className="group-hover:underline">{t("common.back")}</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-12"
        >
          <div className="h-64 md:h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Featured Image</span>
          </div>

          <div className="p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              {post.author && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span>{post.author.name}</span>
                </div>
              )}
              <span>•</span>
              <span>
                {t("blog.publishedOn")}{" "}
                {post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : ""}
              </span>
              <span>•</span>
              <span>{post.readingTime} {t("blog.readingTime")}</span>
              <span>•</span>
              <span>{post.views ?? 0} views</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>
          </div>
        </motion.article>

        {/* Related posts */}
        <AnimatePresence>
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-8">
                Related Posts
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp, i) => (
                  <motion.div
                    key={rp._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={`/${locale}/blog/${rp.slug}`}
                      onClick={() => handleRelatedPostClick(rp.title)}
                      className="bg-white rounded-lg shadow-lg block hover:shadow-xl transition"
                    >
                      <div className="h-32 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Image</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {rp.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {rp.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{rp.readingTime} {t("blog.readingTime")}</span>
                          <span className="mx-2">•</span>
                          <span>{rp.views ?? 0} views</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
