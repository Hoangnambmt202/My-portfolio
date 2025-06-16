"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaBriefcase, FaEnvelope, FaComments } from "react-icons/fa"; // Ví dụ icon từ react-icons

const navItems = [
  { href: "/", label: "Home", icon: <FaHome /> },
  { href: "/about", label: "About", icon: <FaUser /> },
  { href: "/portfolio", label: "Portfolio", icon: <FaBriefcase /> },
  { href: "/contact", label: "Contact", icon: <FaEnvelope /> },
  { href: "/chat", label: "Chat", icon: <FaComments /> },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 right-0 w-16 h-screen flex flex-col items-center py-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-white p-3 rounded-full mb-4 bg-gray-500 transition-colors duration-200 ${
            pathname === item.href
              ? "bg-blue-500"
              : "hover:bg-gray-700"
          }`}
          aria-label={item.label}
        >
          <span className="text-2xl">{item.icon}</span>
        </Link>
      ))}
    </nav>
  );
}