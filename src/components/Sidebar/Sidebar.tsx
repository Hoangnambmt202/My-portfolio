"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaBriefcase, FaPhoneAlt } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { useScrollPosition } from "@/lib/hooks";
import { useLoading, useNavigation } from "@/lib/hooks/useStores";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { AlignJustify, X } from "lucide-react";

export default function Sidebar() {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile toggle
  const pathname = usePathname();
  
  // Use new hooks instead of direct store access
  const { setLoading } = useLoading();
  const { setCurrentPath, setNavigating } = useNavigation();
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: t('navigation.home'),
      icon: <FaHome className="w-5 h-5" />,
      href: "/",
      color: "hover:text-blue-400",
      loadingMessage: "Đang tải trang chủ...",
    },
    {
      name: t('navigation.about'),
      icon: <FaUser className="w-5 h-5" />,
      href: "/about",
      color: "hover:text-blue-600",
      loadingMessage: "Đang tải thông tin giới thiệu...",
    },
    {
      name: t('navigation.portfolio'),
      icon: <FaBriefcase className="w-5 h-5" />,
      href: "/portfolio",
      color: "hover:text-blue-400",
      loadingMessage: "Đang tải danh sách dự án...",
    },
    {
      name: t('navigation.contact'),
      icon: <FaPhoneAlt className="w-5 h-5" />,
      href: "/contact",
      color: "hover:text-blue-400",
      loadingMessage: "Đang tải thông tin liên hệ...",
    },
    {
      name: t('navigation.blog'),
      icon: <FaBookOpenReader className="w-5 h-5" />,
      href: "/blog",
      color: "hover:text-blue-400",
      loadingMessage: "Đang tải danh sách blog...",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(scrollPosition < lastScrollY);
      setLastScrollY(scrollPosition);
    };
    handleScroll();
  }, [scrollPosition, lastScrollY]);

  useEffect(() => {
    // Update current path when pathname changes
    setCurrentPath(pathname);
  }, [pathname, setCurrentPath]);

  const handleClick = (href: string, loadingMessage: string) => {
    if (pathname !== href) {
      setLoading(true, loadingMessage);
      setNavigating(true);

    }
    setIsMobileOpen(false); // đóng sidebar khi click ở mobile
  };

  const SidebarContent = (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* Language Switcher */}
      <div className="mb-4">
        <LanguageSwitcher 
          variant="toggle" 
          size="sm" 
          showLabel={false}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-1"
        />
      </div>

      <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30" />
      
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`p-3 rounded-full bg-white border shadow-lg transform transition-all duration-300 ${link.color} ${
            pathname === link.href ? "bg-blue-400 text-white" : ""
          } hover:shadow-2xl hover:bg-white hover:scale-110 group`}
          onClick={() => handleClick(link.href, link.loadingMessage)}
        >
          <div className="relative">
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {link.icon}
            </motion.span>
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              {link.name}
            </span>
          </div>
        </Link>
      ))}
      
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30" />
    </div>
  );

  return (
    <>
      {/* Nút menu mobile */}
      <button
        className="fixed top-4 right-4 md:hidden z-50 text-white bg-gray-800 p-2 rounded"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X /> : <AlignJustify />}
      </button>

      {/* Sidebar desktop */}
      <motion.aside
        initial={{ x: 100 }}
        animate={{ x: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:fixed md:right-24 md:top-1/2 md:-translate-y-1/2 md:z-50 md:block"
      >
        {SidebarContent}
      </motion.aside>

      {/* Sidebar mobile overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end md:hidden"
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-64 h-full bg-white shadow-lg"
          >
            {SidebarContent}
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}