import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "راسل فريق GEL بالإيميل أو واتساب.",
};

export default function ContactPage() {
  return <ContactContent />;
}
