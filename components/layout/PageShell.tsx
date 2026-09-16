import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExpertCta } from "@/components/sections/ExpertCta";

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
      <main>{children}</main>
      {expertCta && <ExpertCta />}
      <Footer />
    </>
  );
}
