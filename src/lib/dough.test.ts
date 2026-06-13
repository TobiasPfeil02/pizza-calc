import { describe, it, expect } from "vitest";
import { calculateDough, DEFAULTS, RANGES, clamp, type DoughState } from "./dough";

const defaults: DoughState = { ...DEFAULTS };

describe("baker's-percentage identity", () => {
  it("flour + water + salt + yeast ≈ total dough weight (±0.5 g)", () => {
    const r = calculateDough(defaults);
    const total = r.flourWeight + r.waterWeight + r.saltWeight + r.yeastWeight;
    const expected = defaults.ballsCount * defaults.ballWeight;
    expect(Math.abs(total - expected)).toBeLessThan(0.5);
  });
});

describe("salt ratio", () => {
  it("saltWeight / flourWeight * 100 ≈ saltPercent (±0.01)", () => {
    const r = calculateDough(defaults);
    const ratio = (r.saltWeight / r.flourWeight) * 100;
    expect(Math.abs(ratio - defaults.saltPercent)).toBeLessThan(0.01);
  });
});

describe("monotonic in time", () => {
  it("increasing fridgeTime does not increase freshYeastPercent", () => {
    const base = calculateDough({ ...defaults, fridgeTime: 12 });
    const more = calculateDough({ ...defaults, fridgeTime: 24 });
    expect(more.freshYeastPercent).toBeLessThanOrEqual(base.freshYeastPercent);
  });

  it("increasing roomTime does not increase freshYeastPercent", () => {
    const base = calculateDough({ ...defaults, roomTime: 2 });
    const more = calculateDough({ ...defaults, roomTime: 6 });
    expect(more.freshYeastPercent).toBeLessThanOrEqual(base.freshYeastPercent);
  });
});

describe("monotonic in temp", () => {
  it("increasing roomTemp does not increase freshYeastPercent", () => {
    const base = calculateDough({ ...defaults, roomTemp: 18 });
    const more = calculateDough({ ...defaults, roomTemp: 24 });
    expect(more.freshYeastPercent).toBeLessThanOrEqual(base.freshYeastPercent);
  });
});

describe("cold-slows-yeast", () => {
  it("coefficient < 1 when fridgeTemp < roomTemp", () => {
    const r = calculateDough(defaults); // fridgeTemp=4, roomTemp=20
    expect(r.coefficient).toBeLessThan(1);
  });

  it("coefficient <= 1 when fridgeTemp >= roomTemp (safety cap)", () => {
    const r = calculateDough({ ...defaults, fridgeTemp: 20, roomTemp: 20 });
    expect(r.coefficient).toBeLessThanOrEqual(1);
  });
});

describe("IDY conversion", () => {
  it("IDY yeastWeight ≈ CY yeastWeight / 3 (±0.01 g)", () => {
    const cy = calculateDough({ ...defaults, yeastType: "CY" });
    const idy = calculateDough({ ...defaults, yeastType: "IDY" });
    expect(Math.abs(idy.yeastWeight - cy.yeastWeight / 3)).toBeLessThan(0.01);
  });
});

describe("clamping", () => {
  it("clamp utility works correctly", () => {
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(-1, 0, 5)).toBe(0);
    expect(clamp(3, 0, 5)).toBe(3);
  });

  it("zero total ferment time → yeastWeight === 0", () => {
    const r = calculateDough({ ...defaults, roomTime: 0, fridgeTime: 0 });
    expect(r.yeastWeight).toBe(0);
  });
});

describe("sanity band", () => {
  it("default state yields freshYeastPercent in [0.4%, 1.2%]", () => {
    const r = calculateDough(defaults);
    expect(r.freshYeastPercent).toBeGreaterThanOrEqual(0.4);
    expect(r.freshYeastPercent).toBeLessThanOrEqual(1.2);
  });
});
