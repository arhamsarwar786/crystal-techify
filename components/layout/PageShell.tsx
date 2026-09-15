import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExpertCta } from "@/components/sections/ExpertCta";
import { SplashScreen } from "@/components/ui/SplashScreen";

export function PageShell({
  children,
  splash = false,
  expertCta = true,
}: {
  children: ReactNode;
  splash?: boolean;
  expertCta?: boolean;
}) {
  return (
    <>
      {splash && <SplashScreen />}
      <Header />
      <main>{children}</main>
      {expertCta && <ExpertCta />}
      <Footer />
    </>
  );
}
