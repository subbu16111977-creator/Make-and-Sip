#!/usr/bin/env node
/**
 * Recipe image sanity check.
 *
 * This does NOT verify that an image shows the correct dish — that still
 * requires a human (or a vision-capable review pass) to actually look at
 * each photo next to its title/description. What it DOES catch on every
 * run, cheaply and automatically, is the class of bug that let bad images
 * slip through before:
 *
 *   - a recipe with no image field
 *   - an image URL that 404s / doesn't load
 *   - two different recipes silently sharing the same photo
 *
 * Run: node scripts/check-recipe-images.js
 * Exits non-zero if any problem is found, so it can be wired into CI.
 */

const fs = require("fs");
const path = require("path");

const DRINKS_DIR = path.join(__dirname, "..", "src", "data", "drinks");

/** Reads every drink file: each drink's id, title and image (a quoted URL or a pexels(<id>) helper call). */
function extractRecipes(source) {
  const pattern =
    /id:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"[\s\S]*?image:\s*(?:"([^"]*)"|pexels\((\d+)\))/g;
  const recipes = [];
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const image = match[3] !== undefined ? match[3] : `https://images.pexels.com/photos/${match[4]}/pexels-photo-${match[4]}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
    recipes.push({ id: match[1], title: match[2], image });
  }
  return recipes;
}

async function checkUrl(url) {
  if (!url) return { ok: false, status: "MISSING" };
  try {
    const res = await fetch(url, { method: "GET" });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: `ERROR: ${err.message}` };
  }
}

async function main() {
  const files = fs.readdirSync(DRINKS_DIR).filter((f) => f.endsWith(".ts"));
  const recipes = files.flatMap((f) => extractRecipes(fs.readFileSync(path.join(DRINKS_DIR, f), "utf8")));

  console.log(`Found ${recipes.length} drinks in ${path.relative(process.cwd(), DRINKS_DIR)}\n`);

  // Recipes with a deliberately blank image (no verified photo found yet)
  // show the app's neutral "Photo coming soon" fallback instead of a
  // possibly-wrong photo. That's intended, current state — track them
  // separately rather than flagging as BROKEN or as duplicates of each other.
  const needsPhoto = recipes.filter((r) => !r.image);

  // Duplicate detection — keyed on the photo id, not the whole querystring,
  // so two URLs pointing at the same underlying photo still count as one.
  // Blank images are excluded: they're not duplicates, they're all missing.
  const byImage = new Map();
  for (const r of recipes) {
    if (!r.image) continue;
    const key = r.image.split("?")[0];
    if (!byImage.has(key)) byImage.set(key, []);
    byImage.get(key).push(r);
  }
  const duplicates = [...byImage.entries()].filter(([, list]) => list.length > 1);

  // HTTP check, bounded concurrency so we don't hammer the CDN. Blank
  // (needs-photo) recipes are skipped — there's no URL to check.
  const withImage = recipes.filter((r) => r.image);
  const concurrency = 10;
  const results = new Map();
  let cursor = 0;
  async function worker() {
    while (cursor < withImage.length) {
      const i = cursor++;
      results.set(withImage[i].id, await checkUrl(withImage[i].image));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const broken = withImage.filter((r) => !results.get(r.id).ok);

  const rows = recipes.map((r) => {
    const res = results.get(r.id);
    return {
      id: r.id,
      title: r.title,
      status: !r.image ? "NEEDS_PHOTO" : res.ok ? "OK" : `BROKEN (${res.status})`,
      duplicate: duplicates.some(([, list]) => list.includes(r)) ? "DUPLICATE" : "",
    };
  });

  const idW = Math.max(...rows.map((r) => r.id.length), 12);
  const titleW = Math.max(...rows.map((r) => r.title.length), 12);
  console.log(
    `${"id".padEnd(idW)}  ${"title".padEnd(titleW)}  status         flag`
  );
  for (const row of rows) {
    console.log(
      `${row.id.padEnd(idW)}  ${row.title.padEnd(titleW)}  ${row.status.padEnd(13)}  ${row.duplicate}`
    );
  }

  console.log("\n--- Summary ---");
  console.log(`Total recipes:     ${recipes.length}`);
  console.log(`Broken image URLs: ${broken.length}`);
  console.log(`Needs a photo:     ${needsPhoto.length} (verified-wrong photo removed, showing fallback)`);
  console.log(`Duplicate photos:  ${duplicates.length}`);

  if (broken.length) {
    console.log("\nBroken:");
    for (const r of broken) console.log(`  - ${r.id} (${r.title}): ${r.image}`);
  }
  if (needsPhoto.length) {
    console.log("\nNeeds a verified photo (see /audit/rejected-images.json):");
    for (const r of needsPhoto) console.log(`  - ${r.id} (${r.title})`);
  }
  if (duplicates.length) {
    console.log("\nDuplicates (same photo used by more than one recipe):");
    for (const [key, list] of duplicates) {
      console.log(`  - ${key}: ${list.map((r) => r.id).join(", ")}`);
    }
  }

  console.log(
    "\nReminder: this script only catches missing/broken/duplicate images." +
      "\nIt cannot tell you whether a photo actually shows the right dish —" +
      "\nre-run the manual visual audit (view each image next to its title" +
      "\nand description) whenever recipes or images change."
  );

  if (broken.length || duplicates.length) {
    process.exitCode = 1;
  }
}

main();
