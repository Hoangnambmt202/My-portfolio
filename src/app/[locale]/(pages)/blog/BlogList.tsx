
"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { useLoading } from "@/lib/hooks/useStores";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default  function BlogList({ posts }: { posts: any[] }) {
  const { t, locale } = useTranslation();
  const { setLoading } = useLoading();

 

  const categories = [
    { key: 'all', label: t('common.all') },
    { key: 'technology', label: 'Technology' },
    { key: 'tutorial', label: 'Tutorial' },
    { key: 'thoughts', label: 'Thoughts' },
  ];

  const handlePostClick = (postTitle: string) => {
    setLoading(true, `Đang tải "${postTitle}"...`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl">
        <Header backdrop={t('blog.backdrop')} title={t('blog.myBlog')} />

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800">
              <option value="">{t('blog.filterByCategory')}</option>
              {categories.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800">
              <option value="date">{t('blog.sortByDate')}</option>
              <option value="views">{t('blog.sortByViews')}</option>
              <option value="title">{t('blog.sortByTitle')}</option>
            </select>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden"
              >
                <span className="text-gray-500">Blog Image</span>
              </motion.div>
            
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>{t('blog.publishedOn')}   {new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readingTime} {t('blog.readingTime')}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                </div>

                <Link href={`/${locale}/blog/${post.slug.current}`} onClick={() => handlePostClick(post.title)}>
                  <motion.h2
                    whileHover={{ color: "#2563eb" }}
                    className="text-xl font-bold text-gray-800 mb-3 cursor-pointer transition-colors"
                  >
                    {post.title}
                  </motion.h2>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {/* {post.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </motion.span>
                  ))} */}
                </div>

                <Link href={`/${locale}/blog/${post.slug.current}`} onClick={() => handlePostClick(post.title)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-[#4b48ff] text-white font-medium text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group"
                  >
                    <span className="mr-10">{t('blog.readMore')}</span>
                    <motion.div
                      whileHover={{ width: "calc(100% - 0.6em)" }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95"
                    >
                      <motion.svg
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.3 }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        className="w-[1.1em] text-[#7b52b9]"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          fill="currentColor"
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        />
                      </motion.svg>
                    </motion.div>
                  </motion.button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No posts found message */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">{t('blog.noPostsFound')}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 