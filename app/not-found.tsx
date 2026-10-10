"use client";

import Link from "next/link";
import { Owl } from "@/components/Owl";
import { useLanguage } from "@/lib/language";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="container section not-found">
      <Owl height={120} />
      <h1 className="page-title">{t("not_found_title")}</h1>
      <Link href="/" className="button">
        {t("not_found_cta")}
      </Link>
    </div>
  );
}
