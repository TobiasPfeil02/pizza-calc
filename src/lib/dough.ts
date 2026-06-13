export type YeastType = "CY" | "IDY";

export interface DoughState {
  ballsCount: number;
  ballWeight: number;
  waterPercent: number;
  saltPercent: number;
  roomTime: number;
  roomTemp: number;
  fridgeTime: number;
  fridgeTemp: number;
  yeastType: YeastType;
}

export interface DoughResult {
  flourWeight: number;
  waterWeight: number;
  saltWeight: number;
  yeastWeight: number;
  yeastType: YeastType;
  freshYeastPercent: number;
  eqHours: number;
  coefficient: number;
}

export const DEFAULTS: DoughState = {
  ballsCount: 4,
  ballWeight: 250,
  waterPercent: 62,
  saltPercent: 2.8,
  roomTime: 4,
  roomTemp: 20,
  fridgeTime: 24,
  fridgeTemp: 4,
  yeastType: "IDY",
};

export const RANGES = {
  ballsCount:   { min: 1,   max: 50,  step: 1   },
  ballWeight:   { min: 150, max: 350, step: 5   },
  waterPercent: { min: 55,  max: 75,  step: 0.5 },
  saltPercent:  { min: 1.5, max: 3.5, step: 0.1 },
  roomTime:     { min: 0,   max: 48,  step: 0.5 },
  roomTemp:     { min: 15,  max: 30,  step: 0.5 },
  fridgeTime:   { min: 0,   max: 72,  step: 1   },
  fridgeTemp:   { min: 3,   max: 8,   step: 0.5 },
} as const;

// All tunable constants in one place. See spec Section 3.5.
export const MODEL = {
  Q10: 2.0,
  REF_TEMP: 20,
  MIN_EQ_HOURS: 0.5,
  A: 2.2,
  K: 0.12,
  YEAST_MIN_PCT: 0.02,
  YEAST_MAX_PCT: 4.0,
  IDY_DIVISOR: 3,
} as const;

export interface Preset {
  key: "quick" | "24h" | "48h";
  state: DoughState;
}

// 4 balls × 265 g · 65% hydration · 2.8% salt
// Workflow: dough → fridge immediately → take out roomTime hours before baking
export const PRESETS: Preset[] = [
  {
    key: "quick",
    state: {
      ballsCount: 4, ballWeight: 265, waterPercent: 65, saltPercent: 2.8,
      roomTime: 8, roomTemp: 20, fridgeTime: 0, fridgeTemp: 4, yeastType: "IDY",
    },
  },
  {
    key: "24h",
    state: {
      ballsCount: 4, ballWeight: 265, waterPercent: 65, saltPercent: 2.8,
      roomTime: 3, roomTemp: 20, fridgeTime: 21, fridgeTemp: 4, yeastType: "IDY",
    },
  },
  {
    key: "48h",
    state: {
      ballsCount: 4, ballWeight: 265, waterPercent: 65, saltPercent: 2.8,
      roomTime: 3, roomTemp: 20, fridgeTime: 45, fridgeTemp: 4, yeastType: "IDY",
    },
  },
];

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function calculateDough(state: DoughState): DoughResult {
  const {
    ballsCount, ballWeight,
    waterPercent, saltPercent,
    roomTime, roomTemp,
    fridgeTime, fridgeTemp,
    yeastType,
  } = state;

  const totalDoughWeight = ballsCount * ballWeight;

  // Zero fermentation time → no yeast
  if (roomTime + fridgeTime <= 0) {
    return {
      flourWeight: 0,
      waterWeight: 0,
      saltWeight: 0,
      yeastWeight: 0,
      yeastType,
      freshYeastPercent: 0,
      eqHours: 0,
      coefficient: 0,
    };
  }

  // Step 1: equivalent room-temperature hours
  let coefficient = Math.pow(MODEL.Q10, (fridgeTemp - roomTemp) / 10);
  // Cold is never faster than warm (fridgeTemp >= roomTemp edge case)
  coefficient = Math.min(coefficient, 1.0);

  let eqHours = roomTime + fridgeTime * coefficient;
  eqHours = Math.max(eqHours, MODEL.MIN_EQ_HOURS);

  // Step 2: fresh-yeast percentage via exponential decay curve
  const tempFactor = Math.pow(MODEL.Q10, (roomTemp - MODEL.REF_TEMP) / 10);
  const effectiveHours = eqHours * tempFactor;
  let freshYeastPercent = MODEL.A * Math.exp(-MODEL.K * effectiveHours);
  freshYeastPercent = clamp(freshYeastPercent, MODEL.YEAST_MIN_PCT, MODEL.YEAST_MAX_PCT);

  // Step 3: ingredient weights from baker's percentages
  const yeastPercentForMass =
    yeastType === "CY"
      ? freshYeastPercent
      : freshYeastPercent / MODEL.IDY_DIVISOR;

  const totalPercent = 100 + waterPercent + saltPercent + yeastPercentForMass;
  const flourWeight = totalDoughWeight / (totalPercent / 100);
  const waterWeight = flourWeight * (waterPercent / 100);
  const saltWeight = flourWeight * (saltPercent / 100);
  const yeastWeight = flourWeight * (yeastPercentForMass / 100);

  return {
    flourWeight,
    waterWeight,
    saltWeight,
    yeastWeight,
    yeastType,
    freshYeastPercent,
    eqHours,
    coefficient,
  };
}
