"use client";

import type { ReactNode } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { openCalendly } from "@/lib/calendly";

interface CalendlyCTAButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps CTAButton with the Calendly popup handler. Exists so Server
 * Components (which can't pass function props to Client Components) can
 * still render a "book a call" CTA — only children cross that boundary here.
 */
export function CalendlyCTAButton({ children, className }: CalendlyCTAButtonProps) {
  return (
    <CTAButton onClick={openCalendly} className={className}>
      {children}
    </CTAButton>
  );
}
