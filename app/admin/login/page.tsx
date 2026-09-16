import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AuthForm mode="login" audience="admin" withShell={false} />
    </Suspense>
  );
}
