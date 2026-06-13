export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

// BCP 47 tags used for Intl formatting
export const LOCALE_TAG: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
};

export interface Translations {
  // Page header
  appTitle: string;
  appDescription: string;

  // Sections
  doughSection: string;
  fermentationSection: string;

  // Dough inputs
  numberOfBalls: string;
  ballWeight: string;
  hydration: string;
  saltInput: string;
  unitBalls: string;

  // Ready-time slider
  readyIn: string;
  startTimeLabel: string;
  prepNote: string;
  today: string;
  tomorrow: string;
  at: string;
  timeUntilReadyAria: string;

  // Fermentation inputs
  roomTime: string;
  roomTemp: string;
  fridgeTime: string;
  fridgeTemp: string;

  // Yeast toggle
  yeastType: string;
  instantDry: string;
  freshCompressed: string;

  // Results card
  ingredients: string;
  flour: string;
  water: string;
  saltResult: string;
  instantDryYeast: string;
  freshYeast: string;
  totalDough: string;
  hydrationLabel: string;
  saltLabel: string;

  // Diagnostics
  noFermentationHint: string;
  noFermentationWarning: string;
  yeastDiagnostic: (pct: string, hours: string) => string;
  yeastNote: string;

  // Presets
  presetsSection: string;
  presetQuick: string;
  presetQuickSub: string;
  preset24h: string;
  preset24hSub: string;
  preset48h: string;
  preset48hSub: string;

  // Export
  printButton: string;
  calendarButton: string;
  printTitle: string;
  printedOn: string;
  fermentationSchedule: string;

  // ICS event summaries
  icsEvtStart: string;
  icsEvtFridge: string;
  icsEvtTakeOut: string;
  icsEvtReady: string;

  // FAQ
  faqTitle: string;
  faq: { q: string; a: string }[];

  // Footer
  footerNote: string;
  languageLabel: string;
}

const en: Translations = {
  appTitle: "🍕 Pizza Dough Calculator",
  appDescription:
    "Precise ingredient weights for Neapolitan pizza — two-stage fermentation, baker's percentages, Q10 yeast model.",

  doughSection: "Dough",
  fermentationSection: "Fermentation",

  numberOfBalls: "Number of balls",
  ballWeight: "Ball weight",
  hydration: "Hydration",
  saltInput: "Salt",
  unitBalls: "balls",

  readyIn: "Ready in",
  startTimeLabel: "Start time",
  prepNote: "Adjusts fridge time",
  today: "today",
  tomorrow: "tomorrow",
  at: "at",
  timeUntilReadyAria: "Time until dough is ready",

  roomTime: "Room temp. time",
  roomTemp: "Room temperature",
  fridgeTime: "Fridge time",
  fridgeTemp: "Fridge temperature",

  yeastType: "Yeast type",
  instantDry: "Instant Dry",
  freshCompressed: "Fresh / Compressed",

  ingredients: "Ingredients",
  flour: "Flour",
  water: "Water",
  saltResult: "Salt",
  instantDryYeast: "Instant Dry Yeast",
  freshYeast: "Fresh Yeast",
  totalDough: "Total dough",
  hydrationLabel: "Hydration",
  saltLabel: "Salt",

  noFermentationHint: "Add some fermentation time",
  noFermentationWarning:
    "Add some fermentation time — both room time and fridge time are zero.",
  yeastDiagnostic: (pct, hours) =>
    `${pct}% fresh yeast · ${hours} h eq. room time`,
  yeastNote:
    "Yeast quantities are estimates. Real fermentation depends on flour strength, actual dough temperature, and ambient conditions.",

  presetsSection: "Presets",
  presetQuick: "Same day",
  presetQuickSub: "~8 h · no fridge",
  preset24h: "24 h",
  preset24hSub: "cold proof",
  preset48h: "48 h",
  preset48hSub: "long cold proof",

  printButton: "Print / Save as PDF",
  calendarButton: "Add to Calendar",
  printTitle: "Neapolitan Pizza Dough",
  printedOn: "Printed",
  fermentationSchedule: "Fermentation Schedule",

  icsEvtStart: "Start pizza dough 🍕",
  icsEvtFridge: "Dough → fridge",
  icsEvtTakeOut: "Take dough out of fridge",
  icsEvtReady: "Pizza time! 🍕",

  faqTitle: "FAQ & Instructions",
  faq: [
    {
      q: "How do I mix and develop the dough?",
      a: "Start with the autolyse: combine all the flour with about 90% of the water, mix until no dry flour remains, then cover and rest for 30 minutes. This hydrates the flour and begins gluten development with minimal effort.\n\nDissolve the yeast in the remaining water, add it to the rested dough, and knead it in thoroughly. Add the salt last — direct contact between salt and yeast inhibits fermentation, so keep them apart until both are incorporated.\n\nDevelop the gluten with stretch-and-fold sets: grab one side of the dough, stretch it upward, fold it back over the mass, rotate 90°, and repeat all four sides. Rest 5–10 minutes between sets, and do 3–4 sets total. The dough is ready when it is smooth and elastic and passes the windowpane test: gently stretch a small piece until it is thin enough to see light through without tearing.",
    },
    {
      q: "What if I don't have a high-heat oven?",
      a: "This recipe works well in a conventional home oven. Preheat to the highest temperature your oven can reach (usually 250–280 °C / 480–540 °F) with a pizza stone or baking steel inside for at least 30–45 minutes — the stored thermal mass is what crisps the base.\n\nFor best results use a two-stage bake: first bake the dough topped only with tomato sauce until the base has puffed and begun to colour (3–5 min). Pull it out, add the remaining toppings, and finish until the cheese is melted and the crust is nicely browned (another 4–6 min). This prevents toppings from drying out or cheese from overcooking before the base is done.",
    },
    {
      q: "Why is there no olive oil in the dough?",
      a: "Traditional Neapolitan dough contains no added fat. At very high temperatures (450–500 °C), oil causes the crust to brown and char much faster, which can lead to burning before the dough has had time to puff and develop its characteristic leopard spotting.\n\nIf you are baking in a conventional home oven you can substitute 2–3% of the water weight with olive oil. At lower temperatures it won't cause problems and adds a slightly richer flavour and a crispier bottom.",
    },
    {
      q: "Which flour should I use?",
      a: "The ideal choice is Italian Tipo 00 flour with a high protein content (12–14 g per 100 g). The fine milling produces a silky, extensible dough that blisters beautifully at high heat.\n\nStrong bread flour (also 12–14% protein) is a widely available substitute and gives excellent results — the crumb will be slightly chewier but still very good.\n\nAvoid standard all-purpose or plain flour: the lower protein content means less gluten, weaker structure, and a dough that tears easily and spreads flat rather than holding its shape.",
    },
    {
      q: "Why is the yeast amount so small?",
      a: "The longer and colder the fermentation, the less yeast you need — the yeast simply has more time to do its work. A 48-hour cold proof requires only a fraction of the yeast a 2-hour room-temperature rise would need to achieve the same level of development.\n\nUsing less yeast also produces better flavour. A slow fermentation gives the dough time to develop complex organic acids, CO₂, and aroma compounds that a fast, high-yeast ferment cannot replicate. The calculator derives the yeast percentage from your chosen schedule using a temperature-corrected exponential decay curve (Q10 coefficient) — see the README for the full model.",
    },
    {
      q: "What does hydration mean?",
      a: "In baker's math, flour is always 100% and every other ingredient is expressed as a percentage of the flour weight. Hydration is the water percentage: 65% hydration means 65 g of water per 100 g of flour.\n\nHigher hydration produces an airier, more open crumb with larger bubbles, but makes the dough stickier and harder to shape. Neapolitan dough typically sits between 60–65%. Start at 60% if you are new to high-hydration dough.",
    },
  ],

  footerNote:
    "Open-source · MIT license · No telemetry, no cookies, fully client-side. Yeast model uses a Q10 temperature coefficient and calibrated exponential decay curve.",
  languageLabel: "Language",
};

const de: Translations = {
  appTitle: "🍕 Pizza-Teig-Rechner",
  appDescription:
    "Präzise Zutatenmengen für neapolitanischen Pizzateig — zweistufige Gärführung, Bäckerprozent, Q10-Hefemodell.",

  doughSection: "Teig",
  fermentationSection: "Gärführung",

  numberOfBalls: "Anzahl Teiglinge",
  ballWeight: "Gewicht pro Teigling",
  hydration: "Hydration",
  saltInput: "Salz",
  unitBalls: "Stk.",

  readyIn: "Fertig in",
  startTimeLabel: "Startzeit",
  prepNote: "Passt Kühlzeit an",
  today: "heute",
  tomorrow: "morgen",
  at: "um",
  timeUntilReadyAria: "Zeit bis der Teig fertig ist",

  roomTime: "Zeit bei Raumtemperatur",
  roomTemp: "Raumtemperatur",
  fridgeTime: "Kühlschrankzeit",
  fridgeTemp: "Kühlschranktemperatur",

  yeastType: "Hefetyp",
  instantDry: "Trockenhefe",
  freshCompressed: "Frische Hefe",

  ingredients: "Zutaten",
  flour: "Mehl",
  water: "Wasser",
  saltResult: "Salz",
  instantDryYeast: "Trockenhefe",
  freshYeast: "Frische Hefe",
  totalDough: "Teig gesamt",
  hydrationLabel: "Hydration",
  saltLabel: "Salz",

  noFermentationHint: "Bitte Gärzeit hinzufügen",
  noFermentationWarning:
    "Bitte Gärzeit hinzufügen — Raumtemperaturzeit und Kühlschrankzeit sind beide null.",
  yeastDiagnostic: (pct, hours) =>
    `${pct}% Frische Hefe · ${hours} h äquiv. RT-Zeit`,
  yeastNote:
    "Hefemengen sind Schätzwerte. Die tatsächliche Gärung hängt von der Mehlstärke, der Teigtemperatur und den Umgebungsbedingungen ab.",

  presetsSection: "Voreinstellungen",
  presetQuick: "Gleicher Tag",
  presetQuickSub: "~8 h · kein Kühlschrank",
  preset24h: "24 h",
  preset24hSub: "Kalte Gare",
  preset48h: "48 h",
  preset48hSub: "Lange kalte Gare",

  printButton: "Drucken / Als PDF speichern",
  calendarButton: "Zum Kalender hinzufügen",
  printTitle: "Neapolitanischer Pizzateig",
  printedOn: "Gedruckt am",
  fermentationSchedule: "Gärführung",

  icsEvtStart: "Pizzateig ansetzen 🍕",
  icsEvtFridge: "Teig → Kühlschrank",
  icsEvtTakeOut: "Teig aus Kühlschrank nehmen",
  icsEvtReady: "Pizza-Zeit! 🍕",

  faqTitle: "FAQ & Anleitung",
  faq: [
    {
      q: "Wie mische und entwickle ich den Teig?",
      a: "Beginne mit der Autolyse: Das gesamte Mehl mit etwa 90 % des Wassers vermengen, bis kein trockenes Mehl mehr übrig ist, dann abdecken und 30 Minuten ruhen lassen. So hydratisiert das Mehl und die Glutenentwicklung beginnt mit minimalem Aufwand.\n\nDie Hefe im restlichen Wasser auflösen, in den geruhten Teig einarbeiten und gut einkneten. Das Salz kommt zuletzt — direkter Kontakt zwischen Salz und Hefe hemmt die Gärung, daher beide erst zugeben, wenn die Hefe bereits im Teig ist.\n\nDen Gluten mit Stretch-and-Fold-Sätzen entwickeln: Eine Seite des Teigs hochziehen, zurückfalten, 90° drehen und alle vier Seiten wiederholen. Zwischen den Sätzen 5–10 Minuten ruhen lassen, 3–4 Sätze insgesamt. Der Teig ist fertig, wenn er glatt und elastisch ist und den Fenstertest besteht: Ein kleines Stück vorsichtig dehnen — wenn es so dünn gezogen werden kann, dass man fast Licht hindurchsieht, ohne zu reißen, ist der Gluten gut entwickelt.",
    },
    {
      q: "Was, wenn ich keinen Hochtemperaturofen habe?",
      a: `Das Rezept funktioniert auch in einem normalen Haushaltsbackofen. 
      Den Ofen auf die höchste mögliche Temperatur (meist 250–280 °C) mit einem Pizzastein oder Backstahl mindestens 30–45 Minuten vorheizen — 
      die gespeicherte Wärme ist entscheidend für den knusprigen Boden.\n\n
      Für beste Ergebnisse empfiehlt sich ein zweistufiges Backen: Zuerst den Teig nur mit Tomatensauce belegen und backen, 
      bis der Boden aufgegangen ist und leicht Farbe bekommt (3–5 Min.). 
      Dann kurz herausnehmen, restliche Beläge auflegen und weiter backen, bis der Käse geschmolzen und der Rand schön gebräunt ist (weitere 4–6 Min.). 
      So trocknen die Beläge nicht aus und der Käse verbrennt nicht, bevor der Boden gar ist.`,
    },
    {
      q: "Warum kein Olivenöl im Teig?",
      a: "Traditioneller neapolitanischer Teig enthält kein Fett. Bei sehr hohen Ofentemperaturen (450–500 °C) lässt Öl die Kruste wesentlich schneller bräunen und verbrennen, bevor der Teig Zeit hatte aufzugehen und sein charakteristisches Leopardenmuster zu entwickeln.\n\nWer im Haushaltsbackofen bäckt, kann 2–3 % des Wassergewichts durch Olivenöl ersetzen. Bei niedrigeren Temperaturen schadet es nicht und verleiht dem Teig ein etwas kräftigeres Aroma sowie einen knusprigeren Boden.",
    },
    {
      q: "Welches Mehl sollte ich verwenden?",
      a: "Ideal ist italienisches Tipo-00-Mehl mit hohem Proteingehalt (12–14 g pro 100 g). Die feine Vermahlung ergibt einen seidigen, dehnbaren Teig, der bei hoher Hitze schön Blasen bildet.\n\nStarkes Brotmehl (ebenfalls 12–14 % Eiweiß) ist eine weit verbreitete Alternative mit sehr guten Ergebnissen — die Krume wird etwas zäher, ist aber trotzdem ausgezeichnet.\n\nNormales Weizenmehl Type 405 oder 550 sollte vermieden werden: der niedrigere Proteingehalt bedeutet weniger Gluten, schwächere Struktur und einen Teig, der leicht reißt und flach bleibt statt seine Form zu halten.",
    },
    {
      q: "Warum ist die Hefemenge so gering?",
      a: "Je länger und kälter die Gärung, desto weniger Hefe wird benötigt — die Hefe hat einfach mehr Zeit, ihre Arbeit zu tun. Eine 48-stündige Kaltgare benötigt nur einen Bruchteil der Hefe, die ein 2-stündiger Raumtemperatur-Aufgang für dasselbe Ergebnis brauchen würde.\n\nWeniger Hefe ist auch besser für den Geschmack. Eine langsame Gärung gibt dem Teig Zeit, komplexe organische Säuren, CO₂ und Aromastoffe zu entwickeln, die eine schnelle Gärung mit viel Hefe nicht replizieren kann. Der Rechner leitet den Hefeanteil aus dem gewählten Zeitplan ab, mithilfe einer temperaturkorrigierten Exponentialfunktion (Q10-Koeffizient) — Details im README.",
    },
    {
      q: "Was bedeutet Hydration?",
      a: "In der Bäckermathematik ist Mehl immer 100 %, und jede andere Zutat wird als Prozentsatz des Mehlgewichts ausgedrückt. Hydration ist der Wasseranteil: 65 % Hydration bedeutet 65 g Wasser auf 100 g Mehl.\n\nHöhere Hydration ergibt eine luftigere, offenere Krume mit größeren Blasen, macht den Teig jedoch klebriger und schwieriger zu formen. Neapolitanischer Teig liegt typischerweise zwischen 60–65 %. Wer neu mit feuchtem Teig ist, sollte bei 60 % beginnen.",
    },
  ],

  footerNote:
    "Open-Source · MIT-Lizenz · Keine Telemetrie, keine Cookies, vollständig clientseitig. Hefemodell mit Q10-Temperaturkoeffizient und kalibrierter Exponentialfunktion.",
  languageLabel: "Sprache",
};

export const translations: Record<Locale, Translations> = { en, de };

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.split("-")[0].toLowerCase();
  return lang === "de" ? "de" : "en";
}
