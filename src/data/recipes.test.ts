import { describe, expect, it } from "vitest";
import { recipes } from "./recipes";
import { isEquipmentTag } from "@/lib/equipment";

const normalize = (title: string) =>
  title
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

describe("recipe catalogue", () => {
  it("has no two dishes with the same title", () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const r of recipes) {
      const key = normalize(r.title);
      const prev = seen.get(key);
      if (prev) dupes.push(`${prev} / ${r.id}`);
      else seen.set(key, r.id);
    }
    expect(dupes).toEqual([]);
  });

  it("uses only known equipment, and never lists the same tag as both required and optional", () => {
    const bad: string[] = [];
    for (const r of recipes) {
      for (const tag of r.equipment) if (!isEquipmentTag(tag)) bad.push(`${r.id}: unknown required "${tag}"`);
      for (const o of r.optionalEquipment ?? []) {
        if (!isEquipmentTag(o.tag)) bad.push(`${r.id}: unknown optional "${o.tag}"`);
        if (r.equipment.includes(o.tag)) bad.push(`${r.id}: "${o.tag}" is both required and optional`);
      }
    }
    expect(bad).toEqual([]);
  });
});
