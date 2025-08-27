"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  FileText, 
  Folder, 
  Settings, 
  User, 
  ChevronLeft,
  Menu,
  X
} from "lucide-react";

interface SidebarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

const navigationItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: Home,
    badge: null
  },
  {
    href: "/admin/blog",
    label: "Blog Posts",
    icon: FileText,
    badge: "12"
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: Folder,
    badge: "5"
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    badge: null
  }
];

export default function AdminSidebar({ session }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

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
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl
          transition-all duration-300 ease-in-out
          flex flex-col
        `}
      >
        {/* Logo/Brand Section */}
        <div className={`p-6 border-b border-gray-200/50 ${isCollapsed ? 'px-4' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <h1 className="font-bold text-xl text-gray-900 whitespace-nowrap">Admin Panel</h1>
              <p className="text-sm text-gray-500 whitespace-nowrap">Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* Collapse Toggle Button - Desktop */}
        <button
          onClick={toggleCollapse}
          className={`
            hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full 
            items-center justify-center hover:bg-gray-50 transition-all duration-200 shadow-md
            ${isCollapsed ? 'rotate-180' : ''}
          `}
        >
          <ChevronLeft size={14} className="text-gray-600" />
        </button>

        {/* Navigation */}
        <nav className={`flex flex-col gap-2 p-4 flex-1 ${isCollapsed ? 'px-2' : ''}`}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:translate-x-1'
                  }
                  ${isCollapsed ? 'justify-center px-2' : ''}
                `}
              >
                <div className={`
                  w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 flex-shrink-0
                  ${isActive 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 group-hover:bg-blue-100'
                  }
                `}>
                  <Icon size={18} className={isActive ? 'text-white' : ''} />
                </div>
                
                <div className={`
                  transition-all duration-300 flex items-center justify-between flex-1
                  ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
                `}>
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className={`
                      px-2 py-1 text-xs rounded-full font-medium
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600 group-hover:bg-blue-200 group-hover:text-blue-700'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className={`mt-auto p-4 border-t border-gray-200/50 ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`
            flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 
            hover:from-gray-100 hover:to-blue-100/50 transition-all duration-200 cursor-pointer
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={18} className="text-white" />
            </div>
            <div className={`
              flex-1 transition-all duration-300
              ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
            `}>
              <p className="font-medium text-gray-900 text-sm truncate">
                {session?.user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}