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

  it("uses only known equipment, and never lists a tag in more than one of required, any-of and optional", () => {
    const bad: string[] = [];
    for (const r of recipes) {
      const seen = new Map<string, string>();
      const note = (tag: string, where: string) => {
        if (!isEquipmentTag(tag)) bad.push(`${r.id}: unknown ${where} "${tag}"`);
        const prev = seen.get(tag);
        if (prev) bad.push(`${r.id}: "${tag}" is in both ${prev} and ${where}`);
        else seen.set(tag, where);
      };
      for (const tag of r.equipment) note(tag, "required");
      for (const group of r.equipmentAnyOf ?? []) {
        if (group.length < 2) bad.push(`${r.id}: an any-of group needs at least two tools`);
        for (const tag of group) note(tag, "any-of");
      }
      for (const o of r.optionalEquipment ?? []) note(o.tag, "optional");
    }
    expect(bad).toEqual([]);
  });
});
