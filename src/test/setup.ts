import { vi } from "vitest";

// Until Make & Sip has its own drinks data, the engine tests run against a frozen copy of the retired food data.
// Remove these two mocks (and src/test/fixtures) when the drinks registry and drinks exist.
vi.mock("@/data/ingredients", async () => await import("@/test/fixtures/ingredients"));
vi.mock("@/data/recipes", async () => await import("@/test/fixtures/recipes"));
