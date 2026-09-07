import Image from "next/image";

/**
 * Brand honeycomb from the Crystal Techify profile (`public/brand/element.svg`).
 */
export function BrandBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <Image
        src="/brand/element.svg"
        alt=""
        width={442}
        height={442}
        unoptimized
        className="absolute -right-[8%] -top-[10%] h-[62%] w-auto max-w-none opacity-25 dark:opacity-45 sm:h-[70%]"
      />
      <Image
        src="/brand/element.svg"
        alt=""
        width={442}
        height={442}
        unoptimized
        className="absolute -left-[12%] bottom-[-16%] h-[48%] w-auto max-w-none rotate-180 opacity-10 dark:opacity-20"
      />
    </div>
  );
}
