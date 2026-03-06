"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Category, Post } from "@/types/features/post";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import { portableTextComponents } from "@/components/ui/portableTextComponents";
import { formatDate } from "@/lib/utils/format";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";

interface BlogDetailProps {
  post: Post;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  // const t = useTranslations("blog");
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-screen bg-[#101922]">
      <div className="mx-auto max-w-4xl px-4 pb-24">
        {/* back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-8 pb-10"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#137fec] transition-colors hover:text-blue-300"
          >
            <motion.span whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="h-4 w-4" />
            </motion.span>
            <span className="underline-offset-2 group-hover:underline">
              {tCommon("back")}
            </span>
          </Link>
        </motion.div>

        {/* article card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 mb-12"
        >
          {/* hero image */}
          <div className="relative h-64 w-full overflow-hidden bg-slate-800 md:h-96">
            {post.image ? (
              <Image
                src={urlFor(post.image).width(1200).height(800).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-slate-600">
                No Image Available
              </div>
            )}
            {/* bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          </div>

          {/* body */}
          <div className="p-8 md:p-12">
            {/* meta row */}
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-800 pb-8">
              {/* author */}
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatar ? (
                    <Image
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-[#137fec]/20"
                      src={urlFor(post.author.avatar)
                        .width(100)
                        .height(100)
                        .url()}
                      alt={post.author.name}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#137fec]/10">
                      <User className="h-3.5 w-3.5 text-[#137fec]" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-300">
                    {post.author.name}
                  </span>
                </div>
              )}

              <span className="text-slate-700">·</span>

              {/* date */}
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                {post.publishedAt ? formatDate(post.publishedAt) : ""}
              </span>

              <span className="text-slate-700">·</span>

              {/* category */}
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Tag className="h-3.5 w-3.5" />
                <span className="font-medium text-[#137fec]">
                  {post.category?.map((c: Category) => c.title).join(", ") ??
                    "Chưa có danh mục"}
                </span>
              </span>
            </div>

            {/* title */}
            <h1 className="mb-10 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              {post.title}
            </h1>

            {/* portable text — dark prose overrides */}
            <div
              className="
    prose prose-invert prose-lg max-w-none

    prose-headings:text-white
    prose-h4:text-white
    prose-h5:text-white
    prose-h6:text-white

    prose-p:text-white
    prose-li:text-white
    prose-strong:text-white

    prose-a:text-[#137fec]
    prose-blockquote:text-white
  "
            >
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          </div>
        </motion.article>

        {/* related posts slot */}
        <AnimatePresence />
      </div>
    </div>
  );
}
