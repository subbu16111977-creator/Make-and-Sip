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

  it("every drink has at least one way to make it, each valid", () => {
    const bad: string[] = [];
    for (const r of recipes) {
      const methods = r.methods ?? [];
      if (methods.length === 0) bad.push(`${r.id}: needs at least one method`);
      const ids = methods.map((m) => m.id);
      if (new Set(ids).size !== ids.length) bad.push(`${r.id}: method ids must be unique`);
      if (methods.filter((m) => m.equipment.length === 0).length > 1) bad.push(`${r.id}: only one by-hand method makes sense`);
      for (const m of methods) {
        const where = `${r.id}/${m.id}`;
        if (!/^[a-z0-9-]+$/.test(m.id)) bad.push(`${where}: id should be lowercase-hyphenated`);
        if (m.label.trim().length < 3) bad.push(`${where}: needs a label`);
        if (m.steps.length < 3) bad.push(`${where}: needs a real method (at least 3 steps)`);
        if (m.equipment.length === 0 && !(m.handTools && m.handTools.length > 0)) bad.push(`${where}: a by-hand method should say which hand tools it uses`);
        const seen = new Set<string>();
        for (const tag of m.equipment) {
          if (!isEquipmentTag(tag)) bad.push(`${where}: unknown equipment "${tag}"`);
          if (seen.has(tag)) bad.push(`${where}: "${tag}" listed twice`);
          seen.add(tag);
        }
        for (const o of m.optionalEquipment ?? []) {
          if (!isEquipmentTag(o.tag)) bad.push(`${where}: unknown optional equipment "${o.tag}"`);
          if (seen.has(o.tag)) bad.push(`${where}: "${o.tag}" is both required and optional`);
          seen.add(o.tag);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
