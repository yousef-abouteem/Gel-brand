"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type DictKey } from "./i18n";
import type { Lang, Localized } from "./products";

type LanguageContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  pick: (value: Localized) => string;
};

const STORAGE_KEY = "gel_lang";
const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ar" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Arabic is the default and what the server renders; a saved choice is applied after mount.
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== "ar") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
  }, []);

  const t = useCallback(
    (key: DictKey, vars?: Record<string, string | number>) => {
      let text = dictionaries[lang][key];
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.replace(`{${name}}`, String(value));
        }
      }
      return text;
    },
    [lang]
  );

  const pick = useCallback((value: Localized) => value[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
