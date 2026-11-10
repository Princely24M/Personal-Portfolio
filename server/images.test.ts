import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { imageStorageKeys } from "../images/manifest";

const homePage = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
const assistant = readFileSync(new URL("../client/src/components/AskPrincelyAI.tsx", import.meta.url), "utf8");
const clientImages = readFileSync(new URL("../client/src/images/index.ts", import.meta.url), "utf8");
const html = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const localAssetRoot = new URL("../images/assets/", import.meta.url);
const directManagedImagePattern = /\/manus-storage\/[^"'\s]+\.(?:png|jpe?g|webp|svg|gif|ico)/i;

const expectedImageFiles = [
  "portrait.webp",
  "logo.png",
  "footer.png",
  "budget-iq.png",
  "pfunani-caring-foundation.png",
  "govguide-ai.png",
  "sentiment-analyzer.png",
  "axis-content-studio.png",
  "skillbridge.svg",
  "personal-webpage.png",
  "nova-gaming.png",
  "disaster-alleviation.png",
  "capaciti.jpg",
  "multichoice.jpg",
  "prodigy-infotech.jpg",
  "college-of-cape-town.jpg",
  "rosebank-international.jpg",
  "emmanuel-christian-academy.jpg",
  "ask-princely-ai-lightmode.png",
  "ask-princely-ai-darkmode.png",
] as const;

describe("portfolio image organization", () => {
  it("keeps one manifest entry for every image used by the portfolio", () => {
    expect(Object.keys(imageStorageKeys).sort()).toEqual([...expectedImageFiles].sort());
  });

  it("includes a local asset for every manifest image so ZIP downloads are self-contained", () => {
    for (const filename of expectedImageFiles) {
      expect(existsSync(new URL(filename, localAssetRoot))).toBe(true);
    }
  });

  it("uses stable images paths in the React and HTML references", () => {
    expect(clientImages).toContain('from "../../../images/manifest"');
    expect(homePage).toContain('from "@/images"');
    expect(assistant).toContain('from "@/images"');
    expect(homePage).toContain("imagePath(\"portrait.webp\")");
    expect(homePage).toContain("imagePath(\"logo.png\")");
    expect(homePage).toContain('imagePath("skillbridge.svg")');
    expect(homePage).toContain('imagePath("personal-webpage.png")');
    expect(homePage).toContain('imagePath("nova-gaming.png")');
    expect(homePage).not.toMatch(directManagedImagePattern);
    expect(assistant).toContain('imagePath("ask-princely-ai-lightmode.png")');
    expect(assistant).toContain('imagePath("ask-princely-ai-darkmode.png")');
    expect(assistant).not.toMatch(directManagedImagePattern);
    expect(html).toContain('href="/images/logo.png"');
    expect(html).not.toMatch(directManagedImagePattern);
  });
});
