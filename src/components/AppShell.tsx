"use client";

import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { LOCALES } from "@/lib/i18n";
import { Calculator } from "./Calculator";

function AppContent() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              {t.appTitle}
            </h1>
            <p className="mt-1 text-stone-500">{t.appDescription}</p>
          </div>
          <a
            href="https://github.com/TobiasPfeil02/pizza-calc"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-600 shadow-sm hover:bg-stone-50 transition-colors"
            aria-label="View source on GitHub"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main>
        <Calculator />
      </main>

      <footer className="mt-16 border-t border-stone-200 pt-6 flex items-center justify-between">
        <p className="text-xs text-stone-400">© 2026 Tobias Pfeil</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-stone-400">{t.languageLabel}:</span>
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                locale === l
                  ? "bg-stone-800 text-white"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

export function AppShell() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
