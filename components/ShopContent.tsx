"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ShopContent() {
  const { t, pick } = useLanguage();
  const [active, setActive] = useState<Category | "all">("all");
  const visible = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="container section">
      <header className="page-head">
        <h1 className="page-title">{t("shop_title")}</h1>
        <p className="lead">{t("shop_text")}</p>
      </header>

      <div className="filters" role="group" aria-label={t("shop_title")}>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="chip"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {pick(c.label)}
          </button>
        ))}
        <span className="filters__count" aria-live="polite">
          {t("shop_count", { n: visible.length })}
        </span>
      </div>

      {visible.length === 0 ? (
        <p className="muted">{t("shop_empty")}</p>
      ) : (
        <div className="product-grid">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
