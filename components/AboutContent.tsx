"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { Owl } from "./Owl";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="container section about">
        <div className="about__copy">
          <h1 className="page-title page-title--long">{t("about_title")}</h1>
          <p className="lead">{t("about_p1")}</p>
          <p>{t("about_p2")}</p>
          <Link href="/shop" className="button">
            {t("hero_cta")}
          </Link>
        </div>
        <div className="about__media">
          <Image src="/images/tee.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 45vw" priority />
        </div>
      </section>

      <section className="owl-band">
        <div className="container owl-band__inner">
          <Owl height={140} />
          <div>
            <h2 className="section__title">{t("about_owl_title")}</h2>
            <p className="lead">{t("about_owl_text")}</p>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
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
    </>
  );
}
