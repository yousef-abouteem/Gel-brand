"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { whatsappLink } from "@/lib/brand";
import { useCart, type CartLine } from "@/lib/cart";
import { useLanguage } from "@/lib/language";
import { formatPrice, type Lang } from "@/lib/products";
import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "./Icons";

function buildOrderMessage(lines: CartLine[], total: number, lang: Lang, t: (k: "order_greeting" | "order_qty" | "cart_size" | "cart_total") => string) {
  const rows = lines.map((l) => {
    const size = l.size === "One size" ? "" : ` | ${t("cart_size")}: ${l.size}`;
    return `• ${l.product.name[lang]}${size} | ${t("order_qty")}: ${l.qty} | ${formatPrice(l.subtotal, lang)}`;
  });
  return [t("order_greeting"), "", ...rows, "", `${t("cart_total")}: ${formatPrice(total, lang)}`].join("\n");
}

export function CartDrawer() {
  const { lines, total, isOpen, close, setQty, remove } = useCart();
  const { t, lang, pick } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes the bag; focus moves into it when it opens and the page behind stops scrolling.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, close]);

  const checkoutHref = whatsappLink(buildOrderMessage(lines, total, lang, t));

  return (
    <div className={`drawer${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen} inert={!isOpen}>
      <div className="drawer__backdrop" onClick={close} />
      <div className="drawer__panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer__head">
          <h2 id="cart-title" className="drawer__title">
            {t("cart_title")}
          </h2>
          <button type="button" ref={closeRef} className="icon-button" onClick={close} aria-label={t("cart_close")}>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p>{t("cart_empty")}</p>
            <Link href="/shop" className="button button--outline" onClick={close}>
              {t("cart_empty_cta")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((l) => (
                <li key={`${l.slug}-${l.size}`} className="cart-line">
                  <Link href={`/shop/${l.slug}`} onClick={close} className="cart-line__image">
                    <Image src={l.product.image} alt={pick(l.product.imageAlt)} width={88} height={110} />
                  </Link>
                  <div className="cart-line__body">
                    <p className="cart-line__name">{pick(l.product.name)}</p>
                    {l.size !== "One size" && (
                      <p className="cart-line__meta">
                        {t("cart_size")}: {l.size}
                      </p>
                    )}
                    <div className="cart-line__row">
                      <div className="stepper">
                        <button type="button" onClick={() => setQty(l.slug, l.size, l.qty - 1)} aria-label={t("cart_decrease")}>
                          <MinusIcon />
                        </button>
                        <span aria-live="polite">{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.slug, l.size, l.qty + 1)} aria-label={t("cart_increase")}>
                          <PlusIcon />
                        </button>
                      </div>
                      <span className="price">{formatPrice(l.subtotal, lang)}</span>
                    </div>
                    <button type="button" className="text-button" onClick={() => remove(l.slug, l.size)}>
                      {t("cart_remove")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer__foot">
              <div className="drawer__total">
                <span>{t("cart_total")}</span>
                <span className="price">{formatPrice(total, lang)}</span>
              </div>
              <a href={checkoutHref} target="_blank" rel="noopener noreferrer" className="button button--whatsapp">
                <WhatsAppIcon />
                {t("cart_checkout")}
              </a>
              <p className="drawer__note">{t("cart_note")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
