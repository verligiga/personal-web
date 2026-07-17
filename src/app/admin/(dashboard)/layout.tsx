import { auth, signOut } from "@/lib/auth";
import { AdminSidebar } from "@/components/organisms/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl gap-10 px-6 py-12 lg:px-10">
      <AdminSidebar email={session?.user?.email} logout={logout} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
