import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExpertCta } from "@/components/sections/ExpertCta";
import { HomeScrollFX } from "@/components/ui/HomeScrollFX";

export function PageShell({
  children,
  expertCta = true,
}: {
  children: ReactNode;
  expertCta?: boolean;
}) {
  return (
    <>
      <Header />
      <HomeScrollFX />
      <main className="relative">{children}</main>
      {expertCta && <ExpertCta />}
      <Footer />
    </>
  );
}
