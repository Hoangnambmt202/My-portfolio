'use client'
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};
export default function ContactSection() {
  const inputFocus = {
    scale: 1.02,
    borderColor: "rgba(34, 211, 238, 0.6)",
    transition: { duration: 0.2 },
  };
  const t = useTranslations("contact");
  return (
    <section
      id="contact"
      className="py-14 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-10 lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7 }}
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
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-4 lg:p-8 md:p-12 border border-slate-700/50 shadow-2xl"
        >
          <form className="space-y-6">
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft} className="space-y-2">
                <label className="block text-slate-300 text-sm font-medium ml-1">
                  {t("form.name")}
                </label>
                <motion.input
                  whileFocus={inputFocus}
                  type="text"
                  placeholder={t("form.namePlaceholder")}
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none transition-colors placeholder:text-slate-600"
                />
              </motion.div>
              <motion.div variants={fadeInRight} className="space-y-2">
                <label className="block text-slate-300 text-sm font-medium ml-1">
                  {t("form.email")}
                </label>
                <motion.input
                  whileFocus={inputFocus}
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none transition-colors placeholder:text-slate-600"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-slate-300 text-sm font-medium ml-1">
                {t("form.subject")}
              </label>
              <motion.input
                whileFocus={inputFocus}
                type="text"
                placeholder={t("form.subjectPlaceholder")}
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none transition-colors placeholder:text-slate-600"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-slate-300 text-sm font-medium ml-1">
                {t("form.message")}
              </label>
              <motion.textarea
                whileFocus={inputFocus}
                rows={5}
                placeholder={t("form.messagePlaceholder")}
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none resize-none transition-colors placeholder:text-slate-600"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px -5px rgba(6, 182, 212, 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500/100 to-blue-600/100 text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{t("form.send")}</span>
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-16  flex-col md:flex justify-center gap-8 "
        >
          {[
            { Icon: Mail, label: "Email", value: "nam23062002@gmail.com" },
            {
              Icon: Github,
              label: "GitHub",
              value: "@Hoangnambmt202",
              href: "http://github.com/Hoangnambmt202",
            },
            {
              Icon: Linkedin,
              label: "LinkedIn",
              value: "@Pham Ngoc Hoang Nam",
              href: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-center group cursor-pointer"
            >
              <a
                href={item.href}
                target="_blank"
                className="w-12 h-12 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-cyan-500/20 transition-colors"
              >
                <item.Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <p className="text-slate-400 text-sm">{item.label}</p>
              <span className="text-white font-medium underline ">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
