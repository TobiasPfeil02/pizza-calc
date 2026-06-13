"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALE_TAG } from "@/lib/i18n";
import type { DoughResult, DoughState } from "@/lib/dough";

interface Props {
  state: DoughState;
  result: DoughResult;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="py-0.5 pr-8 text-sm text-gray-600">{label}</td>
      <td className="py-0.5 text-right text-sm font-semibold tabular-nums">{value}</td>
    </tr>
  );
}

export function RecipePrintView({ state, result }: Props) {
  const { locale, t } = useLanguage();
  const [printDate, setPrintDate] = useState("");

  useEffect(() => {
    setPrintDate(
      new Date().toLocaleDateString(LOCALE_TAG[locale], { dateStyle: "long" })
    );
  }, [locale]);

  const yeastLabel = state.yeastType === "IDY" ? t.instantDryYeast : t.freshYeast;
  const fmt0 = (n: number) => `${Math.round(n)} g`;

  return (
    <div className="hidden print:block font-sans text-black">
      {/* Header */}
      <div className="mb-6 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold">{t.printTitle}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {t.printedOn}: {printDate}
        </p>
      </div>

      <div className="text-sm text-gray-500 mb-6">
        {state.ballsCount} × {state.ballWeight} g = {state.ballsCount * state.ballWeight} g
      </div>

      {/* Ingredients */}
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        {t.ingredients}
      </h2>
      <table className="mb-6 w-full border-t border-gray-200">
        <tbody>
          <Row label={t.flour} value={fmt0(result.flourWeight)} />
          <Row label={t.water} value={fmt0(result.waterWeight)} />
          <Row label={t.saltResult} value={fmt0(result.saltWeight)} />
          <Row label={yeastLabel} value={`${result.yeastWeight.toFixed(2)} g`} />
          <tr className="border-t border-gray-200">
            <td className="pt-2 pr-8 text-sm font-semibold">{t.totalDough}</td>
            <td className="pt-2 text-right text-sm font-semibold tabular-nums">
              {fmt0(result.flourWeight + result.waterWeight + result.saltWeight + result.yeastWeight)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Fermentation */}
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        {t.fermentationSchedule}
      </h2>
      <table className="mb-2 w-full border-t border-gray-200">
        <tbody>
          {state.roomTime > 0 && (
            <Row
              label={t.roomTime}
              value={`${state.roomTime} h @ ${state.roomTemp} °C`}
            />
          )}
          {state.fridgeTime > 0 && (
            <Row
              label={t.fridgeTime}
              value={`${state.fridgeTime} h @ ${state.fridgeTemp} °C`}
            />
          )}
        </tbody>
      </table>
      <p className="mb-6 text-xs text-gray-500">
        {t.hydrationLabel}: {state.waterPercent}% · {t.saltLabel}: {state.saltPercent}%
        {" · "}{t.yeastDiagnostic(result.freshYeastPercent.toFixed(3), result.eqHours.toFixed(1))}
      </p>

      {/* Disclaimer */}
      <p className="border-t border-gray-200 pt-4 text-xs text-gray-400">
        {t.yeastNote}
      </p>
    </div>
  );
}
