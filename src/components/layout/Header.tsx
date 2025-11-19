"use client";
import { useState, useEffect } from "react";
import { Menu, X, Terminal, Phone } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Logic tính toán tiến trình cuộn trang
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };
  const menuItems = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Dịch vụ", href: "#services" },
    { name: "Blog", href: "#blog" },
    { name: "Liên hệ", href: "#contact" },
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
          href={""}
          onClick={scrollToTop}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <Terminal className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Nam DATA
          </span>
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
          <button className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
            <Phone className="inline w-4 h-4 mr-2" />
            0914837433
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 border-t border-cyan-500/20 py-6 px-4 absolute top-20 left-0 right-0 shadow-2xl">
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

      {/* 2. Thanh tiến trình (Progress Bar) nằm ở đáy Header */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
