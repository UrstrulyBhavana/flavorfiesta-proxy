const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // v2

const app = express();
app.use(cors()); // allow all origins for now

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36";

app.get("/api/restaurants", async (_req, res) => {
  try {
    const url =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3787054&lng=78.55259869999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    const r = await fetch(url, { headers: { "user-agent": UA } });
    const text = await r.text();
    res
      .status(r.status)
      .set("content-type", r.headers.get("content-type") || "application/json")
      .set("cache-control", "no-store")
      .send(text);
  } catch (e) {
    res.status(500).json({ error: "proxy_failed", detail: String(e) });
  }
});

app.get("/api/menu", async (req, res) => {
  try {
    const resId = req.query.resId;
    if (!resId) return res.status(400).json({ error: "missing_resId" });

    const url =
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true" +
      `&lat=17.3787054&lng=78.55259869999999&restaurantId=${encodeURIComponent(resId)}`;

    const r = await fetch(url, { headers: { "user-agent": UA } });
    const text = await r.text();
    res
      .status(r.status)
      .set("content-type", r.headers.get("content-type") || "application/json")
      .set("cache-control", "no-store")
      .send(text);
  } catch (e) {
    res.status(500).json({ error: "proxy_failed", detail: String(e) });
  }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
