"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { DoughResult, DoughState } from "@/lib/dough";

interface ResultsCardProps {
  result: DoughResult;
  state: DoughState;
  noFermentation: boolean;
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-stone-100 last:border-0">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-stone-600">{label}</span>
        <span className="text-xl font-semibold tabular-nums text-stone-900">
          {value}
        </span>
      </div>
      {sub && <p className="text-xs text-stone-400 text-right">{sub}</p>}
    </div>
  );
}

export function ResultsCard({ result, state, noFermentation }: ResultsCardProps) {
  const { t } = useLanguage();

  const fmt0 = (n: number) => (isFinite(n) ? `${Math.round(n)} g` : "0 g");

  const yeastLabel = state.yeastType === "IDY" ? t.instantDryYeast : t.freshYeast;
  const yeastValue =
    isFinite(result.yeastWeight) && result.yeastWeight > 0
      ? `${result.yeastWeight.toFixed(2)} g`
      : "0.00 g";

  const yeastDiagnostic = noFermentation
    ? t.noFermentationHint
    : isFinite(result.freshYeastPercent) && result.freshYeastPercent > 0
    ? t.yeastDiagnostic(
        result.freshYeastPercent.toFixed(3),
        result.eqHours.toFixed(1)
      )
    : null;

  const totalWeight = Math.round(
    result.flourWeight + result.waterWeight + result.saltWeight + result.yeastWeight
  );

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-stone-900">{t.ingredients}</h2>
        <span className="text-sm text-stone-400 tabular-nums">
          {state.ballsCount} × {state.ballWeight} g
        </span>
      </div>

      <Row label={t.flour} value={fmt0(result.flourWeight)} />
      <Row label={t.water} value={fmt0(result.waterWeight)} />
      <Row label={t.saltResult} value={fmt0(result.saltWeight)} />
      <Row
        label={yeastLabel}
        value={yeastValue}
        sub={yeastDiagnostic ?? undefined}
      />

      <div className="mt-4 flex items-baseline justify-between rounded-lg bg-stone-50 px-4 py-3">
        <span className="text-sm font-medium text-stone-500">{t.totalDough}</span>
        <span className="tabular-nums font-semibold text-stone-700">
          {isFinite(totalWeight) && totalWeight > 0 ? `${totalWeight} g` : "—"}
        </span>
      </div>

      <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3">
        <p className="text-xs text-emerald-800">
          <strong>{t.hydrationLabel}:</strong>{" "}
          {state.waterPercent}% &nbsp;·&nbsp;
          <strong>{t.saltLabel}:</strong> {state.saltPercent}%
        </p>
      </div>
    </div>
  );
}
