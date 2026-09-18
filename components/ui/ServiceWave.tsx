import Image from "next/image";

const WAVES = [
  "/services/waves/service-wave-02.png",
  "/services/waves/service-wave-03.png",
  "/services/waves/service-wave-04.png",
  "/services/waves/service-wave-01.png",
] as const;

export function ServiceWave({ variant = 0 }: { variant?: number }) {
  const src = WAVES[variant % WAVES.length];

  return (
    <Image
      src={src}
      alt=""
      fill
      loading="eager"
      sizes="22rem"
      className="object-cover object-center"
    />
  );
}
