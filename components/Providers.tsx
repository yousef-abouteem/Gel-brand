"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/language";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>{children}</CartProvider>
    </LanguageProvider>
  );
}
