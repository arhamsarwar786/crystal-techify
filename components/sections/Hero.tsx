"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { Clients } from "@/components/sections/Clients";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
import { CTAButton } from "@/components/ui/CTAButton";
import { openCalendly } from "@/lib/calendly";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col pb-2 pt-24 sm:pb-4 sm:pt-28"
    >
      <div className="section-shell relative flex flex-1 flex-col">
        <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-[1.75rem] px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
            <BrandBackdrop />
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-orange/10 blur-[100px] sm:h-80 sm:w-80"
          />

          <motion.div
            variants={container}
            initial={false}
            animate="visible"
            className="relative mx-auto max-w-3xl text-center"
          >
            <motion.h1
              variants={item}
              className="text-[1.5rem] leading-[1.22] sm:text-[2.15rem] font-bold sm:leading-[1.2] md:text-[2.45rem]"
            >
              Empowering businesses to weave the{" "}
              <span className="gradient-text">future of software</span>,
              seamlessly together.
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed tracking-normal text-ink/75 sm:mt-4 sm:text-base"
            >
              AI and advanced software from the United States.{" "}
              <span className="text-ink">500+ projects</span> across the world.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-5 flex w-full flex-col items-stretch justify-center gap-2.5 sm:mt-6 sm:w-auto sm:flex-row sm:items-center"
            >
              <CTAButton onClick={openCalendly} className="w-full sm:w-auto">
                <CalendarClock className="h-4 w-4" />
                Book a Consultation
              </CTAButton>
              <CTAButton
                href="/#case-studies"
                variant="outline"
                className="w-full sm:w-auto"
              >
                View Our Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>

        <Clients />
      </div>
    </section>
  );
}
