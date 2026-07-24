import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Selam site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Selam Wedding Planner &amp; Decor \| Addis Ababa<\/title>/i,
  );
  assert.match(html, /Beautiful/);
  assert.match(html, /Moments/);
  assert.match(html, /Wedding &amp; Ceremony Styling/);
  assert.match(html, /Custom Floral Design/);
  assert.match(html, /selam_wedding_planner_decor/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Starter Project/i);
});

test("includes the optimized local portfolio assets", async () => {
  const assets = [
    "selam-logo.webp",
    "hero-stage.webp",
    "foliage.webp",
    "floral-vase.webp",
    "wedding-stage-grand.webp",
    "wedding-stage-olive.webp",
    "wedding-stage-white-gold.webp",
    "floral-wall-pink.webp",
    "floral-frame-showcase.webp",
  ];

  await Promise.all(
    assets.map((asset) =>
      access(new URL(`../public/assets/${asset}`, import.meta.url)),
    ),
  );

  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Selam Wedding Planner & Decor/);
  assert.match(page, /IntersectionObserver/);
  assert.match(layout, /Selam Wedding Planner & Decor \| Addis Ababa/);
  assert.doesNotMatch(packageJson, /drizzle|react-loading-skeleton/);
});
