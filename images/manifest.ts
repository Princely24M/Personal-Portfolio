/**
 * Logical image catalog for the portfolio.
 *
 * The binaries remain in managed storage so the webdev deployment does not
 * duplicate large media files inside the source tree. The server exposes each
 * catalog key through a stable `/images/<key>` path.
 */
export const imageStorageKeys = {
  "portrait.webp": "RBCPT3_186_a2c01c62.webp",
  "logo.png": "princely-user-logo-cropped_5912aedf.png",
  "footer.png": "princely-footer-art_60b72172.png",
  "budget-iq.png": "BudgetIQLogo_999389cb.png",
  "pfunani-caring-foundation.png": "PfunaniCaringFoundationLogo_d59da745.png",
  "govguide-ai.png": "GovGuideAiLogo_3a354d09.png",
  "sentiment-analyzer.png": "AISentimentAnalyzer-Dark_43522688.png",
  "axis-content-studio.png": "axis-lockup-primary_ec0403f8.png",
  "skillbridge.svg": "SkillBridgelogo_18805abf.svg",
  "personal-webpage.png": "princely-Personallogo_a505797b.png",
  "nova-gaming.png": "NOVALogo_be9935f4.png",
  "disaster-alleviation.png": "DisasterReliefEmblemLogo_684c15a6.png",
  "capaciti.jpg": "CAPACITI_c638b716.jpg",
  "multichoice.jpg": "Multichoice-Support-Services_fcc4b4a1.jpg",
  "prodigy-infotech.jpg": "Prodigy-InfoTech_1c99569a.jpg",
  "college-of-cape-town.jpg": "College-of-Cape-Town_f2b0d8e7.jpg",
  "rosebank-international.jpg": "Rosebank-International_c495d5fd.jpg",
  "emmanuel-christian-academy.jpg": "emmanuel-christian-academy-logo_207af542.jpg",
  "ask-princely-ai-lightmode.png": "ask-princely-ai-lightmode_c9f62a89.png",
  "ask-princely-ai-darkmode.png": "209ad5e5-c486-457d-9976-41006e439d9b_b428bc69.png",
} as const;

export type ImagePath = `/images/${keyof typeof imageStorageKeys}`;

export const imagePath = <T extends keyof typeof imageStorageKeys>(name: T): ImagePath & `/images/${T}` =>
  `/images/${name}` as ImagePath & `/images/${T}`;
