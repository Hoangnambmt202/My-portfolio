"use client";
import { Calendar, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cubicBezier } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Post } from "@/types/post";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
};

const staggerFastContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};
export default function BlogClient({ posts }: { posts: Post[] }) {
  const t = useTranslations("blog");

  const blogCard = {
    hidden: { opacity: 0, x: -60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      },
    },
  };

  return (
    <section
      id="blog"
      className="py-14 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900"
    >
      <div className="max-w-4xl md:max-w-7xl lg:max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-10 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerFastContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
        >
          {posts.map((post: Post, i: number) => (
            <motion.div
              key={i}
              variants={blogCard}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-colors cursor-pointer hover:bg-slate-800/80 flex flex-col hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    delay: i * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-bold border border-cyan-500/20"
                >
                  {post.category || "Chưa có danh mục"}
                </motion.span>
                <span className="text-slate-500 text-sm flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.publishedAt}</span>
                </span>
              </div>

            <div className="overflow-hidden rounded-lg mb-4">
              <Image
                src={urlFor(post.image).width(400).height(300).url()}
                alt={post.title}
                width={100}
                height={100}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold text-cyan-400 hover:text-cyan-300 text-center group-hover:text-cyan-400 transition-colors line-clamp-2 mt-2">
                {post.title}
              </h3>
            </div>
              <p className="text-slate-400 mb-4 line-clamp-3 text-sm flex-grow">
                {post.description || "Chưa có mô tả cho bài viết này."}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                <span className="text-slate-500 text-sm flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{post.readingTime}</span>
                </span>
                <motion.div
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium flex items-center gap-1"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/blog/${post?.slug?.current}`} className="flex gap-2 items-center">
                    {t("readMore")} <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
