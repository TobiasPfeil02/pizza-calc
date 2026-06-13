"use client";

import { useLanguage } from "@/context/LanguageContext";

export function FaqSection() {
  const { t } = useLanguage();

  return (
    <section className="mt-16 print:hidden">
      <div className="border-t border-stone-200 pt-10">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-stone-900">
          {t.faqTitle}
        </h2>

        <dl className="space-y-2">
          {t.faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-stone-200 bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-stone-800 hover:text-emerald-700 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                {/* chevron rotates when open */}
                <svg
                  className="h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-600"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              <div className="px-5 pb-5 pt-1">
                {item.a.split("\n\n").map((para, j) => (
                  <p key={j} className={`text-sm leading-relaxed text-stone-600 ${j > 0 ? "mt-3" : ""}`}>
                    {para}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
