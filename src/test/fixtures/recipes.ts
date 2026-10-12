// Test fixture: a frozen sample of the retired Mise food recipes, used only by the engine tests until Make & Sip's own data exists.
// Not imported by the app.
import type { Recipe } from "@/types";

export const recipes: Recipe[] = [
 {
  "id": "weeknight-red-curry",
  "title": "Weeknight Red Curry",
  "description": "A fast, fragrant curry built for a Tuesday — coconut milk, curry paste, and whatever's about to turn in the fridge.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Comforting"
  ],
  "timeMinutes": 30,
  "prepMinutes": 10,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless, skinless chicken thighs, cut into 1-inch strips",
    "amount": "1 1/4 lb (about 4 thighs)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, such as vegetable or avocado oil",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "red-curry-paste",
    "label": "Thai red curry paste",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Full-fat coconut milk",
    "amount": "2 (14 oz) cans"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Red bell peppers, thinly sliced",
    "amount": "2 medium"
   },
   {
    "pantryId": "brown-sugar",
    "label": "Light brown sugar",
    "amount": "1 teaspoon",
    "optional": true
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "1 tablespoon",
    "optional": true
   },
   {
    "pantryId": "lime",
    "label": "Lime, juiced, plus wedges to serve",
    "amount": "1"
   },
   {
    "pantryId": "basmati-rice",
    "label": "Jasmine or basmati rice, rinsed",
    "amount": "1 1/2 cups (300 g)"
   },
   {
    "pantryId": "thai-basil",
    "label": "Thai basil leaves, torn",
    "amount": "1/4 cup",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Rinse the rice in a fine-mesh strainer under cold water until it runs clear, then cook it in a saucepan according to the package (roughly 1 1/2 cups rice to 2 1/4 cups water, covered, 15 minutes on low) — start this first so it's ready when the curry is.",
   "Pat the chicken thighs dry with paper towels and slice into 1-inch strips against the grain.",
   "Heat the oil in a wide pan or wok over medium-high heat. Add the curry paste and fry, stirring constantly with a spatula, until it darkens a shade and the kitchen smells properly toasted, 60–90 seconds — don't walk away, it catches fast.",
   "Add the chicken to the pan and sear in a single layer for 2 minutes per side, just until coloured on the outside; it'll finish cooking in the sauce.",
   "Pour in the coconut milk, scraping up any browned bits from the bottom of the pan with the spatula, and bring to a gentle simmer.",
   "Slide in the sliced bell pepper, lower the heat slightly, and cook uncovered for 10 minutes, stirring occasionally, until the chicken is cooked through (165°F/74°C at the thickest point) and the sauce coats the back of a spoon.",
   "Stir in the brown sugar and fish sauce if using, and taste — adjust either to balance heat, salt, and sweetness.",
   "Off the heat, stir in the lime juice and torn basil. Serve over the rice with lime wedges on the side."
  ]
 },
 {
  "id": "bbq-chicken-flatbread",
  "title": "BBQ Chicken & Pineapple Flatbread",
  "description": "Leftover roast chicken, smoky sauce, and a hit of pineapple on a blistered flatbread base.",
  "cuisine": "American",
  "dietTags": [],
  "tasteTags": [
   "Smoky",
   "Sweet"
  ],
  "timeMinutes": 20,
  "prepMinutes": 5,
  "cookMinutes": 15,
  "difficulty": "Easy",
  "servings": 2,
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Cooked chicken, shredded (leftover roast works well)",
    "amount": "1 1/2 cups (200 g)"
   },
   {
    "pantryId": "flatbread",
    "label": "Store-bought flatbread bases",
    "amount": "2"
   },
   {
    "pantryId": "bbq-sauce",
    "label": "BBQ sauce, divided",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "mozzarella",
    "label": "Mozzarella, shredded",
    "amount": "4 oz (120 g)"
   },
   {
    "pantryId": "red-onion",
    "label": "Red onion, very thinly sliced",
    "amount": "1/2 small"
   },
   {
    "pantryId": "pineapple",
    "label": "Pineapple, chopped into small chunks",
    "amount": "1/2 cup",
    "optional": true
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro leaves",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 425°F (220°C) with a baking tray inside to warm up.",
   "Spread the BBQ sauce evenly over each flatbread with the back of a spoon, leaving a small bare border around the edge.",
   "Scatter the shredded chicken, sliced onion, and mozzarella evenly over both flatbreads.",
   "Carefully slide the flatbreads onto the hot tray and bake for 10–12 minutes, until the cheese is fully melted and bubbling and the edges of the bread have caught some char.",
   "Pull them straight from the oven and top immediately with the pineapple and cilantro while everything's still hot. Slice into wedges to serve."
  ]
 },
 {
  "id": "loaded-black-bean-tacos",
  "title": "Loaded Black Bean Tacos",
  "description": "Smashed black beans, quick pickled onion, and whatever's crisp — done in fifteen minutes flat.",
  "cuisine": "Mexican",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy"
  ],
  "timeMinutes": 15,
  "prepMinutes": 10,
  "cookMinutes": 5,
  "marinateMinutes": 10,
  "difficulty": "Easy",
  "servings": 2,
  "yield": "6 tacos",
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1632370382707-dcd0ec55d0ab?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "black-beans-canned",
    "label": "Black beans",
    "amount": "1 (15 oz) can"
   },
   {
    "pantryId": "cumin-seeds",
    "label": "Ground cumin",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "tortillas",
    "label": "Small corn or flour tortillas",
    "amount": "6"
   },
   {
    "pantryId": "red-onion",
    "label": "Red onion, thinly sliced",
    "amount": "1/2"
   },
   {
    "pantryId": "lime",
    "label": "Lime, juiced",
    "amount": "1"
   },
   {
    "pantryId": "green-chili",
    "label": "Jalapeño, thinly sliced",
    "amount": "1",
    "optional": true
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro leaves",
    "amount": "1/4 cup",
    "optional": true
   },
   {
    "pantryId": "feta",
    "label": "Crumbled cheese (feta or cotija)",
    "amount": "1/2 cup (60 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the sliced red onion with the lime juice and a pinch of salt in a small bowl. Let it sit while you cook the beans — it'll soften and turn bright pink as it quick-pickles, about 10 minutes.",
   "Warm the beans, including their liquid, in a small pan over medium heat with the cumin. As they heat, roughly mash about half of them against the side of the pan with the back of a spoon — you want a mix of whole and mashed for texture.",
   "Simmer for 3–4 minutes, until slightly thickened, then remove from the heat.",
   "Warm the tortillas directly over a gas flame or in a dry pan, a few seconds per side, until pliable and lightly spotted with char.",
   "Fill each warm tortilla with the beans, then top with the quick-pickled onion, sliced jalapeño, cilantro, and crumbled cheese.",
   "Serve right away while the tortillas are still warm and pliable."
  ]
 },
 {
  "id": "chicken-biryani",
  "title": "Chicken Biryani",
  "description": "Layered rice and spiced chicken, steamed together low and slow — a weekend project worth the wait.",
  "cuisine": "Indian",
  "dietTags": [],
  "tasteTags": [
   "Spicy",
   "Comforting"
  ],
  "timeMinutes": 70,
  "prepMinutes": 25,
  "cookMinutes": 45,
  "marinateMinutes": 30,
  "difficulty": "Advanced",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless, skinless chicken thighs, cut into 1 1/2-inch pieces",
    "amount": "1 1/2 lb (700 g)"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt",
    "amount": "2/3 cup (150 g)"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated or minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   },
   {
    "pantryId": "garam-masala",
    "label": "Garam masala, divided",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Red chili powder",
    "amount": "1/2 to 1 teaspoon, to taste"
   },
   {
    "pantryId": "basmati-rice",
    "label": "Basmati rice, rinsed and soaked 20 minutes",
    "amount": "2 cups (400 g)"
   },
   {
    "pantryId": "ghee",
    "label": "Ghee",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "cumin-seeds",
    "label": "Cumin seeds",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "black-pepper",
    "label": "Whole black peppercorns",
    "amount": "8"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick (2-inch)",
    "amount": "1"
   },
   {
    "pantryId": "red-onion",
    "label": "Onion, thinly sliced and fried until crisp, divided",
    "amount": "2 large"
   },
   {
    "pantryId": "saffron",
    "label": "Saffron threads, soaked in the warm milk",
    "amount": "1 pinch",
    "optional": true
   },
   {
    "pantryId": "milk",
    "label": "Warm milk",
    "amount": "5 tablespoons",
    "optional": true
   },
   {
    "pantryId": "mint",
    "label": "Fresh mint leaves, roughly torn",
    "amount": "1/4 cup",
    "optional": true
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro leaves, roughly chopped",
    "amount": "1/4 cup",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "In a large bowl, combine the chicken with the yogurt, ginger, garlic, lemon juice, 1 teaspoon of the garam masala, the turmeric, and red chili powder. Massage it into the chicken with your hands until every piece is coated.",
   "Cover and marinate in the fridge for at least 30 minutes — overnight develops even more flavour if you have the time.",
   "Rinse the basmati rice in a bowl under cold water, swishing with your hand, until the water runs mostly clear. Cover with fresh water and soak for 20 minutes, then drain.",
   "Bring a large pot of well-salted water to a boil. Add the drained rice and cook for 5–6 minutes, until it's about 70% cooked — still with a firm, chalky bite in the very centre. Drain immediately in a colander; don't let it sit in the hot pot.",
   "While the rice soaks, melt the ghee in a small pan over medium heat. Add the cumin seeds, bay leaves, peppercorns, and cinnamon stick, and let them sizzle for about a minute until fragrant.",
   "If you haven't already got crisp fried onions, thinly slice the onions and fry in oil over medium heat, stirring often, for 12–15 minutes until deep golden brown and crisp; drain on paper towels.",
   "In a heavy-bottomed pot or Dutch oven, spread the marinated chicken in an even layer across the bottom.",
   "Spoon half the par-cooked rice over the chicken in an even layer. Scatter over half the fried onions, half the mint, and half the cilantro.",
   "Layer the remaining rice on top, then scatter with the remaining fried onions, mint, and cilantro. Drizzle the saffron-soaked milk over the top if using, along with the tempered whole spices and their ghee.",
   "Cover with a tight-fitting lid — if it's not airtight, seal the rim with a strip of dough or a layer of foil pressed down before the lid goes on. Cook on the lowest possible heat for 25 minutes. You're steaming, not boiling, so resist lifting the lid to check.",
   "Take the pot off the heat and let it rest, still tightly covered, for 10 minutes.",
   "Open the lid and, using a flat spatula, fold everything together gently from the bottom up in wide strokes, so the rice stays fluffy and the grains don't break. Serve hot, straight from the pot."
  ]
 },
 {
  "id": "whipped-hummus-plate",
  "title": "Whipped Hummus Plate",
  "description": "Ultra-smooth hummus, good olive oil, warm bread — a mezze plate that's mostly a food processor.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Vegan",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Herby"
  ],
  "timeMinutes": 15,
  "prepMinutes": 15,
  "cookMinutes": 0,
  "difficulty": "Easy",
  "servings": 4,
  "yield": "About 2 cups",
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1603133872497-f29809b750bf?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "chickpeas-canned",
    "label": "Chickpeas",
    "amount": "2 (15 oz) cans"
   },
   {
    "pantryId": "tahini",
    "label": "Tahini, well-stirred",
    "amount": "1/3 cup (80 g)"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, roughly chopped",
    "amount": "1 clove"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil, plus more to finish",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "cumin-seeds",
    "label": "Cumin, toasted and ground",
    "amount": "1/2 teaspoon",
    "optional": true
   },
   {
    "pantryId": "sourdough-bread",
    "label": "Warm bread (pita or sourdough), to serve",
    "amount": "1 loaf",
    "optional": true
   }
  ],
  "equipment": [
   "Juicer"
  ],
  "steps": [
   "Drain and rinse the chickpeas well, then, for the smoothest possible hummus, slip the skins off by rubbing them gently between your palms under running water — this step is optional but makes a real difference.",
   "Add the chickpeas, tahini, lemon juice, and roughly chopped garlic to a food processor.",
   "Blend for a full minute, scraping down the sides, then, with the motor running, stream in cold water a tablespoon at a time until the hummus turns pale, airy, and completely smooth — this takes longer than you'd think, a full 3–4 minutes of processing total.",
   "With the motor still running, stream in the olive oil until fully incorporated.",
   "Spread the hummus onto a plate using the back of a spoon, swirling in a circular motion to create a shallow well in the centre.",
   "Drizzle generously with more olive oil and finish with the toasted ground cumin.",
   "Serve with warm bread alongside for scooping."
  ]
 },
 {
  "id": "chicken-korma",
  "title": "Chicken Korma",
  "description": "A mellow, nutty braise — chicken simmered gently in a cashew-and-yogurt gravy with warm whole spices, built for comfort rather than heat.",
  "cuisine": "Indian",
  "dietTags": [],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 55,
  "prepMinutes": 20,
  "cookMinutes": 35,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1586049253654-4758dbe87d8d?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless, skinless chicken thighs, cut into 1 1/2-inch pieces",
    "amount": "1 1/2 lb (700 g)"
   },
   {
    "pantryId": "cashews",
    "label": "Raw cashews, soaked 20 minutes in hot water",
    "amount": "1/2 cup (70 g)"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt, whisked smooth",
    "amount": "1/2 cup (120 g)"
   },
   {
    "pantryId": "ghee",
    "label": "Ghee",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1 (1-inch piece)"
   },
   {
    "pantryId": "cardamom",
    "label": "Green cardamom pods",
    "amount": "4"
   },
   {
    "pantryId": "cloves",
    "label": "Whole cloves",
    "amount": "4"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaf",
    "amount": "1"
   },
   {
    "pantryId": "red-onion",
    "label": "Onion, thinly sliced",
    "amount": "2 medium"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit",
    "amount": "2",
    "optional": true
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Red chili powder (or Kashmiri, for mild heat)",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "garam-masala",
    "label": "Garam masala",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "heavy-cream",
    "label": "Heavy cream, to finish",
    "amount": "2 tablespoons",
    "optional": true
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [
   "Blender"
  ],
  "steps": [
   "Blend the soaked cashews with the yogurt and 1/4 cup water to a smooth, pourable paste. Set aside.",
   "Melt the ghee in a heavy pot over medium heat. Add the cinnamon, cardamom, cloves, and bay leaf, and let them sizzle for 30 seconds until fragrant.",
   "Add the sliced onions and a pinch of salt; cook for 10–12 minutes, stirring often, until deep golden brown — this is where most of the flavour comes from, so don't rush it.",
   "Stir in the ginger, garlic, and green chilies if using; cook 1 minute until fragrant.",
   "Add the coriander, cumin, and red chili powder; cook for 30 seconds, stirring constantly so the spices don't scorch.",
   "Add the chicken and cook for 4–5 minutes, turning to coat and lightly sear each piece.",
   "Lower the heat and stir in the cashew-yogurt paste a spoonful at a time, stirring constantly so it doesn't split. Once fully incorporated, add 1/2 cup water.",
   "Cover and simmer on low for 18–20 minutes, stirring occasionally, until the chicken is cooked through and the gravy has thickened to coat a spoon.",
   "Stir in the garam masala and cream if using. Simmer 2 more minutes, taste for salt, and finish with cilantro."
  ]
 },
 {
  "id": "chicken-do-pyaza",
  "title": "Chicken Do Pyaza",
  "description": "\"Double onion\" chicken — onions cooked two ways, melted into the base and added again in big petals near the end for sweetness and bite.",
  "cuisine": "Indian",
  "dietTags": [
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Spicy"
  ],
  "timeMinutes": 50,
  "prepMinutes": 15,
  "cookMinutes": 35,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1764304733301-3a9f335f0c67?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "chicken",
    "label": "Bone-in chicken pieces, skin removed",
    "amount": "2 lb (1 kg)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "cumin-seeds",
    "label": "Cumin seeds",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaf",
    "amount": "1"
   },
   {
    "pantryId": "red-onion",
    "label": "Onions, finely chopped, divided",
    "amount": "3 large"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "tomato",
    "label": "Tomatoes, chopped",
    "amount": "2 medium"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Red chili powder",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit",
    "amount": "2",
    "optional": true
   },
   {
    "pantryId": "garam-masala",
    "label": "Garam masala",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Set aside about a third of the chopped onions, cut into big petals rather than finely chopped, for adding later. Finely chop the rest.",
   "Heat the oil in a heavy pot over medium heat. Add the cumin seeds and bay leaf; let them sizzle for 30 seconds.",
   "Add the finely chopped onions (not the petals) and cook for 12–15 minutes, stirring often, until deep golden brown.",
   "Stir in the ginger and garlic; cook 1 minute, then add the tomatoes, turmeric, red chili powder, and ground coriander. Cook for 6–8 minutes, mashing occasionally, until the masala is thick and the oil separates at the edges.",
   "Add the chicken and green chilies if using, and toss to coat well. Cook for 5 minutes, turning occasionally.",
   "Add 1 cup water, bring to a boil, then cover and simmer on low for 15 minutes.",
   "Stir in the reserved onion petals, cover again, and simmer 10–12 more minutes until the chicken is cooked through and the onion petals are tender but still holding their shape, with a little bite left.",
   "Stir in the garam masala, simmer uncovered 2 minutes, and finish with cilantro."
  ]
 },
 {
  "id": "kerala-mutton-curry",
  "title": "Kerala Mutton Curry",
  "description": "A dark, coconut-oil-fragrant mutton curry from Kerala — black pepper and roasted coconut give it a completely different character from North Indian curries.",
  "cuisine": "Indian",
  "dietTags": [
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Smoky",
   "Comforting"
  ],
  "timeMinutes": 85,
  "prepMinutes": 20,
  "cookMinutes": 65,
  "difficulty": "Advanced",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1606843046080-45bf7a23c39f?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "mutton",
    "label": "Bone-in mutton curry cut",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "coconut",
    "label": "Grated coconut",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Coriander seeds",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black peppercorns, divided",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fennel-seeds",
    "label": "Fennel seeds",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Coconut oil, if you have it, or neutral oil",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "mustard-seeds",
    "label": "Mustard seeds",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "curry-leaves",
    "label": "Fresh curry leaves, divided",
    "amount": "20",
    "optional": true
   },
   {
    "pantryId": "red-onion",
    "label": "Shallots or red onion, thinly sliced",
    "amount": "2 medium"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, julienned or minced",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit",
    "amount": "2",
    "optional": true
   },
   {
    "pantryId": "tomato",
    "label": "Tomato, chopped",
    "amount": "1 medium"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Red chili powder",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "tamarind",
    "label": "Tamarind paste",
    "amount": "1 teaspoon",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the mutton with the turmeric and a pinch of salt. Set aside.",
   "In a dry pan over medium heat, roast the grated coconut, coriander seeds, half the peppercorns, and fennel seeds together for 4–5 minutes, stirring constantly, until the coconut turns a deep golden brown and the spices smell toasted. Let cool, then grind to a coarse paste with a splash of water.",
   "Heat the oil in a heavy pot over medium heat. Add the mustard seeds and let them pop, then add half the curry leaves if using.",
   "Add the sliced shallots and cook for 10 minutes, stirring often, until deep golden brown.",
   "Stir in the ginger, garlic, and green chilies if using; cook 1 minute until fragrant.",
   "Add the tomato and cook for 4–5 minutes, mashing, until softened.",
   "Stir in the red chili powder and the roasted coconut paste; cook for 2 minutes until fragrant.",
   "Add the mutton and toss well to coat in the masala. Cook for 5 minutes, turning to seal.",
   "Add 2 cups water, bring to a boil, then cover and simmer on low for 55–65 minutes, stirring occasionally and topping up water if it runs low, until the mutton is completely tender.",
   "Uncover and simmer for a final 5–10 minutes to thicken the gravy. Stir in the tamarind if using and the remaining curry leaves and crushed peppercorns. Taste and adjust salt before serving."
  ]
 },
 {
  "id": "kashmiri-mutton-yakhni",
  "title": "Kashmiri Mutton Yakhni",
  "description": "A pale, yogurt-based Kashmiri curry built on whole spices rather than chili powder — gentle, fragrant, and completely different from a typical red curry.",
  "cuisine": "Indian",
  "dietTags": [],
  "tasteTags": [
   "Comforting",
   "Herby"
  ],
  "timeMinutes": 85,
  "prepMinutes": 15,
  "cookMinutes": 70,
  "difficulty": "Advanced",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1755090154797-2f1cbcc0c2a8?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "mutton",
    "label": "Bone-in mutton curry cut",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "ghee",
    "label": "Ghee",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1 (2-inch piece)"
   },
   {
    "pantryId": "cardamom",
    "label": "Green cardamom pods",
    "amount": "4"
   },
   {
    "pantryId": "black-cardamom",
    "label": "Black cardamom pods",
    "amount": "2"
   },
   {
    "pantryId": "cloves",
    "label": "Whole cloves",
    "amount": "6"
   },
   {
    "pantryId": "fennel-seeds",
    "label": "Fennel seeds, ground",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, ground or grated, divided",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt, whisked smooth",
    "amount": "1 1/2 cups (360 g)"
   },
   {
    "pantryId": "nutmeg",
    "label": "Grated nutmeg",
    "amount": "1/4 teaspoon",
    "optional": true
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh mint or cilantro, chopped, to finish",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Melt the ghee in a heavy pot over medium heat. Add the bay leaves, cinnamon, cardamom pods, black cardamom, and cloves; let them sizzle for 30 seconds until fragrant.",
   "Add the mutton and half the ginger; cook for 5–6 minutes, turning, until the meat is sealed on all sides (yakhni doesn't brown the meat deeply — it should stay pale).",
   "Add 3 cups water and bring to a boil, skimming off any foam that rises. Cover and simmer on low for 45 minutes.",
   "Stir in the ground fennel and remaining ginger. Continue simmering, covered, for another 15–20 minutes until the mutton is completely tender.",
   "Remove the pot from the heat briefly and stir in the whisked yogurt a spoonful at a time — adding it off the heat and slowly helps stop it from splitting.",
   "Return to low heat and simmer gently, uncovered, for 8–10 minutes, stirring often, until the gravy thickens slightly and turns a pale, creamy colour. Don't let it boil hard once the yogurt is in.",
   "Stir in the nutmeg if using, taste and adjust salt, and finish with mint or cilantro. Yakhni is meant to be mild and fragrant rather than fiery, so season gently."
  ]
 },
 {
  "id": "amritsari-fish",
  "title": "Amritsari Fish (Amritsari Machli)",
  "description": "Punjabi street-food fried fish — chunks of white fish marinated in ginger, garlic, and carom-scented spice, coated in a crisp besan batter, and deep-fried to order.",
  "cuisine": "Indian",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy",
   "Smoky"
  ],
  "timeMinutes": 45,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "marinateMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1765360024320-b2ab819c6f75?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "fish",
    "label": "Firm white fish fillets (basa or cod), cut into 2-inch chunks",
    "amount": "1 1/2 lb (700 g)"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced, divided",
    "amount": "1"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, grated",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Kashmiri red chili powder",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "chaat-masala",
    "label": "Chaat masala, divided",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "gram-flour",
    "label": "Gram flour (besan)",
    "amount": "3/4 cup (90 g)"
   },
   {
    "pantryId": "rice-flour",
    "label": "Rice flour, for extra crunch",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for deep-frying",
    "amount": "3 cups (700 ml)"
   }
  ],
  "equipment": [],
  "steps": [
   "Pat the fish chunks dry and toss with half the lemon juice and a pinch of salt. Let sit for 10 minutes, then pat dry again.",
   "Combine the ginger, garlic, red chili powder, turmeric, ground coriander, 1 teaspoon of the chaat masala, and 1 teaspoon salt with the fish. Massage it in, cover, and marinate in the fridge for 30 minutes.",
   "Whisk the gram flour and rice flour with 3–4 tablespoons water into a thick, coating batter — it should cling heavily to the back of a spoon, not drip off. Fold the marinated fish into the batter until every piece is coated.",
   "Heat the oil in a heavy pot or kadai to 350°F (175°C). Test with a small drop of batter — it should sizzle and rise within a few seconds.",
   "Fry the fish in batches of 4–5 pieces, without crowding the pot, for 3–4 minutes, turning once, until deep golden and crisp. Drain on a wire rack or paper towels.",
   "Let the oil come back up to temperature between batches. Once all the fish is fried, sprinkle with the remaining chaat masala and the rest of the lemon juice, and serve immediately while hot and crisp."
  ]
 },
 {
  "id": "bengali-prawn-malai-curry",
  "title": "Bengali Prawn Malai Curry (Chingri Malai Curry)",
  "description": "A festive, mildly sweet Bengali coconut prawn curry — 'malai' here means coconut milk, not cream, and the whole dish stays gentle enough to let large, buttery prawns lead.",
  "cuisine": "Indian",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 35,
  "prepMinutes": 15,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$$",
  "image": "https://images.unsplash.com/photo-1574656133595-ac4f2d946017?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "prawns",
    "label": "Large prawns, peeled and deveined, tails on",
    "amount": "1 1/2 lb (700 g)"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric, divided",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, divided (mustard oil is traditional)",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaf",
    "amount": "1"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1 (2-inch piece)"
   },
   {
    "pantryId": "cardamom",
    "label": "Green cardamom pods, lightly crushed",
    "amount": "3"
   },
   {
    "pantryId": "cloves",
    "label": "Whole cloves",
    "amount": "3"
   },
   {
    "pantryId": "red-onion",
    "label": "Onion, finely grated or blended to a paste",
    "amount": "1 large"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit, divided",
    "amount": "4"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Coconut milk",
    "amount": "1 (14-oz / 400 ml) can"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the prawns with 1/2 teaspoon of the turmeric and a pinch of salt. Heat 2 tablespoons of the oil in a wide pan over medium-high heat and sear the prawns for 1–2 minutes per side, just until pink and starting to curl. Remove and set aside — they'll finish cooking in the sauce.",
   "In the same pan, heat the remaining oil over medium heat. Add the bay leaf, cinnamon stick, cardamom pods, and cloves, and let them sizzle for 30 seconds until fragrant.",
   "Add the grated onion and cook for 6–7 minutes, stirring often, until it turns soft, pale golden, and the raw smell is completely gone.",
   "Add the ginger, remaining turmeric, and half the green chilies. Cook for 1–2 minutes.",
   "Pour in the coconut milk and 1/3 cup water. Add the sugar and season with salt. Bring to a gentle simmer — don't let it boil hard, or the coconut milk can split.",
   "Simmer for 6–8 minutes, stirring occasionally, until the sauce thickens slightly and turns a pale golden color. Slide the seared prawns back in along with the remaining green chilies.",
   "Simmer for 3–4 minutes more, just until the prawns are fully cooked through and the sauce clings lightly to them. Serve over steamed rice."
  ]
 },
 {
  "id": "andhra-prawn-curry",
  "title": "Andhra Prawn Curry (Royyala Iguru)",
  "description": "A thick, punishingly spicy Andhra-style prawn curry cooked almost dry — 'iguru' means a masala reduced down until it coats rather than pools, and Andhra cooking rarely holds back on chili.",
  "cuisine": "Indian",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy"
  ],
  "timeMinutes": 35,
  "prepMinutes": 15,
  "cookMinutes": 20,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1781332143666-5d02f0fe7865?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "prawns",
    "label": "Medium prawns, peeled and deveined",
    "amount": "1 1/2 lb (700 g)"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric, divided",
    "amount": "3/4 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "mustard-seeds",
    "label": "Mustard seeds",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "cumin-seeds",
    "label": "Cumin seeds",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "curry-leaves",
    "label": "Fresh curry leaves",
    "amount": "2 sprigs"
   },
   {
    "pantryId": "dried-red-chili",
    "label": "Dried red chilies, broken",
    "amount": "4"
   },
   {
    "pantryId": "red-onion",
    "label": "Onion, finely chopped",
    "amount": "1 large"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit",
    "amount": "3"
   },
   {
    "pantryId": "tomato",
    "label": "Tomato, finely chopped",
    "amount": "1 medium"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Kashmiri red chili powder",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped, to finish",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the prawns with 1/4 teaspoon of the turmeric and a pinch of salt; set aside.",
   "Heat the oil in a wide, heavy pan over medium heat. Add the mustard seeds and cumin seeds and let them sizzle for 10 seconds, then add the curry leaves and dried red chilies and fry for 15 seconds.",
   "Add the chopped onion and cook for 6–7 minutes, stirring often, until deeply golden.",
   "Add the ginger, garlic, and green chilies and cook for 1–2 minutes until fragrant.",
   "Add the tomato and cook for 4–5 minutes, mashing it down, until it breaks apart completely. Stir in the ground coriander, red chili powder, and remaining turmeric, and cook for 2 minutes until the oil starts to separate.",
   "Add the prawns and 1/4 cup water. Cook uncovered over medium-high heat for 6–8 minutes, stirring frequently, until the prawns are cooked through, the water has evaporated, and the masala clings to them as a thick, dry-ish coating rather than a loose gravy.",
   "Taste and adjust salt and heat — iguru is meant to be assertively spicy. Scatter with cilantro and serve hot as a side with rice or dal."
  ]
 },
 {
  "id": "undhiyu",
  "title": "Undhiyu",
  "description": "A festive Gujarati mixed-vegetable curry, traditionally cooked upside-down in an earthen pot buried in the ground — this stovetop version keeps the signature fenugreek-besan dumplings and layered winter vegetables.",
  "cuisine": "Indian",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy",
   "Comforting"
  ],
  "timeMinutes": 60,
  "prepMinutes": 30,
  "cookMinutes": 30,
  "difficulty": "Advanced",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1645432524571-0e469b22e43f?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "gram-flour",
    "label": "Gram flour (besan), for the muthiya dumplings",
    "amount": "1 cup (120 g)"
   },
   {
    "pantryId": "fenugreek-leaves",
    "label": "Fresh fenugreek leaves, chopped",
    "amount": "1 cup (30 g)"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric, divided",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Red chili powder, divided",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar, divided",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, divided",
    "amount": "6 tablespoons"
   },
   {
    "pantryId": "eggplant",
    "label": "Baby eggplants, quartered but left attached at the stem",
    "amount": "6 small"
   },
   {
    "pantryId": "potato",
    "label": "Baby potatoes, halved",
    "amount": "8 small"
   },
   {
    "pantryId": "green-beans",
    "label": "Green beans, cut into 2-inch pieces",
    "amount": "1 cup (100 g)"
   },
   {
    "pantryId": "cumin-seeds",
    "label": "Cumin seeds",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "asafoetida",
    "label": "Asafoetida (hing)",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "coconut",
    "label": "Fresh or shredded coconut",
    "amount": "1/3 cup (30 g)"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped, divided",
    "amount": "1/3 cup"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, minced",
    "amount": "2"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   }
  ],
  "equipment": [],
  "steps": [
   "Make the muthiya dough: combine the gram flour, chopped fenugreek leaves, 1/2 teaspoon turmeric, 1 teaspoon red chili powder, 1 teaspoon sugar, 2 tablespoons oil, and a pinch of salt in a bowl. Add water a tablespoon at a time and knead into a firm dough. Shape into small logs about 2 inches long.",
   "Heat 2 tablespoons of oil in a pan over medium heat and shallow-fry the muthiya logs for 6–8 minutes, turning occasionally, until golden brown and firm on the outside. Drain and set aside.",
   "Make the stuffing masala: combine the coconut, half the cilantro, green chilies, ginger, remaining turmeric, remaining red chili powder, ground coriander, remaining sugar, and lemon juice with a pinch of salt.",
   "Stuff a spoonful of this masala into the slits of the eggplants and potatoes, pressing it in firmly. Reserve any extra masala.",
   "Heat the remaining oil in a large, heavy pot over medium heat. Add the cumin seeds and asafoetida and let them sizzle for 15 seconds.",
   "Layer in the stuffed potatoes first (they take longest), then the stuffed eggplants, then the green beans, sprinkling any leftover stuffing masala over the top. Add 1/3 cup water, cover tightly, and cook over low heat for 20–25 minutes, shaking the pot occasionally instead of stirring (to keep the vegetables intact), until everything is tender.",
   "Gently fold in the fried muthiya during the last 5 minutes, just to warm them through and let them soak up some of the juices.",
   "Scatter with the remaining cilantro and serve hot — undhiyu is traditionally eaten with puri, but rice works well too."
  ]
 },
 {
  "id": "sambar",
  "title": "Sambar",
  "description": "A tangy, lightly sweet South Indian lentil-and-vegetable stew, built on toor dal and a from-scratch tamarind broth spiked with sambar powder — the daily backbone of a South Indian meal.",
  "cuisine": "Indian",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Tangy",
   "Comforting",
   "Spicy"
  ],
  "timeMinutes": 50,
  "prepMinutes": 15,
  "cookMinutes": 35,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1730191843435-073792ba22bc?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "toor-dal",
    "label": "Toor dal (split pigeon peas), rinsed",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric, divided",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "tamarind",
    "label": "Tamarind pulp, soaked in 3/4 cup hot water and strained",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, cut into 1-inch pieces",
    "amount": "1 large"
   },
   {
    "pantryId": "eggplant",
    "label": "Eggplant, cut into 1-inch chunks",
    "amount": "1 small"
   },
   {
    "pantryId": "green-beans",
    "label": "Green beans, cut into 1-inch pieces",
    "amount": "1 cup (100 g)"
   },
   {
    "pantryId": "potato",
    "label": "Potato, cut into 1-inch chunks",
    "amount": "1 medium"
   },
   {
    "pantryId": "red-onion",
    "label": "Pearl onions or shallots, halved (regular onion works too)",
    "amount": "1 cup (120 g)"
   },
   {
    "pantryId": "tomato",
    "label": "Tomato, chopped",
    "amount": "1 medium"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Red chili powder",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "mustard-seeds",
    "label": "Mustard seeds",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fenugreek-leaves",
    "label": "Fenugreek seeds, if you have them (a pinch — optional)",
    "amount": "1/4 teaspoon",
    "optional": true
   },
   {
    "pantryId": "dried-red-chili",
    "label": "Dried red chilies",
    "amount": "2"
   },
   {
    "pantryId": "curry-leaves",
    "label": "Fresh curry leaves",
    "amount": "2 sprigs"
   },
   {
    "pantryId": "asafoetida",
    "label": "Asafoetida (hing)",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped, to finish",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [
   "Moka Pot"
  ],
  "steps": [
   "Pressure cook the toor dal with 3 cups water and 1/2 teaspoon of the turmeric for 3–4 whistles (about 12–15 minutes), until completely soft and mushy. Whisk smooth once cooked (or use a hand blender directly in the pot).",
   "Meanwhile, combine the carrot, eggplant, green beans, potato, and onion in a pot with 2 cups water, the remaining turmeric, and a pinch of salt. Bring to a boil and simmer for 12–15 minutes until just tender.",
   "Add the tomato, coriander powder, red chili powder, and the strained tamarind water to the vegetables. Simmer for 8–10 minutes to let the raw tamarind smell cook off.",
   "Stir the cooked, mashed dal into the vegetable-tamarind mixture. Add water to reach a soupy, pourable consistency, season with salt, and simmer for 10 minutes, stirring occasionally, to let the flavors meld.",
   "For the tempering: heat the oil in a small pan over medium heat. Add the mustard seeds and let them pop, then add the fenugreek seeds (if using), dried red chilies, curry leaves, and asafoetida. Fry for 15–20 seconds until fragrant.",
   "Pour the tempering over the sambar and stir it in. Simmer 2 more minutes, scatter with cilantro, and serve hot with rice."
  ]
 },
 {
  "id": "vegetable-biryani",
  "title": "Vegetable Biryani",
  "description": "A layered, dum-steamed biryani built from a vibrant mixed-vegetable masala and part-cooked basmati rice — proof that biryani's magic is in the technique, not just the protein.",
  "cuisine": "Indian",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 60,
  "prepMinutes": 25,
  "cookMinutes": 35,
  "difficulty": "Advanced",
  "servings": 4,
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1755090154731-6b4f221490c3?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "basmati-rice",
    "label": "Basmati rice, rinsed and soaked 30 minutes",
    "amount": "2 cups (400 g)"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1 (2-inch piece)"
   },
   {
    "pantryId": "cardamom",
    "label": "Green cardamom pods",
    "amount": "4"
   },
   {
    "pantryId": "cloves",
    "label": "Whole cloves",
    "amount": "4"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, divided",
    "amount": "5 tablespoons"
   },
   {
    "pantryId": "red-onion",
    "label": "Onions, thinly sliced, divided",
    "amount": "2 large"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit",
    "amount": "3"
   },
   {
    "pantryId": "tomato",
    "label": "Tomatoes, chopped",
    "amount": "2 medium"
   },
   {
    "pantryId": "red-chili-powder",
    "label": "Kashmiri red chili powder",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "green-beans",
    "label": "Green beans, cut into 1-inch pieces",
    "amount": "1/2 cup (50 g)"
   },
   {
    "pantryId": "cauliflower",
    "label": "Cauliflower florets",
    "amount": "1 cup (100 g)"
   },
   {
    "pantryId": "potato",
    "label": "Potato, diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "frozen-peas",
    "label": "Frozen peas",
    "amount": "1/2 cup (70 g)"
   },
   {
    "pantryId": "mint",
    "label": "Fresh mint leaves, torn",
    "amount": "1/4 cup"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "1/4 cup"
   },
   {
    "pantryId": "garam-masala",
    "label": "Garam masala",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Bring a large pot of well-salted water to a boil with the bay leaves, cinnamon stick, cardamom, and cloves. Drain the soaked rice, add it to the pot, and cook for 5–6 minutes until about 70% cooked — still firm at the core. Drain and set aside.",
   "Heat 3 tablespoons of the oil in a wide, heavy pot over medium heat. Add half the sliced onions and cook for 8–10 minutes, stirring often, until deeply golden and crisp. Remove half to a plate for layering later.",
   "To the onions remaining in the pot, add the ginger, garlic, and green chilies and cook for 1–2 minutes. Add the tomatoes and red chili powder and cook for 5–6 minutes until the tomatoes break down.",
   "Add the carrot, green beans, cauliflower, and potato along with 1/2 cup water. Cover and simmer for 10–12 minutes until the vegetables are just tender. Stir in the peas, half the mint, half the cilantro, and the garam masala. Season with salt — this masala should taste slightly stronger than you want the final dish, since it seasons the rice too.",
   "Spread the vegetable masala evenly across the bottom of the pot. Layer the partially cooked rice on top. Scatter with the remaining fried onions, mint, and cilantro, and drizzle with the remaining oil.",
   "Cover tightly with a lid (seal the edges with a strip of dough or foil if the lid isn't snug) and cook on the lowest possible heat for 20–25 minutes to steam through on the dum.",
   "Rest, covered, for 5 minutes off the heat, then fluff gently with a fork, folding the rice and vegetable layers together from the bottom up before serving."
  ]
 },
 {
  "id": "kerala-vegetable-stew",
  "title": "Kerala Vegetable Stew",
  "description": "A pale, gently spiced coconut milk stew of potatoes and mixed vegetables, built the same way as fish moilee but entirely plant-based — the classic breakfast partner to appam.",
  "cuisine": "Indian",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 35,
  "prepMinutes": 15,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1651457157079-756346f088ef?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil (coconut oil is traditional, if you have it)",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1 (2-inch piece)"
   },
   {
    "pantryId": "cardamom",
    "label": "Green cardamom pods, lightly crushed",
    "amount": "3"
   },
   {
    "pantryId": "cloves",
    "label": "Whole cloves",
    "amount": "3"
   },
   {
    "pantryId": "red-onion",
    "label": "Onion, thinly sliced",
    "amount": "1 large"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, julienned",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, slit",
    "amount": "3"
   },
   {
    "pantryId": "curry-leaves",
    "label": "Fresh curry leaves",
    "amount": "2 sprigs"
   },
   {
    "pantryId": "potato",
    "label": "Potatoes, cut into 1-inch cubes",
    "amount": "2 medium"
   },
   {
    "pantryId": "carrot",
    "label": "Carrots, cut into 1-inch pieces",
    "amount": "2 medium"
   },
   {
    "pantryId": "green-beans",
    "label": "Green beans, cut into 1-inch pieces",
    "amount": "1 cup (100 g)"
   },
   {
    "pantryId": "frozen-peas",
    "label": "Frozen peas",
    "amount": "1/2 cup (70 g)"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Coconut milk, divided",
    "amount": "1 (14-oz / 400 ml) can"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat the oil in a wide, heavy pot over medium heat. Add the cinnamon stick, cardamom, and cloves, and let them sizzle for 30 seconds until fragrant.",
   "Add the sliced onion and cook for 6–7 minutes, stirring occasionally, until soft and translucent but not browned — stew stays pale, not caramelized.",
   "Add the ginger, green chilies, and curry leaves, and cook for 2 minutes.",
   "Add the potatoes, carrots, and green beans along with half the coconut milk and 1/2 cup water. Season with salt, bring to a gentle simmer, cover, and cook for 15–18 minutes, until the vegetables are tender.",
   "Add the peas and simmer, uncovered, for 3 minutes more.",
   "Stir in the remaining coconut milk and warm through gently for 2 minutes without letting it boil hard, to keep the stew silky. Serve warm with appam, string hoppers, or rice."
  ]
 },
 {
  "id": "southern-fried-chicken",
  "title": "Southern Fried Chicken",
  "description": "Buttermilk-brined and double-dredged for a shatter-crisp crust — the technique Southern and soul-food cooks perfected over generations.",
  "cuisine": "American",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 45,
  "prepMinutes": 15,
  "cookMinutes": 30,
  "marinateMinutes": 240,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1586793783658-261cddf883ef?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "chicken",
    "label": "Bone-in, skin-on chicken pieces (thighs, drumsticks, breasts)",
    "amount": "3 1/2 lb (1.6 kg)"
   },
   {
    "pantryId": "buttermilk",
    "label": "Buttermilk",
    "amount": "2 cups (480 ml)"
   },
   {
    "pantryId": "hot-sauce",
    "label": "Hot sauce",
    "amount": "1 tablespoon",
    "optional": true
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "2 cups (250 g)"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "cayenne-pepper",
    "label": "Cayenne pepper",
    "amount": "1 teaspoon",
    "optional": true
   },
   {
    "pantryId": "fine-salt",
    "label": "Fine salt, divided",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper, divided",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for deep-frying",
    "amount": "6 cups (1.4 L)"
   }
  ],
  "equipment": [],
  "steps": [
   "Season the chicken pieces all over with 1 teaspoon salt and 1 teaspoon black pepper, then submerge in the buttermilk (whisked with the hot sauce, if using) in a large bowl or zip-top bag. Cover and refrigerate at least 4 hours, ideally overnight — this tenderizes the meat and seasons it through.",
   "When ready to fry, whisk the flour with the paprika, cayenne, and the remaining salt and pepper in a shallow dish.",
   "Lift each piece of chicken from the buttermilk, letting the excess drip off, and dredge thoroughly in the seasoned flour, pressing the coating on. Set on a wire rack for 10 minutes so the crust sets slightly.",
   "Pour the oil into a deep, heavy pot (cast iron is traditional) to a depth of about 2 inches and heat to 325°F (163°C) on a deep-fry thermometer.",
   "Fry the chicken in batches, skin-side down first, without crowding the pot — this keeps the oil temperature from dropping. Fry 12–15 minutes per batch, turning occasionally, until deep golden brown and the internal temperature reaches 165°F (74°C) at the thickest point.",
   "Lift out with tongs or a spider strainer onto a fresh wire rack (not paper towels, which steam the crust soft) and let rest 5 minutes before serving."
  ],
  "notes": "Fried chicken as a Southern dish has roots in West African cooking traditions carried and adapted by enslaved and, later, free Black cooks in the American South, who combined seasoned frying techniques with ingredients available on Southern plantations and farms. It became a signature of Southern and soul-food cooking by the 19th century.",
  "sourceName": "Southern Foodways Alliance",
  "sourceUrl": "https://www.southernfoodways.org/"
 },
 {
  "id": "texas-brisket",
  "title": "Texas-Style Smoked Brisket",
  "description": "Salt, pepper, smoke, and patience — Central Texas barbecue's defining cut, low-and-slow for half a day.",
  "cuisine": "American",
  "dietTags": [
   "Non-Vegetarian",
   "Gluten-Free",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Rich & Indulgent"
  ],
  "timeMinutes": 780,
  "prepMinutes": 30,
  "cookMinutes": 750,
  "difficulty": "Advanced",
  "servings": 10,
  "budget": "$$$",
  "image": "https://images.unsplash.com/photo-1697384874178-3f2afa6bed7b?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "beef-brisket",
    "label": "Whole beef brisket, trimmed to a 1/4-inch fat cap",
    "amount": "12–14 lb (5.4–6.4 kg)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Coarse salt",
    "amount": "1/3 cup (55 g)"
   },
   {
    "pantryId": "black-pepper",
    "label": "Coarsely ground black pepper",
    "amount": "1/3 cup (30 g)"
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "The night before or at least 1 hour ahead, coat the brisket evenly on all sides with the salt and pepper, pressing it into the meat.",
   "Set up a smoker for indirect heat at a steady 250°F (121°C) using a mild wood like post oak or hickory.",
   "Place the brisket fat-side up and smoke undisturbed, maintaining the temperature, until the internal temperature reaches about 165°F (74°C) and a dark bark has formed, roughly 6–7 hours.",
   "Wrap the brisket tightly in butcher paper or heavy-duty foil (the 'Texas crutch') to push through the temperature plateau without drying out the surface.",
   "Return to the smoker and continue cooking until the internal temperature reaches 203°F (95°C) and a probe slides in with almost no resistance, another 4–5 hours.",
   "Rest the wrapped brisket in a cooler (no ice) for at least 1 hour, ideally 2, before unwrapping — this redistributes the juices and is not optional for a good result.",
   "Slice against the grain into pencil-thick slices, cutting the flat and point separately since their grain runs different directions. Serve as-is, Central Texas style — no sauce needed."
  ],
  "notes": "Central Texas brisket barbecue traces to German and Czech immigrant meat markets in the Texas Hill Country in the late 1800s, which smoked unsold cuts of meat; brisket, seasoned simply with salt and pepper and smoked low and slow, became the region's signature.",
  "sourceName": "Texas Monthly BBQ Archive",
  "sourceUrl": "https://www.texasmonthly.com/bbq/"
 },
 {
  "id": "memphis-dry-rub-ribs",
  "title": "Memphis Dry-Rub Ribs",
  "description": "Pork ribs coated in a paprika-forward spice rub and smoked without sauce — Memphis's contribution to American barbecue.",
  "cuisine": "American",
  "dietTags": [
   "Gluten-Free",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Spicy"
  ],
  "timeMinutes": 330,
  "prepMinutes": 20,
  "cookMinutes": 300,
  "marinateMinutes": 60,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/34495394/pexels-photo-34495394.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "pork-ribs",
    "label": "St. Louis-style or baby back pork ribs",
    "amount": "2 racks (about 5–6 lb / 2.3–2.7 kg)"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "brown-sugar",
    "label": "Brown sugar",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Coarse salt",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic powder (or finely minced fresh garlic)",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cayenne-pepper",
    "label": "Cayenne pepper",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "dry-mustard",
    "label": "Dry mustard powder",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "hot-sauce",
    "label": "Hot sauce, to serve",
    "amount": "to taste",
    "optional": true
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "Remove the thin membrane from the back of each rack of ribs, peeling it off with a paper towel for grip.",
   "Mix the paprika, brown sugar, salt, pepper, garlic powder, cayenne, and dry mustard in a bowl to make the rub.",
   "Coat the ribs generously all over with the rub, pressing it in. Let sit at least 1 hour, or refrigerate overnight for deeper flavor.",
   "Set up a smoker for indirect heat at a steady 225–250°F (107–121°C) using hickory.",
   "Smoke the ribs, meat-side up, for 5–6 hours, until the meat has pulled back from the bone ends by about 1/2 inch and is tender enough to tear easily, without falling off the bone.",
   "Rest 10 minutes, then slice between the bones and serve dry, with extra rub or hot sauce on the side rather than a wet barbecue sauce."
  ],
  "notes": "Memphis is known for two barbecue styles — wet (sauced) and dry (rubbed) — with dry-rub ribs as the city's signature, letting the smoke and spice rub carry the flavor rather than a sauce.",
  "sourceName": "Southern Foodways Alliance",
  "sourceUrl": "https://www.southernfoodways.org/"
 },
 {
  "id": "chicken-fried-steak",
  "title": "Chicken Fried Steak",
  "description": "Tenderized beef, breaded and pan-fried like fried chicken, smothered in black pepper cream gravy — a Texan and Southern diner classic.",
  "cuisine": "American",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 40,
  "prepMinutes": 15,
  "cookMinutes": 25,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/19264408/pexels-photo-19264408.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "cube-steak",
    "label": "Cube steak (tenderized beef round steak)",
    "amount": "4 (about 6 oz / 170 g each)"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour, divided",
    "amount": "2 cups (250 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs",
    "amount": "2"
   },
   {
    "pantryId": "buttermilk",
    "label": "Buttermilk, divided",
    "amount": "1 1/2 cups (360 ml)"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cayenne-pepper",
    "label": "Cayenne pepper",
    "amount": "1/4 teaspoon",
    "optional": true
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, divided",
    "amount": "to taste"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for pan-frying",
    "amount": "1 cup (240 ml)"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper, coarsely ground, for the gravy",
    "amount": "1 tablespoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Pat the cube steaks dry and season both sides with salt and pepper.",
   "Set up a dredging station: seasoned flour (with paprika, cayenne if using, salt) in one dish, whisked eggs and 1/2 cup buttermilk in another.",
   "Dredge each steak in flour, then the egg mixture, then back in the flour, pressing to build a thick, craggy crust.",
   "Heat the oil in a large skillet over medium-high heat until shimmering. Fry the steaks 3–4 minutes per side until deep golden and cooked through. Drain on a wire rack, reserving 3 tablespoons of the oil in the pan.",
   "For the gravy, whisk 3 tablespoons of the flour into the reserved oil and cook 1–2 minutes. Gradually whisk in the remaining buttermilk, then simmer, whisking, until thickened, 4–5 minutes.",
   "Season the gravy generously with the coarse black pepper and salt. Serve the steaks smothered in gravy."
  ],
  "notes": "Chicken fried steak developed in Texas and the South, likely from German and Austrian immigrant communities' schnitzel technique applied to inexpensive beef cuts and prepared in the style of Southern fried chicken.",
  "sourceName": "Texas State Historical Association",
  "sourceUrl": "https://www.tshaonline.org/"
 },
 {
  "id": "smores",
  "title": "S'mores",
  "description": "A toasted marshmallow and a square of chocolate, pressed between two graham crackers — the American campfire treat, first published in 1927.",
  "cuisine": "American",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Sweet"
  ],
  "timeMinutes": 10,
  "prepMinutes": 5,
  "cookMinutes": 5,
  "difficulty": "Easy",
  "servings": 4,
  "yield": "4 s'mores",
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1633997455043-434ee7ca3e1a?auto=format&fit=crop&w=1600&q=80",
  "imageAttribution": "Unsplash",
  "ingredients": [
   {
    "pantryId": "graham-crackers",
    "label": "Graham crackers",
    "amount": "8 sheets"
   },
   {
    "pantryId": "dark-chocolate",
    "label": "Chocolate bar, broken into squares",
    "amount": "4 oz (115 g)"
   },
   {
    "pantryId": "marshmallows",
    "label": "Large marshmallows",
    "amount": "4"
   }
  ],
  "equipment": [],
  "steps": [
   "Break each graham cracker sheet in half to make 8 squares total. Lay a piece of chocolate on 4 of the squares.",
   "Skewer a marshmallow on a stick or long fork and toast over an open flame or campfire coals, turning slowly, until golden brown and gooey inside, 1–2 minutes.",
   "Immediately press the hot marshmallow onto the chocolate-topped cracker — the heat will start melting the chocolate.",
   "Top with the second graham cracker square and press gently to sandwich everything together.",
   "Let sit 30 seconds so the chocolate finishes melting, then eat right away, while warm."
  ],
  "notes": "S'mores were first published as a recipe in the Girl Scouts' 1927 guidebook 'Tramping and Trailing with the Girl Scouts,' under the name 'Some Mores' — an American campfire tradition ever since.",
  "sourceName": "Girl Scouts of the USA",
  "sourceUrl": "https://www.girlscouts.org/"
 },
 {
  "id": "grilled-chicken-burger",
  "title": "Grilled Chicken Burger",
  "description": "A juicy, char-grilled chicken breast with lettuce, tomato, and mayo on a toasted bun — the lighter alternative to a beef burger.",
  "cuisine": "American",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Comforting"
  ],
  "timeMinutes": 30,
  "prepMinutes": 15,
  "cookMinutes": 15,
  "marinateMinutes": 30,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/17300434/pexels-photo-17300434.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Boneless, skinless chicken breasts, pounded to even thickness",
    "amount": "4 (about 6 oz / 170 g each)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "2 cloves"
   },
   {
    "pantryId": "smoked-paprika",
    "label": "Smoked paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "burger-buns",
    "label": "Burger buns, split",
    "amount": "4"
   },
   {
    "pantryId": "butter",
    "label": "Unsalted butter, for toasting the buns",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "lettuce",
    "label": "Lettuce leaves",
    "amount": "4"
   },
   {
    "pantryId": "tomato",
    "label": "Tomato, sliced",
    "amount": "1 large"
   },
   {
    "pantryId": "red-onion",
    "label": "Red onion, thinly sliced",
    "amount": "1/2 small",
    "optional": true
   },
   {
    "pantryId": "mayonnaise",
    "label": "Mayonnaise",
    "amount": "1/4 cup (60 g)"
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "Whisk the olive oil, lemon juice, garlic, smoked paprika, salt, and pepper in a bowl or bag. Add the chicken breasts, turning to coat, and marinate at room temperature 30 minutes (or refrigerated up to a few hours).",
   "Heat a grill or grill pan to medium-high heat.",
   "Grill the chicken 5–7 minutes per side, until well-marked and the internal temperature reaches 165°F (74°C). Let rest 5 minutes.",
   "Butter and toast the buns on the grill, cut-side down, 1 minute.",
   "Spread mayonnaise on the buns, then build each burger with lettuce, the grilled chicken, tomato, and red onion if using."
  ],
  "notes": "The grilled chicken burger became a fixture of American backyard cookouts and casual dining from the late 20th century onward, offering a grilled, lighter alternative to the beef burger without sacrificing the same bun-and-toppings format.",
  "sourceName": "America's Test Kitchen",
  "sourceUrl": "https://www.americastestkitchen.com/"
 },
 {
  "id": "marinara-pizza",
  "title": "Pizza Marinara",
  "description": "No cheese at all — just tomato, garlic, oregano, and olive oil on a thin crust. One of Naples' two original pizzas, older than the Margherita.",
  "cuisine": "Italian",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Herby"
  ],
  "timeMinutes": 20,
  "prepMinutes": 10,
  "cookMinutes": 10,
  "difficulty": "Easy",
  "servings": 2,
  "yield": "1 (12-inch) pizza",
  "budget": "$",
  "image": "https://images.pexels.com/photos/34775818/pexels-photo-34775818.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "pizza-dough",
    "label": "Pizza dough",
    "amount": "1 ball (about 1 lb / 450 g)"
   },
   {
    "pantryId": "crushed-tomatoes",
    "label": "Crushed tomatoes (San Marzano if available)",
    "amount": "2/3 cup (150 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, very thinly sliced",
    "amount": "3 cloves"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "dried-oregano",
    "label": "Dried oregano",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "flour",
    "label": "Flour, for dusting",
    "amount": "As needed"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven as high as it will go with a baking sheet or pizza stone inside for at least 20 minutes.",
   "Stretch the dough into a 12-inch round on a floured surface.",
   "Spread the crushed tomatoes over the dough as the base, leaving a border.",
   "Scatter the garlic slices and oregano evenly over the tomato, then season with salt and drizzle with the olive oil.",
   "Bake 8–10 minutes until the crust is golden and the edges of the garlic have started to crisp.",
   "Slice and serve immediately."
  ],
  "notes": "Pizza marinara, despite the name, contains no seafood — it's named for the sailors' wives ('marinara') of Naples who made it, using ingredients that kept well without refrigeration. It predates the Margherita and is, alongside it, one of the two defining Neapolitan pizzas.",
  "sourceName": "Associazione Verace Pizza Napoletana",
  "sourceUrl": "https://www.pizzanapoletana.org/"
 },
 {
  "id": "diavola-pizza",
  "title": "Pizza Diavola",
  "description": "Spicy salami, chili flakes, and mozzarella — Italy's answer to a fiery pepperoni pizza, 'diavola' meaning devil-style.",
  "cuisine": "Italian",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Spicy",
   "Rich & Indulgent"
  ],
  "timeMinutes": 25,
  "prepMinutes": 15,
  "cookMinutes": 10,
  "difficulty": "Easy",
  "servings": 3,
  "yield": "1 (12-inch) pizza",
  "budget": "$$",
  "image": "https://images.pexels.com/photos/14965994/pexels-photo-14965994.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "pizza-dough",
    "label": "Pizza dough",
    "amount": "1 ball (about 1 lb / 450 g)"
   },
   {
    "pantryId": "crushed-tomatoes",
    "label": "Crushed tomatoes",
    "amount": "1/2 cup (115 g)"
   },
   {
    "pantryId": "mozzarella",
    "label": "Fresh mozzarella, torn",
    "amount": "5 oz (140 g)"
   },
   {
    "pantryId": "salami",
    "label": "Spicy salami (Italian 'salame piccante'), thinly sliced",
    "amount": "3 oz (85 g)"
   },
   {
    "pantryId": "chili-flakes",
    "label": "Red pepper flakes",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "olive-oil",
    "label": "Chili-infused olive oil, for drizzling",
    "amount": "1 tablespoon",
    "optional": true
   },
   {
    "pantryId": "flour",
    "label": "Flour, for dusting",
    "amount": "As needed"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven as high as it will go with a baking sheet or pizza stone inside for at least 20 minutes.",
   "Stretch the dough into a 12-inch round on a floured surface and spread the crushed tomatoes over it, leaving a border.",
   "Scatter over the mozzarella, then arrange the spicy salami slices evenly across the top. Scatter with the chili flakes.",
   "Bake 8–10 minutes until the crust is golden and the salami edges have crisped slightly.",
   "Drizzle with chili oil if using, slice, and serve."
  ],
  "notes": "Pizza diavola is a classic Italian pizza, topped with spicy salami and chili — the name means 'devil-style,' referring to the heat. It's the closest Italian equivalent to the American pepperoni pizza, though the salami and technique differ.",
  "sourceName": "La Cucina Italiana",
  "sourceUrl": "https://www.lacucinaitaliana.com/"
 },
 {
  "id": "chicago-deep-dish-pizza",
  "title": "Chicago Deep-Dish Pizza",
  "description": "A thick, buttery crust built up the sides of a pan, cheese first, then chunky tomato sauce on top — eaten with a fork and knife.",
  "cuisine": "Italian",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 90,
  "prepMinutes": 30,
  "cookMinutes": 35,
  "marinateMinutes": 25,
  "difficulty": "Advanced",
  "servings": 6,
  "yield": "1 (9-inch) deep-dish pizza",
  "budget": "$$",
  "image": "https://images.pexels.com/photos/36364355/pexels-photo-36364355.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "2 1/2 cups (315 g)"
   },
   {
    "pantryId": "cornmeal",
    "label": "Cornmeal",
    "amount": "1/4 cup (35 g)"
   },
   {
    "pantryId": "yeast",
    "label": "Active dry yeast",
    "amount": "2 1/4 teaspoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, plus more for the pan",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "mozzarella",
    "label": "Low-moisture mozzarella, sliced",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "italian-sausage",
    "label": "Italian sausage, casing removed",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "crushed-tomatoes",
    "label": "Crushed tomatoes",
    "amount": "2 cups (450 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "2 cloves"
   },
   {
    "pantryId": "dried-oregano",
    "label": "Dried oregano",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "parmesan",
    "label": "Parmesan, grated",
    "amount": "1/4 cup (25 g)"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Whisk the yeast and sugar into 1 cup (240 ml) warm water and let sit 5 minutes until foamy.",
   "Combine the flour, cornmeal, and salt in a large bowl. Add the yeast mixture and the olive oil and mix until a shaggy dough forms, then knead 5–7 minutes until smooth. Cover and let rise in a warm spot 1 hour, until doubled.",
   "Cook the sausage in a skillet over medium heat, breaking it into crumbles, until browned, about 8 minutes. Set aside.",
   "Heat the oven to 425°F (220°C). Generously oil a 9-inch round, straight-sided cake pan or deep-dish pizza pan.",
   "Press the dough into the pan and up the sides, about 1 1/2 inches up the walls.",
   "Layer the mozzarella slices over the bottom of the crust first, then the cooked sausage.",
   "Simmer the crushed tomatoes with the garlic, oregano, and a pinch of salt for 10 minutes to thicken slightly, then spoon this chunky sauce over the top and finish with the parmesan.",
   "Bake 30–35 minutes until the crust is deeply golden and the sauce is bubbling. Let rest 10 minutes before slicing — it needs time to set."
  ],
  "notes": "Chicago deep-dish pizza was invented at Pizzeria Uno in Chicago in 1943; it inverts the usual order (cheese on the dough, sauce on top) so the cheese doesn't burn during the long bake needed for the thick crust.",
  "sourceName": "Choose Chicago",
  "sourceUrl": "https://www.choosechicago.com/"
 },
 {
  "id": "spaghetti-bolognese",
  "title": "Spaghetti Bolognese",
  "description": "A slow-simmered beef and pork ragù, built on soffritto and a splash of milk — the internationally popular (if not strictly traditional-Bologna) version.",
  "cuisine": "Italian",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 150,
  "prepMinutes": 20,
  "cookMinutes": 130,
  "difficulty": "Medium",
  "servings": 6,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/30406652/pexels-photo-30406652.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "spaghetti",
    "label": "Spaghetti",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, finely diced",
    "amount": "1"
   },
   {
    "pantryId": "celery",
    "label": "Celery, finely diced",
    "amount": "1 rib"
   },
   {
    "pantryId": "ground-beef",
    "label": "Ground beef",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "ground-pork",
    "label": "Ground pork",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "white-wine",
    "label": "Dry white wine",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "milk",
    "label": "Whole milk",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "crushed-tomatoes",
    "label": "Crushed tomatoes",
    "amount": "1 (28 oz) can"
   },
   {
    "pantryId": "beef-broth",
    "label": "Beef broth, as needed",
    "amount": "1–2 cups (240–480 ml)"
   },
   {
    "pantryId": "parmesan",
    "label": "Parmesan, grated, for serving",
    "amount": "1/2 cup (50 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat the olive oil in a large, heavy pot over medium heat. Add the onion, carrot, and celery and cook 8–10 minutes until softened.",
   "Add the ground beef and pork and cook, breaking it up, until browned, about 10 minutes.",
   "Pour in the white wine and simmer until mostly evaporated, 3–4 minutes.",
   "Stir in the milk and simmer until it's absorbed, about 5 minutes — this classic technique tenderizes the meat.",
   "Add the crushed tomatoes and a cup of the beef broth. Season with salt and pepper, bring to a bare simmer, then partially cover and cook on very low heat 2–2 1/2 hours, stirring occasionally and adding more broth if it gets too thick.",
   "Cook the spaghetti in salted boiling water until al dente.",
   "Toss the pasta with the ragù (or ladle the ragù over the pasta) and serve with grated parmesan."
  ],
  "notes": "Spaghetti bolognese as usually served outside Italy differs from Bologna's own ragù alla bolognese, which is traditionally paired with fresh tagliatelle, not dried spaghetti — this recipe keeps the beloved spaghetti pairing while noting the distinction honestly.",
  "sourceName": "La Cucina Italiana",
  "sourceUrl": "https://www.lacucinaitaliana.com/"
 },
 {
  "id": "lasagna-alla-bolognese",
  "title": "Lasagna alla Bolognese",
  "description": "Layers of pasta, slow-cooked meat ragù, and creamy béchamel, baked until bubbling — Emilia-Romagna's signature baked pasta.",
  "cuisine": "Italian",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 180,
  "prepMinutes": 40,
  "cookMinutes": 140,
  "difficulty": "Advanced",
  "servings": 8,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/31779545/pexels-photo-31779545.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "lasagna-noodles",
    "label": "Lasagna noodles",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, finely diced",
    "amount": "1"
   },
   {
    "pantryId": "celery",
    "label": "Celery, finely diced",
    "amount": "1 rib"
   },
   {
    "pantryId": "ground-beef",
    "label": "Ground beef",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "ground-pork",
    "label": "Ground pork",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "white-wine",
    "label": "Dry white wine",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "crushed-tomatoes",
    "label": "Crushed tomatoes",
    "amount": "1 (28 oz) can"
   },
   {
    "pantryId": "butter",
    "label": "Unsalted butter (for the béchamel)",
    "amount": "5 tablespoons (70 g)"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour (for the béchamel)",
    "amount": "5 tablespoons (40 g)"
   },
   {
    "pantryId": "milk",
    "label": "Whole milk (for the béchamel)",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "nutmeg",
    "label": "Freshly grated nutmeg",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "parmesan",
    "label": "Parmesan, grated",
    "amount": "1 1/2 cups (150 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the olive oil in a large pot over medium heat. Cook the onion, carrot, and celery 8–10 minutes until softened.",
   "Add the ground beef and pork and cook until browned, about 10 minutes. Pour in the wine and simmer until mostly evaporated.",
   "Add the crushed tomatoes, season with salt and pepper, and simmer uncovered on low heat 1 1/2–2 hours, stirring occasionally, until thick and deeply flavored.",
   "For the béchamel, melt the butter in a saucepan, whisk in the flour, and cook 2 minutes. Gradually whisk in the milk and simmer, whisking often, until thickened, about 8 minutes. Season with nutmeg, salt, and pepper.",
   "Cook the lasagna noodles according to the package (or use no-boil noodles), and heat the oven to 375°F (190°C).",
   "In a 9x13-inch baking dish, spread a thin layer of béchamel, then a layer of noodles, a layer of ragù, a layer of béchamel, and a scatter of parmesan. Repeat the layers, finishing with béchamel and a generous layer of parmesan on top.",
   "Bake 35–40 minutes until bubbling and golden on top. Rest 15 minutes before slicing — it needs time to set."
  ],
  "notes": "Lasagna alla bolognese is a signature dish of Emilia-Romagna, traditionally made with fresh egg pasta sheets, a slow-cooked meat ragù, and béchamel (not ricotta, which is a common substitution in Southern Italian and Italian-American versions).",
  "sourceName": "La Cucina Italiana",
  "sourceUrl": "https://www.lacucinaitaliana.com/"
 },
 {
  "id": "potato-gnocchi-pomodoro",
  "title": "Potato Gnocchi al Pomodoro",
  "description": "Pillowy potato dumplings in a bright, simple tomato sauce — comfort food built from just a handful of ingredients.",
  "cuisine": "Italian",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 30,
  "prepMinutes": 10,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/31911031/pexels-photo-31911031.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "imageAttribution": "Pexels",
  "ingredients": [
   {
    "pantryId": "potato-gnocchi",
    "label": "Potato gnocchi (store-bought or homemade)",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil, divided",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "3 cloves"
   },
   {
    "pantryId": "crushed-tomatoes",
    "label": "Crushed tomatoes",
    "amount": "1 (28 oz) can"
   },
   {
    "pantryId": "basil",
    "label": "Fresh basil leaves, torn",
    "amount": "1/3 cup"
   },
   {
    "pantryId": "parmesan",
    "label": "Parmesan, grated, for serving",
    "amount": "1/2 cup (50 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, to taste, plus for the pasta water",
    "amount": "to taste"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat 2 tablespoons of the olive oil in a saucepan over medium heat. Add the garlic and cook 30 seconds until fragrant.",
   "Add the crushed tomatoes, season with salt, and simmer 15–18 minutes until thickened.",
   "Bring a large pot of salted water to a boil and cook the gnocchi according to the package — they're done as soon as they float to the surface, usually 2–3 minutes; don't overcook, or they turn mushy.",
   "Drain the gnocchi gently and toss into the tomato sauce along with most of the basil.",
   "Drizzle with the remaining olive oil, scatter with the remaining basil, and serve with grated parmesan."
  ],
  "notes": "Gnocchi are a potato-based dumpling found across Italy in regional variations; al pomodoro (with simple tomato sauce) is one of the most common everyday preparations, letting the pillowy texture of the gnocchi itself be the star.",
  "sourceName": "La Cucina Italiana",
  "sourceUrl": "https://www.lacucinaitaliana.com/"
 },
 {
  "id": "chicken-parmesan",
  "title": "Chicken Parmesan",
  "description": "Breaded, fried chicken breast under melted mozzarella and tomato sauce — Italian-American comfort food, built from the older eggplant parmigiana.",
  "cuisine": "Italian",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 45,
  "prepMinutes": 20,
  "cookMinutes": 25,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/31064273/pexels-photo-31064273.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Boneless, skinless chicken breasts, halved horizontally and pounded thin",
    "amount": "2 large"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "1/2 cup (65 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs, beaten",
    "amount": "2"
   },
   {
    "pantryId": "breadcrumbs",
    "label": "Breadcrumbs",
    "amount": "1 1/2 cups (165 g)"
   },
   {
    "pantryId": "parmesan",
    "label": "Parmesan, grated, divided",
    "amount": "3/4 cup (75 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, for pan-frying",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "tomato-sauce",
    "label": "Marinara sauce",
    "amount": "2 cups (480 g)"
   },
   {
    "pantryId": "mozzarella",
    "label": "Shredded mozzarella",
    "amount": "1 1/2 cups (170 g)"
   },
   {
    "pantryId": "basil",
    "label": "Fresh basil, for serving",
    "amount": "6 leaves",
    "optional": true
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 425°F (220°C). Season the chicken with salt and pepper.",
   "Set up a dredging station: flour in one dish, beaten eggs in another, and the breadcrumbs mixed with half the parmesan in a third.",
   "Dredge each piece of chicken in flour, then egg, then the breadcrumb mixture, pressing to coat well.",
   "Heat the olive oil in a large skillet over medium-high heat and fry the chicken 3–4 minutes per side until golden brown (it will finish cooking in the oven).",
   "Transfer the chicken to a baking dish, spoon the marinara sauce over each piece, then top with mozzarella and the remaining parmesan.",
   "Bake 12–15 minutes until the chicken is cooked through (165°F/74°C) and the cheese is melted and bubbling.",
   "Scatter with fresh basil if using and serve."
  ],
  "notes": "Chicken parmesan is an Italian-American dish, adapting the older Southern Italian eggplant parmigiana (melanzane alla parmigiana) by substituting breaded, fried chicken for the eggplant — not a dish found in this form in Italy itself.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "bistecca-alla-fiorentina",
  "title": "Bistecca alla Fiorentina",
  "description": "A massive, bone-in T-bone steak, grilled hard and fast over wood coals, seasoned with nothing but salt — Tuscany's iconic steak.",
  "cuisine": "Italian",
  "dietTags": [
   "Non-Vegetarian",
   "Gluten-Free",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Rich & Indulgent"
  ],
  "timeMinutes": 30,
  "prepMinutes": 10,
  "cookMinutes": 15,
  "marinateMinutes": 60,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/36982948/pexels-photo-36982948.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "beef-sirloin",
    "label": "Bone-in T-bone or porterhouse steak, at least 2 inches thick (traditionally from Chianina cattle)",
    "amount": "1 (about 2.5–3 lb / 1.1–1.4 kg)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Coarse salt",
    "amount": "as needed"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil, for finishing",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon wedges, for serving",
    "amount": "1",
    "optional": true
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "Remove the steak from the refrigerator at least 1 hour before cooking to come to room temperature — this is essential for even cooking on such a thick cut.",
   "Heat a grill to very high heat, ideally with wood or charcoal.",
   "Grill the steak 5–7 minutes per side, without moving it, to develop a deep char.",
   "Stand the steak on its bone edge for a couple of minutes to render the fat along the bone.",
   "Check doneness — traditionally served rare to medium-rare, since the thick cut and short cook time on the flat sides keep it that way.",
   "Season generously with coarse salt immediately after grilling (never before, which draws out moisture), rest 5–10 minutes, then slice the meat off the bone and fan the slices back onto the bone to serve.",
   "Finish with a drizzle of good olive oil and lemon wedges alongside, if using."
  ],
  "notes": "Bistecca alla Fiorentina is a Tuscan specialty, traditionally cut from Chianina cattle, a breed native to the Val di Chiana — the steak is meant to be simple: just the meat, salt, fire, and time.",
  "sourceName": "La Cucina Italiana",
  "sourceUrl": "https://www.lacucinaitaliana.com/"
 },
 {
  "id": "chow-mein",
  "title": "Chicken Chow Mein",
  "description": "Pan-fried wheat noodles stir-fried until lightly crisp at the edges, tossed with chicken, cabbage, and carrots in a glossy soy-based sauce.",
  "cuisine": "Chinese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 35,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/7138913/pexels-photo-7138913.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "egg-noodles",
    "label": "Fresh chow mein noodles (or dried, boiled and drained)",
    "amount": "14 oz (400 g)"
   },
   {
    "pantryId": "chicken-breast",
    "label": "Chicken breast, thinly sliced",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce, divided",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "dark-soy-sauce",
    "label": "Dark soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "oyster-sauce",
    "label": "Oyster sauce",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil, divided",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "3 cloves"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cabbage",
    "label": "Cabbage, shredded",
    "amount": "2 cups (150 g)"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, julienned",
    "amount": "1"
   },
   {
    "pantryId": "bean-sprouts",
    "label": "Bean sprouts",
    "amount": "1 cup (100 g)"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, cut into 2-inch lengths",
    "amount": "4"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper",
    "amount": "1/4 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Cook the noodles according to package directions until just tender, then drain, rinse under cold water, and toss with 1 teaspoon of the vegetable oil to prevent sticking.",
   "Toss the sliced chicken with 1 tablespoon soy sauce and let marinate 10 minutes.",
   "Whisk together the remaining soy sauce, dark soy sauce, oyster sauce, sesame oil, sugar, and white pepper in a small bowl for the sauce.",
   "Heat 2 tablespoons of the oil in a large wok or skillet over high heat until shimmering. Add the chicken and stir-fry 3–4 minutes until cooked through. Remove and set aside.",
   "Add the remaining oil to the wok. Add the garlic and ginger and stir-fry 30 seconds, then add the cabbage and carrot and stir-fry 2–3 minutes until just softened.",
   "Push the vegetables aside, add the noodles, and pour the sauce over everything. Toss vigorously to coat, letting the noodles sit undisturbed for 30–60 seconds at a time against the hot wok to pick up a little char.",
   "Return the chicken to the wok along with the bean sprouts and scallions. Toss 1–2 minutes more until everything is heated through and well combined."
  ],
  "notes": "Chow mein ('stir-fried noodles') is a broad category across Chinese regional cooking and the Chinese diaspora; this pan-fried style, with noodles left to crisp slightly against the wok, is common in Cantonese and American-Chinese kitchens alike.",
  "sourceName": "The Woks of Life",
  "sourceUrl": "https://thewoksoflife.com/"
 },
 {
  "id": "pork-chive-jiaozi",
  "title": "Pork and Chive Jiaozi",
  "description": "Juicy ground pork and Chinese chive filling folded into pleated dumpling wrappers, pan-fried on one side then steamed — the everyday boiled-or-potsticker dumpling of northern China.",
  "cuisine": "Chinese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Herby"
  ],
  "timeMinutes": 60,
  "prepMinutes": 45,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 6,
  "yield": "about 36 dumplings",
  "budget": "$$",
  "image": "https://images.pexels.com/photos/7364181/pexels-photo-7364181.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "ground-pork",
    "label": "Ground pork, not too lean",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "cabbage",
    "label": "Napa cabbage, finely chopped and salted",
    "amount": "2 cups (150 g)"
   },
   {
    "pantryId": "scallion",
    "label": "Garlic chives or scallions, finely chopped",
    "amount": "1 cup, packed"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "shaoxing-wine",
    "label": "Shaoxing wine",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "dumpling-wrappers",
    "label": "Round dumpling wrappers",
    "amount": "36"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil, for pan-frying",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "black-vinegar",
    "label": "Black vinegar, for dipping",
    "amount": "4 tablespoons",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Salt the chopped napa cabbage and let sit 10 minutes, then squeeze out as much liquid as possible with your hands — this keeps the filling from turning watery.",
   "Mix the ground pork, drained cabbage, chives, ginger, soy sauce, shaoxing wine, sesame oil, white pepper, and salt in a bowl, stirring vigorously in one direction until the mixture turns slightly sticky and cohesive.",
   "Place a heaping teaspoon of filling in the center of each wrapper. Wet the edge with water, fold in half, and pleat to seal tightly, pressing out any air.",
   "To boil: drop the dumplings into a large pot of boiling water, stir gently to prevent sticking, and cook until they float plus 2 more minutes, about 6–8 minutes total.",
   "To pan-fry (potsticker style): heat the oil in a nonstick skillet over medium-high heat, arrange the dumplings flat-side down, and cook 2 minutes until golden on the bottom. Add 1/3 cup water, cover immediately, and steam 5–6 minutes until the water evaporates and the wrappers are translucent.",
   "Serve hot with black vinegar for dipping."
  ],
  "notes": "Jiaozi are a staple across northern China, traditionally eaten on Chinese New Year's Eve, when the whole family gathers to fold them together — the pleated shape is said to resemble old silver ingots, symbolizing wealth for the year ahead.",
  "sourceName": "The Woks of Life",
  "sourceUrl": "https://thewoksoflife.com/"
 },
 {
  "id": "fried-pork-wontons",
  "title": "Fried Pork Wontons",
  "description": "Crisp, deep-fried wonton wrappers around a simple pork and shrimp filling, served with a sweet-and-sour or chili dipping sauce — the crunchy starter found on every Chinese-American menu.",
  "cuisine": "Chinese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 45,
  "prepMinutes": 30,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 6,
  "yield": "about 30 wontons",
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1781332147547-1f0edb2a78a4?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "ground-pork",
    "label": "Ground pork",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "shrimp",
    "label": "Shrimp, peeled, deveined, and finely chopped",
    "amount": "1/4 lb (115 g)"
   },
   {
    "pantryId": "scallion",
    "label": "Scallion, finely minced",
    "amount": "2"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "wonton-wrappers",
    "label": "Square wonton wrappers",
    "amount": "30"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for deep-frying",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "ketchup",
    "label": "Ketchup (for sweet and sour dipping sauce)",
    "amount": "1/4 cup (60 g)"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice vinegar (for dipping sauce)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar (for dipping sauce)",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Mix the ground pork, shrimp, scallion, ginger, soy sauce, sesame oil, and white pepper until well combined.",
   "Place a teaspoon of filling in the center of each wrapper. Wet the edges, fold into a triangle, and press to seal, then bring the two bottom corners together and pinch to seal, forming a classic wonton shape.",
   "Whisk together the ketchup, rice vinegar, and sugar with 2 tablespoons water for the dipping sauce.",
   "Heat the oil to 350°F (175°C) in a deep, heavy pot. Fry the wontons in batches 3–4 minutes, turning occasionally, until deep golden and crisp.",
   "Drain on a wire rack and serve hot with the dipping sauce."
  ],
  "notes": "Fried wontons are a Chinese-American restaurant staple rather than a dish typically eaten this way in China, where wontons are far more often served in soup; the crunchy fried version became popular stateside as a shareable appetizer.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "sweet-corn-chicken-soup",
  "title": "Sweet Corn Chicken Soup",
  "description": "The meaty version of the Indo-Chinese corn soup — shredded chicken and sweet corn in a silky, white-pepper-spiked broth with an egg-drop finish.",
  "cuisine": "Chinese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 30,
  "prepMinutes": 15,
  "cookMinutes": 15,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/29538427/pexels-photo-29538427.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Chicken breast, poached and shredded",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "frozen-corn",
    "label": "Sweet corn kernels, divided",
    "amount": "2 cups (300 g)"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "5 cups (1.2 L)"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornstarch, mixed with 3 tablespoons water",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs, beaten",
    "amount": "2"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper, generous",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced, for garnish",
    "amount": "2"
   }
  ],
  "equipment": [
   "Blender"
  ],
  "steps": [
   "Blend half the corn kernels with 1 cup of the stock until mostly smooth.",
   "Bring the remaining stock to a simmer. Add the blended corn mixture, remaining whole corn kernels, ginger, and shredded chicken. Simmer 8 minutes.",
   "Stir in the soy sauce.",
   "Give the cornstarch slurry a stir and pour it into the soup, stirring until thickened, about 1 minute.",
   "Reduce the heat to low and drizzle in the beaten eggs in a thin stream while gently stirring to form ribbons.",
   "Season generously with white pepper and salt to taste, and garnish with scallions before serving."
  ],
  "notes": "Like its vegetarian counterpart, sweet corn chicken soup is an Indo-Chinese restaurant staple — shredded poached chicken keeps the texture light rather than chunky, matching the soup's silky, cornstarch-thickened body.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "congee",
  "title": "Congee (Rice Porridge)",
  "description": "Rice simmered low and slow in far more water than usual until it breaks down into a silky, savory porridge — Chinese comfort food, endlessly customizable with toppings.",
  "cuisine": "Chinese",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 90,
  "prepMinutes": 10,
  "cookMinutes": 80,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1766761562530-c8dd12c96d9a?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "rice",
    "label": "Jasmine or long-grain rice, rinsed",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "vegetable-stock",
    "label": "Vegetable or chicken stock",
    "amount": "8 cups (1.9 L)"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, sliced",
    "amount": "3 slices"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil, for serving",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced, for serving",
    "amount": "3"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce, for serving",
    "amount": "as needed"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper, for serving",
    "amount": "to taste",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Combine the rinsed rice, stock, and ginger in a large, heavy pot and bring to a boil.",
   "Reduce the heat to the lowest simmer, partially cover, and cook 1–1 1/2 hours, stirring occasionally to prevent sticking, until the rice has broken down into a thick, creamy porridge (add more water or stock if it gets too thick before the rice has fully broken down).",
   "Season with salt to taste.",
   "Ladle into bowls and top with sesame oil, scallions, a drizzle of soy sauce, and white pepper if using."
  ],
  "notes": "Congee (zhou) is a staple across Chinese home cooking, especially common for breakfast or when feeling unwell — the long, slow simmer that breaks the rice grains down fully is what gives it its signature silky texture, and toppings vary endlessly by region and preference.",
  "sourceName": "The Woks of Life",
  "sourceUrl": "https://thewoksoflife.com/"
 },
 {
  "id": "chicken-manchurian",
  "title": "Chicken Manchurian",
  "description": "Fried chicken balls tossed in a dark, garlicky, soy-based gravy with bell pepper and scallion — an Indo-Chinese invention with no actual connection to Manchuria.",
  "cuisine": "Chinese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Spicy",
   "Rich & Indulgent"
  ],
  "timeMinutes": 45,
  "prepMinutes": 30,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/29631426/pexels-photo-29631426.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken",
    "label": "Ground chicken (or finely minced chicken breast)",
    "amount": "1 1/4 lb (570 g)"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "1/3 cup (40 g)"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornstarch, divided",
    "amount": "1/3 cup (40 g)"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced, divided",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced, divided",
    "amount": "10 cloves"
   },
   {
    "pantryId": "green-chili",
    "label": "Green chilies, minced, divided",
    "amount": "3"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce, divided",
    "amount": "4 tablespoons"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for deep-frying, plus 2 tablespoons for the sauce",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Bell pepper, finely diced",
    "amount": "1"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "1 1/2 cups (360 ml)"
   },
   {
    "pantryId": "tomato-sauce",
    "label": "Tomato ketchup",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper, generous",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced, for garnish",
    "amount": "3"
   }
  ],
  "equipment": [],
  "steps": [
   "Combine the ground chicken with the flour, 2 tablespoons cornstarch, half the ginger, 4 minced garlic cloves, 1 minced green chili, and 1 tablespoon soy sauce. Mix well and shape into 1-inch balls.",
   "Heat the oil to 350°F (175°C) in a deep, heavy pot. Fry the chicken balls in batches 4–5 minutes until golden and cooked through. Drain on a wire rack.",
   "Heat 2 tablespoons oil in a wok over medium-high heat. Add the remaining garlic, ginger, and green chilies, stir-frying 30 seconds until fragrant.",
   "Add the onion and bell pepper, stir-frying 2–3 minutes until just softened.",
   "Whisk the remaining cornstarch into the chicken stock, then pour it into the wok along with the remaining soy sauce, ketchup, and black pepper. Bring to a simmer, stirring until thickened, about 2 minutes.",
   "Add the fried chicken balls and toss to coat evenly in the gravy, simmering 1–2 minutes more so they absorb some sauce.",
   "Garnish with scallions and serve hot over rice or noodles."
  ],
  "notes": "Chicken Manchurian is a Kolkata Indo-Chinese invention with no real link to the Manchuria region of China — it reflects how thoroughly Chinese cooking techniques were reinterpreted with Indian spicing and bold, gravy-forward presentation once they reached India.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "sweet-and-sour-fish",
  "title": "Sweet and Sour Fish",
  "description": "Battered, fried fish fillets in the same tangy red sauce as sweet and sour chicken, with pineapple and bell pepper — a lighter, flakier variation on the Cantonese-American classic.",
  "cuisine": "Chinese",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Sweet",
   "Tangy"
  ],
  "timeMinutes": 35,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/36694551/pexels-photo-36694551.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "fish",
    "label": "Firm white fish fillets (such as cod or tilapia), cut into large chunks",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornstarch, divided",
    "amount": "3/4 cup (90 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Egg",
    "amount": "1"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for deep-frying, plus 2 tablespoons for the sauce",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Bell peppers, cut into 1-inch squares",
    "amount": "2"
   },
   {
    "pantryId": "onion",
    "label": "Onion, cut into 1-inch squares",
    "amount": "1 medium"
   },
   {
    "pantryId": "pineapple",
    "label": "Pineapple chunks",
    "amount": "1 1/2 cups (250 g)"
   },
   {
    "pantryId": "ketchup",
    "label": "Tomato ketchup",
    "amount": "1/4 cup (60 g)"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice vinegar",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "brown-sugar",
    "label": "Brown sugar",
    "amount": "1/3 cup (70 g)"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, to taste",
    "amount": "to taste"
   }
  ],
  "equipment": [],
  "steps": [
   "Pat the fish chunks dry. Whisk together 1/2 cup cornstarch, the egg, and a splash of water into a thick batter. Toss the fish in the batter, coating gently to avoid breaking the pieces.",
   "Heat the oil to 350°F (175°C) in a deep, heavy pot. Fry the fish in batches 3–4 minutes until golden and just cooked through (fish cooks faster than chicken, so watch closely). Drain on a wire rack.",
   "Whisk together the remaining cornstarch, ketchup, rice vinegar, brown sugar, soy sauce, and 1/2 cup (120 ml) water for the sauce.",
   "Heat 2 tablespoons oil in a wok over high heat. Add the bell peppers and onion, stir-frying 2–3 minutes until just crisp-tender.",
   "Add the pineapple and stir-fry 1 minute more.",
   "Pour in the sauce and simmer, stirring, until thickened and glossy, about 2 minutes.",
   "Gently fold in the fried fish, tossing carefully to coat without breaking the pieces apart. Season with salt to taste and serve immediately over rice."
  ],
  "notes": "Sweet and sour fish follows the same gu lao–style sauce as the chicken version, but needs a gentler hand — fried fish is far more delicate, so it's folded into the sauce at the very end rather than vigorously tossed.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "sweet-and-sour-pork",
  "title": "Sweet and Sour Pork",
  "description": "The original sweet and sour dish — battered pork chunks fried crisp, tossed with pineapple and bell pepper in a tangy red sauce — Cantonese in origin, before chicken versions took over abroad.",
  "cuisine": "Chinese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Sweet",
   "Tangy"
  ],
  "timeMinutes": 40,
  "prepMinutes": 25,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/5848495/pexels-photo-5848495.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "pork-shoulder",
    "label": "Pork shoulder, cut into 1-inch cubes",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornstarch, divided",
    "amount": "3/4 cup (90 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Egg",
    "amount": "1"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for deep-frying, plus 2 tablespoons for the sauce",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Bell peppers, cut into 1-inch squares",
    "amount": "2"
   },
   {
    "pantryId": "onion",
    "label": "Onion, cut into 1-inch squares",
    "amount": "1 medium"
   },
   {
    "pantryId": "pineapple",
    "label": "Pineapple chunks",
    "amount": "1 1/2 cups (250 g)"
   },
   {
    "pantryId": "ketchup",
    "label": "Tomato ketchup",
    "amount": "1/4 cup (60 g)"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice vinegar",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "brown-sugar",
    "label": "Brown sugar",
    "amount": "1/3 cup (70 g)"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, to taste",
    "amount": "to taste"
   }
  ],
  "equipment": [],
  "steps": [
   "Whisk together 1/2 cup cornstarch, the egg, and a splash of water into a thick batter. Toss the pork cubes in the batter until well coated.",
   "Heat the oil to 350°F (175°C) in a deep, heavy pot. Fry the pork in batches 5–6 minutes until golden and cooked through. Drain on a wire rack.",
   "Whisk together the remaining cornstarch, ketchup, rice vinegar, brown sugar, soy sauce, and 1/2 cup (120 ml) water for the sauce.",
   "Heat 2 tablespoons oil in a wok over high heat. Add the bell peppers and onion, stir-frying 2–3 minutes until just crisp-tender.",
   "Add the pineapple and stir-fry 1 minute more.",
   "Pour in the sauce and simmer, stirring, until thickened and glossy, about 2 minutes.",
   "Add the fried pork and toss vigorously to coat evenly. Season with salt to taste and serve immediately over rice."
  ],
  "notes": "Sweet and sour pork (gu lao yuk) is the original version of this dish, Cantonese in origin and dating back over a century — the chicken, fish, and other variations found on international menus all descend from this pork original.",
  "sourceName": "The Woks of Life",
  "sourceUrl": "https://thewoksoflife.com/"
 },
 {
  "id": "vegetable-spring-rolls",
  "title": "Vegetable Spring Rolls",
  "description": "Shredded cabbage, carrot, and mushroom rolled in thin wrappers and deep-fried until shatteringly crisp — a dim sum and appetizer staple, best served piping hot.",
  "cuisine": "Chinese",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 45,
  "prepMinutes": 30,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 6,
  "yield": "about 20 spring rolls",
  "budget": "$",
  "image": "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "cabbage",
    "label": "Cabbage, finely shredded",
    "amount": "3 cups (225 g)"
   },
   {
    "pantryId": "carrot",
    "label": "Carrots, julienned",
    "amount": "2"
   },
   {
    "pantryId": "mushrooms",
    "label": "Mushrooms, finely sliced",
    "amount": "1 cup (70 g)"
   },
   {
    "pantryId": "bean-sprouts",
    "label": "Bean sprouts",
    "amount": "1 cup (100 g)"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced",
    "amount": "3"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "2 cloves"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornstarch",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil, divided",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "spring-roll-wrappers",
    "label": "Spring roll wrappers",
    "amount": "20"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour, mixed with a little water (for sealing)",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat 2 tablespoons of the oil in a wok over high heat. Add the garlic and ginger, stir-frying 30 seconds until fragrant.",
   "Add the cabbage, carrots, and mushrooms, stir-frying 3–4 minutes until softened but still with some bite.",
   "Stir in the bean sprouts, scallions, soy sauce, and sesame oil, tossing 1 minute. Sprinkle in the cornstarch and toss to absorb any excess liquid.",
   "Spread the filling on a baking sheet and let cool completely — hot filling will make the wrappers soggy and tear.",
   "Place about 2 tablespoons of filling near one corner of each wrapper. Fold the corner over the filling, tuck in the sides, and roll tightly, sealing the final edge with the flour paste.",
   "Heat the remaining oil to 350°F (175°C) in a deep, heavy pot. Fry the spring rolls in batches 3–4 minutes, turning occasionally, until deep golden and crisp.",
   "Drain on a wire rack and serve immediately with soy sauce or sweet chili sauce for dipping."
  ],
  "notes": "Spring rolls are named for their traditional association with the Spring Festival (Chinese New Year), though they're now eaten year-round — keeping the filling fully cooled before wrapping is the key to a crisp, non-soggy shell.",
  "sourceName": "The Woks of Life",
  "sourceUrl": "https://thewoksoflife.com/"
 },
 {
  "id": "red-bean-soup",
  "title": "Red Bean Soup (Hong Dou Sha)",
  "description": "Adzuki beans simmered low and slow with dried tangerine peel until they break down into a thick, lightly sweet soup — a classic Cantonese dessert, served warm.",
  "cuisine": "Chinese",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Sweet",
   "Comforting"
  ],
  "timeMinutes": 100,
  "prepMinutes": 10,
  "cookMinutes": 90,
  "difficulty": "Easy",
  "servings": 6,
  "budget": "$",
  "image": "https://images.pexels.com/photos/5652183/pexels-photo-5652183.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "adzuki-beans",
    "label": "Dried adzuki (red) beans, rinsed",
    "amount": "1 1/2 cups (300 g)"
   },
   {
    "pantryId": "orange",
    "label": "Dried tangerine or orange peel",
    "amount": "1 piece",
    "optional": true
   },
   {
    "pantryId": "sugar",
    "label": "Rock sugar (or granulated sugar)",
    "amount": "1/2 cup (100 g)"
   },
   {
    "pantryId": "glutinous-rice-flour",
    "label": "Glutinous rice flour balls (tang yuan), for serving",
    "amount": "1 cup",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Combine the adzuki beans, dried peel if using, and 8 cups (1.9 L) water in a large pot. Bring to a boil, then skim off any foam.",
   "Reduce the heat to the lowest simmer, cover partially, and cook 1 1/2–2 hours, stirring occasionally, until the beans are very soft and starting to break down into the liquid (add more water if it gets too thick before the beans soften).",
   "Stir in the sugar and simmer 5 minutes more until dissolved.",
   "For a thicker, more traditional texture, mash some of the beans against the side of the pot with a spoon.",
   "Serve warm, topped with cooked glutinous rice balls if using."
  ],
  "notes": "Red bean soup (hong dou sha) is a classic Cantonese 'tong sui' (sweet soup) dessert, traditionally served warm even in summer — dried tangerine peel is a common addition that cuts through the sweetness with a faint citrus bitterness.",
  "sourceName": "The Woks of Life",
  "sourceUrl": "https://thewoksoflife.com/"
 },
 {
  "id": "dolma",
  "title": "Dolma (Stuffed Grape Leaves)",
  "description": "Grape leaves rolled tightly around a rice, herb, and pine nut filling, simmered until tender — a dish found with small variations across the entire Eastern Mediterranean.",
  "cuisine": "Mediterranean",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Tangy",
   "Herby"
  ],
  "timeMinutes": 90,
  "prepMinutes": 60,
  "cookMinutes": 30,
  "difficulty": "Advanced",
  "servings": 6,
  "yield": "about 40 dolma",
  "budget": "$$",
  "image": "https://images.pexels.com/photos/36734915/pexels-photo-36734915.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "grape-leaves",
    "label": "Jarred grape leaves, rinsed and drained",
    "amount": "1 (16 oz) jar (about 60 leaves)"
   },
   {
    "pantryId": "rice",
    "label": "Short-grain rice, rinsed",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "parsley",
    "label": "Fresh parsley, finely chopped",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "mint",
    "label": "Fresh mint, finely chopped",
    "amount": "1/4 cup"
   },
   {
    "pantryId": "pine-nuts",
    "label": "Pine nuts, toasted",
    "amount": "1/4 cup (35 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil, divided",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "lemon",
    "label": "Lemons, juiced, divided",
    "amount": "2"
   },
   {
    "pantryId": "dill",
    "label": "Dried dill (or thyme)",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat 2 tablespoons of the olive oil in a skillet over medium heat. Add the onion and cook 5 minutes until softened.",
   "Stir in the rice and cook 1 minute, then remove from heat and mix in the parsley, mint, pine nuts, dill, juice of 1 lemon, salt, and pepper.",
   "Lay a grape leaf shiny-side down on a work surface, stem removed. Place about 1 tablespoon of filling near the stem end.",
   "Fold the bottom of the leaf over the filling, fold in the sides, and roll up tightly into a small log. Repeat with the remaining leaves and filling.",
   "Line the bottom of a wide pot with a few extra grape leaves (to prevent scorching) and arrange the rolled dolma seam-side down in tight rows.",
   "Drizzle with the remaining olive oil and lemon juice, and add enough water to just cover the dolma. Place a heatproof plate directly on top to weigh them down.",
   "Bring to a simmer, cover, and cook 30–35 minutes over low heat until the rice is tender.",
   "Let cool slightly in the pot, then serve warm or at room temperature."
  ],
  "notes": "Dolma (from the Turkish for 'stuffed') appears across Greek, Turkish, Lebanese, and Armenian cooking with small regional differences — this herb-forward, meat-free version is common as a mezze, while meat-filled versions are often served warm as a main.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "lamb-shish-kebab",
  "title": "Lamb Shish Kebab",
  "description": "Cubed lamb marinated in olive oil, garlic, and warm spices, grilled over high heat until charred outside and pink within — found with regional variations from Turkey to the Levant.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Rich & Indulgent"
  ],
  "timeMinutes": 35,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "marinateMinutes": 480,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/15388082/pexels-photo-15388082.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "lamb",
    "label": "Lamb leg or shoulder, cut into 1 1/2-inch cubes",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, grated",
    "amount": "1 medium"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "4 cloves"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "dried-oregano",
    "label": "Dried oregano",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Bell peppers, cut into 1 1/2-inch squares",
    "amount": "2",
    "optional": true
   },
   {
    "pantryId": "flatbread",
    "label": "Flatbread, to serve",
    "amount": "4",
    "optional": true
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "Combine the olive oil, grated onion, garlic, cumin, paprika, oregano, lemon juice, salt, and pepper in a large bowl.",
   "Add the lamb and toss thoroughly to coat. Cover and marinate in the refrigerator at least 8 hours or overnight.",
   "If using wooden skewers, soak them in water 30 minutes beforehand.",
   "Thread the lamb onto skewers, alternating with bell pepper pieces if using, leaving a little space between pieces for even cooking.",
   "Heat a grill to high heat. Grill the skewers 10–12 minutes, turning every few minutes, until well-charred outside and still pink-to-medium within.",
   "Rest 5 minutes before serving, traditionally with rice or flatbread."
  ],
  "notes": "Shish kebab ('skewer of roasted meat') is found across Turkey, the Levant, and beyond, with countless regional spice variations — grated onion in the marinade is a common tenderizing trick, breaking down the meat's surface before it even hits the grill.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "chicken-shish-tawook",
  "title": "Chicken Shish Tawook",
  "description": "Chicken marinated in yogurt, garlic, and tomato paste, skewered and grilled until juicy and lightly charred — a Levantine and Turkish grilled chicken classic, often served with garlic sauce.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Herby",
   "Smoky"
  ],
  "timeMinutes": 35,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "marinateMinutes": 360,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/37417601/pexels-photo-37417601.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Boneless chicken breast, cut into 1 1/2-inch cubes",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt",
    "amount": "1/2 cup (120 g)"
   },
   {
    "pantryId": "tomato-sauce",
    "label": "Tomato paste",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "5 cloves"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "flatbread",
    "label": "Flatbread, to serve",
    "amount": "4",
    "optional": true
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "Whisk together the yogurt, tomato paste, olive oil, garlic, lemon juice, paprika, cumin, salt, and pepper.",
   "Add the chicken and toss to coat thoroughly. Cover and marinate in the refrigerator at least 6 hours or overnight.",
   "If using wooden skewers, soak them in water 30 minutes beforehand.",
   "Thread the chicken onto skewers.",
   "Heat a grill to medium-high. Grill the skewers 10–12 minutes, turning occasionally, until charred in spots and cooked through (165°F/74°C).",
   "Serve with rice, flatbread, and garlic sauce (toum) or garlic yogurt."
  ],
  "notes": "Shish tawook is a staple of Levantine and Turkish grilling — the small amount of tomato paste in the marinade gives the chicken its characteristic light orange-red hue without the heavier flavor of a full tomato sauce.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "lamb-tagine-apricots",
  "title": "Lamb Tagine with Apricots and Almonds",
  "description": "Lamb braised with dried apricots, cinnamon, and honey until the sauce turns thick and glossy — the sweet-savory side of Moroccan tagine cooking.",
  "cuisine": "Mediterranean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Sweet",
   "Comforting"
  ],
  "timeMinutes": 130,
  "prepMinutes": 20,
  "cookMinutes": 110,
  "difficulty": "Medium",
  "servings": 6,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/30068444/pexels-photo-30068444.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "lamb",
    "label": "Lamb shoulder, cut into 2-inch cubes",
    "amount": "2 1/2 lb (1.1 kg)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "onion",
    "label": "Onion, sliced",
    "amount": "1 large"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, minced",
    "amount": "3 cloves"
   },
   {
    "pantryId": "ginger",
    "label": "Fresh ginger, grated",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon sticks",
    "amount": "2"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken or lamb stock",
    "amount": "2 cups (480 ml)"
   },
   {
    "pantryId": "dried-apricots",
    "label": "Dried apricots",
    "amount": "1 1/2 cups (225 g)"
   },
   {
    "pantryId": "honey",
    "label": "Honey",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "almonds",
    "label": "Almonds, toasted, for garnish",
    "amount": "1/3 cup (45 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "couscous",
    "label": "Couscous, to serve",
    "amount": "1 1/2 cups (280 g) dry",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Season the lamb generously with salt and pepper. Heat the olive oil in a large, heavy pot over medium-high heat and brown the lamb in batches, 3–4 minutes per side. Remove and set aside.",
   "Add the onion to the same pot and cook 6–8 minutes until softened. Add the garlic, ginger, cinnamon sticks, turmeric, and cumin, cooking 1 minute until fragrant.",
   "Return the lamb to the pot, add the stock, and bring to a simmer. Cover and cook 1 1/2 hours over low heat, until the lamb is very tender.",
   "Stir in the dried apricots and honey and simmer, uncovered, 15–20 minutes more, until the sauce thickens and the apricots plump up.",
   "Remove the cinnamon sticks, adjust seasoning, and scatter with toasted almonds before serving, traditionally with couscous."
  ],
  "notes": "Sweet-savory combinations like lamb and dried fruit are a hallmark of Moroccan cooking, reflecting historic trade routes that brought spices and dried fruits into North Africa — almonds scattered on top add a textural contrast to the soft, glossy stew.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "mujadara",
  "title": "Mujadara",
  "description": "Lentils and rice simmered together, topped with a generous pile of deeply caramelized onions — a Levantine lentil dish that's humble, cheap, and completely addictive.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 60,
  "prepMinutes": 15,
  "cookMinutes": 45,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/32588480/pexels-photo-32588480.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "green-lentils",
    "label": "Green or brown lentils, rinsed",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "rice",
    "label": "Long-grain rice, rinsed",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onions, thinly sliced",
    "amount": "3 large"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, divided",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt, for serving",
    "amount": "1 cup (240 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Combine the lentils with 3 cups (720 ml) water in a pot, bring to a boil, and simmer 12–15 minutes until just tender but not mushy. Drain and set aside.",
   "Heat 1/3 cup of the olive oil in a large skillet over medium heat. Add the onions and cook, stirring occasionally, 25–30 minutes until deeply golden-brown and caramelized (don't rush this — the onions are the dish's main flavor). Remove and set aside, reserving the oil in the pan.",
   "Add the remaining oil to the same pan along with the rice, stirring to coat.",
   "Add the cooked lentils, cumin, 2 cups (480 ml) water, salt, and pepper. Bring to a boil, then reduce to low, cover, and simmer 15–18 minutes until the rice is tender and the liquid is absorbed.",
   "Let stand, covered, 5 minutes, then fluff gently with a fork.",
   "Top generously with the caramelized onions and serve with yogurt on the side if using."
  ],
  "notes": "Mujadara's defining feature is the caramelized onions — rushing this step is the most common mistake, since real caramelization (not just softening) takes a genuine 25–30 minutes of patient, low-and-slow cooking.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "beet-salad-feta",
  "title": "Beet Salad with Feta and Walnuts",
  "description": "Roasted beets tossed with crumbled feta, toasted walnuts, and a sharp vinaigrette — an earthy, colorful Mediterranean salad built on contrast.",
  "cuisine": "Mediterranean",
  "dietTags": [
   "Vegetarian",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Tangy"
  ],
  "timeMinutes": 70,
  "prepMinutes": 15,
  "cookMinutes": 55,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?auto=format&fit=crop&w=1600&q=80",
  "ingredients": [
   {
    "pantryId": "beets",
    "label": "Beets, trimmed",
    "amount": "6 medium"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil, divided",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "apple-cider-vinegar",
    "label": "Red wine vinegar",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "honey",
    "label": "Honey",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "feta",
    "label": "Feta, crumbled",
    "amount": "4 oz (115 g)"
   },
   {
    "pantryId": "walnuts",
    "label": "Walnuts, toasted and roughly chopped",
    "amount": "1/2 cup (60 g)"
   },
   {
    "pantryId": "mint",
    "label": "Fresh mint leaves, torn",
    "amount": "2 tablespoons",
    "optional": true
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt and black pepper, to taste",
    "amount": "to taste"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 400°F (200°C). Wrap each beet individually in foil and roast 45–55 minutes until a knife slides in easily.",
   "Let the beets cool enough to handle, then peel (the skins should slip off easily) and cut into wedges.",
   "Whisk together 1/4 cup of the olive oil, the vinegar, and honey for the dressing. Season with salt and pepper.",
   "Toss the beet wedges with the dressing while still slightly warm, so they absorb more flavor.",
   "Arrange on a platter, scatter with the crumbled feta, toasted walnuts, and mint if using.",
   "Finish with a final drizzle of olive oil before serving."
  ],
  "notes": "Roasting beets whole in foil (rather than boiling) concentrates their natural sweetness and makes peeling far easier once they're cooked — tossing them with dressing while still warm also helps them absorb more flavor than if dressed cold.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "baklava",
  "title": "Baklava",
  "description": "Dozens of paper-thin phyllo layers brushed with butter, filled with spiced chopped nuts, cut into diamonds, and soaked in a lemon-scented honey syrup.",
  "cuisine": "Mediterranean",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Sweet",
   "Rich & Indulgent"
  ],
  "timeMinutes": 90,
  "prepMinutes": 40,
  "cookMinutes": 50,
  "difficulty": "Advanced",
  "servings": 24,
  "yield": "24 pieces",
  "budget": "$$",
  "image": "https://images.pexels.com/photos/5323489/pexels-photo-5323489.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "phyllo-dough",
    "label": "Phyllo dough, thawed",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "walnuts",
    "label": "Walnuts, finely chopped",
    "amount": "2 cups (240 g)"
   },
   {
    "pantryId": "pistachios",
    "label": "Pistachios, finely chopped",
    "amount": "1 cup (120 g)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1/4 cup (50 g)"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Ground cinnamon",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "butter",
    "label": "Unsalted butter, melted",
    "amount": "1 cup (225 g)"
   },
   {
    "pantryId": "honey",
    "label": "Honey",
    "amount": "1 cup (340 g)"
   },
   {
    "pantryId": "water",
    "label": "Water",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, juiced",
    "amount": "1"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 350°F (175°C). Combine the walnuts, pistachios, sugar, and cinnamon in a bowl.",
   "Butter a 9x13-inch baking pan. Lay a sheet of phyllo in the pan and brush with melted butter; repeat to layer 10 sheets, buttering each one, keeping the rest covered with a damp towel.",
   "Sprinkle a third of the nut mixture evenly over the layered phyllo. Layer 5 more buttered phyllo sheets on top, then another third of the nuts, then 5 more sheets, the rest of the nuts, and finish with a final 10 buttered sheets on top.",
   "Using a sharp knife, cut the unbaked baklava all the way through into diamonds or squares.",
   "Bake 45–50 minutes until deep golden brown and crisp.",
   "Meanwhile, simmer the honey, water, and lemon juice together 5 minutes to make the syrup. Let cool slightly.",
   "Pour the warm syrup evenly over the hot baklava immediately after it comes out of the oven. Let cool completely, uncovered, before serving — at least 4 hours."
  ],
  "notes": "Pouring hot syrup over hot baklava (or cold syrup over cooled baklava) keeps the layers crisp; mixing temperatures the opposite way is what makes baklava turn soggy instead of staying crackly.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "guacamole",
  "title": "Classic Guacamole",
  "description": "Ripe avocados mashed chunky with onion, chile, cilantro, and lime — the traditional molcajete-style guacamole, simple enough that the avocado stays the star.",
  "cuisine": "Mexican",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Tangy"
  ],
  "timeMinutes": 15,
  "prepMinutes": 15,
  "cookMinutes": 0,
  "difficulty": "Easy",
  "servings": 6,
  "budget": "$",
  "image": "https://images.pexels.com/photos/5737452/pexels-photo-5737452.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "avocado",
    "label": "Ripe Hass avocados",
    "amount": "3 large"
   },
   {
    "pantryId": "onion",
    "label": "White onion, finely chopped",
    "amount": "1/4 cup (40 g)"
   },
   {
    "pantryId": "serrano-chili",
    "label": "Serrano chile, minced (seeded for milder)",
    "amount": "1"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, finely chopped",
    "amount": "1/4 cup (15 g)"
   },
   {
    "pantryId": "lime",
    "label": "Lime, juiced",
    "amount": "1"
   },
   {
    "pantryId": "fine-salt",
    "label": "Kosher salt",
    "amount": "3/4 teaspoon"
   },
   {
    "pantryId": "tomato",
    "label": "Ripe tomato, seeded and diced",
    "amount": "1/2 medium",
    "optional": true
   },
   {
    "pantryId": "tortilla-chips",
    "label": "Tortilla chips, to serve",
    "amount": "1 bag (about 200 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Mash the onion, serrano, half the cilantro, and the salt to a rough paste in a molcajete or bowl, using the back of a fork or pestle.",
   "Halve and pit the avocados, scoop the flesh into the bowl, and add the lime juice.",
   "Mash roughly, leaving the guacamole chunky rather than smooth.",
   "Fold in the remaining cilantro and the tomato if using. Taste and adjust salt and lime.",
   "Serve right away with warm tortilla chips, or press plastic wrap directly onto the surface to keep it from browning."
  ],
  "notes": "Authentic guacamole is deliberately minimal — garlic, cumin, and sour cream are not traditional. Grinding the onion and chile with salt first releases their oils and seasons the whole batch evenly.",
  "sourceName": "Rick Bayless / Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "pollo-asado-tacos",
  "title": "Tacos de Pollo Asado",
  "description": "Chicken thighs marinated in citrus, achiote, and garlic, grilled until charred at the edges, chopped, and served on corn tortillas with onion and cilantro.",
  "cuisine": "Mexican",
  "dietTags": [
   "Gluten-Free",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Tangy"
  ],
  "timeMinutes": 35,
  "prepMinutes": 15,
  "cookMinutes": 20,
  "marinateMinutes": 120,
  "difficulty": "Easy",
  "servings": 4,
  "yield": "12 tacos",
  "budget": "$",
  "image": "https://images.pexels.com/photos/17429140/pexels-photo-17429140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless, skinless chicken thighs",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "achiote-paste",
    "label": "Achiote paste",
    "amount": "2 tablespoons (30 g)"
   },
   {
    "pantryId": "orange",
    "label": "Orange, juiced",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "lime",
    "label": "Limes, juiced",
    "amount": "2"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "4"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "mexican-oregano",
    "label": "Dried Mexican oregano",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "tortillas",
    "label": "Corn tortillas, warmed",
    "amount": "12 (6-inch)"
   },
   {
    "pantryId": "onion",
    "label": "White onion, finely diced, to serve",
    "amount": "1/2 cup (80 g)"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped, to serve",
    "amount": "1/2 cup (30 g)"
   }
  ],
  "equipment": [
   "Soda Maker"
  ],
  "steps": [
   "Whisk the achiote paste with the orange juice, lime juice, garlic, cumin, oregano, oil, and salt until smooth.",
   "Add the chicken, turn to coat, cover, and marinate in the refrigerator 2–8 hours.",
   "Heat a grill or cast-iron grill pan to medium-high. Grill the chicken 5–6 minutes per side until charred in spots and 165°F (74°C) inside.",
   "Rest 5 minutes, then chop into small pieces.",
   "Pile onto warm tortillas and top with onion and cilantro. Serve with lime wedges and salsa verde."
  ],
  "notes": "Achiote (annatto) gives the chicken its brick-orange color and a gentle earthy flavor. The citrus helps tenderize the meat but turns it mushy past about 8 hours.",
  "sourceName": "Rick Bayless / Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "tacos-al-pastor",
  "title": "Tacos al Pastor",
  "description": "Thinly sliced pork marinated in guajillo, achiote, and pineapple, seared until caramelized and served on corn tortillas with pineapple, onion, and cilantro.",
  "cuisine": "Mexican",
  "dietTags": [
   "Gluten-Free",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Sweet",
   "Spicy"
  ],
  "timeMinutes": 40,
  "prepMinutes": 25,
  "cookMinutes": 15,
  "marinateMinutes": 480,
  "difficulty": "Medium",
  "servings": 6,
  "yield": "18 tacos",
  "budget": "$$",
  "image": "https://images.pexels.com/photos/12034501/pexels-photo-12034501.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "pork-shoulder",
    "label": "Boneless pork shoulder, sliced 1/4 inch thick",
    "amount": "2 1/2 lb (1.1 kg)"
   },
   {
    "pantryId": "guajillo-chiles",
    "label": "Dried guajillo chiles, stemmed and seeded",
    "amount": "5"
   },
   {
    "pantryId": "ancho-chiles",
    "label": "Dried ancho chile, stemmed and seeded",
    "amount": "1"
   },
   {
    "pantryId": "achiote-paste",
    "label": "Achiote paste",
    "amount": "2 tablespoons (30 g)"
   },
   {
    "pantryId": "pineapple",
    "label": "Fresh pineapple, 1/2 cup chopped for the marinade, plus 1 1/2 cups diced to serve",
    "amount": "1 small"
   },
   {
    "pantryId": "white-vinegar",
    "label": "White vinegar",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves",
    "amount": "6"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "mexican-oregano",
    "label": "Dried Mexican oregano",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cloves",
    "label": "Ground cloves",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "tortillas",
    "label": "Corn tortillas, warmed",
    "amount": "18 (5-inch)"
   },
   {
    "pantryId": "onion",
    "label": "White onion, finely diced",
    "amount": "1/2 cup (80 g)"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "1/2 cup (30 g)"
   },
   {
    "pantryId": "lime",
    "label": "Limes, in wedges",
    "amount": "3"
   }
  ],
  "equipment": [
   "Blender"
  ],
  "steps": [
   "Soak the guajillos and ancho in hot water 15 minutes until soft; drain.",
   "Blend the chiles with the achiote, 1/2 cup chopped pineapple, vinegar, garlic, cumin, oregano, cloves, salt, and 1/4 cup (60 ml) water until smooth.",
   "Toss the pork with the marinade, cover, and refrigerate 8–24 hours.",
   "Heat the oil in a large cast-iron skillet over high heat. Cook the pork in single-layer batches 3–4 minutes per side until deeply browned and caramelized at the edges.",
   "Chop the pork roughly. Sear the diced pineapple in the same pan 2 minutes.",
   "Pile onto warm tortillas and top with pineapple, onion, cilantro, and a squeeze of lime."
  ],
  "notes": "Al pastor was created in Mexico City by Lebanese immigrants who adapted shawarma, replacing lamb with marinated pork and adding pineapple. In taquerías it's shaved from a vertical spit (trompo); thin slices seared hard at home come close.",
  "sourceName": "Rick Bayless / Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "roasted-cauliflower-tacos",
  "title": "Roasted Cauliflower Tacos",
  "description": "Cauliflower florets tossed in chili, cumin, and lime, roasted until charred and caramelized, and tucked into tortillas over smashed avocado with cilantro.",
  "cuisine": "Mexican",
  "dietTags": [
   "Vegetarian",
   "Vegan",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Fresh & Light",
   "Spicy"
  ],
  "timeMinutes": 40,
  "prepMinutes": 15,
  "cookMinutes": 25,
  "difficulty": "Easy",
  "servings": 4,
  "yield": "8 tacos",
  "budget": "$",
  "image": "https://images.pexels.com/photos/6541827/pexels-photo-6541827.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "cauliflower",
    "label": "Cauliflower, cut into small florets",
    "amount": "1 large head (about 1 1/2 lb / 680 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "chili-powder",
    "label": "Chili powder",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "smoked-paprika",
    "label": "Smoked paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "lime",
    "label": "Limes, juiced",
    "amount": "2"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "avocado",
    "label": "Ripe avocados",
    "amount": "2"
   },
   {
    "pantryId": "tortillas",
    "label": "Corn tortillas, warmed",
    "amount": "8 (6-inch)"
   },
   {
    "pantryId": "red-onion",
    "label": "Red onion, finely diced",
    "amount": "1/4 cup (40 g)"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "1/2 cup (30 g)"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 450°F (230°C). Toss the cauliflower with the oil, chili powder, cumin, paprika, half the lime juice, and 3/4 teaspoon salt.",
   "Spread in a single layer on a large baking sheet and roast 22–25 minutes, turning once, until deeply browned at the edges.",
   "Mash the avocados with the remaining lime juice and salt until chunky.",
   "Spread avocado on each tortilla, top with cauliflower, red onion, and cilantro.",
   "Serve with salsa verde and lime wedges."
  ],
  "notes": "High heat and a single layer on the pan are what make cauliflower caramelize and char instead of steaming into mush.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "chicken-quesadilla",
  "title": "Chicken Quesadillas",
  "description": "Griddled flour tortillas filled with seasoned shredded chicken, melted Monterey Jack, and roasted poblano strips, cut into wedges and served with sour cream.",
  "cuisine": "Mexican",
  "dietTags": [],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 30,
  "prepMinutes": 15,
  "cookMinutes": 15,
  "difficulty": "Easy",
  "servings": 4,
  "yield": "4 quesadillas",
  "budget": "$",
  "image": "https://images.pexels.com/photos/18001759/pexels-photo-18001759.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Cooked chicken breast, shredded (about 2 breasts)",
    "amount": "2 cups (280 g)"
   },
   {
    "pantryId": "chili-powder",
    "label": "Chili powder",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "poblano-pepper",
    "label": "Poblano pepper, roasted, peeled, cut into strips",
    "amount": "1 large"
   },
   {
    "pantryId": "monterey-jack",
    "label": "Monterey Jack, shredded",
    "amount": "2 cups (225 g)"
   },
   {
    "pantryId": "tortillas",
    "label": "Flour tortillas (10-inch)",
    "amount": "4"
   },
   {
    "pantryId": "butter",
    "label": "Butter, for the pan",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "1/4 cup (15 g)"
   },
   {
    "pantryId": "mexican-crema",
    "label": "Sour cream or crema, to serve",
    "amount": "1/2 cup (120 ml)"
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the shredded chicken with the chili powder, cumin, and salt.",
   "Lay a tortilla in a buttered skillet over medium heat. Scatter 1/2 cup cheese over half, then a quarter of the chicken, poblano strips, and cilantro; fold the tortilla over.",
   "Cook 3 minutes per side, pressing gently, until golden and the cheese is melted.",
   "Rest 1 minute, cut into wedges, and serve with sour cream and salsa."
  ],
  "notes": "Shredded cheese goes in first and last so it acts like glue, sealing the filling inside the tortilla. Don't overfill, or the quesadilla won't close and the filling spills in the pan.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "chilaquiles-rojos",
  "title": "Chilaquiles Rojos",
  "description": "Crisp tortilla chips simmered briefly in a smoky red salsa until just softened, topped with crema, queso fresco, onion, and a fried egg.",
  "cuisine": "Mexican",
  "dietTags": [
   "Vegetarian",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Spicy",
   "Smoky"
  ],
  "timeMinutes": 30,
  "prepMinutes": 10,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/36429912/pexels-photo-36429912.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "tortilla-chips",
    "label": "Sturdy corn tortilla chips (or fry 12 corn tortillas cut into triangles)",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "tomato",
    "label": "Roma tomatoes",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "guajillo-chiles",
    "label": "Dried guajillo chiles, stemmed and seeded",
    "amount": "3"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves",
    "amount": "2"
   },
   {
    "pantryId": "onion",
    "label": "White onion, half in the sauce, half thinly sliced to serve",
    "amount": "1/2 medium"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "1 cup (240 ml)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs, fried",
    "amount": "4"
   },
   {
    "pantryId": "mexican-crema",
    "label": "Mexican crema",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "queso-fresco",
    "label": "Queso fresco, crumbled",
    "amount": "1/2 cup (60 g)"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped",
    "amount": "1/4 cup (15 g)"
   }
  ],
  "equipment": [
   "Blender"
  ],
  "steps": [
   "Simmer the tomatoes and guajillos in water 10 minutes until soft. Blend with the garlic, 2 tablespoons of the onion, stock, and salt until smooth.",
   "Heat the oil in a large, wide skillet over medium-high heat. Add the sauce and simmer 5–6 minutes until thickened.",
   "Add the chips and toss quickly for 30–60 seconds until coated and just beginning to soften.",
   "Divide among plates and top with fried eggs, crema, queso fresco, sliced onion, and cilantro. Serve immediately."
  ],
  "notes": "The chips should keep some crunch — add them only at the last minute. Chilaquiles are the classic way to use up stale tortillas and are a breakfast staple and a hangover cure.",
  "sourceName": "Rick Bayless / Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "churros",
  "title": "Churros with Chocolate Sauce",
  "description": "Ridged choux-style dough fried until crisp and golden, rolled in cinnamon sugar, and served with a thick, dark chocolate dipping sauce.",
  "cuisine": "Mexican",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Sweet",
   "Rich & Indulgent"
  ],
  "timeMinutes": 45,
  "prepMinutes": 15,
  "cookMinutes": 30,
  "difficulty": "Medium",
  "servings": 6,
  "yield": "About 18 churros",
  "budget": "$",
  "image": "https://images.pexels.com/photos/36361401/pexels-photo-36361401.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "water",
    "label": "Water",
    "amount": "1 cup (240 ml)"
   },
   {
    "pantryId": "butter",
    "label": "Butter",
    "amount": "4 tablespoons (55 g)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar, plus 1/2 cup (100 g) for coating",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "1 cup (125 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Large eggs",
    "amount": "2"
   },
   {
    "pantryId": "vanilla-extract",
    "label": "Vanilla extract",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil, for frying",
    "amount": "4 cups (950 ml)"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Ground cinnamon, for coating",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "dark-chocolate",
    "label": "Dark chocolate, chopped (for the sauce)",
    "amount": "6 oz (170 g)"
   },
   {
    "pantryId": "heavy-cream",
    "label": "Heavy cream (for the sauce)",
    "amount": "3/4 cup (180 ml)"
   }
  ],
  "equipment": [],
  "steps": [
   "Bring the water, butter, 1 tablespoon sugar, and salt to a boil in a saucepan. Add the flour all at once and stir vigorously until a smooth ball forms and pulls away from the pan, about 1 minute.",
   "Cool 5 minutes, then beat in the eggs one at a time, then the vanilla, until smooth and glossy.",
   "Transfer to a piping bag fitted with a large star tip.",
   "Heat the oil to 350°F (175°C). Pipe 4–6-inch lengths directly into the oil, cutting with scissors. Fry in batches 2–3 minutes per side until deep golden. Drain on paper towels.",
   "Toss in the remaining sugar mixed with the cinnamon while still hot.",
   "For the sauce, heat the cream until steaming, pour over the chocolate, and stir until smooth. Serve alongside for dipping."
  ],
  "notes": "The star tip creates ridges that make the surface crisp and give the cinnamon sugar something to grip. Keep the oil at 350°F: too cool and the churros are greasy, too hot and the inside stays raw.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "arroz-con-leche",
  "title": "Arroz con Leche",
  "description": "Rice slowly simmered in milk with cinnamon and lime peel until creamy and spoonable, sweetened and finished with a dusting of cinnamon and raisins.",
  "cuisine": "Mexican",
  "dietTags": [
   "Vegetarian",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Sweet",
   "Comforting"
  ],
  "timeMinutes": 50,
  "prepMinutes": 5,
  "cookMinutes": 45,
  "difficulty": "Easy",
  "servings": 6,
  "budget": "$",
  "image": "https://images.pexels.com/photos/37825038/pexels-photo-37825038.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "rice",
    "label": "Long-grain white rice, rinsed",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "water",
    "label": "Water",
    "amount": "2 cups (480 ml)"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick, plus ground cinnamon to dust",
    "amount": "1 (3-inch)"
   },
   {
    "pantryId": "lime",
    "label": "Lime, peel in wide strips",
    "amount": "1"
   },
   {
    "pantryId": "milk",
    "label": "Whole milk",
    "amount": "3 cups (720 ml)"
   },
   {
    "pantryId": "condensed-milk",
    "label": "Sweetened condensed milk",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1/3 cup (65 g)"
   },
   {
    "pantryId": "vanilla-extract",
    "label": "Vanilla extract",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "raisins",
    "label": "Raisins",
    "amount": "1/3 cup (50 g)",
    "optional": true
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "pinch"
   }
  ],
  "equipment": [],
  "steps": [
   "Combine the rice, water, cinnamon stick, and lime peel in a saucepan. Bring to a boil, cover, and cook on low 15 minutes until the water is absorbed.",
   "Add the milk, sugar, and salt. Simmer uncovered over medium-low, stirring often, 25 minutes until the rice is very tender and the mixture is creamy.",
   "Stir in the condensed milk, vanilla, and raisins. Cook 5 minutes more.",
   "Remove the cinnamon stick and lime peel. Serve warm or chilled, dusted with ground cinnamon. It thickens as it cools; loosen with milk."
  ],
  "notes": "Cooking the rice in water first softens it before the milk goes in, which keeps the milk from scorching and the grains from staying firm. Stir often toward the end, as the starch thickens quickly.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "gorditas-de-pollo",
  "title": "Gorditas de Pollo en Salsa Roja",
  "description": "Thick masa pockets griddled until puffed and lightly crisp, split open and stuffed with shredded chicken in a guajillo salsa, lettuce, crema, and queso fresco.",
  "cuisine": "Mexican",
  "dietTags": [
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Spicy"
  ],
  "timeMinutes": 60,
  "prepMinutes": 30,
  "cookMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "yield": "8 gorditas",
  "budget": "$",
  "image": "https://images.pexels.com/photos/34380892/pexels-photo-34380892.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "masa-harina",
    "label": "Masa harina",
    "amount": "2 cups (240 g)"
   },
   {
    "pantryId": "water",
    "label": "Warm water",
    "amount": "1 1/2 cups (360 ml)"
   },
   {
    "pantryId": "lard",
    "label": "Lard or vegetable oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless, skinless chicken thighs, poached and shredded",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "guajillo-chiles",
    "label": "Dried guajillo chiles, stemmed and seeded",
    "amount": "4"
   },
   {
    "pantryId": "tomato",
    "label": "Roma tomatoes",
    "amount": "2"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves",
    "amount": "2"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil, for the sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "lettuce",
    "label": "Romaine lettuce, finely shredded",
    "amount": "1 1/2 cups (75 g)"
   },
   {
    "pantryId": "mexican-crema",
    "label": "Mexican crema",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "queso-fresco",
    "label": "Queso fresco, crumbled",
    "amount": "1/2 cup (60 g)"
   }
  ],
  "equipment": [
   "Blender"
  ],
  "steps": [
   "Mix the masa harina, salt, lard, and warm water into a soft dough; rest 10 minutes. Divide into 8 balls and press each into a 1/3-inch-thick disc, about 4 inches wide.",
   "Cook on a hot dry griddle 2–3 minutes per side until lightly golden and puffed. Keep warm wrapped in a towel.",
   "Soak the guajillos in hot water 15 minutes. Blend with the tomatoes, garlic, and 1/2 cup water until smooth; strain.",
   "Fry the sauce in the oil 5 minutes until thick, then stir in the shredded chicken and simmer 8 minutes.",
   "Split each gordita along the edge to form a pocket. Fill with the chicken and top with lettuce, crema, and queso fresco."
  ],
  "notes": "'Gordita' means little fat one. They're a street food from central Mexico (Zacatecas and Querétaro especially) and are traditionally stuffed with chicharrón in green sauce, beans, or guisados (stews).",
  "sourceName": "Rick Bayless / Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "pozole-blanco",
  "title": "Pozole Blanco",
  "description": "The clear-broth, Guerrero-style pozole: tender pork and hominy in a garlicky, herb-scented broth, finished at the table with chile, lime, cabbage, radish, and tostadas.",
  "cuisine": "Mexican",
  "dietTags": [
   "Gluten-Free",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 150,
  "prepMinutes": 25,
  "cookMinutes": 125,
  "difficulty": "Medium",
  "servings": 8,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/32334853/pexels-photo-32334853.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "pork-shoulder",
    "label": "Bone-in pork shoulder, cut into large chunks",
    "amount": "3 lb (1.4 kg)"
   },
   {
    "pantryId": "hominy",
    "label": "Canned white hominy, drained and rinsed",
    "amount": "2 cans (25 oz / 710 g each)"
   },
   {
    "pantryId": "onion",
    "label": "White onion, half quartered, half finely chopped to serve",
    "amount": "1 large"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic head, halved crosswise, plus 3 cloves minced",
    "amount": "1 head + 3 cloves"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "mexican-oregano",
    "label": "Dried Mexican oregano, plus extra to serve",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "cabbage",
    "label": "Green cabbage, shredded, to serve",
    "amount": "2 cups (140 g)"
   },
   {
    "pantryId": "radish",
    "label": "Radishes, thinly sliced, to serve",
    "amount": "6"
   },
   {
    "pantryId": "lime",
    "label": "Limes, in wedges",
    "amount": "3"
   },
   {
    "pantryId": "arbol-chiles",
    "label": "Crushed dried chile de árbol, to serve",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "tostada-shells",
    "label": "Tostadas, to serve",
    "amount": "8"
   }
  ],
  "equipment": [],
  "steps": [
   "Place the pork, quartered onion, halved garlic head, bay leaves, and half the salt in a large pot with 12 cups (2.8 L) water. Bring to a boil, skim the foam, then simmer partly covered 1 1/2 hours.",
   "Add the hominy, oregano, minced garlic, and remaining salt. Simmer 30 minutes more until the pork is falling-apart tender and the hominy has bloomed.",
   "Remove the pork, discard bones and fat, shred the meat, and return it to the pot. Taste and adjust the salt.",
   "Ladle into bowls and serve with cabbage, chopped onion, radish, lime, oregano, crushed chile, and tostadas on the side."
  ],
  "notes": "Pozole blanco is the base from which red and green pozole are made — the chile paste or tomatillo-pumpkin-seed sauce is stirred in. Eating it white lets the pork and corn flavors speak, and each diner adds their own heat.",
  "sourceName": "Rick Bayless / Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "chicken-guacamole-tacos",
  "title": "Chicken and Guacamole Tacos",
  "description": "Seared, spice-rubbed chicken pieces in soft corn tortillas piled with chunky guacamole, onion, and cilantro — the avocado is the sauce.",
  "cuisine": "Mexican",
  "dietTags": [
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Smoky"
  ],
  "timeMinutes": 30,
  "prepMinutes": 15,
  "cookMinutes": 15,
  "difficulty": "Easy",
  "servings": 4,
  "yield": "8 tacos",
  "budget": "$",
  "image": "https://images.pexels.com/photos/36498697/pexels-photo-36498697.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Boneless, skinless chicken breasts, cut into 1-inch pieces",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "chili-powder",
    "label": "Chili powder",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "smoked-paprika",
    "label": "Smoked paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic powder or 2 minced cloves",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, divided",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "avocado",
    "label": "Ripe avocados",
    "amount": "3"
   },
   {
    "pantryId": "lime",
    "label": "Limes, juiced",
    "amount": "2"
   },
   {
    "pantryId": "onion",
    "label": "White onion, finely diced, divided",
    "amount": "1/2 cup (80 g)"
   },
   {
    "pantryId": "cilantro",
    "label": "Fresh cilantro, chopped, divided",
    "amount": "1/3 cup (20 g)"
   },
   {
    "pantryId": "tortillas",
    "label": "Corn tortillas, warmed",
    "amount": "8 (6-inch)"
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the chicken with the chili powder, paprika, garlic, and 1 teaspoon salt.",
   "Heat the oil in a large skillet over medium-high heat. Cook the chicken in a single layer, in batches if needed, 5–6 minutes, turning, until browned and cooked through.",
   "Mash the avocados with the lime juice, 1/4 cup of the onion, half the cilantro, and the remaining salt, leaving the guacamole chunky.",
   "Spread guacamole over each warm tortilla and top with chicken, remaining onion, and cilantro.",
   "Serve with salsa and lime wedges."
  ],
  "notes": "Mash the guacamole just before serving: cut avocado browns within minutes. Lime juice slows the discoloration but doesn't stop it.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "albondigas-en-salsa",
  "title": "Albóndigas en Salsa",
  "description": "Tender pork-and-beef meatballs lightly browned and simmered in a savory sofrito sauce of tomato, white wine, and paprika — a tapa and a family supper.",
  "cuisine": "Spanish",
  "dietTags": [
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Smoky"
  ],
  "timeMinutes": 55,
  "prepMinutes": 25,
  "cookMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "yield": "About 20 meatballs",
  "budget": "$",
  "image": "https://images.pexels.com/photos/34314421/pexels-photo-34314421.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "ground-pork",
    "label": "Ground pork",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "ground-beef",
    "label": "Ground beef",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "breadcrumbs",
    "label": "Fresh or dry breadcrumbs",
    "amount": "1/2 cup (50 g)"
   },
   {
    "pantryId": "milk",
    "label": "Milk, to soak the crumbs",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "eggs",
    "label": "Egg",
    "amount": "1"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced (2 for the meatballs, 2 for the sauce)",
    "amount": "4"
   },
   {
    "pantryId": "parsley",
    "label": "Fresh parsley, chopped",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "smoked-paprika",
    "label": "Smoked paprika, divided",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, divided",
    "amount": "1 3/4 teaspoons"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour, for dredging",
    "amount": "1/3 cup (45 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, divided",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "white-wine",
    "label": "Dry white wine",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "tomato-sauce",
    "label": "Tomato sauce",
    "amount": "1 cup (240 ml)"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "1 cup (240 ml)"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaf",
    "amount": "1"
   },
   {
    "pantryId": "frozen-peas",
    "label": "Peas, optional",
    "amount": "1/2 cup (75 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Soak the breadcrumbs in the milk 5 minutes. Gently mix with the pork, beef, egg, 2 garlic cloves, parsley, 1/2 teaspoon paprika, and 1 teaspoon salt until just combined. Shape into about 20 golf-ball-size meatballs and roll in the flour.",
   "Heat 3 tablespoons of the oil in a wide skillet over medium-high heat. Brown the meatballs in batches 4–5 minutes, turning. Set aside.",
   "In the same pan, heat the remaining oil and cook the onion 8 minutes until soft and golden. Add the remaining garlic and 1/2 teaspoon paprika and cook 1 minute.",
   "Pour in the wine and scrape up the browned bits; boil 2 minutes. Add the tomato sauce, stock, bay leaf, and remaining salt.",
   "Return the meatballs to the pan, partly cover, and simmer 18–20 minutes, turning once, until cooked through and the sauce clings. Add the peas for the last 3 minutes.",
   "Serve with crusty bread to mop up the sauce."
  ],
  "notes": "Albóndigas turn up in tapas bars across Spain, always in sauce. A mix of pork and beef keeps them juicy, and dredging in flour before browning gives the sauce body.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "fideua",
  "title": "Fideuà",
  "description": "Toasted thin noodles simmered in saffron fish stock with seafood until the edges crisp like a paella, served with a dollop of garlicky all-i-oli.",
  "cuisine": "Spanish",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 50,
  "prepMinutes": 15,
  "cookMinutes": 35,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/1251195/pexels-photo-1251195.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "fideo-noodles",
    "label": "Fideo noodles (or broken angel-hair pasta), 1-inch lengths",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, divided",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "squid",
    "label": "Cleaned squid, cut into rings",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "shrimp",
    "label": "Large shrimp, peeled",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced (3 for the sofrito, 1 for the aioli)",
    "amount": "4"
   },
   {
    "pantryId": "tomato",
    "label": "Ripe tomato, grated",
    "amount": "1 large (about 1 cup / 200 g)"
   },
   {
    "pantryId": "paprika",
    "label": "Sweet paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "saffron",
    "label": "Saffron threads, crushed",
    "amount": "Pinch"
   },
   {
    "pantryId": "white-wine",
    "label": "Dry white wine",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "fish-stock",
    "label": "Hot fish stock",
    "amount": "3 cups (720 ml)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "mayonnaise",
    "label": "Mayonnaise (for the all-i-oli)",
    "amount": "1/3 cup (80 g)"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, in wedges",
    "amount": "1"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat 3 tablespoons of the oil in a 12-inch ovenproof skillet over medium heat. Toast the noodles, stirring, 3–4 minutes until deep golden. Transfer to a bowl.",
   "Add the remaining oil, squid, and shrimp; cook 2 minutes and remove the shrimp. Add 3 garlic cloves and the tomato and cook 5 minutes until jammy. Stir in the paprika and saffron.",
   "Pour in the wine and boil 1 minute. Add the hot stock and salt and bring to a boil.",
   "Return the noodles and spread them evenly. Simmer 8 minutes without stirring until most of the liquid is absorbed.",
   "Heat the broiler. Top with the shrimp and broil 3–4 minutes until the top is crisp and golden at the tips.",
   "Stir the remaining garlic into the mayonnaise with a squeeze of lemon. Serve the fideuà from the pan with the all-i-oli and lemon."
  ],
  "notes": "Fideuà was created in Gandia, near Valencia, when a ship's cook swapped noodles for rice. Toasting the fideos first gives a nutty flavor and keeps them from going soft.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "lentejas-con-chorizo",
  "title": "Lentejas Estofadas con Chorizo",
  "description": "A thick, smoky Spanish lentil stew simmered with chorizo, potato, carrot, and pimentón — everyday comfort food from every home kitchen in Spain.",
  "cuisine": "Spanish",
  "dietTags": [
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Smoky"
  ],
  "timeMinutes": 60,
  "prepMinutes": 15,
  "cookMinutes": 45,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/31372406/pexels-photo-31372406.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "spanish-chorizo",
    "label": "Spanish chorizo, sliced 1/4 inch thick",
    "amount": "5 oz (140 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "carrot",
    "label": "Carrots, diced",
    "amount": "2 medium"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Green bell pepper, diced",
    "amount": "1"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "3"
   },
   {
    "pantryId": "smoked-paprika",
    "label": "Smoked paprika (pimentón)",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "green-lentils",
    "label": "Brown or green lentils (pardina), rinsed",
    "amount": "1 1/2 cups (300 g)"
   },
   {
    "pantryId": "potato",
    "label": "Potatoes, peeled and cut in 3/4-inch cubes",
    "amount": "2 medium (about 12 oz / 340 g)"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock or water",
    "amount": "5 cups (1.2 L)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon, to taste"
   },
   {
    "pantryId": "sherry-vinegar",
    "label": "Sherry vinegar, to finish",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat the oil in a Dutch oven over medium heat. Fry the chorizo 3–4 minutes until it releases its red oil and the edges crisp. Lift out half and set aside for garnish.",
   "Add the onion, carrots, and pepper and cook 8 minutes until soft. Add the garlic and cook 1 minute, then stir in the paprika for 15 seconds.",
   "Add the lentils, potatoes, bay leaves, and stock. Bring to a boil, reduce to a gentle simmer, cover partly, and cook 30–35 minutes until the lentils are tender and the broth has thickened.",
   "Mash a few spoonfuls of lentils against the side of the pot to thicken. Season with salt and the sherry vinegar.",
   "Rest 10 minutes (it thickens and improves), then serve topped with the reserved chorizo."
  ],
  "notes": "Spanish lentil stew is better the next day. Use cured Spanish chorizo, not fresh Mexican chorizo, and don't salt until the lentils are nearly tender.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "pisto-manchego",
  "title": "Pisto Manchego",
  "description": "Slow-cooked tomato, peppers, zucchini, and onion in olive oil — La Mancha's answer to ratatouille, served with a fried egg or crusty bread.",
  "cuisine": "Spanish",
  "dietTags": [
   "Vegan",
   "Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 60,
  "prepMinutes": 15,
  "cookMinutes": 45,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/18109102/pexels-photo-18109102.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, diced",
    "amount": "1 large"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Green bell peppers, diced",
    "amount": "2"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "3"
   },
   {
    "pantryId": "zucchini",
    "label": "Zucchini, diced into 1/2-inch cubes",
    "amount": "2 medium (about 1 lb / 450 g)"
   },
   {
    "pantryId": "tomato",
    "label": "Ripe tomatoes, peeled and chopped (or 1 can crushed)",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar, to cut acidity",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon, to taste"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs, fried, to serve",
    "amount": "4",
    "optional": true
   },
   {
    "pantryId": "sourdough-bread",
    "label": "Crusty bread, to serve",
    "amount": "4 slices"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat the oil in a wide skillet over medium heat. Cook the onion and peppers with 1/2 teaspoon salt 12 minutes until soft and golden. Add the garlic for 1 minute.",
   "Add the zucchini and cook 8 minutes until it starts to soften.",
   "Stir in the tomatoes, sugar, and remaining salt. Simmer on low, partly covered, 25–30 minutes, stirring occasionally, until the vegetables are very tender and the oil rises to the surface.",
   "Taste and adjust seasoning. Serve warm or at room temperature with fried eggs on top and bread alongside."
  ],
  "notes": "Pisto is cooked slowly — no rushing — so the vegetables keep their shape but melt together. It keeps 4 days in the fridge and makes a great filling for empanadas.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "tarta-de-queso-vasca",
  "title": "Tarta de Queso Vasca (Basque Burnt Cheesecake)",
  "description": "A crustless cheesecake baked at very high heat until the top is deeply burnished and the center stays creamy and almost molten — born in San Sebastián.",
  "cuisine": "Spanish",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Sweet",
   "Rich & Indulgent"
  ],
  "timeMinutes": 100,
  "prepMinutes": 15,
  "cookMinutes": 50,
  "marinateMinutes": 240,
  "difficulty": "Easy",
  "servings": 8,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/6168373/pexels-photo-6168373.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "cream-cheese",
    "label": "Full-fat cream cheese, room temperature",
    "amount": "24 oz (680 g)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Large eggs, room temperature",
    "amount": "5"
   },
   {
    "pantryId": "heavy-cream",
    "label": "Heavy cream",
    "amount": "1 1/4 cups (300 ml)"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "2 tablespoons (16 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "vanilla-extract",
    "label": "Vanilla extract",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 425°F (220°C). Line a 9-inch springform pan with two crisscrossed sheets of parchment, letting it stand 2 inches above the rim (creases are fine).",
   "Beat the cream cheese and sugar until smooth. Add the eggs one at a time, mixing after each.",
   "Beat in the cream, vanilla, and salt, then sift in the flour and mix just until combined. The batter will be thin.",
   "Pour into the pan and bake 45–50 minutes until the top is deep brown and blistered but the center still jiggles like gelatin.",
   "Cool completely in the pan (it will sink and wrinkle), then chill at least 4 hours. Serve at room temperature."
  ],
  "notes": "Created at La Viña in San Sebastián. The 'burnt' top is the point — it adds bitter-caramel notes against the creamy center. Don't open the oven in the first 35 minutes.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "aceitunas-alinadas",
  "title": "Aceitunas Aliñadas (Marinated Olives)",
  "description": "Green and black olives tossed with garlic, orange peel, thyme, and sherry vinegar — the first thing set on the table in any Spanish bar.",
  "cuisine": "Spanish",
  "dietTags": [
   "Vegan",
   "Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Tangy",
   "Fresh & Light"
  ],
  "timeMinutes": 130,
  "prepMinutes": 10,
  "cookMinutes": 0,
  "marinateMinutes": 120,
  "difficulty": "Easy",
  "servings": 6,
  "budget": "$",
  "image": "https://images.pexels.com/photos/37894575/pexels-photo-37894575.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "olives",
    "label": "Mixed green and black olives, rinsed and drained",
    "amount": "3 cups (about 1 lb / 450 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, lightly smashed",
    "amount": "3"
   },
   {
    "pantryId": "orange",
    "label": "Orange, peel only in wide strips",
    "amount": "1"
   },
   {
    "pantryId": "dried-thyme",
    "label": "Dried thyme (or fresh thyme sprigs)",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaf",
    "amount": "1"
   },
   {
    "pantryId": "chili-flakes",
    "label": "Chile flakes (optional)",
    "amount": "1/4 teaspoon",
    "optional": true
   },
   {
    "pantryId": "sherry-vinegar",
    "label": "Sherry vinegar",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "olive-oil",
    "label": "Extra-virgin olive oil",
    "amount": "1/3 cup (80 ml)"
   }
  ],
  "equipment": [],
  "steps": [
   "Lightly crack any whole olives with the flat of a knife so the marinade can get inside.",
   "Combine the olives with the garlic, orange peel, thyme, bay leaf, chile flakes, vinegar, and olive oil in a bowl or jar.",
   "Toss well. Cover and marinate at room temperature at least 2 hours, or refrigerate up to 1 week, shaking occasionally.",
   "Bring to room temperature before serving, with a bowl on the side for pits."
  ],
  "notes": "Spanish olive varieties like manzanilla, gordal, and arbequina are classic. Don't add salt — olives are already brined.",
  "sourceName": "Serious Eats",
  "sourceUrl": "https://www.seriouseats.com/"
 },
 {
  "id": "tom-yum-goong",
  "title": "Tom Yum Goong (Hot and Sour Prawn Soup)",
  "description": "Thailand's iconic hot-and-sour soup: prawns in a lemongrass, galangal, and kaffir-lime broth with mushrooms, tomato, chili, and a bright squeeze of lime.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy",
   "Herby"
  ],
  "timeMinutes": 35,
  "prepMinutes": 15,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/34699478/pexels-photo-34699478.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "prawns",
    "label": "Large shell-on prawns (heads on if possible)",
    "amount": "12 oz (340 g), about 10"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken or shrimp stock",
    "amount": "5 cups (1.2 L)"
   },
   {
    "pantryId": "lemongrass",
    "label": "Lemongrass stalks, bottom halves bruised and cut in 2-inch pieces",
    "amount": "3"
   },
   {
    "pantryId": "galangal",
    "label": "Galangal, sliced in thin coins",
    "amount": "6 slices (about 1-inch piece)"
   },
   {
    "pantryId": "kaffir-lime-leaves",
    "label": "Kaffir lime leaves, torn",
    "amount": "5"
   },
   {
    "pantryId": "shallot",
    "label": "Shallots, halved",
    "amount": "2"
   },
   {
    "pantryId": "thai-chili",
    "label": "Thai bird's eye chilies, smashed",
    "amount": "4 to 6"
   },
   {
    "pantryId": "mushrooms",
    "label": "Straw or button mushrooms, halved",
    "amount": "6 oz (170 g)"
   },
   {
    "pantryId": "tomato",
    "label": "Small tomatoes, quartered",
    "amount": "2"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "lime",
    "label": "Fresh lime juice",
    "amount": "3 tablespoons (about 2 limes)"
   },
   {
    "pantryId": "cilantro",
    "label": "Cilantro leaves and stems, chopped",
    "amount": "1/4 cup"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Evaporated or coconut milk, for creamy \"nam khon\" style",
    "amount": "2 tablespoons",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Peel the prawns, leaving the tails on. Reserve the shells and heads.",
   "Simmer the stock with the lemongrass, galangal, lime leaves, shallots, and prawn shells and heads 10 minutes. Strain, discarding the shells (keep the aromatics in the soup if you like).",
   "Return the broth to a simmer. Add the mushrooms and tomatoes and cook 3 minutes.",
   "Add the prawns and chilies and simmer 2 minutes until the prawns are pink and curled.",
   "Off the heat, stir in the fish sauce and lime juice (and the milk if using). Taste and adjust to be hot, sour, and salty.",
   "Garnish with cilantro and serve immediately. Eat around the lemongrass, galangal, and lime leaves."
  ],
  "notes": "Add the lime juice off the heat, since cooking dulls its brightness. The woody lemongrass, galangal, and lime leaves are flavor, not food; diners push them aside.",
  "sourceName": "Hot Thai Kitchen",
  "sourceUrl": "https://hot-thai-kitchen.com/"
 },
 {
  "id": "khao-soi",
  "title": "Khao Soi (Northern Thai Curry Noodle Soup)",
  "description": "Chiang Mai's signature: egg noodles in a rich, mild coconut curry broth with tender chicken, topped with crispy fried noodles, pickled greens, shallots, and lime.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Spicy",
   "Comforting"
  ],
  "timeMinutes": 50,
  "prepMinutes": 20,
  "cookMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/7361022/pexels-photo-7361022.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "coconut-milk-can",
    "label": "Full-fat coconut milk (do not shake the can)",
    "amount": "1 can (13.5 oz / 400 ml)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, plus more for frying noodles",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "red-curry-paste",
    "label": "Thai red curry paste",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin (or curry powder)",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "chicken-thigh",
    "label": "Bone-in or boneless chicken thighs",
    "amount": "1 1/4 lb (570 g)"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "3 cups (720 ml)"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "palm-sugar",
    "label": "Palm sugar (or brown sugar)",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "egg-noodles",
    "label": "Fresh or dried egg noodles, divided",
    "amount": "12 oz (340 g)"
   },
   {
    "pantryId": "shallot",
    "label": "Shallots, thinly sliced, to serve",
    "amount": "2"
   },
   {
    "pantryId": "mustard-greens",
    "label": "Pickled mustard greens, chopped, to serve",
    "amount": "1/4 cup",
    "optional": true
   },
   {
    "pantryId": "lime",
    "label": "Lime wedges",
    "amount": "2"
   },
   {
    "pantryId": "chili-oil",
    "label": "Chili oil or chili paste, to serve",
    "amount": "2 teaspoons",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Cook 3 ounces (85 g) of the noodles in 2 inches of hot oil (350°F / 175°C) 30–60 seconds until puffed and golden. Drain on paper towels; these are your crispy topping.",
   "Spoon the thick cream from the top of the coconut milk into a pot over medium heat. Cook 3–4 minutes until it separates. Fry the curry paste, turmeric, and cumin in it 2 minutes.",
   "Add the chicken, stir to coat, then pour in the rest of the coconut milk and the stock. Simmer gently, partly covered, 20–25 minutes until the chicken is very tender.",
   "Season the broth with the fish sauce, palm sugar, and soy sauce. Shred the chicken if you like and return to the pot.",
   "Boil the remaining noodles according to package directions, 2–3 minutes, and divide among bowls.",
   "Ladle the curry broth and chicken over the noodles. Top with crispy noodles, shallots, pickled greens, and chili oil, with lime to squeeze over."
  ],
  "notes": "Khao soi shows Burmese and Chinese Muslim influence. The contrast of soft boiled noodles, crispy fried noodles, creamy broth, and sharp pickles is the whole point.",
  "sourceName": "Hot Thai Kitchen",
  "sourceUrl": "https://hot-thai-kitchen.com/"
 },
 {
  "id": "yam-woon-sen",
  "title": "Yam Woon Sen (Thai Glass Noodle Salad)",
  "description": "Slippery glass noodles tossed with shrimp, minced pork, tomatoes, celery, and herbs in a hot, sour, salty-sweet lime dressing.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy",
   "Fresh & Light"
  ],
  "timeMinutes": 30,
  "prepMinutes": 20,
  "cookMinutes": 10,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/34699468/pexels-photo-34699468.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "glass-noodles",
    "label": "Dried glass (mung bean) noodles",
    "amount": "3 oz (85 g)"
   },
   {
    "pantryId": "shrimp",
    "label": "Medium shrimp, peeled",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "ground-pork",
    "label": "Ground pork",
    "amount": "4 oz (115 g)"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "lime",
    "label": "Fresh lime juice",
    "amount": "4 tablespoons (about 3 limes)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "thai-chili",
    "label": "Thai chilies, finely chopped",
    "amount": "2 to 4"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "2"
   },
   {
    "pantryId": "shallot",
    "label": "Shallot, thinly sliced",
    "amount": "1 large"
   },
   {
    "pantryId": "celery",
    "label": "Celery stalks, thinly sliced",
    "amount": "2"
   },
   {
    "pantryId": "cherry-tomato",
    "label": "Cherry tomatoes, halved",
    "amount": "8"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced",
    "amount": "2"
   },
   {
    "pantryId": "cilantro",
    "label": "Cilantro, chopped",
    "amount": "1/4 cup"
   },
   {
    "pantryId": "peanuts",
    "label": "Roasted peanuts, crushed",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Soak the noodles in warm water 10 minutes, then drop into boiling water for 1 minute until tender and translucent. Drain, rinse with cold water, drain very well, and snip into shorter lengths.",
   "Whisk the fish sauce, lime juice, sugar, chilies, and garlic until the sugar dissolves.",
   "Poach the shrimp in simmering water 1–2 minutes until pink; remove. In the same water, cook the pork 2 minutes, breaking it up, and drain.",
   "Toss the noodles, shrimp, pork, shallot, celery, tomatoes, and scallions with the dressing.",
   "Fold in the cilantro, top with peanuts, and serve at room temperature or cold."
  ],
  "notes": "Dress the noodles while still slightly warm so they absorb the flavors. The salad keeps well for a few hours, making it a good make-ahead dish.",
  "sourceName": "Hot Thai Kitchen",
  "sourceUrl": "https://hot-thai-kitchen.com/"
 },
 {
  "id": "bun-cha-hanoi",
  "title": "Bún Chả (Hanoi Grilled Pork with Noodles)",
  "description": "Hanoi's famous lunch: charcoal-style grilled pork patties and belly slices in a sweet-sour fish sauce broth with rice vermicelli, pickled green papaya, and heaps of fresh herbs.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Tangy",
   "Smoky",
   "Herby"
  ],
  "timeMinutes": 110,
  "prepMinutes": 30,
  "cookMinutes": 20,
  "marinateMinutes": 60,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/3858270/pexels-photo-3858270.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "ground-pork",
    "label": "Ground pork (20% fat)",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "pork-belly",
    "label": "Pork belly, sliced 1/4-inch thick",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "shallot",
    "label": "Shallots, minced",
    "amount": "3"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "4"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce, divided",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar, divided",
    "amount": "1/3 cup (65 g)"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "honey",
    "label": "Honey (for the glaze)",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "lime",
    "label": "Lime juice (for the dipping broth)",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, thinly sliced (for the dipping broth)",
    "amount": "1 small"
   },
   {
    "pantryId": "green-papaya",
    "label": "Green papaya or kohlrabi, thinly sliced",
    "amount": "1/2 cup",
    "optional": true
   },
   {
    "pantryId": "rice-vermicelli",
    "label": "Rice vermicelli",
    "amount": "10 oz (285 g) dry"
   },
   {
    "pantryId": "lettuce",
    "label": "Lettuce, mint, perilla, and cilantro, mixed",
    "amount": "1 large handful per person"
   },
   {
    "pantryId": "thai-chili",
    "label": "Thai chilies, sliced",
    "amount": "2"
   }
  ],
  "equipment": [],
  "steps": [
   "Mix the ground pork with half of the shallots and garlic, 2 tablespoons fish sauce, 1 tablespoon sugar, pepper, and honey. Marinate the pork belly separately with the remaining shallot, garlic, 1 tablespoon fish sauce, and 1 tablespoon sugar for at least 1 hour.",
   "Make the dipping broth: dissolve the remaining sugar in 1 cup warm water, then add the remaining fish sauce, lime juice, chilies, carrot, and papaya. Taste. It should be sweet, sour, and salty.",
   "Shape the ground pork into 1 1/2-inch patties, about 16.",
   "Grill the patties and belly slices over medium-high heat (or in a hot grill pan) 3–4 minutes per side, until charred and cooked through.",
   "Cook the vermicelli per package directions, rinse, and drain.",
   "Serve the grilled pork submerged in the dipping broth, with a plate of noodles and herbs on the side. Dip noodles and herbs into the bowl with each bite."
  ],
  "notes": "Bún chả was famously eaten by Barack Obama and Anthony Bourdain in Hanoi. The dipping broth is meant to be served lukewarm, not hot.",
  "sourceName": "Viet World Kitchen",
  "sourceUrl": "https://www.vietworldkitchen.com/"
 },
 {
  "id": "banh-xeo",
  "title": "Bánh Xèo (Sizzling Vietnamese Crepes)",
  "description": "Giant crisp, turmeric-yellow rice-flour crepes made with coconut milk and filled with pork, shrimp, and bean sprouts, wrapped in lettuce and herbs and dunked in nước chấm.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Herby"
  ],
  "timeMinutes": 60,
  "prepMinutes": 30,
  "cookMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/37385916/pexels-photo-37385916.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "rice-flour",
    "label": "Rice flour",
    "amount": "1 cup (150 g)"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Coconut milk",
    "amount": "3/4 cup (180 ml)"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, thinly sliced",
    "amount": "3"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "pork-belly",
    "label": "Pork belly or shoulder, thinly sliced",
    "amount": "6 oz (170 g)"
   },
   {
    "pantryId": "shrimp",
    "label": "Medium shrimp, peeled",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, thinly sliced",
    "amount": "1 small"
   },
   {
    "pantryId": "bean-sprouts",
    "label": "Bean sprouts",
    "amount": "2 cups (6 oz / 170 g)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, for cooking",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "lettuce",
    "label": "Lettuce leaves, mint, and Thai basil, for wrapping",
    "amount": "1 large head"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce (for the dipping sauce)",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar (for the dipping sauce)",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "lime",
    "label": "Lime juice (for the dipping sauce)",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic clove, minced (for the dipping sauce)",
    "amount": "1",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Whisk the rice flour, coconut milk, turmeric, salt, scallions, and 1 1/4 cups (300 ml) cold water into a thin, smooth batter. Rest 30 minutes.",
   "Make the dipping sauce: stir the fish sauce, sugar, lime juice, and 1/2 cup warm water until dissolved; add chili and garlic if you like.",
   "Heat 1 tablespoon oil in a 10-inch nonstick skillet over medium-high heat. Cook a few slices of pork, 3 shrimp, and some onion for 2 minutes.",
   "Stir the batter, then pour about 1/2 cup into the pan, swirling to coat thinly; it should sizzle loudly. Scatter a handful of bean sprouts on half.",
   "Cover for 2 minutes, then uncover and cook 3–4 minutes more, drizzling oil around the edge, until the underside is deep golden and crisp.",
   "Fold in half, slide onto a plate, and serve immediately. Tear off pieces, wrap in lettuce with herbs, and dip."
  ],
  "notes": "'Xèo' is the sizzle sound the batter makes when poured into the hot pan. A thin batter and a very hot pan give the lacy crisp edges. Stir the batter before each crepe, as the flour settles.",
  "sourceName": "Viet World Kitchen",
  "sourceUrl": "https://www.vietworldkitchen.com/"
 },
 {
  "id": "gado-gado",
  "title": "Gado-Gado (Indonesian Vegetable Salad with Peanut Sauce)",
  "description": "Blanched vegetables, potatoes, tofu, tempeh, and boiled eggs dressed in a thick, garlicky peanut sauce, Indonesia's best-loved warm salad.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 55,
  "prepMinutes": 30,
  "cookMinutes": 25,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/31336123/pexels-photo-31336123.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "peanuts",
    "label": "Roasted unsalted peanuts",
    "amount": "3/4 cup (110 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves",
    "amount": "2"
   },
   {
    "pantryId": "thai-chili",
    "label": "Red chilies",
    "amount": "2"
   },
   {
    "pantryId": "palm-sugar",
    "label": "Palm sugar (or brown sugar)",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "tamarind",
    "label": "Tamarind paste",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "kecap-manis",
    "label": "Kecap manis",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Coconut milk",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "potato",
    "label": "Waxy potatoes, boiled and sliced",
    "amount": "2 medium"
   },
   {
    "pantryId": "green-beans",
    "label": "Green beans, cut in 2-inch lengths",
    "amount": "4 oz (115 g)"
   },
   {
    "pantryId": "cabbage",
    "label": "Cabbage, shredded",
    "amount": "2 cups"
   },
   {
    "pantryId": "bean-sprouts",
    "label": "Bean sprouts",
    "amount": "1 cup"
   },
   {
    "pantryId": "cucumber",
    "label": "Cucumber, sliced",
    "amount": "1"
   },
   {
    "pantryId": "eggs",
    "label": "Hard-boiled eggs, halved",
    "amount": "3"
   },
   {
    "pantryId": "tofu",
    "label": "Firm tofu, fried until golden and cubed",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "tempeh",
    "label": "Tempeh, sliced and fried (optional)",
    "amount": "4 oz (115 g)",
    "optional": true
   },
   {
    "pantryId": "fried-shallots",
    "label": "Crispy fried shallots",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Boil the potatoes in salted water 15 minutes until tender; cool and slice. Blanch the green beans 2 minutes, the cabbage 30 seconds, and the bean sprouts 15 seconds; refresh in ice water and drain.",
   "Pan-fry the tofu (and tempeh) in a little oil until golden on all sides.",
   "Pound or blend the peanuts, garlic, chilies, palm sugar, tamarind, and salt to a coarse paste. Transfer to a small pan with the coconut milk and 1/2 cup water, and simmer 5 minutes, stirring, until thick and glossy. Stir in the kecap manis.",
   "Arrange the vegetables, potatoes, tofu, tempeh, eggs, and cucumber on a platter.",
   "Spoon the warm peanut sauce over and finish with fried shallots. Serve with prawn crackers (krupuk) if you like."
  ],
  "notes": "'Gado-gado' means 'mix-mix'. The vegetables vary by region; add whatever is fresh, like spinach, long beans, or chayote. Store the sauce separately and thin with warm water when needed.",
  "sourceName": "Indonesia Eats",
  "sourceUrl": "https://www.indonesiaeats.com/"
 },
 {
  "id": "sayur-lodeh",
  "title": "Sayur Lodeh (Javanese Vegetable Coconut Curry)",
  "description": "A mild, golden vegetable stew of cabbage, long beans, eggplant, and tofu simmered in a coconut milk broth with lemongrass, galangal, and shallots. Everyday Javanese comfort.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Herby"
  ],
  "timeMinutes": 45,
  "prepMinutes": 20,
  "cookMinutes": 25,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/37107034/pexels-photo-37107034.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "coconut-milk-can",
    "label": "Coconut milk",
    "amount": "1 can (13.5 oz / 400 ml) plus 1 cup (240 ml) water"
   },
   {
    "pantryId": "shallot",
    "label": "Shallots",
    "amount": "4"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves",
    "amount": "3"
   },
   {
    "pantryId": "candlenuts",
    "label": "Candlenuts (or macadamia nuts)",
    "amount": "3"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "galangal",
    "label": "Galangal, bruised, 1-inch piece",
    "amount": "1"
   },
   {
    "pantryId": "lemongrass",
    "label": "Lemongrass stalk, bruised",
    "amount": "1"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "tofu",
    "label": "Firm tofu, cubed and fried",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "eggplant",
    "label": "Eggplant, cut in chunks",
    "amount": "1 small"
   },
   {
    "pantryId": "green-beans",
    "label": "Long beans or green beans, in 2-inch lengths",
    "amount": "4 oz (115 g)"
   },
   {
    "pantryId": "cabbage",
    "label": "Cabbage, cut in chunks",
    "amount": "2 cups"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, sliced",
    "amount": "1"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon, to taste"
   },
   {
    "pantryId": "palm-sugar",
    "label": "Palm sugar",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Blend the shallots, garlic, candlenuts, turmeric, and coriander into a smooth paste with a splash of water.",
   "Fry the paste in 1 tablespoon oil in a pot for 3 minutes until fragrant. Add the galangal, lemongrass, and bay leaves.",
   "Pour in the coconut milk and 1 cup water and bring to a gentle simmer; do not boil hard.",
   "Add the carrot and eggplant; simmer 8 minutes. Add the long beans and tofu; simmer 5 minutes more.",
   "Add the cabbage, salt, and sugar and cook 3–4 minutes until the vegetables are tender.",
   "Serve with steamed rice and sambal."
  ],
  "notes": "Sayur lodeh is traditionally served with lontong (rice cakes) or rice. Keep the heat low once the coconut milk goes in, to avoid splitting.",
  "sourceName": "Indonesia Eats",
  "sourceUrl": "https://www.indonesiaeats.com/"
 },
 {
  "id": "char-kway-teow",
  "title": "Char Kway Teow (Penang Stir-Fried Flat Noodles)",
  "description": "Smoky, wok-charred flat rice noodles with prawns, Chinese sausage, egg, bean sprouts, and chives in a savory-sweet soy sauce, Penang's famous street noodles.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Spicy"
  ],
  "timeMinutes": 25,
  "prepMinutes": 15,
  "cookMinutes": 10,
  "difficulty": "Medium",
  "servings": 2,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/38467981/pexels-photo-38467981.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "rice-noodles",
    "label": "Fresh flat rice noodles (1/2-inch wide)",
    "amount": "10 oz (285 g)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil (or lard), divided",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "3"
   },
   {
    "pantryId": "chinese-sausage",
    "label": "Chinese sausage, thinly sliced",
    "amount": "2 links"
   },
   {
    "pantryId": "shrimp",
    "label": "Large shrimp, peeled",
    "amount": "8"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs",
    "amount": "2"
   },
   {
    "pantryId": "bean-sprouts",
    "label": "Bean sprouts",
    "amount": "1 cup"
   },
   {
    "pantryId": "scallion",
    "label": "Garlic chives or scallions, cut in 2-inch lengths",
    "amount": "4"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Light soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "dark-soy-sauce",
    "label": "Dark soy sauce",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "oyster-sauce",
    "label": "Oyster sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "sambal-oelek",
    "label": "Sambal oelek or chili paste",
    "amount": "1 to 2 teaspoons"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper",
    "amount": "1/4 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Separate the noodle strands gently; if cold and stiff, microwave 30 seconds. Mix the light and dark soy sauces, oyster sauce, chili paste, and white pepper.",
   "Heat 2 tablespoons oil in a very hot wok until smoking. Fry the garlic and sausage 20 seconds, then add the shrimp and cook 1 minute.",
   "Push aside, add the remaining oil, and crack in the eggs; scramble partially.",
   "Add the noodles and sauce. Toss constantly over highest heat 2 minutes, letting the noodles char in places.",
   "Add the bean sprouts and chives and toss 30 seconds only. Serve immediately."
  ],
  "notes": "The signature is wok hei, a smoky char from very high heat. Cook one or two portions at a time and keep the noodles moving. Cockles and lard are traditional in Penang.",
  "sourceName": "Rasa Malaysia",
  "sourceUrl": "https://rasamalaysia.com/"
 },
 {
  "id": "penang-prawn-mee",
  "title": "Penang Hokkien Prawn Mee",
  "description": "Penang's signature noodle soup: a deep, orange broth of prawn heads and pork ribs with dried chili, ladled over yellow noodles and vermicelli with prawns, egg, kangkung, and crispy shallots.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 105,
  "prepMinutes": 30,
  "cookMinutes": 75,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/36981580/pexels-photo-36981580.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "prawns",
    "label": "Medium shell-on prawns (heads on if possible)",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "pork-ribs",
    "label": "Pork ribs, cut in pieces",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "dried-red-chili",
    "label": "Dried red chilies, soaked",
    "amount": "12"
   },
   {
    "pantryId": "shallot",
    "label": "Shallots",
    "amount": "5"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves",
    "amount": "5"
   },
   {
    "pantryId": "dried-shrimp",
    "label": "Dried shrimp, soaked",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "palm-sugar",
    "label": "Palm sugar",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon, to taste"
   },
   {
    "pantryId": "egg-noodles",
    "label": "Yellow egg noodles",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "rice-vermicelli",
    "label": "Thin rice vermicelli",
    "amount": "4 oz (115 g)"
   },
   {
    "pantryId": "water-spinach",
    "label": "Water spinach (kangkung), cut in 3-inch pieces",
    "amount": "1 bunch"
   },
   {
    "pantryId": "bean-sprouts",
    "label": "Bean sprouts",
    "amount": "1 cup"
   },
   {
    "pantryId": "eggs",
    "label": "Hard-boiled eggs, halved",
    "amount": "2"
   },
   {
    "pantryId": "fried-shallots",
    "label": "Crispy fried shallots",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Peel the prawns, leaving the heads and shells in a bowl. Keep the peeled prawns for later.",
   "Fry the shells and heads in 1 tablespoon oil 5 minutes until orange and fragrant. Add the ribs and 8 cups (1.9 L) water, bring to a boil, and simmer 45 minutes.",
   "Blend the soaked chilies, shallots, garlic, and dried shrimp into a paste. Fry in 2 tablespoons oil 8 minutes until the oil separates.",
   "Strain the broth, discard the shells (keep the ribs), and stir in the chili paste, palm sugar, and salt. Simmer 10 minutes.",
   "Poach the peeled prawns in the broth 2 minutes until pink; remove. Blanch the noodles, vermicelli, kangkung, and sprouts.",
   "Divide among bowls, top with prawns, ribs, egg, and crispy shallots, and ladle the hot broth over."
  ],
  "notes": "The broth gets its sweetness from prawn heads, so don't skip them. The chili paste is added at the end so you can adjust spice. A spoon of sambal on top is traditional.",
  "sourceName": "Rasa Malaysia",
  "sourceUrl": "https://rasamalaysia.com/"
 },
 {
  "id": "bai-sach-chrouk",
  "title": "Bai Sach Chrouk (Cambodian Grilled Pork and Rice)",
  "description": "Cambodia's beloved breakfast: thin slices of pork marinated in coconut milk and garlic, grilled until caramelized, served over rice with pickled vegetables and scallion oil.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Sweet",
   "Smoky"
  ],
  "timeMinutes": 280,
  "prepMinutes": 25,
  "cookMinutes": 15,
  "marinateMinutes": 240,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/5305424/pexels-photo-5305424.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "pork-shoulder",
    "label": "Pork shoulder or loin, sliced thin (1/4-inch)",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Coconut milk",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "5"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "palm-sugar",
    "label": "Palm sugar (or brown sugar)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "jasmine-rice",
    "label": "Jasmine rice",
    "amount": "2 cups (400 g)"
   },
   {
    "pantryId": "cucumber",
    "label": "Cucumber, sliced (for pickles)",
    "amount": "1"
   },
   {
    "pantryId": "daikon",
    "label": "Daikon, julienned (for pickles)",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, julienned (for pickles)",
    "amount": "1 small"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice or white vinegar (for pickles)",
    "amount": "1/3 cup (80 ml)"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar (for pickles)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced, with 2 tablespoons hot oil",
    "amount": "3"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken broth, served on the side",
    "amount": "2 cups",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Mix the pork with the coconut milk, garlic, fish sauce, palm sugar, soy sauce, and pepper. Marinate at least 4 hours or overnight.",
   "Make quick pickles: stir the vinegar, sugar, and 1/3 cup water with 1/2 teaspoon salt until dissolved; pour over the cucumber, daikon, and carrot. Chill at least 30 minutes.",
   "Cook the rice per package directions.",
   "Grill the pork over medium-high heat (or in a grill pan) 2–3 minutes per side, until the edges are charred and the sugars caramelize.",
   "Pour sizzling hot oil over the scallions in a small bowl.",
   "Serve the pork over rice with pickles, a drizzle of scallion oil, and a bowl of hot broth if you like."
  ],
  "notes": "The coconut milk marinade tenderizes the thin pork and gives it a signature sweetness. Bai sach chrouk is sold at street stalls across Phnom Penh every morning.",
  "sourceName": "Traditional Khmer home cooking"
 },
 {
  "id": "hor-mok-pla",
  "title": "Hor Mok Pla (Thai Steamed Fish Curry Custard)",
  "description": "Fish folded into a red-curry coconut custard, steamed in banana-leaf cups until soufflé-soft, then topped with coconut cream and chilies.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Rich & Indulgent"
  ],
  "timeMinutes": 50,
  "prepMinutes": 25,
  "cookMinutes": 25,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/216560/pexels-photo-216560.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "fish",
    "label": "Firm white fish fillet (snapper, cod, or barramundi), cut in 1-inch pieces",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "coconut-milk-can",
    "label": "Full-fat coconut milk, divided",
    "amount": "1 can (13.5 oz / 400 ml)"
   },
   {
    "pantryId": "red-curry-paste",
    "label": "Thai red curry paste",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs",
    "amount": "2"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "palm-sugar",
    "label": "Palm sugar",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "rice-flour",
    "label": "Rice flour",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "kaffir-lime-leaves",
    "label": "Kaffir lime leaves, 2 shredded + 4 for lining cups",
    "amount": "6"
   },
   {
    "pantryId": "cabbage",
    "label": "Napa or green cabbage leaves, shredded",
    "amount": "1 cup"
   },
   {
    "pantryId": "thai-basil",
    "label": "Thai basil leaves",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "banana-leaves",
    "label": "Banana leaf squares (or small ramekins)",
    "amount": "8 cups",
    "optional": true
   },
   {
    "pantryId": "thai-chili",
    "label": "Red chili, sliced, for garnish",
    "amount": "1"
   }
  ],
  "equipment": [],
  "steps": [
   "Skim the thick cream from the top of the coconut milk and reserve 1/3 cup for the topping.",
   "Whisk the remaining coconut milk with the curry paste, eggs, fish sauce, palm sugar, and rice flour until smooth.",
   "Fold in the fish, shredded lime leaves, and basil. Line 4–6 ramekins or banana-leaf cups with a bed of cabbage and divide the mixture among them.",
   "Steam over simmering water, covered, 20–25 minutes until set and puffed.",
   "Warm the reserved coconut cream with a pinch of salt and spoon a little over each cup. Steam 2 minutes more.",
   "Top with chili slivers and a lime leaf and serve with jasmine rice."
  ],
  "notes": "Hor mok has a soft custard texture; don't boil the steaming water hard or the surface will pit. The fish pieces should be chopped small so they're bound by the custard.",
  "sourceName": "Hot Thai Kitchen",
  "sourceUrl": "https://hot-thai-kitchen.com/"
 },
 {
  "id": "cumi-goreng-tepung",
  "title": "Cumi Goreng Tepung (Indonesian Crispy Fried Squid)",
  "description": "Squid rings in a light, seasoned crisp coating, fried golden and served with lime and a chili-garlic sambal for dipping.",
  "cuisine": "South East Asian",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy"
  ],
  "timeMinutes": 35,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/11160095/pexels-photo-11160095.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "squid",
    "label": "Cleaned squid tubes, cut in 1/2-inch rings",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "lime",
    "label": "Lime juice, divided (plus wedges)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced (marinade + sambal)",
    "amount": "4"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "white-pepper",
    "label": "White pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "1/2 cup (65 g)"
   },
   {
    "pantryId": "rice-flour",
    "label": "Rice flour",
    "amount": "1/4 cup (35 g)"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornstarch",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "eggs",
    "label": "Egg, beaten with 2 tablespoons water",
    "amount": "1"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil, for deep frying",
    "amount": "3 cups (720 ml)"
   },
   {
    "pantryId": "sambal-oelek",
    "label": "Sambal oelek (for the dip)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "kecap-manis",
    "label": "Kecap manis (for the dip)",
    "amount": "1 tablespoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the squid with the lime juice, half the garlic, 1/2 teaspoon salt, and the white pepper. Marinate 15 minutes; pat dry.",
   "Whisk the flour, rice flour, cornstarch, and remaining salt in a bowl.",
   "Dip the squid in the egg wash, then the flour mixture, pressing lightly to coat.",
   "Heat the oil to 375°F (190°C). Fry in 3 batches 1 1/2–2 minutes until pale golden and crisp. Drain on a rack and sprinkle with salt.",
   "Stir the sambal oelek with the kecap manis, remaining garlic, and a squeeze of lime for the dip.",
   "Serve immediately with lime wedges."
  ],
  "notes": "Rice flour and cornstarch give the thin, shattering crust. Don't overcrowd the pot; a hot oil temperature prevents greasy coating and rubbery squid.",
  "sourceName": "Indonesia Eats",
  "sourceUrl": "https://www.indonesiaeats.com/"
 },
 {
  "id": "kimchi-bokkeumbap",
  "title": "Kimchi Bokkeumbap (Kimchi Fried Rice)",
  "description": "Day-old rice stir-fried with sour kimchi, a little gochujang, and sesame oil, topped with a runny fried egg and toasted seaweed.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy",
   "Comforting"
  ],
  "timeMinutes": 22,
  "prepMinutes": 10,
  "cookMinutes": 12,
  "difficulty": "Easy",
  "servings": 2,
  "budget": "$",
  "image": "https://images.pexels.com/photos/36505955/pexels-photo-36505955.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil, divided",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "pork-belly",
    "label": "Pork belly or bacon, diced (optional)",
    "amount": "3 oz (85 g)",
    "optional": true
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced (white and green parts separated)",
    "amount": "3"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "2"
   },
   {
    "pantryId": "kimchi",
    "label": "Aged kimchi, chopped",
    "amount": "1 cup (about 150 g)"
   },
   {
    "pantryId": "gochujang",
    "label": "Gochujang",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "rice",
    "label": "Day-old cooked short-grain rice",
    "amount": "3 cups (about 450 g)"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs, fried",
    "amount": "2"
   },
   {
    "pantryId": "nori",
    "label": "Roasted seaweed, crumbled",
    "amount": "1 sheet"
   },
   {
    "pantryId": "sesame-seeds",
    "label": "Toasted sesame seeds",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat 1 tablespoon oil in a large pan or wok over medium-high heat. Cook the pork belly (if using) 3–4 minutes until the fat renders.",
   "Add the scallion whites and garlic and stir 30 seconds. Add the kimchi and sugar and stir-fry 3 minutes until slightly caramelized.",
   "Stir in the gochujang, then add the cold rice, breaking up clumps. Stir-fry 3–4 minutes until the rice is hot and slightly crisp.",
   "Season with the soy sauce and sesame oil.",
   "Fry the eggs in the remaining oil until the whites are crisp and the yolks are runny.",
   "Serve topped with an egg, scallion greens, crumbled seaweed, and sesame seeds."
  ],
  "notes": "The sourer and more aged the kimchi, the better the fried rice. Adding a splash of the kimchi brine gives extra flavor and tang. Day-old rice fries better than fresh.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "dakgalbi",
  "title": "Dakgalbi (Spicy Stir-Fried Chicken)",
  "description": "Chicken, sweet potato, cabbage, and rice cakes stir-fried in a fiery gochujang and gochugaru sauce on a big skillet, finished with perilla leaves — a Chuncheon specialty.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Sweet",
   "Comforting"
  ],
  "timeMinutes": 105,
  "prepMinutes": 20,
  "cookMinutes": 25,
  "marinateMinutes": 60,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/33085044/pexels-photo-33085044.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless chicken thighs, cut in bite-size pieces",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "gochujang",
    "label": "Gochujang",
    "amount": "1/4 cup (65 g)"
   },
   {
    "pantryId": "gochugaru",
    "label": "Gochugaru",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "mirin",
    "label": "Mirin or rice wine",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "6"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "sweet-potato",
    "label": "Sweet potato, cut in 1/2-inch half-moons",
    "amount": "1 large (about 12 oz / 340 g)"
   },
   {
    "pantryId": "cabbage",
    "label": "Cabbage, cut in 2-inch pieces",
    "amount": "1/4 head (about 8 oz / 225 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, sliced",
    "amount": "1"
   },
   {
    "pantryId": "rice-cakes",
    "label": "Cylinder rice cakes (tteok)",
    "amount": "1 cup (about 6 oz / 170 g)"
   },
   {
    "pantryId": "perilla-leaves",
    "label": "Perilla leaves, torn",
    "amount": "10"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Mix the gochujang, gochugaru, soy sauce, sugar, mirin, garlic, ginger, sesame oil, and pepper. Marinate the chicken in half the sauce for 1 hour.",
   "Heat the oil in a large, wide skillet over medium heat. Add the sweet potato and 1/4 cup water, cover, and cook 5 minutes.",
   "Add the chicken and cook 5 minutes, stirring, until browned.",
   "Add the cabbage, onion, and rice cakes with the remaining sauce and 1/4 cup water. Cook, stirring often, 10–12 minutes until the chicken is cooked through, the sweet potato is tender, and the sauce is glossy.",
   "Stir in the perilla leaves and cook 1 minute.",
   "Serve straight from the pan; traditionally finished with fried rice made in the leftover sauce."
  ],
  "notes": "Chuncheon dakgalbi is traditionally cooked at the table on a large iron griddle. Finish it with a scoop of rice, a little seaweed, and sesame oil stir-fried into the sauce for 'bokkeumbap'. Add cheese on top for a popular modern twist.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "samgyetang",
  "title": "Samgyetang (Korean Ginseng Chicken Soup)",
  "description": "A whole young chicken stuffed with sticky rice, garlic, jujubes, and ginseng, simmered until the meat falls from the bone in a clean, restorative broth.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Comforting"
  ],
  "timeMinutes": 105,
  "prepMinutes": 30,
  "cookMinutes": 75,
  "difficulty": "Medium",
  "servings": 2,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/37614802/pexels-photo-37614802.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken",
    "label": "Small whole chicken (Cornish hens or poussin), about 1 3/4 lb each",
    "amount": "2 small (about 1 lb / 450 g each)"
   },
   {
    "pantryId": "sticky-rice",
    "label": "Sweet (glutinous) rice, soaked 1 hour",
    "amount": "1/2 cup (100 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, peeled",
    "amount": "10"
   },
   {
    "pantryId": "jujubes",
    "label": "Dried jujubes",
    "amount": "4"
   },
   {
    "pantryId": "ginseng",
    "label": "Fresh ginseng root (or 1 tablespoon dried ginseng slices)",
    "amount": "1 small root",
    "optional": true
   },
   {
    "pantryId": "ginger",
    "label": "Ginger slices",
    "amount": "4"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, sliced, to serve",
    "amount": "3"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, plus more for dipping",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper, to serve",
    "amount": "1/2 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Rinse the birds inside and out. Drain the soaked rice.",
   "Stuff each cavity with 1/4 cup rice, 2 garlic cloves, 1–2 jujubes, and ginseng if using. Cross the legs and tie them together with kitchen twine to hold in the filling.",
   "Place in a pot just big enough to fit them, add the remaining garlic, ginger, and enough water to cover (about 6 cups / 1.4 L).",
   "Bring to a boil, then reduce to a gentle simmer. Cover and cook 60–70 minutes until the chicken is very tender and the rice is cooked.",
   "Season the broth with salt and pepper. Serve each bird in a bowl of broth, topped with scallions.",
   "Serve with a small dish of salt and pepper for dipping the meat."
  ],
  "notes": "Samgyetang is traditionally eaten on the hottest days of summer (boknal) to 'fight heat with heat'. Use small birds for individual servings; if only large chicken is available, simmer longer and shred the meat.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "japchae",
  "title": "Japchae (Korean Glass Noodles with Vegetables and Beef)",
  "description": "Chewy sweet potato starch noodles tossed in a glossy soy–sesame sauce with beef, spinach, carrots, mushrooms, and peppers — a Korean party and holiday staple.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Sweet",
   "Comforting"
  ],
  "timeMinutes": 55,
  "prepMinutes": 30,
  "cookMinutes": 25,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/2612344/pexels-photo-2612344.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "dangmyeon",
    "label": "Korean sweet potato noodles (dangmyeon)",
    "amount": "8 oz (225 g)"
   },
   {
    "pantryId": "beef-sirloin",
    "label": "Beef sirloin, thinly sliced",
    "amount": "6 oz (170 g)"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce, divided",
    "amount": "5 tablespoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar, divided",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Toasted sesame oil, divided",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "5"
   },
   {
    "pantryId": "spinach",
    "label": "Spinach",
    "amount": "6 oz (170 g)"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, julienned",
    "amount": "1 medium"
   },
   {
    "pantryId": "onion",
    "label": "Onion, thinly sliced",
    "amount": "1 medium"
   },
   {
    "pantryId": "dried-shiitake-mushroom",
    "label": "Shiitake mushrooms, sliced",
    "amount": "6"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Red bell pepper, thinly sliced",
    "amount": "1/2"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Neutral oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "sesame-seeds",
    "label": "Toasted sesame seeds",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon"
   }
  ],
  "equipment": [],
  "steps": [
   "Soak the noodles in warm water 30 minutes, then boil 6–7 minutes until soft and chewy. Drain, rinse, and cut into shorter lengths with scissors.",
   "Toss the noodles with 2 tablespoons soy sauce, 1 tablespoon sugar, and 1 tablespoon sesame oil.",
   "Marinate the beef with 1 tablespoon soy sauce, 1 teaspoon sugar, 1 teaspoon sesame oil, and half the garlic.",
   "Blanch the spinach 30 seconds, squeeze dry, and season with 1 teaspoon sesame oil and a pinch of salt.",
   "Stir-fry the carrot, onion, mushrooms, and pepper in separate batches in a little oil with a pinch of salt, 2 minutes each. Cook the beef 2 minutes.",
   "Combine everything with the noodles in a large pan over low heat. Add the remaining soy sauce, sugar, sesame oil, and garlic. Toss 2–3 minutes until the noodles glisten.",
   "Sprinkle with sesame seeds and serve warm or at room temperature."
  ],
  "notes": "Cooking each vegetable separately keeps their colors and textures distinct. Japchae is served warm or at room temperature and keeps well for a few hours.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "yangnyeom-chicken",
  "title": "Yangnyeom Chicken (Korean Fried Chicken)",
  "description": "Twice-fried, ultra-crispy chicken wings or drumsticks tossed in a sticky sweet-spicy gochujang–garlic glaze, Korea's famous pub food.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Sweet",
   "Rich & Indulgent"
  ],
  "timeMinutes": 85,
  "prepMinutes": 20,
  "cookMinutes": 35,
  "marinateMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/5773996/pexels-photo-5773996.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-wings",
    "label": "Chicken wings (drumettes and flats) or drumsticks",
    "amount": "2 1/2 lb (1.1 kg)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "potato-starch",
    "label": "Potato starch (or cornstarch)",
    "amount": "1 cup (130 g)"
   },
   {
    "pantryId": "all-purpose-flour",
    "label": "All-purpose flour",
    "amount": "1/4 cup (30 g)"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil, for deep frying",
    "amount": "6 cups (1.4 L)"
   },
   {
    "pantryId": "gochujang",
    "label": "Gochujang (glaze)",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "ketchup",
    "label": "Ketchup (glaze)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce (glaze)",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "corn-syrup",
    "label": "Corn syrup or rice syrup (glaze)",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced (glaze)",
    "amount": "4"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice vinegar (glaze)",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "sesame-seeds",
    "label": "Toasted sesame seeds and chopped peanuts, to garnish",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "radish",
    "label": "Pickled radish, to serve",
    "amount": "1 cup (150 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Pat the chicken very dry. Season with the salt and pepper and rest 30 minutes.",
   "Toss the chicken in the potato starch mixed with the flour to coat evenly, pressing the coating on.",
   "Heat the oil to 325°F (160°C). Fry the chicken in batches 10–12 minutes until pale golden and cooked through. Drain on a rack for 10 minutes.",
   "Raise the oil to 375°F (190°C). Fry again in batches 3–4 minutes until deeply golden and crackling crisp. Drain.",
   "For the glaze, simmer the gochujang, ketchup, soy sauce, syrup, garlic, vinegar, and 2 tablespoons water in a large pan 3–4 minutes until thickened and glossy.",
   "Toss the hot chicken in the glaze to coat, sprinkle with sesame seeds, and serve at once, with pickled radish and cold beer."
  ],
  "notes": "The double fry is the secret: the first cooks the chicken, the second dries out the coating so it stays crisp under the glaze. Potato starch gives a thin, glassy crust. For plain 'huraideu' style, skip the glaze and serve with salt.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "baechu-kimchi",
  "title": "Baechu Kimchi (Napa Cabbage Kimchi)",
  "description": "Korea's iconic fermented napa cabbage, salted and layered with a garlicky, gingery paste of gochugaru, fish sauce, and radish, then aged until tangy and fizzy.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy"
  ],
  "timeMinutes": 1500,
  "prepMinutes": 60,
  "cookMinutes": 0,
  "marinateMinutes": 1440,
  "difficulty": "Medium",
  "servings": 12,
  "budget": "$",
  "image": "https://images.pexels.com/photos/8956780/pexels-photo-8956780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "napa-cabbage",
    "label": "Napa cabbage",
    "amount": "2 heads (about 4 lb / 1.8 kg total)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Coarse sea salt (for brining)",
    "amount": "1/2 cup (135 g)"
   },
   {
    "pantryId": "sticky-rice",
    "label": "Sweet rice flour (for the porridge)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar (porridge 1 tablespoon + paste 1 tablespoon)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "gochugaru",
    "label": "Gochugaru",
    "amount": "1/2 cup (50 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "8"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "daikon",
    "label": "Daikon radish, julienned",
    "amount": "1 cup (about 150 g)"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, julienned",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, cut in 1-inch lengths",
    "amount": "6"
   }
  ],
  "equipment": [],
  "steps": [
   "Quarter the cabbages lengthwise, keeping the core intact. Rinse, then sprinkle salt between each leaf. Brine at room temperature for 2 hours, turning every 30 minutes, until the thick parts bend without cracking.",
   "Rinse the cabbage 3 times in cold water and drain, cut side down, 30 minutes.",
   "Make the porridge: whisk the sweet rice flour with 1 cup (240 ml) water and 1 tablespoon sugar over medium heat until it thickens, 3–4 minutes. Cool completely.",
   "Mix the cooled porridge with the gochugaru, garlic, ginger, fish sauce, and remaining sugar into a paste. Fold in the daikon, carrot, and scallions.",
   "Wearing gloves, smear the paste between every leaf of each cabbage quarter. Fold the outer leaf over and pack tightly into a glass jar or container, leaving 1 inch headspace.",
   "Leave at room temperature 1–2 days until it begins to bubble and smell sour, then refrigerate. It's ready to eat fresh, and best after 1–2 weeks."
  ],
  "notes": "Always use non-iodized coarse salt; table salt can inhibit fermentation. Press kimchi under its brine to prevent mold, and use clean utensils. Kimchi keeps for months refrigerated, growing more sour over time.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "kkakdugi",
  "title": "Kkakdugi (Cubed Radish Kimchi)",
  "description": "Crunchy cubes of Korean radish fermented with gochugaru, garlic, ginger, and salted shrimp: a tangy, spicy staple served with soups and stews.",
  "cuisine": "Korean",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Spicy",
   "Tangy"
  ],
  "timeMinutes": 2910,
  "prepMinutes": 30,
  "cookMinutes": 0,
  "marinateMinutes": 2880,
  "difficulty": "Easy",
  "servings": 10,
  "budget": "$",
  "image": "https://images.pexels.com/photos/8956830/pexels-photo-8956830.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "daikon",
    "label": "Korean radish (mu) or daikon, peeled and cut in 3/4-inch cubes",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Coarse sea salt",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar (1 tablespoon to cure, 1 tablespoon in paste)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "gochugaru",
    "label": "Gochugaru",
    "amount": "1/4 cup (25 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "4"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, minced",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "fish-sauce",
    "label": "Fish sauce (or salted shrimp, saeujeot)",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "sticky-rice",
    "label": "Sweet rice flour, cooked into a thin porridge (optional)",
    "amount": "1 tablespoon",
    "optional": true
   },
   {
    "pantryId": "scallion",
    "label": "Scallions, cut in 1-inch lengths",
    "amount": "3"
   }
  ],
  "equipment": [],
  "steps": [
   "Toss the radish cubes with the salt and 1 tablespoon sugar and let stand 30 minutes, tossing once. Drain, keeping a little of the liquid.",
   "Mix the gochugaru into the drained radish first, tossing until the cubes are evenly red.",
   "Add the garlic, ginger, fish sauce, remaining sugar, rice porridge (if using), and scallions; mix well by hand (wear gloves).",
   "Pack tightly into a clean jar, pressing down so the liquid rises, leaving 1 inch headspace.",
   "Leave at room temperature 1–2 days until it smells pleasantly sour and bubbles slightly, then refrigerate.",
   "Eat after 3–4 days refrigerated; it keeps for 2–3 weeks."
  ],
  "notes": "Kkakdugi's crunch is its charm: salt briefly and don't over-ferment. It's traditionally served with seolleongtang and other beef soups. Use Korean radish if you can find it; daikon is the closest substitute.",
  "sourceName": "Maangchi",
  "sourceUrl": "https://www.maangchi.com/"
 },
 {
  "id": "beef-shish-kebab",
  "title": "Beef Shish Kebab",
  "description": "Cubes of beef sirloin marinated in olive oil, garlic, cumin, and paprika, skewered with onion and peppers and grilled until charred outside and pink inside.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky"
  ],
  "timeMinutes": 272,
  "prepMinutes": 20,
  "cookMinutes": 12,
  "marinateMinutes": 240,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/25463406/pexels-photo-25463406.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "beef-sirloin",
    "label": "Beef sirloin or tenderloin, in 1 1/2-inch cubes",
    "amount": "2 lb (900 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "5"
   },
   {
    "pantryId": "lemon",
    "label": "Fresh lemon juice",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "paprika",
    "label": "Sweet paprika",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "allspice",
    "label": "Allspice",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "onion",
    "label": "Onions, cut in 1 1/2-inch wedges",
    "amount": "2"
   },
   {
    "pantryId": "bell-pepper",
    "label": "Bell peppers, cut in 1 1/2-inch squares",
    "amount": "2"
   },
   {
    "pantryId": "pita-bread",
    "label": "Warm pita, to serve",
    "amount": "4"
   },
   {
    "pantryId": "tahini",
    "label": "Tahini sauce, to serve",
    "amount": "1/4 cup (60 g)",
    "optional": true
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Yogurt, to serve",
    "amount": "1/2 cup (120 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Whisk the oil, garlic, lemon juice, cumin, paprika, allspice, salt, and pepper. Toss the beef in the marinade and refrigerate 4 hours.",
   "Thread the beef onto skewers, alternating with onion and pepper.",
   "Grill over high heat (or on a very hot grill pan) 8–10 minutes, turning every 2–3 minutes, for medium-rare to medium.",
   "Rest 3 minutes and serve with pita, rice, and yogurt or tahini sauce."
  ],
  "notes": "Use well-trimmed sirloin or tenderloin. Overcooked beef cubes dry out, so pull them at 130–135°F (54–57°C) for medium.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "kofta-mashwiya",
  "title": "Kofta Mashwiya (Arabic Lamb Kofta Plate)",
  "description": "Seasoned ground lamb and beef with parsley and onion, shaped into long skewers, grilled, and served with fries, grilled tomato, and garlic sauce.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky"
  ],
  "timeMinutes": 32,
  "prepMinutes": 20,
  "cookMinutes": 12,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/6419704/pexels-photo-6419704.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "ground-lamb",
    "label": "Ground lamb",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "ground-beef",
    "label": "Ground beef",
    "amount": "1/2 lb (225 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, grated and drained",
    "amount": "1 small"
   },
   {
    "pantryId": "parsley",
    "label": "Fresh parsley, finely chopped",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "baharat",
    "label": "Baharat",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "tomato",
    "label": "Tomatoes, halved and grilled",
    "amount": "4"
   },
   {
    "pantryId": "potato",
    "label": "French fries, to serve",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "pita-bread",
    "label": "Pita, to serve",
    "amount": "4"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon wedges",
    "amount": "1"
   },
   {
    "pantryId": "garlic-sauce",
    "label": "Garlic sauce (toum), to serve",
    "amount": "1/4 cup (60 g)",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Combine the lamb, beef, onion, parsley, baharat, cumin, salt, and pepper and knead until sticky. Chill 30 minutes.",
   "Shape into 12 long fingers around metal skewers.",
   "Grill over medium-high heat 8–10 minutes, turning, until browned and cooked through.",
   "Grill the tomatoes alongside.",
   "Serve with fries, pita, lemon, and garlic sauce."
  ],
  "notes": "Squeezing excess liquid from the onion prevents the kofta from falling apart. A little fat in the meat blend is important for juiciness.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "chicken-mandi",
  "title": "Chicken Mandi",
  "description": "Tender spiced chicken served over fragrant rice cooked in its stock, topped with fried onions and nuts. A comforting Yemeni and Saudi dish.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Smoky"
  ],
  "timeMinutes": 80,
  "prepMinutes": 20,
  "cookMinutes": 60,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/18698227/pexels-photo-18698227.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken",
    "label": "Whole chicken, quartered (or 3 lb of thighs and drumsticks)",
    "amount": "1 (3 1/2 lb / 1.6 kg)"
   },
   {
    "pantryId": "ghee",
    "label": "Ghee or oil",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "coriander-powder",
    "label": "Ground coriander",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1"
   },
   {
    "pantryId": "cardamom",
    "label": "Cardamom pods",
    "amount": "4"
   },
   {
    "pantryId": "cloves",
    "label": "Whole cloves",
    "amount": "4"
   },
   {
    "pantryId": "dried-limes",
    "label": "Dried lime (loomi), pierced",
    "amount": "1",
    "optional": true
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "basmati-rice",
    "label": "Basmati rice, soaked 30 minutes",
    "amount": "2 cups (400 g)"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "3 cups (720 ml)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, sliced and fried",
    "amount": "1 large"
   },
   {
    "pantryId": "raisins",
    "label": "Raisins and toasted almonds",
    "amount": "1/4 cup each"
   },
   {
    "pantryId": "tomato",
    "label": "Tomato, diced, for salsa",
    "amount": "2",
    "optional": true
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Rub the chicken with 1 tablespoon ghee, half the cumin, coriander, and turmeric, and 1 teaspoon salt.",
   "Roast at 425°F (220°C) 35–40 minutes, until browned and cooked through at 165°F (74°C).",
   "Meanwhile, heat the remaining ghee in a pot and toast the whole spices 30 seconds. Add the drained rice and remaining ground spices, stir 2 minutes, then pour in the stock and remaining salt.",
   "Bring to a boil, cover, and cook on low 15 minutes. Rest 10 minutes and fluff.",
   "Serve the rice on a platter topped with the chicken, fried onions, raisins, and almonds, with tomato salsa."
  ],
  "notes": "Chicken mandi usually cooks on top of the rice in a sealed pit so juices drip down. Roasting the chicken separately and finishing under a broiler gives a similar result at home.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "maqluba",
  "title": "Maqluba (Upside-Down Chicken, Rice and Eggplant)",
  "description": "A showstopper of layered fried eggplant, spiced chicken, and rice cooked in one pot, then flipped onto a platter so it forms a golden dome.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 105,
  "prepMinutes": 30,
  "cookMinutes": 75,
  "difficulty": "Medium",
  "servings": 6,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/7469422/pexels-photo-7469422.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken",
    "label": "Chicken thighs and drumsticks, bone-in",
    "amount": "2 1/2 lb (1.1 kg)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, quartered, plus 1 sliced",
    "amount": "2"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Cinnamon stick",
    "amount": "1"
   },
   {
    "pantryId": "cardamom",
    "label": "Cardamom pods",
    "amount": "3"
   },
   {
    "pantryId": "bay-leaves",
    "label": "Bay leaves",
    "amount": "2"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, divided",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "eggplant",
    "label": "Eggplants, sliced 1/2-inch and fried or roasted",
    "amount": "2 medium"
   },
   {
    "pantryId": "potato",
    "label": "Potato, sliced and fried (optional)",
    "amount": "1",
    "optional": true
   },
   {
    "pantryId": "tomato",
    "label": "Tomatoes, thickly sliced",
    "amount": "3"
   },
   {
    "pantryId": "basmati-rice",
    "label": "Basmati rice, soaked 30 minutes",
    "amount": "2 cups (400 g)"
   },
   {
    "pantryId": "baharat",
    "label": "Baharat",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil, for frying",
    "amount": "1 cup (240 ml)"
   },
   {
    "pantryId": "pine-nuts",
    "label": "Toasted pine nuts and almonds",
    "amount": "1/3 cup"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt and cucumber salad, to serve",
    "amount": "1 cup"
   }
  ],
  "equipment": [],
  "steps": [
   "Boil the chicken with the quartered onion, cinnamon, cardamom, bay, and 1 teaspoon salt in 6 cups (1.4 L) water for 30 minutes. Strain, reserving 4 cups (960 ml) of the stock.",
   "Fry (or oven-roast) the eggplant slices until golden; drain.",
   "In a wide heavy pot, arrange the tomato slices, then the eggplant, then the chicken in layers (sliced onion and potato too if using).",
   "Mix the drained rice with the baharat, turmeric, and 2 teaspoons salt and spread over the top. Pour the hot stock over so it just covers the rice.",
   "Bring to a boil, cover, and cook on low 30–35 minutes until the rice is tender. Rest 15 minutes.",
   "Run a knife around the edge, place a large platter on top, and flip the pot in one confident motion. Rest 5 minutes before lifting the pot. Top with nuts and serve with yogurt."
  ],
  "notes": "'Maqluba' means upside down. Fry the eggplant ahead for flavor and structure. If the flip worries you, press the layers down firmly and let the pot rest well first. A Palestinian, Jordanian, and Syrian classic.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "kuzu-doner-durum",
  "title": "Lamb Döner Dürüm (Wrapped Lamb Döner)",
  "description": "Thinly sliced spiced lamb seared hot and rolled in thin lavash with tomatoes, onions, and sumac, a Turkish fast-food favorite.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Smoky",
   "Rich & Indulgent"
  ],
  "timeMinutes": 275,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "marinateMinutes": 240,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/38337105/pexels-photo-38337105.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "lamb",
    "label": "Boneless lamb leg or shoulder, sliced very thin",
    "amount": "1 3/4 lb (800 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, grated",
    "amount": "1 small"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "4"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "paprika",
    "label": "Sweet paprika",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "aleppo-pepper",
    "label": "Aleppo pepper",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "lavash-bread",
    "label": "Thin lavash or large tortillas",
    "amount": "4"
   },
   {
    "pantryId": "tomato",
    "label": "Tomato, sliced",
    "amount": "2"
   },
   {
    "pantryId": "red-onion",
    "label": "Red onion, sliced and tossed with sumac and parsley",
    "amount": "1"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Garlic yogurt sauce",
    "amount": "1/2 cup"
   }
  ],
  "equipment": [],
  "steps": [
   "Mix the onion, oil, garlic, cumin, paprika, Aleppo pepper, salt, and pepper and coat the lamb slices. Marinate at least 4 hours.",
   "Heat a skillet over high heat and sear the lamb in batches, 2–3 minutes per side, until browned with crisp edges.",
   "Warm the lavash. Place lamb, tomato, and sumac onions down the middle and drizzle with yogurt sauce.",
   "Roll up tightly, folding in the ends, and toast in the dry skillet 1 minute per side."
  ],
  "notes": "Dürüm means 'rolled'. Slice the lamb very thin, and freeze for 30 minutes first to make slicing easier. Pair with ayran and pickled peppers.",
  "sourceName": "Turkish Style Cooking",
  "sourceUrl": "https://www.turkishstylecooking.com/"
 },
 {
  "id": "shawarma-sandwich-fries",
  "title": "Shawarma Sandwich with Fries and Pickles",
  "description": "A pressed pita sandwich stuffed with chicken shawarma, garlic sauce, pickles, and crisp French fries — a Lebanese snack-bar favorite.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Tangy"
  ],
  "timeMinutes": 280,
  "prepMinutes": 20,
  "cookMinutes": 20,
  "marinateMinutes": 240,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/4899787/pexels-photo-4899787.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless chicken thighs, sliced thin",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt",
    "amount": "1/4 cup (60 g)"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon juice",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, minced",
    "amount": "3"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "paprika",
    "label": "Sweet paprika",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Ground cinnamon",
    "amount": "1/4 teaspoon"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "potato",
    "label": "French fries (frozen or homemade)",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "pita-bread",
    "label": "Thin pita or saj bread",
    "amount": "4"
   },
   {
    "pantryId": "garlic-sauce",
    "label": "Garlic sauce (toum)",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "pickles",
    "label": "Pickled cucumbers",
    "amount": "1 cup"
   },
   {
    "pantryId": "tomato",
    "label": "Tomato slices",
    "amount": "2"
   }
  ],
  "equipment": [],
  "steps": [
   "Mix the yogurt, lemon, garlic, cumin, paprika, cinnamon, salt, and 1 tablespoon oil. Marinate the chicken 4 hours.",
   "Bake or fry the fries until golden and crisp.",
   "Sear the chicken in a hot skillet in batches, 4–5 minutes per side, then slice thin.",
   "Spread garlic sauce on a pita, layer chicken, fries, pickles, and tomato, and roll tightly.",
   "Press in a hot dry skillet or sandwich press 1–2 minutes per side until crisp and golden."
  ],
  "notes": "Putting fries inside the sandwich is a Lebanese snack-bar habit. Pressing the roll crisps the bread and seals in the filling.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "kibbeh-baked",
  "title": "Kibbeh bil Sanieh (Baked Lebanese Kibbeh)",
  "description": "Layers of spiced bulgur-and-lamb shell sandwiching a sautéed lamb, onion, and pine nut filling, scored in diamonds and baked until golden.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Comforting",
   "Rich & Indulgent"
  ],
  "timeMinutes": 95,
  "prepMinutes": 50,
  "cookMinutes": 45,
  "difficulty": "Advanced",
  "servings": 8,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/6497870/pexels-photo-6497870.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "bulgur",
    "label": "Fine bulgur wheat, soaked 15 minutes in cold water and drained",
    "amount": "1 cup (170 g)"
   },
   {
    "pantryId": "ground-lamb",
    "label": "Lean ground lamb (very finely ground, for shell)",
    "amount": "1 lb (450 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, grated (shell) and chopped (filling)",
    "amount": "2 medium"
   },
   {
    "pantryId": "baharat",
    "label": "Baharat or allspice and cinnamon",
    "amount": "1 1/2 tablespoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, divided",
    "amount": "2 teaspoons"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "ghee",
    "label": "Ghee or butter, divided",
    "amount": "1/4 cup (60 g)"
   },
   {
    "pantryId": "ground-lamb",
    "label": "Ground lamb (for filling)",
    "amount": "3/4 lb (340 g)"
   },
   {
    "pantryId": "pine-nuts",
    "label": "Pine nuts, toasted",
    "amount": "1/3 cup"
   },
   {
    "pantryId": "cinnamon-stick",
    "label": "Ground cinnamon (filling)",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, for greasing and brushing",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt, to serve",
    "amount": "1 cup"
   }
  ],
  "equipment": [
   "Espresso Machine",
   "Juicer"
  ],
  "steps": [
   "Process the lean lamb, grated onion, drained bulgur, 1 tablespoon baharat, 1 1/2 teaspoons salt, and pepper in a food processor, with a few spoonfuls of ice water, into a smooth, sticky paste. Chill.",
   "For the filling, sauté the chopped onion in 2 tablespoons ghee for 6 minutes. Add the filling lamb and cook, breaking up, 6 minutes. Stir in the pine nuts, remaining baharat, cinnamon, and 1/2 teaspoon salt. Cool.",
   "Heat the oven to 400°F (200°C). Oil a 9 x 13-inch baking dish. Press half the shell paste into the bottom, wetting your hands, in an even layer.",
   "Spread the filling evenly on top, then cover with the remaining paste, pressing smooth.",
   "Score deep diamonds with a sharp knife. Dot with the remaining ghee and drizzle with oil.",
   "Bake 35–40 minutes until golden and crisp. Cool 10 minutes, then cut along the diamonds. Serve with yogurt."
  ],
  "notes": "Kibbeh is Lebanon's national dish; different regions make it raw (nayyeh), fried, in yogurt, or baked. The shell mixture should be silky-smooth: keep it cold while working.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "tahchin",
  "title": "Tahchin (Persian Saffron Yogurt Rice Cake with Chicken)",
  "description": "A golden, crisp-crusted Persian rice cake layered with saffron-yogurt rice and tender chicken, baked and flipped onto a platter, garnished with barberries.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Non-Vegetarian",
   "Gluten-Free"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 130,
  "prepMinutes": 40,
  "cookMinutes": 90,
  "difficulty": "Advanced",
  "servings": 6,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/33166886/pexels-photo-33166886.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "basmati-rice",
    "label": "Basmati rice, rinsed and soaked 2 hours",
    "amount": "3 cups (600 g)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt, divided (2 tablespoons for the rice water)",
    "amount": "2 tablespoons plus 2 teaspoons"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Full-fat plain yogurt",
    "amount": "1 1/2 cups (360 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Egg yolks and 1 whole egg",
    "amount": "3 yolks + 1 egg"
   },
   {
    "pantryId": "saffron",
    "label": "Saffron threads, ground and steeped in 1/4 cup hot water",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "olive-oil",
    "label": "Oil or melted butter, divided",
    "amount": "1/2 cup (120 ml)"
   },
   {
    "pantryId": "chicken-breast",
    "label": "Chicken breasts, cut in chunks",
    "amount": "1 1/2 lb (680 g)"
   },
   {
    "pantryId": "onion",
    "label": "Onion, sliced",
    "amount": "1 large"
   },
   {
    "pantryId": "turmeric",
    "label": "Ground turmeric",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "barberries",
    "label": "Barberries, sautéed in butter, for garnish",
    "amount": "1/2 cup"
   },
   {
    "pantryId": "pistachios",
    "label": "Slivered pistachios, for garnish",
    "amount": "1/4 cup"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Boil the rice in salted water 5 minutes until al dente; drain.",
   "Cook the onion in 2 tablespoons oil until golden. Add the chicken, turmeric, 1/2 teaspoon salt, and pepper and cook 8 minutes until cooked. Cool.",
   "Whisk the yogurt, yolks, egg, saffron water, and 2 teaspoons salt. Fold in two-thirds of the rice until evenly coated.",
   "Heat the oven to 375°F (190°C). Oil a 9 x 13-inch baking dish with 3 tablespoons oil. Press half the yogurt rice into the bottom firmly. Add the chicken, then top with the remaining yogurt rice and plain rice, pressing down.",
   "Drizzle with the remaining oil, cover tightly with foil, and bake 70–75 minutes. Rest 10 minutes.",
   "Run a knife around the edge, place a platter over, and flip. Garnish with barberries and pistachios, and serve with salad."
  ],
  "notes": "'Tah' means bottom, and the crisp golden crust is the prize. Pressing the rice firmly and baking covered helps it unmold in one piece. Tahchin is a Persian party dish, and it can be made with lamb or spinach.",
  "sourceName": "Persian Mama",
  "sourceUrl": "https://persianmama.com/"
 },
 {
  "id": "fatteh-chickpea-yogurt",
  "title": "Fatteh (Chickpeas, Toasted Pita and Garlic Yogurt)",
  "description": "Crisp toasted pita layered with warm chickpeas and a cool, garlicky tahini-yogurt sauce, topped with pine nuts and sizzling butter.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Tangy"
  ],
  "timeMinutes": 40,
  "prepMinutes": 20,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/31233889/pexels-photo-31233889.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "pita-bread",
    "label": "Pita bread, torn or cut into pieces",
    "amount": "3 rounds"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil, for toasting and drizzling",
    "amount": "1/4 cup (60 ml)"
   },
   {
    "pantryId": "chickpeas-canned",
    "label": "Chickpeas, canned, drained and warmed with their liquid",
    "amount": "2 cans (15 oz / 425 g each)"
   },
   {
    "pantryId": "greek-yogurt",
    "label": "Plain yogurt",
    "amount": "2 cups (480 g)"
   },
   {
    "pantryId": "tahini",
    "label": "Tahini",
    "amount": "1/4 cup (60 g)"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic cloves, crushed",
    "amount": "3"
   },
   {
    "pantryId": "lemon",
    "label": "Fresh lemon juice",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1/2 teaspoon"
   },
   {
    "pantryId": "butter",
    "label": "Butter or ghee",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "pine-nuts",
    "label": "Pine nuts",
    "amount": "1/4 cup"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika and parsley, to garnish",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "parsley",
    "label": "Fresh parsley",
    "amount": "2 tablespoons"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat the oven to 400°F (200°C). Toss the pita with 2 tablespoons oil and toast 8–10 minutes until crisp and golden.",
   "Whisk the yogurt, tahini, garlic, lemon juice, and salt until smooth.",
   "Warm the chickpeas in their liquid with the cumin 5 minutes.",
   "Melt the butter in a small pan, add the pine nuts, and toast until golden, 2–3 minutes.",
   "Layer the pita in a shallow dish, spoon over the warm chickpeas (with a little liquid), then the yogurt sauce.",
   "Top with the sizzling pine nuts and butter, paprika, parsley, and a drizzle of oil. Serve right away."
  ],
  "notes": "Fatteh means 'crushed' (the bread). It's a Levantine breakfast and Ramadan favorite. Assemble just before serving so the pita stays partly crunchy.",
  "sourceName": "The Mediterranean Dish",
  "sourceUrl": "https://www.themediterraneandish.com/"
 },
 {
  "id": "mercimek-corbasi",
  "title": "Mercimek Çorbası (Turkish Red Lentil Soup)",
  "description": "Silky, golden red lentil soup with carrot, onion, and a hint of cumin, finished with a lemon squeeze and a drizzle of red pepper butter.",
  "cuisine": "Middle Eastern",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Comforting"
  ],
  "timeMinutes": 45,
  "prepMinutes": 10,
  "cookMinutes": 35,
  "difficulty": "Easy",
  "servings": 6,
  "budget": "$",
  "image": "https://images.pexels.com/photos/12077978/pexels-photo-12077978.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "red-lentils",
    "label": "Red lentils, rinsed",
    "amount": "1 1/2 cups (300 g)"
   },
   {
    "pantryId": "olive-oil",
    "label": "Olive oil or butter",
    "amount": "3 tablespoons"
   },
   {
    "pantryId": "onion",
    "label": "Onion, chopped",
    "amount": "1 large"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, diced",
    "amount": "1 medium"
   },
   {
    "pantryId": "potato",
    "label": "Potato, diced (optional)",
    "amount": "1 small",
    "optional": true
   },
   {
    "pantryId": "tomato-paste",
    "label": "Tomato paste",
    "amount": "1 tablespoon"
   },
   {
    "pantryId": "cumin-powder",
    "label": "Ground cumin",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "paprika",
    "label": "Paprika",
    "amount": "1 teaspoon"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Vegetable or chicken stock",
    "amount": "6 cups (1.4 L)"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 1/2 teaspoons"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon wedges, to serve",
    "amount": "1"
   },
   {
    "pantryId": "butter",
    "label": "Butter, for the topping",
    "amount": "2 tablespoons"
   },
   {
    "pantryId": "aleppo-pepper",
    "label": "Aleppo pepper and dried mint (topping)",
    "amount": "1 teaspoon each"
   }
  ],
  "equipment": [],
  "steps": [
   "Heat the oil in a pot. Cook the onion and carrot (and potato) 6–8 minutes until soft.",
   "Stir in the tomato paste, cumin, and paprika for 1 minute.",
   "Add the lentils and stock, bring to a boil, then simmer 20–25 minutes until the lentils are completely soft.",
   "Blend with an immersion blender until smooth. Thin with hot water if too thick; season with salt.",
   "Melt the butter and sizzle with the Aleppo pepper and mint for 20 seconds.",
   "Serve hot with a drizzle of the red butter and a squeeze of lemon."
  ],
  "notes": "Served in nearly every Turkish restaurant before the main course, and eaten with a squeeze of lemon and crusty bread. A little potato makes the soup creamy.",
  "sourceName": "Turkish Style Cooking",
  "sourceUrl": "https://www.turkishstylecooking.com/"
 },
 {
  "id": "fish-and-chips",
  "title": "Fish and Chips with Mushy Peas and Tartare Sauce",
  "description": "Beer-battered cod fried until shatteringly crisp, thick-cut chips, minted mushy peas and a quick caper tartare sauce.",
  "cuisine": "British",
  "dietTags": [
   "Pescatarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 60,
  "prepMinutes": 30,
  "cookMinutes": 30,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/34019400/pexels-photo-34019400.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "fish",
    "label": "Cod or haddock fillets, skinless",
    "amount": "4 x 170 g"
   },
   {
    "pantryId": "flour",
    "label": "Plain flour, plus extra for dusting",
    "amount": "200 g + 40 g"
   },
   {
    "pantryId": "baking-powder",
    "label": "Baking powder",
    "amount": "1 tsp"
   },
   {
    "pantryId": "beer",
    "label": "Cold lager",
    "amount": "200 ml"
   },
   {
    "pantryId": "potato",
    "label": "Floury potatoes (Maris Piper), peeled",
    "amount": "1 kg"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Vegetable oil for frying",
    "amount": "1.5 L"
   },
   {
    "pantryId": "frozen-peas",
    "label": "Frozen peas",
    "amount": "300 g"
   },
   {
    "pantryId": "butter",
    "label": "Butter",
    "amount": "20 g"
   },
   {
    "pantryId": "mint",
    "label": "Fresh mint, chopped",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "mayonnaise",
    "label": "Mayonnaise",
    "amount": "150 g"
   },
   {
    "pantryId": "capers",
    "label": "Capers, chopped",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "pickles",
    "label": "Gherkins, chopped",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon, cut in wedges",
    "amount": "1"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "to taste"
   }
  ],
  "equipment": [],
  "steps": [
   "Cut potatoes into 1.5 cm thick chips, rinse in cold water and soak 30 minutes, then dry thoroughly.",
   "Heat oil to 130°C and fry the chips in batches for 6–8 minutes until soft but pale; drain.",
   "Simmer peas in 100 ml water for 5 minutes, add butter, mint and salt, then roughly mash and keep warm.",
   "Mix mayonnaise, capers, gherkins and a squeeze of lemon for the tartare sauce.",
   "Whisk 200 g flour, baking powder, ½ tsp salt and cold beer into a smooth batter that coats a spoon.",
   "Pat the fish dry, dust with the 40 g flour, dip in batter and lower into oil heated to 180°C. Fry 6–8 minutes until deep golden.",
   "Raise the oil to 190°C and fry the chips again 3–4 minutes until crisp and golden; season with salt.",
   "Serve fish and chips immediately with mushy peas, tartare sauce and lemon wedges."
  ],
  "notes": "Keep the batter cold and fry as soon as it is mixed for the crispest coating. Traditional shops use haddock in Scotland and the north, cod in the south.",
  "sourceName": "BBC Good Food",
  "sourceUrl": "https://www.bbcgoodfood.com/"
 },
 {
  "id": "sausage-rolls",
  "title": "Sausage Rolls",
  "description": "Seasoned pork and sage filling rolled in all-butter puff pastry and baked until flaky.",
  "cuisine": "British",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Herby"
  ],
  "timeMinutes": 50,
  "prepMinutes": 20,
  "cookMinutes": 30,
  "difficulty": "Easy",
  "servings": 8,
  "budget": "$",
  "image": "https://images.pexels.com/photos/31357500/pexels-photo-31357500.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "puff-pastry",
    "label": "Puff pastry sheets",
    "amount": "2 x 320 g"
   },
   {
    "pantryId": "pork-sausage",
    "label": "Pork sausage meat",
    "amount": "500 g"
   },
   {
    "pantryId": "onion",
    "label": "Onion, finely grated",
    "amount": "1 small"
   },
   {
    "pantryId": "sage",
    "label": "Fresh sage, chopped",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "breadcrumbs",
    "label": "Breadcrumbs",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "eggs",
    "label": "Egg, beaten",
    "amount": "1"
   },
   {
    "pantryId": "black-pepper",
    "label": "Black pepper",
    "amount": "½ tsp"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "½ tsp"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 200°C.",
   "Mix sausage meat, onion, sage, breadcrumbs, salt and pepper.",
   "Cut each pastry sheet in half lengthways and spoon the filling in a line down each.",
   "Brush edges with egg, fold over, crimp with a fork and cut into 6 cm lengths.",
   "Place on a lined tray, brush with egg and slash the tops.",
   "Bake 25–30 minutes until golden and the filling reaches 75°C inside."
  ],
  "notes": "Keep the pastry cold; chill rolls 15 minutes before baking for the best flake.",
  "sourceName": "BBC Good Food",
  "sourceUrl": "https://www.bbcgoodfood.com/"
 },
 {
  "id": "shortbread",
  "title": "Scottish Shortbread",
  "description": "Three-ingredient buttery shortbread fingers, crumbly and golden, a Scottish Hogmanay tradition.",
  "cuisine": "British",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Sweet"
  ],
  "timeMinutes": 40,
  "prepMinutes": 15,
  "cookMinutes": 25,
  "difficulty": "Easy",
  "servings": 16,
  "budget": "$",
  "image": "https://images.pexels.com/photos/14757516/pexels-photo-14757516.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "butter",
    "label": "Butter, softened",
    "amount": "225 g"
   },
   {
    "pantryId": "sugar",
    "label": "Caster sugar, plus extra",
    "amount": "75 g"
   },
   {
    "pantryId": "flour",
    "label": "Plain flour",
    "amount": "225 g"
   },
   {
    "pantryId": "cornstarch",
    "label": "Cornflour (or rice flour)",
    "amount": "75 g"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "pinch"
   }
  ],
  "equipment": [
   "Espresso Machine"
  ],
  "steps": [
   "Heat the oven to 160°C.",
   "Beat butter and sugar until pale, then work in flour, cornflour and salt to a soft dough.",
   "Press into a 20 cm tin, prick with a fork and score into fingers.",
   "Bake 25 minutes until pale golden.",
   "Cut along scored lines while warm, sprinkle with sugar and cool in the tin."
  ],
  "notes": "Cornflour keeps the biscuit tender; do not overwork the dough.",
  "sourceName": "BBC Good Food",
  "sourceUrl": "https://www.bbcgoodfood.com/"
 },
 {
  "id": "tendon",
  "title": "Tendon (Tempura Rice Bowl)",
  "description": "Crisp shrimp and vegetable tempura over rice, glazed with a sweet soy tentsuyu sauce.",
  "cuisine": "Japanese",
  "dietTags": [
   "Pescatarian"
  ],
  "tasteTags": [
   "Rich & Indulgent"
  ],
  "timeMinutes": 45,
  "prepMinutes": 25,
  "cookMinutes": 20,
  "difficulty": "Medium",
  "servings": 2,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/14867374/pexels-photo-14867374.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "shrimp",
    "label": "Large shrimp, peeled, tails on",
    "amount": "6"
   },
   {
    "pantryId": "sweet-potato",
    "label": "Sweet potato, 5 mm slices",
    "amount": "4 slices"
   },
   {
    "pantryId": "green-beans",
    "label": "Green beans",
    "amount": "4"
   },
   {
    "pantryId": "flour",
    "label": "Plain flour for dusting + batter",
    "amount": "50 g + 80 g"
   },
   {
    "pantryId": "eggs",
    "label": "Egg yolk",
    "amount": "1"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil for deep-frying",
    "amount": "800 ml"
   },
   {
    "pantryId": "dashi-stock",
    "label": "Dashi stock",
    "amount": "100 ml"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "mirin",
    "label": "Mirin",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 tsp"
   },
   {
    "pantryId": "sushi-rice",
    "label": "Cooked short-grain rice, hot",
    "amount": "2 bowls (about 400 g)"
   }
  ],
  "equipment": [],
  "steps": [
   "Simmer dashi, soy sauce, mirin and sugar for 2 minutes to make tentsuyu.",
   "Score the shrimp underside to prevent curling, and dust everything lightly in flour.",
   "Whisk 80 g flour, yolk and 120 ml ice-cold water briefly; lumps are fine.",
   "Heat oil to 170°C. Dip each piece in batter and fry shrimp 2–3 minutes and vegetables 3–4 minutes until pale golden.",
   "Drain on a rack, then dip each piece briefly in tentsuyu.",
   "Arrange over rice and drizzle with extra sauce."
  ],
  "notes": "Keep the batter ice-cold and mix minimally for a light, lacy crust.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "karaage-don",
  "title": "Karaage Don (Fried Chicken Rice Bowl)",
  "description": "Juicy ginger-garlic fried chicken over rice with a soft egg and mayo.",
  "cuisine": "Japanese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Rich & Indulgent",
   "Comforting"
  ],
  "timeMinutes": 55,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "marinateMinutes": 20,
  "difficulty": "Easy",
  "servings": 2,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/31317036/pexels-photo-31317036.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless chicken thighs, bite-size",
    "amount": "350 g"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "sake",
    "label": "Sake",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, grated",
    "amount": "1 clove"
   },
   {
    "pantryId": "potato-starch",
    "label": "Potato starch",
    "amount": "4 tbsp"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil for frying",
    "amount": "500 ml"
   },
   {
    "pantryId": "sushi-rice",
    "label": "Cooked short-grain rice",
    "amount": "2 bowls (400 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Soft-boiled eggs",
    "amount": "2"
   },
   {
    "pantryId": "mayonnaise",
    "label": "Japanese mayonnaise",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "scallion",
    "label": "Scallion",
    "amount": "1"
   }
  ],
  "equipment": [],
  "steps": [
   "Marinate chicken in soy, sake, ginger and garlic for 20 minutes.",
   "Toss the chicken in potato starch until coated.",
   "Heat oil to 170°C and fry 4 minutes, rest 3 minutes, then fry again at 190°C for 1 minute.",
   "Place rice in bowls, top with chicken, halved eggs, mayo and scallion."
  ],
  "notes": "The double-fry gives lasting crunch; potato starch is key to the crisp crust.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "chicken-shoyu-ramen",
  "title": "Chicken Shoyu Ramen (Torigara)",
  "description": "Light golden chicken broth with soy tare, sliced poached chicken, bamboo shoots and egg.",
  "cuisine": "Japanese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting",
   "Fresh & Light"
  ],
  "timeMinutes": 80,
  "prepMinutes": 20,
  "cookMinutes": 60,
  "difficulty": "Medium",
  "servings": 2,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/13425793/pexels-photo-13425793.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-breast",
    "label": "Chicken breast, skin-on",
    "amount": "2"
   },
   {
    "pantryId": "chicken-stock",
    "label": "Chicken stock",
    "amount": "800 ml"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "mirin",
    "label": "Mirin",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, sliced",
    "amount": "3 slices"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions",
    "amount": "3"
   },
   {
    "pantryId": "ramen-noodles",
    "label": "Ramen noodles",
    "amount": "2 portions (240 g)"
   },
   {
    "pantryId": "eggs",
    "label": "Eggs",
    "amount": "2"
   },
   {
    "pantryId": "bamboo-shoots",
    "label": "Bamboo shoots",
    "amount": "60 g"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Sesame oil",
    "amount": "1 tsp"
   }
  ],
  "equipment": [],
  "steps": [
   "Poach the chicken in stock with ginger and scallion tops, 20 minutes at a bare simmer.",
   "Remove, slice, and strain the broth.",
   "Add soy sauce and mirin to the broth and keep hot.",
   "Boil noodles per package and eggs 6½ minutes.",
   "Assemble noodles, sliced chicken, bamboo shoots, halved eggs, then pour hot broth over and finish with sesame oil."
  ],
  "notes": "A gentle simmer keeps the broth clear. The poaching liquid is already chicken-rich, so do not over-season.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "kitsune-udon",
  "title": "Kitsune Udon",
  "description": "Udon in clear dashi broth topped with sweet simmered fried tofu pouches and scallions.",
  "cuisine": "Japanese",
  "dietTags": [
   "Pescatarian"
  ],
  "tasteTags": [
   "Comforting"
  ],
  "timeMinutes": 30,
  "prepMinutes": 10,
  "cookMinutes": 20,
  "difficulty": "Easy",
  "servings": 2,
  "budget": "$",
  "image": "https://images.pexels.com/photos/32661564/pexels-photo-32661564.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "udon-noodles",
    "label": "Udon noodles",
    "amount": "2 portions (400 g)"
   },
   {
    "pantryId": "abura-age",
    "label": "Abura-age",
    "amount": "2 sheets"
   },
   {
    "pantryId": "dashi-stock",
    "label": "Dashi stock",
    "amount": "600 ml"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "mirin",
    "label": "Mirin",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions",
    "amount": "2"
   },
   {
    "pantryId": "shichimi",
    "label": "Shichimi togarashi",
    "amount": "to taste",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Blanch abura-age in boiling water 1 minute to remove oil; halve.",
   "Simmer in 200 ml dashi, 1 tbsp soy sauce, 1 tbsp mirin and 2 tbsp sugar for 10 minutes.",
   "Heat the remaining 400 ml dashi with 2 tbsp soy sauce and 1 tbsp mirin.",
   "Boil udon until tender, drain, and divide into bowls.",
   "Pour broth over, then add the tofu and scallion."
  ],
  "notes": "The sweet tofu \"fox\" topping gives the dish its name, since foxes are said to love fried tofu.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "chicken-karaage",
  "title": "Tori Karaage (Japanese Fried Chicken)",
  "description": "Marinated chicken thigh pieces coated in potato starch and double-fried to a light, crunchy crust.",
  "cuisine": "Japanese",
  "dietTags": [
   "Non-Vegetarian",
   "Dairy-Free"
  ],
  "tasteTags": [
   "Rich & Indulgent"
  ],
  "timeMinutes": 57,
  "prepMinutes": 15,
  "cookMinutes": 12,
  "marinateMinutes": 30,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/30083615/pexels-photo-30083615.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "chicken-thigh",
    "label": "Boneless skin-on chicken thighs",
    "amount": "600 g"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "sake",
    "label": "Sake",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "mirin",
    "label": "Mirin",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger, grated",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic, grated",
    "amount": "2 cloves"
   },
   {
    "pantryId": "potato-starch",
    "label": "Potato starch",
    "amount": "6 tbsp"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil for frying",
    "amount": "700 ml"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon wedges",
    "amount": "2"
   },
   {
    "pantryId": "mayonnaise",
    "label": "Japanese mayonnaise",
    "amount": "3 tbsp",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Cut chicken into 4 cm pieces and mix with soy sauce, sake, mirin, ginger and garlic; marinate 30 minutes.",
   "Toss with potato starch just before frying.",
   "Fry at 170°C for 4 minutes, then rest 3 minutes.",
   "Raise heat to 190°C and fry 1 minute more until deep golden.",
   "Drain and serve with lemon and mayo."
  ],
  "notes": "Do not coat in starch ahead of time, or the crust becomes gummy.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "tamagoyaki",
  "title": "Tamagoyaki (Rolled Japanese Omelette)",
  "description": "Layered sweet-savory omelette rolled in a pan, slightly custardy inside.",
  "cuisine": "Japanese",
  "dietTags": [
   "Vegetarian"
  ],
  "tasteTags": [
   "Sweet",
   "Comforting"
  ],
  "timeMinutes": 20,
  "prepMinutes": 10,
  "cookMinutes": 10,
  "difficulty": "Medium",
  "servings": 2,
  "budget": "$",
  "image": "https://images.pexels.com/photos/32722818/pexels-photo-32722818.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "eggs",
    "label": "Eggs",
    "amount": "4"
   },
   {
    "pantryId": "dashi-stock",
    "label": "Dashi stock",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tsp"
   },
   {
    "pantryId": "mirin",
    "label": "Mirin",
    "amount": "1 tsp"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil for brushing",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "daikon",
    "label": "Grated daikon",
    "amount": "2 tbsp",
    "optional": true
   }
  ],
  "equipment": [],
  "steps": [
   "Beat eggs with dashi, sugar, soy sauce and mirin; strain.",
   "Heat a 15 cm rectangular pan on medium-low and oil lightly.",
   "Pour in a thin layer, cook until nearly set, then roll to one end.",
   "Oil the pan again, slide the roll back, pour another layer, and roll; repeat 3–4 times.",
   "Rest 2 minutes and slice."
  ],
  "notes": "Medium-low heat prevents browning. A round nonstick pan works if folded in thirds.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "vegetable-gyoza",
  "title": "Vegetable Gyoza",
  "description": "Vegan dumplings of cabbage, shiitake, tofu and chives with a crisp base.",
  "cuisine": "Japanese",
  "dietTags": [
   "Vegan"
  ],
  "tasteTags": [
   "Comforting"
  ],
  "timeMinutes": 55,
  "prepMinutes": 45,
  "cookMinutes": 10,
  "difficulty": "Medium",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/26390887/pexels-photo-26390887.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "cabbage",
    "label": "Cabbage, finely chopped",
    "amount": "200 g"
   },
   {
    "pantryId": "dried-shiitake-mushroom",
    "label": "Dried shiitake, soaked and minced",
    "amount": "4"
   },
   {
    "pantryId": "tofu",
    "label": "Firm tofu, crumbled",
    "amount": "150 g"
   },
   {
    "pantryId": "garlic",
    "label": "Garlic",
    "amount": "2 cloves"
   },
   {
    "pantryId": "ginger",
    "label": "Ginger",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions",
    "amount": "3"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Sesame oil",
    "amount": "2 tsp"
   },
   {
    "pantryId": "dumpling-wrappers",
    "label": "Gyoza wrappers",
    "amount": "30"
   },
   {
    "pantryId": "vegetable-oil",
    "label": "Oil",
    "amount": "2 tbsp"
   }
  ],
  "equipment": [],
  "steps": [
   "Salt cabbage and squeeze dry.",
   "Mix everything with soy sauce and sesame oil.",
   "Fill and pleat the wrappers.",
   "Fry, steam with 60 ml water 5 minutes, and crisp."
  ],
  "notes": "Check that wrappers contain no egg for a strict vegan result.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "shabu-shabu",
  "title": "Shabu-Shabu",
  "description": "Paper-thin beef and vegetables swished through hot kombu broth and dipped in ponzu or sesame sauce.",
  "cuisine": "Japanese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Fresh & Light",
   "Comforting"
  ],
  "timeMinutes": 35,
  "prepMinutes": 20,
  "cookMinutes": 15,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/37735951/pexels-photo-37735951.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "beef-strips",
    "label": "Very thinly sliced beef",
    "amount": "500 g"
   },
   {
    "pantryId": "kombu",
    "label": "Kombu",
    "amount": "10 cm piece"
   },
   {
    "pantryId": "water",
    "label": "Water",
    "amount": "1.5 L"
   },
   {
    "pantryId": "napa-cabbage",
    "label": "Napa cabbage",
    "amount": "300 g"
   },
   {
    "pantryId": "tofu",
    "label": "Firm tofu",
    "amount": "300 g"
   },
   {
    "pantryId": "enoki-mushrooms",
    "label": "Enoki mushrooms",
    "amount": "100 g"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot, ribbons",
    "amount": "1"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions",
    "amount": "3"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "4 tbsp"
   },
   {
    "pantryId": "lemon",
    "label": "Lemon juice",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "sesame-paste",
    "label": "Sesame paste",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 tsp"
   },
   {
    "pantryId": "udon-noodles",
    "label": "Udon to finish",
    "amount": "2 portions (400 g)"
   }
  ],
  "equipment": [],
  "steps": [
   "Soak kombu in water for 30 minutes in a hot pot; heat to just below boiling and remove.",
   "Whisk soy sauce and lemon for ponzu; whisk tahini with soy, sugar and 3 tbsp water for sesame dip.",
   "Add vegetables and tofu to the pot.",
   "Swish a beef slice through the simmering broth 10–15 seconds until it turns pale.",
   "Dip and eat; finish by cooking udon in the enriched broth."
  ],
  "notes": "Ask a butcher to slice beef 1 mm thick, or freeze the beef for an hour and slice yourself.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "tonjiru",
  "title": "Tonjiru (Pork and Vegetable Miso Soup)",
  "description": "Hearty miso soup with pork belly, daikon, carrot, burdock-style roots and tofu.",
  "cuisine": "Japanese",
  "dietTags": [
   "Non-Vegetarian"
  ],
  "tasteTags": [
   "Comforting"
  ],
  "timeMinutes": 40,
  "prepMinutes": 15,
  "cookMinutes": 25,
  "difficulty": "Easy",
  "servings": 4,
  "budget": "$",
  "image": "https://images.pexels.com/photos/31872337/pexels-photo-31872337.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "pork-belly",
    "label": "Thin pork belly",
    "amount": "150 g"
   },
   {
    "pantryId": "daikon",
    "label": "Daikon, ½ moons",
    "amount": "150 g"
   },
   {
    "pantryId": "carrot",
    "label": "Carrot",
    "amount": "1"
   },
   {
    "pantryId": "potato",
    "label": "Potato",
    "amount": "1"
   },
   {
    "pantryId": "konnyaku",
    "label": "Konnyaku",
    "amount": "100 g"
   },
   {
    "pantryId": "tofu",
    "label": "Firm tofu",
    "amount": "150 g"
   },
   {
    "pantryId": "dashi-stock",
    "label": "Dashi stock",
    "amount": "1 L"
   },
   {
    "pantryId": "miso-paste",
    "label": "Miso paste",
    "amount": "4 tbsp"
   },
   {
    "pantryId": "sesame-oil",
    "label": "Sesame oil",
    "amount": "1 tsp"
   },
   {
    "pantryId": "scallion",
    "label": "Scallions",
    "amount": "2"
   }
  ],
  "equipment": [],
  "steps": [
   "Sauté pork in sesame oil 3 minutes.",
   "Add daikon, carrot, potato and konnyaku and cook 2 minutes.",
   "Pour in dashi and simmer 15 minutes, skimming.",
   "Add tofu, then dissolve miso into the soup.",
   "Serve with scallion."
  ],
  "notes": "Serve on cold days; it's a one-bowl meal with rice.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "mochi-daifuku",
  "title": "Strawberry Daifuku",
  "description": "Soft chewy mochi wrapped around sweet red bean paste and a whole strawberry.",
  "cuisine": "Japanese",
  "dietTags": [
   "Vegan"
  ],
  "tasteTags": [
   "Sweet"
  ],
  "timeMinutes": 45,
  "prepMinutes": 30,
  "cookMinutes": 15,
  "difficulty": "Medium",
  "servings": 8,
  "budget": "$$",
  "image": "https://images.pexels.com/photos/10676685/pexels-photo-10676685.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "glutinous-rice-flour",
    "label": "Glutinous rice flour (mochiko)",
    "amount": "100 g"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "40 g"
   },
   {
    "pantryId": "water",
    "label": "Water",
    "amount": "150 ml"
   },
   {
    "pantryId": "potato-starch",
    "label": "Potato starch for dusting",
    "amount": "4 tbsp"
   },
   {
    "pantryId": "red-bean-paste",
    "label": "Sweet red bean paste",
    "amount": "160 g"
   },
   {
    "pantryId": "strawberries",
    "label": "Small strawberries",
    "amount": "8"
   }
  ],
  "equipment": [
   "Electric Kettle"
  ],
  "steps": [
   "Wrap each strawberry in 20 g bean paste.",
   "Mix mochiko, sugar and water, cover, and microwave 1 minute, stir, then 1 more minute.",
   "Stir until glossy and sticky.",
   "Dust the surface with starch and cut into 8 pieces.",
   "Flatten each piece, wrap around a strawberry ball and pinch to seal."
  ],
  "notes": "Best eaten the day it is made. Dust hands with starch to avoid sticking.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "shrimp-nigiri",
  "title": "Shrimp Nigiri (Ebi)",
  "description": "Butterflied boiled shrimp over pressed sushi rice.",
  "cuisine": "Japanese",
  "dietTags": [
   "Pescatarian"
  ],
  "tasteTags": [
   "Fresh & Light"
  ],
  "timeMinutes": 65,
  "prepMinutes": 40,
  "cookMinutes": 25,
  "difficulty": "Advanced",
  "servings": 2,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/19423056/pexels-photo-19423056.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "sushi-rice",
    "label": "Uncooked sushi rice",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice vinegar",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 tsp"
   },
   {
    "pantryId": "shrimp",
    "label": "Large shrimp, boiled and butterflied",
    "amount": "8"
   },
   {
    "pantryId": "wasabi",
    "label": "Wasabi",
    "amount": "1 tsp"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce for dipping",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "pickled-ginger",
    "label": "Pickled ginger",
    "amount": "2 tbsp"
   }
  ],
  "equipment": [
   "Teapot"
  ],
  "steps": [
   "Rinse 200 g rice until the water runs clear, cook with 240 ml water, then fold in 3 tbsp vinegar, 1 tbsp sugar and 1 tsp salt (warmed to dissolve) and fan until body temperature.",
   "Wet hands in water with a splash of vinegar. Take 20 g of rice and shape it into a small oblong block, pressing lightly.",
   "Dab a little wasabi on the underside of each topping.",
   "Lay the topping over the rice and press gently with two fingers so it adheres.",
   "Serve at once with soy sauce and ginger."
  ],
  "notes": "Skewer the shrimp straight before boiling 2 minutes to keep a flat shape.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 },
 {
  "id": "dragon-roll",
  "title": "Dragon Roll",
  "description": "Inside-out roll with shrimp tempura and cucumber, draped with sliced avocado and eel sauce.",
  "cuisine": "Japanese",
  "dietTags": [
   "Pescatarian"
  ],
  "tasteTags": [
   "Rich & Indulgent"
  ],
  "timeMinutes": 60,
  "prepMinutes": 40,
  "cookMinutes": 20,
  "difficulty": "Medium",
  "servings": 2,
  "budget": "$$$",
  "image": "https://images.pexels.com/photos/17584444/pexels-photo-17584444.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "ingredients": [
   {
    "pantryId": "sushi-rice",
    "label": "Uncooked sushi rice",
    "amount": "1 cup (200 g)"
   },
   {
    "pantryId": "rice-vinegar",
    "label": "Rice vinegar",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "sugar",
    "label": "Sugar",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "fine-salt",
    "label": "Salt",
    "amount": "1 tsp"
   },
   {
    "pantryId": "nori",
    "label": "Nori sheets",
    "amount": "3"
   },
   {
    "pantryId": "unagi",
    "label": "Unagi kabayaki",
    "amount": "100 g"
   },
   {
    "pantryId": "shrimp",
    "label": "Shrimp tempura, 4 pieces",
    "amount": "4"
   },
   {
    "pantryId": "avocado",
    "label": "Avocado, thinly sliced",
    "amount": "1"
   },
   {
    "pantryId": "cucumber",
    "label": "Cucumber sticks",
    "amount": "½"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Eel sauce (soy-mirin glaze)",
    "amount": "2 tbsp"
   },
   {
    "pantryId": "sesame-seeds",
    "label": "Sesame seeds",
    "amount": "1 tbsp"
   },
   {
    "pantryId": "soy-sauce",
    "label": "Soy sauce",
    "amount": "3 tbsp"
   },
   {
    "pantryId": "wasabi",
    "label": "Wasabi",
    "amount": "1 tsp"
   },
   {
    "pantryId": "pickled-ginger",
    "label": "Pickled ginger",
    "amount": "2 tbsp"
   }
  ],
  "equipment": [
   "Teapot"
  ],
  "steps": [
   "Rinse 200 g rice until the water runs clear, cook with 240 ml water, then fold in 3 tbsp vinegar, 1 tbsp sugar and 1 tsp salt (warmed to dissolve) and fan until body temperature.",
   "Spread rice on a nori sheet, flip, and lay shrimp tempura, eel and cucumber across.",
   "Roll into an inside-out roll.",
   "Cover the roll with overlapping avocado slices; press to shape.",
   "Brush with eel sauce, sprinkle with sesame.",
   "Slice into 8 pieces."
  ],
  "notes": "Layer avocado under cling film to press it smooth before slicing.",
  "sourceName": "Just One Cookbook",
  "sourceUrl": "https://www.justonecookbook.com/"
 }
];
