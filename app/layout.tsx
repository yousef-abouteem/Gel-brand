import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, EB_Garamond, Noto_Naskh_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { brand } from "@/lib/brand";
import "./globals.css";

// A Garamond pairing for Latin text and classic Naskh faces for Arabic.
// Cormorant + Amiri for the wordmark and headings, EB Garamond + Noto Naskh for reading text.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: "GEL — ملابس يومية فاخرة من قطر", template: "%s · GEL" },
  description: "قطن ثقيل، قصّات واسعة، وتفاصيل هادئة. تسوّق مجموعة GEL واطلب مباشرة عبر واتساب.",
  openGraph: {
    title: "GEL",
    description: "Heavy cotton. Boxy cuts. Quiet details. Premium everyday clothing from Qatar.",
    images: ["/images/shorts.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e2a22",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cormorant.variable} ${amiri.variable} ${garamond.variable} ${naskh.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
