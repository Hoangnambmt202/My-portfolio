"use client";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";

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
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);

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

  // Floating UI — xử lý dropdown theo đúng vị trí nút
  const { refs, floatingStyles } = useFloating({
    placement: "left-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
      });
    }
  };

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
      {/* Button */}
      <button
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
    ${sizeClasses[size]}
    flex items-center gap-2
    rounded-xl
    border border-slate-300
    bg-white
    shadow-sm
    hover:bg-slate-50
    hover:shadow-md
    focus:outline-none
    focus:ring-2 focus:ring-cyan-500/40
    transition-all
    disabled:opacity-50
  `}
      >
        <span className="font-semibold text-sm">
          {languageInfo[locale as "en" | "vi"].flag}
        </span>

        {showLabel && (
          <span className="hidden md:inline text-slate-700 font-medium">
            {languageInfo[locale as "en" | "vi"].nativeName}
          </span>
        )}

        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-slate-500"
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

      {/* Dropdown — Floating UI */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[998] bg-black/5 backdrop-blur-[1px]"
            />

            {/* Menu */}
            <motion.div
              ref={refs.setFloating}
              style={floatingStyles}
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="
    z-[999]
    w-44 sm:w-52
    rounded-xl
    border border-slate-200
    bg-white
    shadow-xl
    overflow-hidden
  "
            >
              {availableLocales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
    w-full
    px-4 py-3
    flex items-center gap-3
    text-left
    transition
    ${
      locale === lang
        ? "bg-cyan-50 text-cyan-600"
        : "hover:bg-slate-50 text-slate-700"
    }
  `}
                >
                  <span className="text-base font-semibold">
                    {languageInfo[lang].flag}
                  </span>

                  <div className="flex-1">
                    <div className="font-medium leading-tight">
                      {languageInfo[lang].nativeName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {languageInfo[lang].name}
                    </div>
                  </div>

                  {locale === lang && (
                    <svg
                      className="w-4 h-4 text-cyan-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0001.414-1.414L8 12.586l7.293-7.293a1 1 001.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
