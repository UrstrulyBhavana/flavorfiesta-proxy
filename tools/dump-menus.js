const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const IDS = [
  "389817","574132","616393","699428","793556","40998","495452","495829",
  "699662","43794","20347","469894","57903","156171","441004","104667",
  "23694","750409","643845","555465"
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36";

const OUT_DIR = path.join(__dirname, "..", "public", "mock", "menus");

async function dumpOne(id) {
  const url =
    "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true" +
    `&lat=17.3787054&lng=78.55259869999999&restaurantId=${encodeURIComponent(id)}`;
  const r = await fetch(url, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${id}`);
  const text = await r.text();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const file = path.join(OUT_DIR, `${id}.json`);
  fs.writeFileSync(file, text);
  console.log("✅ saved", file);
}

(async () => {
  for (const id of IDS) {
    try {
      await dumpOne(id);
    } catch (e) {
      console.error("❌", id, String(e));
    }
  }
})();
