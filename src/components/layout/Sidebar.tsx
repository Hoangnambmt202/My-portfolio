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

export default function Sidebar() {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  // Use new hooks
  const { setLoading } = useLoading();
  const { setCurrentPath, setNavigating } = useNavigation();
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: t('navigation.home'),
      icon: <FaHome className="w-5 h-5" />,
      href: "/",
      color: "hover:text-blue-400",
    },
    {
      name: t('navigation.about'),
      icon: <FaUser className="w-5 h-5" />,
      href: "/about",
      color: "hover:text-blue-600",
    },
    {
      name: t('navigation.portfolio'),
      icon: <FaBriefcase className="w-5 h-5" />,
      href: "/portfolio",
      color: "hover:text-blue-400",
    },
    {
      name: t('navigation.contact'),
      icon: <FaPhoneAlt className="w-5 h-5" />,
      href: "/contact",
      color: "hover:text-blue-400",
    },
    {
      name: t('navigation.blog'),
      icon: <FaBookOpenReader className="w-5 h-5" />,
      href: "/blog",
      color: "hover:text-blue-400",
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

  const handleClick = (href: string) => {
    setLoading(true, t('common.loading'));
    setNavigating(true);
    setCurrentPath(href);
  };

  return (
    <motion.aside
      initial={{ opacity: 100, x: 100 }}
      animate={{ 
        x: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="fixed right-12 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Language Switcher */}
        <div className="mb-4">
          <LanguageSwitcher 
            variant="dropdown" 
            size="sm" 
            showLabel={false}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-1"
          />
        </div>

        
        
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            rel="noopener noreferrer"
            className={`p-3 rounded-full bg-white border shadow-lg transform transition-all duration-300 ${link.color} ${
              pathname === link.href ? 'focus:bg-blue-400 focus:text-white' : ''
            } hover:shadow-2xl hover:bg-white hover:scale-120 transition-transform duration-300 group`}
            onClick={() => handleClick(link.href)}
          >
            <div className="relative">
              <span>
                {link.icon}
              </span>
              <span className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
                {link.name}
              </span>
            </div>
          </Link>
        ))}
        
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30" />
      </div>
    </motion.aside>
  );
}
