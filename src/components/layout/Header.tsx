"use client";
import { FileText, Menu, Terminal, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import Link from "next/link";

const navItems = [
  { label: "Tech Stack", href: "#skills" },
  { label: "Case Studies", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#experience" },
  { label: "Stories", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1E293B] border-b border-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center gap-2 flex-shrink-0 group outline-none"
          >
            <div className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center bg-[#137fec33] rounded-lg transition-colors group-hover:bg-[#137fec55]">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl leading-tight [font-family:'Manrope',sans-serif]">
              <span className="text-white">CoderTo</span>
              <span className="text-[#137fec]">Data</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 lg:px-4 py-2 text-slate-300 hover:text-white text-sm font-bold [font-family:'Manrope',sans-serif] tracking-wide transition-colors duration-200 rounded-lg hover:bg-slate-700/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side: Language + Resume */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher size="sm" variant="dropdown" showLabel={false} />

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#137fec] hover:bg-[#1070d4] text-white text-sm font-bold [font-family:'Manrope',sans-serif] rounded-lg transition-colors duration-200 shadow-[0px_4px_14px_-2px_#137fec55] flex-shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile right: language + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher size="sm" showLabel={false} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E293B] border-t border-slate-800 shadow-xl">
          <nav className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-slate-300 hover:text-white text-sm font-bold [font-family:'Manrope',sans-serif] rounded-lg hover:bg-slate-700/50 transition-colors border-b border-slate-800 last:border-none"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-[#137fec] hover:bg-[#1070d4] text-white text-sm font-bold [font-family:'Manrope',sans-serif] rounded-lg transition-colors shadow-[0px_4px_14px_-2px_#137fec55]"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
