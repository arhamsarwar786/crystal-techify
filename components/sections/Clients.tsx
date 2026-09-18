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
      className="band-muted relative scroll-mt-24 overflow-hidden py-12 sm:py-14"
    >
      <BandDecor />
      <div className="section-shell relative">
        <Reveal>
          <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
            <span aria-hidden className="h-px w-6 bg-brand-orange" />
            Clients
          </p>
          <h2 className="mt-3 font-sans text-[1.9rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.35rem] sm:leading-[1.12]">
            {t.clientsHeadline}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-ink/60">
            {t.clientsBody}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="relative mt-8">
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
