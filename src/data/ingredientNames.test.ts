import { describe, expect, it } from "vitest";
import { ingredientRegistry } from "@/data/ingredients";
import { normalizeIngredient, resolveIngredientById } from "@/lib/ingredientNormalize";
import { addPantryItem } from "@/lib/inventoryActions";
import { computeCookability } from "@/lib/cookability";
import { recipes } from "@/data/recipes";
import type { PantryItem } from "@/types";

/** Everyday names people type into the pantry. Each must be recognised (not left as an unknown ingredient). */
const EVERYDAY = `salt,pepper,sugar,flour,butter,milk,egg,eggs,oil,olive oil,vegetable oil,rice,pasta,spaghetti,noodles,bread,buns,bun,rolls,tortilla,tortillas,wraps,pita,naan,roti,chapati,bagel,croissant,cheese,cheddar,mozzarella,parmesan,feta,paneer,yogurt,yoghurt,curd,cream,sour cream,ghee,chicken,beef,pork,lamb,turkey,bacon,sausage,sausages,ham,fish,salmon,tuna,shrimp,prawns,crab,tofu,beans,black beans,chickpeas,lentils,dal,peas,corn,potato,potatoes,onion,onions,garlic,ginger,tomato,tomatoes,carrot,carrots,celery,cucumber,lettuce,spinach,kale,cabbage,broccoli,cauliflower,zucchini,courgette,eggplant,aubergine,okra,mushroom,mushrooms,bell pepper,capsicum,chili,jalapeno,avocado,lemon,lime,orange,apple,banana,mango,coconut milk,peanuts,almonds,honey,jam,ketchup,mustard,mayonnaise,soy sauce,vinegar,fish sauce,tomato paste,tomato sauce,stock,broth,yeast,baking powder,baking soda,cornstarch,breadcrumbs,oats,cumin,coriander,turmeric,paprika,cinnamon,cardamom,cloves,nutmeg,oregano,basil,thyme,rosemary,parsley,mint,cilantro,bay leaf,bay leaves,curry powder,garam masala,cocoa,chocolate,pickles,olives,tahini,hummus,miso,kimchi,nori,wine,red wine,white wine,syrup,maple syrup,brown sugar,semolina,rava,besan,atta,maida,whole wheat flour,cornmeal,polenta,quinoa,barley,vermicelli,pizza dough,puff pastry,hot dog buns,burger buns,cottage cheese,ricotta,buttermilk,tamarind,curry leaves,lemongrass,bok choy,radish,beetroot,pumpkin,leeks,spring onions,scallions,shallots,chives,asparagus,green beans,bean sprouts,peanut oil,sesame oil,coconut oil,canola oil,balsamic vinegar,teriyaki sauce,hoisin sauce,coconut cream,raisins,dates,figs,blueberries,strawberries,grapes,cherries,watermelon,kiwi,pomegranate,plantain,chicken breast,chicken thighs,chicken wings,drumsticks,mince,ground beef,steak,ribs,cod,scallops,egg yolk,egg white,halloumi,gouda,brie,goat cheese,crackers,biscuits,coffee,tea,nutella,garlic powder,onion powder,ginger garlic paste,tomato puree,pesto,chutney,pickle,achar,papad,poha,millet,almond milk,almond flour,soy milk,oat milk,french fries,hash browns,meatballs,jalapeño,five-spice powder,Bay Leaf,Tomatoes,BUNS`.split(",");

describe("everyday ingredient names", () => {
  it("are all recognised", () => {
    const unknown = EVERYDAY.filter((name) => !normalizeIngredient(name).ingredientId);
    expect(unknown).toEqual([]);
  });
  it("regional and plural spellings land on one ingredient", () => {
    const same = (a: string, b: string) => expect(normalizeIngredient(a).ingredientId).toBe(normalizeIngredient(b).ingredientId);
    same("egg", "eggs");
    same("capsicum", "bell pepper");
    same("aubergine", "eggplant");
    same("bay leaf", "bay leaves");
    same("Jalapeño", "jalapeno");
  });
  it("keeps look-alike products apart", () => {
    const id = (t: string) => normalizeIngredient(t).ingredientId;
    expect(id("garlic powder")).not.toBe(id("garlic"));
    expect(id("almond milk")).not.toBe(id("almonds"));
    expect(id("almond flour")).not.toBe(id("almonds"));
    expect(id("tomato sauce")).not.toBe(id("tomato"));
    expect(id("coconut milk")).not.toBe(id("coconut"));
    expect(id("chicken stock")).not.toBe(id("chicken"));
  });
  it("every ingredient is found by its own display name", () => {
    // A few names are deliberately shared with a more specific ingredient; everything else must find itself.
    const skip = new Set(["green-chili", "wheat-noodles", "baharat", "millet"]);
    const lost = ingredientRegistry.filter((e) => !skip.has(e.id) && normalizeIngredient(e.displayName).ingredientId !== e.id).map((e) => e.id);
    expect(lost).toEqual([]);
  });
});

describe("every dish can be cooked from names typed into the pantry", () => {
  it("typing each ingredient's name gives the dish a full set of required ingredients", () => {
    const stuck: string[] = [];
    for (const r of recipes) {
      let pantry: PantryItem[] = [];
      for (const i of r.ingredients) {
        const name = resolveIngredientById(i.pantryId)?.displayName ?? i.pantryId;
        pantry = addPantryItem(pantry, { name, category: "Pantry Staples", quantity: 100000, unit: "g", location: "Pantry", expiresInDays: 30 }).items;
      }
      const c = computeCookability(r, pantry, r.equipment);
      if (c.category !== "ready") stuck.push(`${r.id} (${c.category})`);
    }
    expect(stuck).toEqual([]);
  });
});

describe("family names", () => {
  const id = (t: string) => normalizeIngredient(t).ingredientId;
  it("plain patties are beef; other patties keep their own kind", () => {
    expect(id("patties")).toBe("burger-patties");
    expect(id("patty")).toBe("burger-patties");
    expect(id("chicken patty")).toBe("chicken-patties");
    expect(id("veggie patties")).toBe("veggie-patties");
    expect(resolveIngredientById("burger-patties")?.baseIngredient).toBe("beef");
  });
  it("chilli powder, fennel and spelt are recognised", () => {
    expect(id("chilli powder")).toBe("chili-powder");
    expect(id("red chilli powder")).toBe("red-chili-powder");
    expect(id("fennel")).toBe("fennel-seeds");
    expect(id("spelt")).toBe("spelt");
  });
  it("sliced bread / toast and bread loaf / sub rolls are separate", () => {
    expect(id("bread")).toBe("sliced-bread");
    expect(id("toast")).toBe("sliced-bread");
    expect(id("bread loaf")).toBe("bread-loaf");
    expect(id("sub rolls")).toBe("bread-loaf");
    expect(resolveIngredientById("white-bread")?.baseIngredient).toBe("sliced_bread");
    expect(resolveIngredientById("sourdough-bread")?.baseIngredient).toBe("sliced_bread");
    expect(resolveIngredientById("hoagie-roll")?.baseIngredient).toBe("bread_loaf");
    expect(resolveIngredientById("baguette")?.baseIngredient).toBe("bread_loaf");
    expect(resolveIngredientById("sliced-bread")?.baseIngredient).not.toBe(resolveIngredientById("bread-loaf")?.baseIngredient);
    for (const flat of ["pita-bread", "flatbread", "lavash-bread", "burger-buns"]) {
      expect(["sliced_bread", "bread_loaf"]).not.toContain(resolveIngredientById(flat)?.baseIngredient);
    }
  });
});
