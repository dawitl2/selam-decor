import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("public", "assets");

const assets = [
  {
    input: "C:/Users/enkud/Desktop/company_logo.png",
    output: "selam-logo.webp",
    width: 720,
    quality: 86,
  },
  {
    input: "C:/Users/enkud/Desktop/Hero_main_image _center_stage.png",
    output: "hero-stage.webp",
    width: 2048,
    quality: 86,
  },
  {
    input: "C:/Users/enkud/Desktop/flower_sub_hero_showCase.png",
    output: "floral-vase.webp",
    width: 900,
    quality: 84,
  },
  {
    input: "C:/Users/enkud/Desktop/Hero_side_flower(blured and unblured).png",
    output: "foliage.webp",
    width: 560,
    quality: 88,
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576168.jpg",
    output: "arrangement-yellow.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576174.jpg",
    output: "arrangement-green.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576188.jpg",
    output: "floral-panel-white.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576181.jpg",
    output: "arrangement-white-gold.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576191.jpg",
    output: "floral-wall-pink.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576192.jpg",
    output: "floral-wall-ivory.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576193.jpg",
    output: "floral-wall-blush.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576197.jpg",
    output: "floral-frame-showcase.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576194.jpg",
    output: "floral-wall-full.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576196.jpg",
    output: "floral-frame-green.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576199.jpg",
    output: "floral-frame-ivory.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/6044372682314288675.jpg",
    output: "wedding-stage-olive.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/6044372682314288676.jpg",
    output: "wedding-stage-grand.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/6044372682314288677.jpg",
    output: "wedding-stage-white-gold.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576166.jpg",
    output: "arrangement-white.webp",
  },
  {
    input: "C:/Users/enkud/Downloads/5935891231575576167.jpg",
    output: "arrangement-red.webp",
  },
];

await mkdir(outputDir, { recursive: true });

for (const asset of assets) {
  await sharp(asset.input)
    .rotate()
    .resize({
      width: asset.width ?? 1400,
      withoutEnlargement: true,
    })
    .webp({ quality: asset.quality ?? 82, smartSubsample: true })
    .toFile(path.join(outputDir, asset.output));
}

await sharp("C:/Users/enkud/Desktop/company_logo.png")
  .resize(192, 192)
  .png({ quality: 90 })
  .toFile(path.resolve("public", "favicon.png"));

console.log(`Prepared ${assets.length + 1} optimized image assets.`);
