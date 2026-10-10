"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { whatsappLink } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/language";
import { formatPrice, products, type Product } from "@/lib/products";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "./Icons";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { t, pick, lang } = useLanguage();
  const { add, open } = useCart();
  const singleSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(singleSize ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const questionHref = whatsappLink(
    lang === "ar" ? `مرحبًا GEL، عندي سؤال عن ${product.name.ar}` : `Hello GEL, I have a question about the ${product.name.en}`
  );

  function onAdd() {
    if (!size) {
      setShowSizeError(true);
      return;
    }
    add(product.slug, size, qty);
    setQty(1);
    open();
  }

  return (
    <div className="container section">
      <Link href="/shop" className="text-link back-link">
        {t("product_back")}
      </Link>

      <div className="product">
        <div className="product__media">
          <Image
            src={product.image}
            alt={pick(product.imageAlt)}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>

        <div className="product__info">
          <h1 className="product__name">{pick(product.name)}</h1>
          <p className="product__price price">{formatPrice(product.price, lang)}</p>
          <p className="lead">{pick(product.description)}</p>

          {!singleSize && (
            <fieldset className="field">
              <legend className="field__label">{t("product_size")}</legend>
              <div className="sizes">
                {product.sizes.map((s) => (
                  <label key={s} className="size">
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={() => {
                        setSize(s);
                        setShowSizeError(false);
                      }}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              {showSizeError && (
                <p className="field__error" role="alert">
                  {t("product_size_required")}
                </p>
              )}
            </fieldset>
          )}
          {singleSize && <p className="muted">{t("one_size")}</p>}

          <div className="field">
            <span className="field__label" id="qty-label">
              {t("product_qty")}
            </span>
            <div className="stepper stepper--large" role="group" aria-labelledby="qty-label">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t("cart_decrease")}>
                <MinusIcon />
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label={t("cart_increase")}>
                <PlusIcon />
              </button>
            </div>
          </div>

          <button type="button" className="button button--block" onClick={onAdd}>
            {t("product_add")}
          </button>

          <a href={questionHref} target="_blank" rel="noopener noreferrer" className="whatsapp-hint">
            <WhatsAppIcon size={18} />
            {t("product_question")}
          </a>

          <div className="product__details">
            <h2 className="field__label">{t("product_details")}</h2>
            <ul>
              {product.details.map((d) => (
                <li key={d.en}>{pick(d)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="section">
        <h2 className="section__title">{t("product_more")}</h2>
        <div className="product-grid product-grid--three">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
