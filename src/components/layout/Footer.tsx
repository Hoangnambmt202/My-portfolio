"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("footer");
  const tNav = useTranslations('nav');
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-12 px-6 border-t border-slate-800 bg-[#0B0F19]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-slate-400">
        {/* ABOUT */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">{t('aboutTitle')}</h3>
          <p className="text-sm leading-relaxed">
          {t('aboutDesc')}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">
            {t('quickLinks')}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#projects" className="hover:text-white">
                {tNav('portfolio')}
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                {tNav('services')}
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-white">
               {tNav('blog')}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                {tNav('contact')}
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3 flex gap-2">
            <Globe /> {t('social')}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="http://github.com/Hoangnambmt202"
                target="_blank"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/pham-ngoc-hoang-nam"
                target="_blank"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@CoderToData"
                target="_blank"
                className="hover:text-white"
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@codertodata"
                className="hover:text-white"
              >
                Tiktok{" "}
              </a>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">
            {t('newsletter')}
          </h3>
          <p className="text-sm mb-3">{t('newsletterDesc')}</p>

          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 bg-slate-900 text-slate-300 rounded-lg border border-slate-700 focus:outline-none focus:border-slate-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              {t('join')}
            </button>
          </form>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-slate-500 text-sm mt-10 border-t border-slate-800 pt-6">
        {t('copyright')} © {year} {t('allRightsReserved')}
      </div>
    </motion.footer>
  );
}
