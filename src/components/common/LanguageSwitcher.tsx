"use client";
import { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
// Thay thế import cũ bằng import từ next-intl
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing"; // Đảm bảo import từ file routing cấu hình của bạn

interface LanguageSwitcherProps {
  variant?: "dropdown" | "toggle";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "dropdown",
  size = "md",
  showLabel = true,
  className = "",
}) => {
  // Sử dụng hooks của next-intl
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<Element | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languageInfo = {
    en: { name: "English", nativeName: "English", flag: "ENG" },
    vi: { name: "Vietnamese", nativeName: "Tiếng Việt", flag: "VN" },
  };
  const availableLocales = ["en", "vi"] as const;

  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
  };

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
      });
    }
  };

  // Phần Render giữ nguyên (chỉ sửa prop disabled thành isPending)

  // Toggle variant
  if (variant === "toggle") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {availableLocales.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            disabled={isPending}
            className={`${sizeClasses[size]} rounded-lg font-medium transition-all duration-200 disabled:opacity-50 ${
              locale === lang
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span className="mr-1">{languageInfo[lang].flag}</span>
            {showLabel && (
              <span className="hidden sm:inline">
                {languageInfo[lang].nativeName}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`${sizeClasses[size]} bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2 disabled:opacity-50`}
      >
        <span>{languageInfo[locale as "en" | "vi"].flag}</span>
        {showLabel && (
          <span className="hidden sm:inline font-medium text-gray-700">
            {languageInfo[locale as "en" | "vi"].nativeName}
          </span>
        )}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      {/* Dropdown in Portal */}
      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] w-[160px]"
                  style={{
                    position: "absolute",
                    top:
                      (buttonRef.current?.getBoundingClientRect().bottom ?? 0) +
                      window.scrollY +
                      8,
                    left:
                      (buttonRef.current?.getBoundingClientRect().right ?? 0) -
                      160 +
                      window.scrollX,
                  }}
                >
                  {availableLocales.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      disabled={isPending}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3 disabled:opacity-50 ${
                        locale === lang
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      } ${lang === availableLocales[0] ? "rounded-t-lg" : ""} ${
                        lang === availableLocales[availableLocales.length - 1]
                          ? "rounded-b-lg"
                          : ""
                      }`}
                    >
                      <span className="text-lg">{languageInfo[lang].flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {languageInfo[lang].nativeName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {languageInfo[lang].name}
                        </span>
                      </div>
                      {locale === lang && (
                        <svg
                          className="w-4 h-4 ml-auto text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </div>
  );
};
