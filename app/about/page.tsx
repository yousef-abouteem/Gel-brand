import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "قصتنا",
  description: "كيف بدأت GEL، ولماذا البومة.",
};

export default function AboutPage() {
  return <AboutContent />;
}
