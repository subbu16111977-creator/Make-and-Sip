import type { OptionalEquipment, Recipe, RecipeIngredient } from "@/types";
import { L, SQUEEZER, pitcher } from "./mocktailBuilders";
import type { MocktailFacts } from "./mocktailBuilders";

/** Lemonades: a syrup, fresh lemon juice and water in a pitcher (or any large jug), with flavours added to the syrup or the juice. */

export const LC = { type: "Lemonades & coolers" } as const;

export interface LemonadeSpec {
  /** A different citrus for the "lemonade" (limes, oranges): its ingredient id, label and count. */
  citrus?: { pantryId: string; label: string; count: number };
  lemons?: number;
  sugarG?: number;
  waterMl?: number;
  /** Something simmered into the syrup: "the lavender". */
  infuse?: { line: RecipeIngredient; what: string };
  /** Fruit to purée and strain before mixing. */
  fruit?: { lines: RecipeIngredient[]; step: string };
  /** Honey stands in for the sugar. */
  honey?: boolean;
  /** Top with sparkling water instead of still water. */
  sparkling?: boolean;
  extra?: RecipeIngredient[];
  /** Steps that go in after mixing: stirring in herbs, floating fruit. */
  mix?: string[];
  optional?: OptionalEquipment[];
}

export function lemonade(facts: MocktailFacts, spec: LemonadeSpec = {}): Recipe {
  const lemons = spec.citrus?.count ?? spec.lemons ?? 6;
  const citrusName = spec.citrus ? spec.citrus.label.toLowerCase() : "lemons";
  const sugarG = spec.sugarG ?? 150;
  const waterMl = spec.waterMl ?? 1000;
  const lines: RecipeIngredient[] = [
    spec.citrus ? L(spec.citrus.pantryId, `${spec.citrus.label}, juiced`, String(lemons)) : L("lemon", "Lemons, juiced (about 240 ml of juice)", String(lemons)),
    spec.honey ? L("honey", "Honey", "100 ml") : L("sugar", "Sugar", `${sugarG} g`),
    spec.sparkling ? L("sparkling-water", "Chilled sparkling water, to top up", "750 ml") : L("water", "Cold water", `${waterMl} ml`),
    ...(spec.infuse ? [spec.infuse.line] : []),
    ...(spec.fruit?.lines ?? []),
    ...(spec.extra ?? []),
    L("ice", "Ice cubes, to serve", "2 cups", true),
  ];
  const syrup = spec.honey
    ? `Stir the honey into 250 ml of warm water until dissolved${spec.infuse ? `, with ${spec.infuse.what} steeping in it for 10 minutes, then strain` : ""}, and let it cool.`
    : spec.infuse
      ? `Make the syrup: heat the sugar with 250 ml of water and ${spec.infuse.what} until the sugar dissolves, simmer for 5 minutes, then strain and cool.`
      : "Make the syrup: stir the sugar into 250 ml of hot water until completely dissolved, then let it cool.";
  const steps = [
    syrup,
    ...(spec.fruit ? [spec.fruit.step] : []),
    `Squeeze the ${citrusName} and strain out the pips: you want about 240 ml of juice.`,
    spec.sparkling ? "Pour the syrup, the juice and the fruit (if any) into a pitcher with 250 ml of cold water and stir." : `Pour the syrup, the juice and the fruit (if any) into a pitcher and add the ${waterMl - 250} ml of cold water. Stir well.`,
    ...(spec.mix ?? []),
    spec.sparkling ? "Chill for 30 minutes. Just before serving, add the ice and top up with the sparkling water." : "Chill for at least 30 minutes, taste, and add more sugar or lemon if you like.",
    "Serve in tall glasses over ice, with a slice of fruit.",
  ];
  return pitcher({ ...LC, servings: 4, ...facts }, lines, steps, [SQUEEZER, ...(spec.optional ?? [])]);
}
