"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  detectLocale,
  translations,
  type Locale,
  type Translations,
} from "@/lib/i18n";

const STORAGE_KEY = "pizza-calc-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with "en" to match server render, then correct on the client
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    setLocaleState(stored && stored in translations ? stored : detectLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLocaleState(l);
  }, []);

  return (
    <LanguageContext value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
