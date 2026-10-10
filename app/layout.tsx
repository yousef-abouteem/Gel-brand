import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Reem_Kufi } from "next/font/google";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { brand } from "@/lib/brand";
import "./globals.css";

// Reem Kufi for the wordmark and headings, IBM Plex Sans Arabic for everything else.
// Both cover Arabic and Latin, so the site looks the same in either language.
const display = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
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
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
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
