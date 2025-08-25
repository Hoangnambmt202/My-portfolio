"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { client } from "@/lib/sanity/sanity";
import { singlePostQuery } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useLoading } from "@/lib/hooks/useStores";
import { BlogPost } from "@/lib/types/blog";

export default  function BlogDetailPage() {
  const params = useParams();
  const { t, locale } = useTranslation();
  const { setLoading } = useLoading();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;

    const loadPost = async () => {
      setIsLoading(true);
      try {
        const foundPost = await client.fetch(singlePostQuery, { slug });

        if (foundPost) {
          setPost(foundPost);

          const related = await client.fetch(
            `*[_type == "post" && slug.current != $slug && count((categories[]->title)[@ in ^.^.categories[]->title]) > 0][0..2]{
              _id, 
              title, 
              "slug": slug.current, 
              excerpt, 
              publishedAt,
              "readingTime": round(length(pt::text(content)) / 5 / 180),
              views
            }`,
            { slug }
          );
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error loading post:", error);
      }
      setIsLoading(false);
    };

    loadPost();
  }, [params.slug]);

  const handleBackClick = () => {
    setLoading(true, "Quay lại danh sách blog...");
  };

  const handleRelatedPostClick = (postTitle: string) => {
    setLoading(true, `Đang tải "${postTitle}"...`);
  };

  // ⏳ Loading
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

  // ❌ Not found
  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href={`/${locale}/blog`}
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
            <span className="group-hover:underline">{t("common.back")} </span>
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
                {post.publishedAt
                  ? new Date(post.publishedAt).toISOString().slice(0, 10)
                  : ""}
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
              <PortableText value={post.body as any} />
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
