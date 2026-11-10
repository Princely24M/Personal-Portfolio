# Princely Portfolio

Premium editorial portfolio website for Princely, built with React, TypeScript, Vite, Tailwind CSS, and Express.

## Project structure

```text
princely-portfolio/
├── client/
│   ├── public/              # Small public configuration files only
│   └── src/
│       ├── components/      # Reusable UI and portfolio components
│       ├── contexts/        # Theme and application contexts
│       ├── images/          # Client image module and usage guidance
│       ├── pages/            # Page-level components
│       ├── hooks/            # Shared React hooks
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
├── images/
│   ├── assets/              # Local image binaries included in ZIP downloads
│   ├── manifest.ts          # Shared logical-name to asset mapping
│   └── README.md            # Image storage and path documentation
├── server/
│   ├── index.ts             # Express server and /images/:filename route
│   ├── portfolioAssistant.ts
│   └── *.test.ts            # Regression tests
├── shared/                  # Shared application types and constants
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Image paths

Portfolio UI code imports image paths from `@/images`:

```ts
import { imagePath } from "@/images";

const logo = imagePath("logo.png");
```

The website uses stable `/images/<filename>` URLs. The Express server serves the matching local file from `images/assets/` first, then falls back to managed storage when a local asset is unavailable.

All portfolio image binaries are stored in the root `images/assets/` folder so they remain visible when the project is downloaded as a ZIP.

## Local development

```bash
pnpm install
pnpm run dev
```

## Validation

```bash
pnpm test
pnpm run check
pnpm run build
```
# Personal-Portfolio
