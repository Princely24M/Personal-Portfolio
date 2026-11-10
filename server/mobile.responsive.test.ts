import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
const homePage = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

describe("mobile responsive safeguards", () => {
  it("keeps the hero columns shrinkable and the rotating role inside the viewport", () => {
    expect(stylesheet).toContain(".hero-copy, .hero-aside { min-width: 0; }");
    expect(stylesheet).toContain(".hero-rotating-title { min-width: 0; max-width: 100%;");
    expect(homePage).toContain('className="hero-intro"');
  });

  it("keeps the mobile menu independently scrollable", () => {
    expect(stylesheet).toContain("height: 100dvh; max-height: 100dvh; overflow-y: auto;");
    expect(stylesheet).toContain("overscroll-behavior: contain;");
  });

  it("sizes the assistant drawer to the mobile viewport", () => {
    expect(stylesheet).toContain(".ask-princely-panel { width: 100%; height: calc(100dvh - 24px);");
    expect(homePage).toContain('aria-label="Open Ask Princely AI"');
  });

  it("keeps the additional project repositories and demos in the showcase", () => {
    expect(homePage).toContain("name: \"Personal Webpage\"");
    expect(homePage).toContain("https://github.com/Princely24M/Personal-Webpage");
    expect(homePage).toContain("https://princely24m.github.io/Personal-Webpage/Index.html");
    expect(homePage).toContain("name: \"Nova Gaming\"");
    expect(homePage).toContain("https://github.com/Princely24M/Nova-Gaming/");
    expect(homePage).toContain("name: \"SkillBridge\"");
    expect(homePage).toContain("https://github.com/Princely24M/SkillBridge");
    expect(homePage).toContain("https://princely24m.github.io/SkillBridge/");
    expect(homePage).toContain("03 / 09");
  });

  it("gives supporting projects breathing room on desktop and mobile", () => {
    expect(stylesheet).toContain("min-height: 142px; padding: 24px 18px;");
    expect(stylesheet).toContain("min-height: 130px; padding: 18px 10px 20px;");
  });

  it("submits contact messages with Formspree reply-to metadata and readable failures", () => {
    expect(homePage).toContain('formspree.io/f/mppzzzvy');
    expect(homePage).toContain('formData.set("_replyto", email.trim())');
    expect(homePage).toContain('response.json().catch(() => null)');
    expect(homePage).toContain('setFormStatus("error")');
  });
});
