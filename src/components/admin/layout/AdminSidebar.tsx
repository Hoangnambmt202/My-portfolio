/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Folder,
  Menu,
  X,
  Cog,
  LogOut,
  UserRoundCog,
  BriefcaseMedical,
  FileUser,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAdminSessionStore } from "@/stores/admin-session.store";
interface NavigationItem {
  id: string;
  href: string;
  label: string;
  icon: any;
  badge: string | null;
  isActive?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: Home,
    badge: null,
    isActive: true,
  },
  {
    id: "blog",
    href: "/admin/blog",
    label: "Blog Posts",
    icon: FileText,
    badge: "12",
  },
  {
    id: "projects",
    href: "/admin/projects",
    label: "Projects",
    icon: Folder,
    badge: "5",
  },
  {
    id: "skills",
    href: "/admin/skills",
    label: "Skills",
    icon: UserRoundCog,
    badge: "5",
  },
  {
    id: "experiences",
    href: "/admin/experiences",
    label: "Experiences",
    icon: BriefcaseMedical,
    badge: "5",
  },
  {
    id: "resume",
    href: "/admin/resume",
    label: "Resume / CV",
    icon: FileUser,
    badge: "5",
  },
];
const secondaryNavigationItems: NavigationItem[] = [
  {
    id: "settings",
    href: "/admin/settings",
    label: "Settings",
    icon: Cog,
    badge: null,
  },
];

export default function AdminSidebar() {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  const user = useAdminSessionStore((s) => s.user);
  const clear = useAdminSessionStore((s) => s.clear);

  // Handle responsive behavior
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1024) {
  //       setIsCollapsed(true);
  //     } else {
  //       setIsCollapsed(false);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Close mobile menu when route changes

  // const toggleCollapse = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const handleNavigationClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const handleLogOutClick = async () => {
    clear();
    await signOut({ callbackUrl: "/admin/auth/login" });
  };

  // const isActiveRoute = (href: string) => {
  //   if (href === "/admin") {
  //     return pathname === "/admin";
  //   }
  //   return pathname.startsWith(href);
  // };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-200/50 hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <nav
        className="flex flex-col w-64 items-start justify-center relative self-stretch bg-[#111a22] border-r [border-right-style:solid] border-slate-800 h-screen"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-start justify-between p-4 relative flex-1 self-stretch w-full grow">
          <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <header className="flex items-center gap-3 px-2 py-0 relative self-stretch w-full">
              <Image
                width={40}
                height={40}
                className="relative w-10 h-10 rounded-full"
                alt="Admin avatar"
                src={user?.image || "/assets/imgs/Nam_1.jpg"}
              />

              <div className="inline-flex flex-col items-start">
                <h1 className="font-bold text-white text-sm">
                  {user?.name || "Administrator"}
                </h1>

                <p className="text-[#92adc9] text-xs">{user?.role}</p>
              </div>
            </header>

            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              {navigationItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  onClick={() => handleNavigationClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 self-stretch w-full rounded-lg relative flex-[0_0_auto] ${
                    activeItem === item.id ? "bg-[#233648]" : ""
                  }`}
                  aria-current={activeItem === item.id ? "page" : undefined}
                >
                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <item.icon size={20} color="white" />
                  </div>

                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <span
                      className={`relative flex items-center justify-center h-5 mt-[-1.00px] tracking-[0] leading-5 whitespace-nowrap ${
                        activeItem === item.id
                          ? "[font-family:'Manrope-Bold',Helvetica] font-bold text-white text-sm"
                          : "[font-family:'Manrope-Medium',Helvetica] font-medium text-[#92adc9] text-sm"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}

              <div
                className="flex h-[17px] px-3 py-2 self-stretch w-full flex-col items-start relative"
                role="separator"
                aria-hidden="true"
              >
                <div className="relative self-stretch w-full h-px bg-slate-800" />
              </div>

              {secondaryNavigationItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  className={`flex items-center gap-3 px-3 py-2.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg ${
                    activeItem === item.id ? "bg-[#233648]" : ""
                  }`}
                  aria-current={activeItem === item.id ? "page" : undefined}
                >
                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <item.icon size={20} color="white" />
                  </div>

                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <span
                      className={`relative flex items-center justify-center h-5 mt-[-1.00px] tracking-[0] leading-5 whitespace-nowrap ${
                        activeItem === item.id
                          ? "[font-family:'Manrope-Bold',Helvetica] font-bold text-white text-sm"
                          : "[font-family:'Manrope-Medium',Helvetica] font-medium text-[#92adc9] text-sm"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <button
              onClick={handleLogOutClick}
              className="all-[unset] box-border flex h-10 gap-2 px-4 py-0 self-stretch w-full bg-[#137fec] rounded-lg items-center justify-center relative"
              aria-label="Log out"
            >
              <div className="absolute w-full top-0 left-0 h-10 bg-[#ffffff01] rounded-lg shadow-[0px_4px_6px_-4px_#1e3a8a33,0px_10px_15px_-3px_#1e3a8a33]" />

              <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                <LogOut size={15} />
              </div>

              <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                <span className="relative flex items-center justify-center w-[63.19px] h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-sm text-center tracking-[0] leading-5 whitespace-nowrap">
                  Log Out
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
