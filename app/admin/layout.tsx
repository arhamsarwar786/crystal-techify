import { PageShell } from "@/components/layout/PageShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}
