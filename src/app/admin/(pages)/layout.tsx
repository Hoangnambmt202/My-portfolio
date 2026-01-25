import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Sidebar Component */}
      <AdminSidebar session={session} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <AdminHeader />

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
