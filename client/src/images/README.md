# Portfolio image module

This folder is the client-side image entry point for the portfolio.

UI components import the shared catalog through `index.ts`:

```ts
import { imagePath } from "@/images";

const portrait = imagePath("portrait.webp");
```

All portfolio image URLs resolve to the stable `/images/<filename>` path. The server maps those paths to the existing managed-storage assets using the root [`images/manifest.ts`](../../../images/manifest.ts).

The image binaries live in the project-root `images/assets/` folder so they are included in downloaded ZIP files. They are not duplicated inside `client/src/images/`; the source-tree image organization, aliases, and references are maintained here and in the shared manifest.
