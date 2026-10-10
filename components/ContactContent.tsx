"use client";

import { useState, type FormEvent } from "react";
import { brand, whatsappLink } from "@/lib/brand";
import { useLanguage } from "@/lib/language";
import { WhatsAppIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

// FormSubmit's AJAX endpoint forwards the message to the brand inbox without a page reload.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${brand.email}`;

export function ContactContent() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // filled only by spam bots

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: "New message from GEL website",
          _template: "table",
        }),
      });
      const result: { success?: string | boolean } = await res.json().catch(() => ({}));
      if (!res.ok || String(result.success) !== "true") throw new Error(`Form failed: ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="container section contact">
      <div className="contact__intro">
        <h1 className="page-title">{t("contact_title")}</h1>
        <p className="lead">{t("contact_text")}</p>

        <h2 className="field__label contact__channels-title">{t("contact_channels")}</h2>
        <ul className="channels">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <span>{t("contact_whatsapp")}</span>
              <bdi dir="ltr">{brand.whatsappDisplay}</bdi>
            </a>
          </li>
          <li>
            <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
              <span>{t("contact_instagram")}</span>
              <bdi dir="ltr">{brand.instagram.handle}</bdi>
            </a>
          </li>
          <li>
            <a href={brand.tiktok.url} target="_blank" rel="noopener noreferrer">
              <span>{t("contact_tiktok")}</span>
              <bdi dir="ltr">{brand.tiktok.handle}</bdi>
            </a>
          </li>
          <li>
            <a href={`mailto:${brand.email}`}>
              <span>{t("contact_mail")}</span>
              <bdi dir="ltr">{brand.email}</bdi>
            </a>
          </li>
        </ul>
      </div>

      <div className="contact__form-wrap">
        {status === "sent" ? (
          <div className="form-success" role="status">
            <h2 className="section__title">{t("contact_sent_title")}</h2>
            <p>{t("contact_sent_text")}</p>
            <button type="button" className="text-button" onClick={() => setStatus("idle")}>
              {t("contact_another")}
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <label className="field">
              <span className="field__label">{t("contact_name")}</span>
              <input name="name" required minLength={2} maxLength={100} autoComplete="name" />
            </label>
            <label className="field">
              <span className="field__label">{t("contact_email")}</span>
              <input name="email" type="email" required autoComplete="email" dir="ltr" />
            </label>
            <label className="field">
              <span className="field__label">{t("contact_message")}</span>
              <textarea name="message" required rows={6} maxLength={2000} />
            </label>
            <input type="text" name="_honey" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden />

            {status === "error" && (
              <p className="field__error" role="alert">
                {t("contact_error")}
              </p>
            )}

            <div className="form__actions">
              <button type="submit" className="button" disabled={status === "sending"}>
                {status === "sending" ? t("contact_sending") : t("contact_send")}
              </button>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="whatsapp-hint">
                <WhatsAppIcon size={18} />
                {t("contact_whatsapp")}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
