import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!requireAdmin()) {
    redirect("/login?next=/admin");
  }
  return <AdminDashboard />;
}
