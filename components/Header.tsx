"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/language";
import type { DictKey } from "@/lib/i18n";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";
import { Owl } from "./Owl";

const links: { href: string; key: DictKey }[] = [
  { href: "/shop", key: "nav_shop" },
  { href: "/about", key: "nav_about" },
  { href: "/contact", key: "nav_contact" },
];

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const { count, open } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        {t("skip_to_content")}
      </a>
      <div className="site-header__inner">
        <Link href="/" className="wordmark" aria-label="GEL">
          <Owl height={30} />
          <span className="wordmark__text">GEL</span>
        </Link>

        <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="site-nav__link"
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label={t("lang_switch_label")}
            lang={lang === "ar" ? "en" : "ar"}
          >
            {t("lang_switch")}
          </button>

          <button type="button" className="bag-button" onClick={open} aria-label={`${t("nav_bag")} (${count})`}>
            <BagIcon />
            {count > 0 && <span className="bag-button__count">{count}</span>}
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="Menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
