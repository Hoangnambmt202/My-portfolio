"use client";

import { Code2, ExternalLink } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function PortfolioSection() {
  const t = useTranslations("portfolio");

  // State để biết thiết bị mobile hay desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Nền tảng thương mại điện tử với React & Node.js",
      tags: ["React", "Node.js", "MongoDB"],
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Mobile Banking App",
      description: "Ứng dụng ngân hàng di động với React Native",
      tags: ["React Native", "TypeScript", "Firebase"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "AI Dashboard",
      description: "Dashboard phân tích dữ liệu với AI integration",
      tags: ["Vue.js", "Python", "TensorFlow"],
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Real-time Chat",
      description: "Hệ thống chat realtime với WebSocket",
      tags: ["Next.js", "Socket.io", "Redis"],
      color: "from-emerald-400 to-cyan-500",
    },
  ];

  // Animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) } },
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
    transition: { duration: 0.5, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) } 
  },
};

  return (
    <section id="portfolio" className="py-14 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-8 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={projectCard}
              whileHover={!isMobile ? { y: -12, scale: 1.02 } : {}}
              transition={{ duration: 0.3 }}
              className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Banner */}
              <div
                className={`w-full h-28 sm:h-40 md:h-48 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}
              >
                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={!isMobile ? { scale: 1.2, rotate: 20 } : {}}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Code2 className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/80" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6">{p.description}</p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {p.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ delay: isMobile ? 0 : idx * 0.1, duration: 0.4 }}
                      className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-800 text-cyan-400 rounded-full text-xs sm:text-xs md:text-sm font-medium border border-slate-700"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={!isMobile ? { x: 8 } : {}}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-1 sm:space-x-2 text-white font-medium text-sm sm:text-base hover:text-cyan-400 transition-colors"
                >
                  <span>{t("viewDetails")}</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
