# Selam Wedding Planner & Decor

A polished, responsive frontend for Selam Wedding Planner & Decor. The site
showcases wedding and ceremony styling, celebrations, custom floral design,
featured projects, the planning process, Instagram, and verified contact
details.

## Local preview

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Checks

```bash
npm run lint
npm run build
npm test
```

## Project structure

- `app/page.tsx` contains the responsive page and interactions.
- `app/globals.css` contains the visual system and desktop/mobile layouts.
- `public/assets/` contains optimized local images supplied for this project.
- `scripts/prepare-assets.mjs` can regenerate the optimized WebP files from the
  original source images on this computer.

This project is frontend-only. It has no database, authentication, admin area,
inquiry backend, or deployment configuration beyond the local starter runtime.
