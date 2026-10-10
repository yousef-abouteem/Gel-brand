"use client";

import Link from "next/link";
import { brand, whatsappLink } from "@/lib/brand";
import { useLanguage } from "@/lib/language";
import { Owl } from "./Owl";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Owl height={56} />
          <p className="site-footer__text">{t("footer_text")}</p>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">{t("footer_shop")}</h2>
          <Link href="/shop">{t("nav_shop")}</Link>
          <Link href="/about">{t("nav_about")}</Link>
          <Link href="/contact">{t("nav_contact")}</Link>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">{t("footer_follow")}</h2>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            {t("contact_whatsapp")}
          </a>
          <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
            {t("contact_instagram")}
          </a>
          <a href={brand.tiktok.url} target="_blank" rel="noopener noreferrer">
            {t("contact_tiktok")}
          </a>
        </div>
      </div>

      <p className="site-footer__rights">{t("footer_rights")}</p>
    </footer>
  );
}
