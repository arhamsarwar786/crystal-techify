import Image from "next/image";

/**
 * Brand honeycomb: element2 top-left, element bottom-right.
 * Intended for hero and footer only.
 */
export function BrandBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <Image
        src="/brand/element2.svg"
        alt=""
        width={442}
        height={442}
        unoptimized
        className="absolute -left-[10%] -top-[12%] h-[52%] w-auto max-w-none opacity-70 dark:opacity-70 sm:h-[60%]"
      />
      <Image
        src="/brand/element.svg"
        alt=""
        width={442}
        height={442}
        unoptimized
        className="absolute -bottom-[14%] -right-[8%] h-[48%] w-auto max-w-none opacity-70 dark:opacity-70 sm:h-[56%]"
      />
    </div>
  );
}
