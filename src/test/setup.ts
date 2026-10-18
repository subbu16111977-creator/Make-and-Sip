import { expect, vi } from "vitest";

// The engine tests (everything outside src/data) run against a frozen copy of the retired food ingredient vocabulary (the food recipes themselves are gone; the recipes the engine tests see are the real drinks), so they keep
// exercising the matching rules with a large, varied ingredient list. The data tests under src/data validate the
// real drinks data instead. Remove this (and src/test/fixtures) once the engine tests have drinks fixtures of their own.
const isDataTest = () => (expect.getState().testPath ?? "").includes("/src/data/");

vi.mock("@/data/ingredients", async (importOriginal) => (isDataTest() ? await importOriginal() : await import("@/test/fixtures/ingredients")));
