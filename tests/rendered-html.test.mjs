import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds the finished Selam site with all requested content", async () => {
  const [page, layout, galleryPage] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/gallery/page.tsx", import.meta.url), "utf8"),
  ]);

  await access(new URL("../.next/BUILD_ID", import.meta.url));
  assert.match(layout, /Selam Wedding Planner & Decor \| Addis Ababa/);
  assert.match(page, /Beautiful/);
  assert.match(page, /Moments/);
  assert.match(page, /Wedding Décor/);
  assert.match(page, /Custom Florals/);
  assert.match(page, /Birthday Décor/);
  assert.match(page, /Catering Coordination/);
  assert.match(page, /9\.0103199,38\.7960384/);
  assert.match(page, /Designed & developed by/);
  assert.match(galleryPage, /full-gallery-grid/);
  assert.doesNotMatch(
    `${page}${layout}${galleryPage}`,
    /codex-preview|Your site is taking shape|Starter Project/i,
  );
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
  const manifest = JSON.parse(packageJson);
  assert.equal(manifest.devDependencies?.vinext, undefined);
  assert.equal(manifest.devDependencies?.wrangler, undefined);
  assert.equal(manifest.dependencies?.["react-loading-skeleton"], undefined);
});
