"use client";
import { useState, useEffect } from "react";
import { Menu, X, Terminal, Phone } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "@/i18n/routing"; // Link từ next-intl
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher"; // Import component đã sửa

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("nav"); // Namespace 'nav'

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { name: t("portfolio"), href: "#portfolio" },
    { name: t("services"), href: "#services" },
    { name: t("blog"), href: "#blog" },
    { name: t("contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href=""
          onClick={scrollToTop}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <Terminal className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-bold text-gradient">Nam DATA</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
            >
              {item.name}
            </a>
          ))}

          {/* Nút chuyển đổi ngôn ngữ */}
          <div className="ml-2">
            <LanguageSwitcher size="sm" variant="dropdown" showLabel={false} />
          </div>

          <button className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
            <Phone className="inline w-4 h-4 mr-2" />
            {t("phone")}
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher size="sm" showLabel={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 border-t border-cyan-500/20 py-6 px-4 absolute top-full left-0 right-0 shadow-2xl">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-slate-300 hover:text-cyan-400 transition font-medium border-b border-slate-800 last:border-none"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
