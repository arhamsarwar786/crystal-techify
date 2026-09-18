import Image from "next/image";

export function ServiceArt({ slug }: { slug: string }) {
  return (
    <div className="relative h-[10.75rem] overflow-hidden rounded-[1.35rem] bg-[#FFF6F0] sm:h-[11.5rem]">
      <Image
        src={`/services/service-${slug}.png`}
        alt=""
        fill
        sizes="(min-width: 1024px) 20rem, 90vw"
        loading="eager"
        className="object-cover"
      />
    </div>
  );
}
