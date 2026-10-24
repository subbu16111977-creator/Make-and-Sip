import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import { matchesSearch } from "./discoverView";

const hits = (q: string) => recipes.filter((r) => matchesSearch(r, q)).map((r) => r.id);

describe("Discover search", () => {
  it("matches words from the start, not inside other words", () => {
    expect(hits("oj")).not.toContain("virgin-mojito");
    expect(hits("mojito")).toContain("virgin-mojito");
  });
  it("finds drinks by an ingredient in the person's own wording", () => {
    expect(hits("oj").length).toBeGreaterThan(0);
    expect(hits("whole milk").length).toBeGreaterThan(0);
  });
  it("needs every typed word", () => {
    expect(hits("mango lassi")).toContain("mango-lassi");
    expect(hits("mango zzzz")).toEqual([]);
  });
  it("an empty search keeps everything", () => {
    expect(hits("  ").length).toBe(recipes.length);
  });
});
