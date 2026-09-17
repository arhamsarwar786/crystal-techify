"use client";

import { CLIENTS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { BandDecor } from "@/components/ui/BandDecor";

export function Clients() {
  const { t } = useLocale();
  const items = CLIENTS.map((client) => (
    <a
      key={client.name}
      href={client.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group/logo inline-flex items-center"
      aria-label={`${client.name} website`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={client.logo}
        alt={client.name}
        className={`h-8 w-auto max-w-[8.5rem] object-contain opacity-70 grayscale transition duration-500 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 sm:h-9 sm:max-w-[10rem] ${
          client.invertOnLight ? "brightness-0 dark:brightness-100" : ""
        }`}
      />
    </a>
  ));

  return (
    <section
      id="clients"
      className="band-canvas relative scroll-mt-24 overflow-hidden border-y border-ink/[0.06] py-12 sm:py-14"
    >
      <BandDecor />
      <div className="section-shell relative">
        <Reveal>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
            01
          </p>
          <h2 className="mt-2 font-sans text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {t.clientsHeadline}
          </h2>
          <span aria-hidden className="heading-accent" />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/60">
            {t.clientsBody}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="relative mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-bg sm:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-bg sm:w-24"
          />
          <Marquee
            items={items}
            speed="slow"
            itemClassName="flex items-center px-8 sm:px-12"
          />
        </Reveal>
      </div>
    </section>
  );
}
