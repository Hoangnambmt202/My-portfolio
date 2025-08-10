"use client";
import { Header } from "@/components/layout/Header";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function BlogPage() {
  const { t } = useTranslation();

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React 18",
      excerpt: "Learn about the new features and improvements in React 18",
      content: "Full blog post content here...",
      featuredImage: "/assets/imgs/blog1.jpg",
      publishedAt: new Date("2024-01-15"),
      readingTime: 5,
      category: "technology",
      tags: ["React", "JavaScript", "Frontend"],
      views: 1250,
    },
    {
      id: 2,
      title: "Building Responsive Web Applications",
      excerpt: "Best practices for creating responsive and mobile-friendly websites",
      content: "Full blog post content here...",
      featuredImage: "/assets/imgs/blog2.jpg",
      publishedAt: new Date("2024-01-10"),
      readingTime: 8,
      category: "tutorial",
      tags: ["CSS", "Responsive Design", "Mobile"],
      views: 980,
    },
    // Add more blog posts as needed
  ];

  const categories = [
    { key: 'all', label: t('common.all') },
    { key: 'technology', label: 'Technology' },
    { key: 'tutorial', label: 'Tutorial' },
    { key: 'thoughts', label: 'Thoughts' },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl">
        <Header backdrop={t('blog.backdrop')} title={t('blog.myBlog')} />

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">{t('blog.filterByCategory')}</option>
              {categories.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="date">{t('blog.sortByDate')}</option>
              <option value="views">{t('blog.sortByViews')}</option>
              <option value="title">{t('blog.sortByTitle')}</option>
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Blog Image</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{t('blog.publishedOn')} {post.publishedAt.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readingTime} {t('blog.readingTime')}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="relative bg-[#4b48ff] text-white font-medium text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group">
                  <span className="mr-10">{t('blog.readMore')}</span>
                  <div className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      className="w-[1.1em] transition-transform duration-300 text-[#7b52b9] group-hover:translate-x-[0.1em]"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No posts found message */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('blog.noPostsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
}