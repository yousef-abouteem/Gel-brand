"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

// The cart stores only slug, size and quantity. Names, prices and images are always read
// from the catalogue, so an old cart never shows a stale price or a broken image.
type StoredLine = { slug: string; size: string; qty: number };
export type CartLine = StoredLine & { product: Product; subtotal: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "gel_cart_v2";
const MAX_QTY = 10;
const CartContext = createContext<CartContextValue | null>(null);

function readStored(): StoredLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is StoredLine =>
        typeof l?.slug === "string" &&
        typeof l?.size === "string" &&
        Number.isInteger(l?.qty) &&
        l.qty > 0 &&
        Boolean(getProduct(l.slug))
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setStored(readStored());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Without storage the cart still works for this visit.
    }
  }, [stored, loaded]);

  // Keep other open tabs in sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setStored(readStored());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setStored((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.size === size);
      if (existing) {
        return prev.map((l) => (l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...prev, { slug, size, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setStored((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setStored((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clear = useCallback(() => setStored([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = stored.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product, subtotal: product.price * l.qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.subtotal, 0),
      isOpen,
      open,
      close,
      add,
      setQty,
      remove,
      clear,
    };
  }, [stored, isOpen, open, close, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
