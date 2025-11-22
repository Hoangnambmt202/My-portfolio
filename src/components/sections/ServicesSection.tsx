"use client";

import { Code2, Rocket, Zap, Users, ArrowRight } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ServicesSection() {
  const t = useTranslations("services");

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Phát triển website responsive, hiện đại với React, Vue, Angular",
      features: ["Single Page Apps", "Progressive Web Apps", "API Integration"],
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Xây dựng ứng dụng di động native và cross-platform",
      features: ["iOS & Android", "React Native", "Flutter"],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Backend Development",
      description: "Thiết kế và phát triển API, microservices, database",
      features: ["RESTful API", "GraphQL", "Microservices"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consulting",
      description: "Tư vấn kiến trúc hệ thống, code review, mentoring",
      features: ["System Design", "Code Review", "Team Training"],
    },
  ];

  // Animations
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

  const serviceCard = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40, scale: isMobile ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
  };

  return (
    <section
      id="services"
      className="py-14 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 relative"
    >
      <div className="max-w-4xl md:max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-8 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className=" text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-4"
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

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={serviceCard}
              whileHover={
                !isMobile
                  ? { y: -6, scale: 1.015, transition: { duration: 0.3 } }
                  : {}
              }
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-colors shadow-md hover:shadow-cyan-500/20"
            >
              <motion.div
                whileHover={!isMobile ? { scale: 1.1, rotate: 8 } : {}}
                transition={{ type: "spring", stiffness: 250 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 text-white shadow-md shadow-cyan-500/20"
              >
                {s.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {s.title}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mb-4">
                {s.description}
              </p>
              <ul className="space-y-1 sm:space-y-2">
                {s.features.map((f, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: isMobile ? 0 : -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{
                      delay: isMobile ? 0 : idx * 0.08,
                      duration: 0.4,
                    }}
                    className="flex items-center space-x-2 text-slate-300 text-sm sm:text-base"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
