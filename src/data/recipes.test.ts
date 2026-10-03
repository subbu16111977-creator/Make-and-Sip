import { describe, expect, it } from "vitest";
import { recipes } from "./recipes";

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
});
