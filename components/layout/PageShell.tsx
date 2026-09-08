import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SplashScreen } from "@/components/ui/SplashScreen";

export function PageShell({
  children,
  splash = false,
}: {
  children: ReactNode;
  splash?: boolean;
}) {
  return (
    <>
      {splash && <SplashScreen />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
