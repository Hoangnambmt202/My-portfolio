"use client";

import { ExternalLink, Github } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { GithubRepo } from "@/types/portfolio";

export default function PortfolioSection({
  projects,
}: {
  projects: GithubRepo[];
}) {
  const t = useTranslations("portfolio");

  // State để biết thiết bị mobile hay desktop
  const [isMobile, setIsMobile] = useState(false);

  // Mảng màu sắc gradient
  const gradientColors = [
    "from-blue-600 to-indigo-600",
    "from-purple-500 to-pink-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-cyan-500",
    "from-orange-500 to-red-500",
    "from-violet-600 to-fuchsia-600",
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15,
        delayChildren: isMobile ? 0 : 0.1,
      },
    },
  };

  const projectCard = {
    hidden: { opacity: 0, y: isMobile ? 20 : 50, rotateX: isMobile ? 0 : -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
  };

  return (
    <section
      id="portfolio"
      className="py-14 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-8 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.1 }}
        >
          {projects.map((p, i) => {
            const colorClass = gradientColors[i % gradientColors.length];
            const tags = [p.language, ...(p.topics || [])]
              .filter(Boolean)
              .slice(0, 3);

            return (
              <motion.div
                key={p.id}
                variants={projectCard}
                whileHover={!isMobile ? { y: -12, scale: 1.02 } : {}}
                className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-colors shadow-lg flex flex-col"
              >
                {/* Banner */}
                <div
                  className={`w-full h-28 sm:h-40 bg-gradient-to-br ${colorClass} flex items-center justify-center`}
                >
                  <Github className="w-10 h-10 sm:w-16 sm:h-16 text-white/80" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex-grow flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 line-clamp-1">
                    {p.name.replace(/-/g, " ")}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {p.description || "Chưa có mô tả cho dự án này."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-800 text-cyan-400 rounded-full text-xs border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* THAY ĐỔI Ở ĐÂY: Phần Footer chứa Stars và Links */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                    <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
                      ⭐ {p.stargazers_count}
                    </span>

                    <div className="flex items-center gap-4">
                      {/* Nút Xem Trang Web (Chỉ hiện nếu Github có điền link Homepage) */}
                      {p.homepage && (
                        <a
                          href={p.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{t("liveDemo") || "Website"}</span>
                        </a>
                      )}

                      {/* Nút Xem Source Code */}
                      <a
                        href={p.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>{t("sourceCode") || "Source"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
