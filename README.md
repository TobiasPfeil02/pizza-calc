# Neapolitan Pizza Dough Calculator

**https://pizza.t-pfeil.com**

A free, fully client-side web app that computes precise ingredient weights for Neapolitan pizza dough (high-heat oven, 400–500 °C), supporting two-stage fermentation (room temperature + fridge).

MIT License · No telemetry, no analytics, no backend.

---

## Mathematical model

All weights use **baker's percentages** — flour is always 100%; every other ingredient is expressed as a percentage of flour weight.

### Yeast calculation

Yeast is not a free input. It is derived so the dough is correctly proofed for the chosen time and temperature schedule.

**Step 1 — Equivalent room-temperature hours**

Cold fermentation slows yeast by a Q10 factor (activity changes by a factor of Q10 per 10 °C):

```
coefficient = Q10 ^ ((fridgeTemp - roomTemp) / 10)   // < 1 because fridge is cooler
eqHours     = roomTime + fridgeTime × coefficient
```

Example: Q10=2, roomTemp=20 °C, fridgeTemp=4 °C → coefficient ≈ 0.330.
So 24 h fridge ≈ 7.9 equivalent room-temperature hours.

**Step 2 — Fresh-yeast percentage**

More time and/or warmer room → less yeast needed. An exponential-decay curve models this:

```
tempFactor       = Q10 ^ ((roomTemp - REF_TEMP) / 10)
effectiveHours   = eqHours × tempFactor
freshYeastPct    = A × exp(−K × effectiveHours)
```

The result is clamped to `[YEAST_MIN_PCT, YEAST_MAX_PCT]`.

**Step 3 — Ingredient weights**

```
totalPercent = 100 + waterPercent + saltPercent + yeastPercentForMass
flourWeight  = totalDoughWeight / (totalPercent / 100)
waterWeight  = flourWeight × (waterPercent / 100)
saltWeight   = flourWeight × (saltPercent / 100)
yeastWeight  = flourWeight × (yeastPercentForMass / 100)
```

### MODEL constants

All constants live in `src/lib/dough.ts` and can be tuned without touching logic:

| Constant | Default | Description |
|---|---|---|
| `Q10` | 2.0 | Yeast activity factor per 10 °C |
| `REF_TEMP` | 20 °C | Reference temperature for the yeast curve |
| `MIN_EQ_HOURS` | 0.5 h | Floor on equivalent hours (avoids divide-by-zero) |
| `A` | 2.2 | Fresh-yeast % at ~0 effective hours (curve ceiling) |
| `K` | 0.12 | Decay rate per effective hour |
| `YEAST_MIN_PCT` | 0.02% | Lower clamp on yeast percentage |
| `YEAST_MAX_PCT` | 4.0% | Upper clamp on yeast percentage |
| `IDY_DIVISOR` | 3 | Fresh → instant dry yeast conversion factor |

With the defaults, a 24 h / 4 °C cold proof after 4 h at 20 °C yields roughly 0.7–1.0% fresh yeast — a reasonable figure for Neapolitan dough.

> **Disclaimer:** Yeast quantities are *estimates*. Real fermentation depends on flour strength, actual dough temperature, starter health, and ambient conditions. This model is inspired by the warm+cold equivalent-time approach popularised by tools like Stadler Made, but the constants are this project's own and do not reproduce any proprietary calculator.

---

## Development

```bash
npm run dev   # start dev server at http://localhost:3000
npm test      # run Vitest tests
npm run build # production build
```

## Stack

- Next.js (App Router), React 19, TypeScript
- Tailwind CSS v4
- Vitest for unit tests
- No backend, no database, no network calls at runtime
