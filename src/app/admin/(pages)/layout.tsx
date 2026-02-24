import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import AdminHeader from "@/components/admin/layout/AdminHeader";

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
      <main className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        {/* <AdminHeader /> */}

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
