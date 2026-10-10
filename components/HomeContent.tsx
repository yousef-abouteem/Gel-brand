"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function HomeContent() {
  const { t } = useLanguage();
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <h1 className="hero__wordmark" aria-label="GEL">
            GEL
          </h1>
          <p className="hero__title">{t("hero_title")}</p>
          <p className="hero__text">{t("hero_text")}</p>
          <div className="hero__actions">
            <Link href="/shop" className="button">
              {t("hero_cta")}
            </Link>
            <Link href="/about" className="text-link">
              {t("hero_secondary")}
            </Link>
          </div>
        </div>
        <div className="hero__media">
          <Image
            src="/images/shorts.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <h2 className="section__title">{t("featured_title")}</h2>
          <Link href="/shop" className="text-link">
            {t("featured_all")}
          </Link>
        </div>
        <div className="product-grid product-grid--three">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2 className="section__title">{t("values_title")}</h2>
          <div className="values__grid">
            <div className="value">
              <h3 className="value__title">{t("value1_title")}</h3>
              <p>{t("value1_text")}</p>
            </div>
            <div className="value">
              <h3 className="value__title">{t("value2_title")}</h3>
              <p>{t("value2_text")}</p>
            </div>
            <div className="value">
              <h3 className="value__title">{t("value3_title")}</h3>
              <p>{t("value3_text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container order">
        <div className="order__copy">
          <h2 className="section__title">{t("order_title")}</h2>
          <p className="lead">{t("order_text")}</p>
        </div>
        <ol className="order__steps">
          <li>{t("order_step1")}</li>
          <li>{t("order_step2")}</li>
          <li>{t("order_step3")}</li>
        </ol>
      </section>
    </>
  );
}
