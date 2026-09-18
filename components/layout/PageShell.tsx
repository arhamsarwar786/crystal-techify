import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExpertCta } from "@/components/sections/ExpertCta";
import { HomeScrollFX } from "@/components/ui/HomeScrollFX";

export function PageShell({
  children,
  expertCta = true,
  expertBand = "canvas",
}: {
  children: ReactNode;
  expertCta?: boolean;
  expertBand?: "canvas" | "muted";
}) {
  return (
    <>
      <Header />
      <HomeScrollFX />
      <main className="relative">{children}</main>
      {expertCta && <ExpertCta band={expertBand} />}
      <Footer />
    </>
  );
}
