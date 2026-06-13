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
  prepNote: "Includes 45 min preparation · adjusts fridge time",
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

  printButton: "Print / Save as PDF",
  calendarButton: "Add to Calendar",
  printTitle: "Neapolitan Pizza Dough",
  printedOn: "Printed",
  fermentationSchedule: "Fermentation Schedule",

  icsEvtStart: "Start pizza dough 🍕",
  icsEvtFridge: "Dough → fridge",
  icsEvtTakeOut: "Take dough out of fridge",
  icsEvtReady: "Pizza time! 🍕",

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
  prepNote: "Inkl. 45 Min. Vorbereitung · passt Kühlzeit an",
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

  printButton: "Drucken / Als PDF speichern",
  calendarButton: "Zum Kalender hinzufügen",
  printTitle: "Neapolitanischer Pizzateig",
  printedOn: "Gedruckt am",
  fermentationSchedule: "Gärführung",

  icsEvtStart: "Pizzateig ansetzen 🍕",
  icsEvtFridge: "Teig → Kühlschrank",
  icsEvtTakeOut: "Teig aus Kühlschrank nehmen",
  icsEvtReady: "Pizza-Zeit! 🍕",

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
