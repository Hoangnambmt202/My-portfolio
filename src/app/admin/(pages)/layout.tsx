import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Bell, Search } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Sidebar Component */}
      <AdminSidebar session={session} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 lg:px-8 py-4 ml-0 lg:ml-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ml-12 lg:ml-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-gray-100/80 transition-colors group">
                <Bell size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
              
              <div className="w-9 h-9 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                <span className="text-white font-medium text-sm">
                  {session?.user?.name?.charAt(0) || "A"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Content Container with Glass Effect */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 lg:p-8 min-h-[calc(100vh-12rem)]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}