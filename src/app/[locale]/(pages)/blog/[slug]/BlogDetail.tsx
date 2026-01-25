"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Category, Post } from "@/types/post";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import { portableTextComponents } from "@/components/elements/portableTextComponents";
import { formatDate } from "@/lib/utils";

interface BlogDetailProps {
  post: Post;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
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
            href="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
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
            <span className="group-hover:underline">{tCommon("back")}</span>
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
            {/* Image */}
            {post.image ? (
              <Image
                src={urlFor(post.image).width(1200).height(800).url()}
                alt={post.title}
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-gray-500">No Image Available</div>
            )}
          </div>

          <div className="p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              {post.author && (
                <div className="flex items-center">
                  {post.author.avatar && (
                    <Image
                      className="w-8 h-8 bg-gray-300 rounded-full mr-2"
                      src={urlFor(post.author.avatar)
                        .width(100)
                        .height(100)
                        .url()}
                      alt={post.author.name}
                      width={100}
                      height={100}
                    />
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              <span>•</span>
              <span>
                {t("publishedAt")}{" "}
                {post.publishedAt ? formatDate(post.publishedAt) : ""}
              </span>
              <span>•</span>
              <span>
                {t("category")}{" "}
                {post.category
                  ?.map((category: Category) => category.title)
                  .join(", ") ?? "Chưa có danh mục"}{" "}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            {/* Tags */}
            {/* {post.tags?.length > 0 && (
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
            )} */}
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          </div>
        </motion.article>

        {/* Related posts */}
        <AnimatePresence></AnimatePresence>
      </div>
    </div>
  );
}
