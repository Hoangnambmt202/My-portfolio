import AdminSessionProvider from "@/components/admin/layout/AdminSessionProvider";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { auth } from "@/lib/api/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/auth/login");
  }
  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50  scrollbar-thin
    scrollbar-thumb-gray-400
    scrollbar-track-transparent
    scrollbar-thumb-rounded-full"
    >
      <AdminSessionProvider user={session.user} />
      {/* Sidebar Component */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main
        className="flex-1 flex flex-col lg:ml-0 h-screen overflow-hidden    
        "
      >
        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
