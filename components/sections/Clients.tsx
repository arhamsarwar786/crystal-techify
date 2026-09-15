"use client";

import { Marquee } from "@/components/ui/Marquee";
import { CLIENTS } from "@/lib/data";

export function Clients() {
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
        className={`h-7 w-auto max-w-[7.5rem] object-contain opacity-80 grayscale transition duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 sm:h-8 sm:max-w-[9rem] ${
          client.invertOnLight ? "brightness-0 dark:brightness-100" : ""
        }`}
      />
    </a>
  ));

  return (
    <div id="clients" className="relative scroll-mt-24 py-8 sm:py-10">
      <div className="flex items-center gap-4 sm:gap-8">
        <p className="shrink-0 font-sans text-sm font-medium text-ink sm:text-[15px]">
          Our Clients
        </p>
        <span aria-hidden className="h-9 w-px shrink-0 bg-ink/20" />
        <div className="min-w-0 flex-1">
          <Marquee
            items={[...items, ...items]}
            speed="slow"
            itemClassName="flex items-center px-6 sm:px-10"
          />
        </div>
      </div>
    </div>
  );
}
