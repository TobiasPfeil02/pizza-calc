import { Calculator } from "@/components/Calculator";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              🍕 Pizza Dough Calculator
            </h1>
            <p className="mt-1 text-stone-500">
              Precise ingredient weights for Neapolitan pizza — two-stage
              fermentation, baker&apos;s percentages, Q10 yeast model.
            </p>
          </div>
          <a
            href="https://github.com/tobias/pizza-calc"
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

      <footer className="mt-16 border-t border-stone-200 pt-6 text-xs text-stone-400">
        <p>
          Open-source · MIT license · No telemetry, no cookies, fully
          client-side. Yeast model uses a Q10 temperature coefficient and
          calibrated exponential decay curve — inspired by the warm+cold
          equivalent-time approach. Constants are tunable in{" "}
          <code className="font-mono">lib/dough.ts</code>.
        </p>
      </footer>
    </div>
  );
}
