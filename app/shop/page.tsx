import type { Metadata } from "next";
import { ShopContent } from "@/components/ShopContent";

export const metadata: Metadata = {
  title: "المتجر",
  description: "تيشيرتات وهوديز وجاكيتات من GEL بقطن ثقيل وقصّات واسعة.",
};

export default function ShopPage() {
  return <ShopContent />;
}
