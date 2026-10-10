import Image from "next/image";

// The owl mark, recoloured from the original logo for light and dark backgrounds.
export function Owl({ tone = "ink", height = 40, alt = "" }: { tone?: "ink" | "light"; height?: number; alt?: string }) {
  const width = Math.round(height * (198 / 277));
  return <Image src={`/images/owl-${tone}.png`} alt={alt} width={width} height={height} priority={height > 100} />;
}
