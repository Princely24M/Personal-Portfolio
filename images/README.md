# Portfolio images

This folder is the portfolio's image organization layer.

The website references images through stable paths such as `/images/logo.png` and `/images/portrait.webp`. Those paths are resolved by the server using [`manifest.ts`](./manifest.ts), which maps each logical filename to the existing managed-storage asset.

The client code imports the shared catalog through [`client/src/images/index.ts`](../client/src/images/index.ts), so the image organization is part of the application source structure without creating duplicate binaries.

The local binary files are included in [`assets/`](./assets/) so they appear in downloaded project ZIPs. The server serves these local files first through `/images/<filename>`, with managed storage retained as a fallback for deployments that do not include the local folder.

## Catalog

| Local path | Used for |
| --- | --- |
| `/images/portrait.webp` | Hero portrait |
| `/images/logo.png` | Navigation, cursor, and footer mark |
| `/images/footer.png` | Footer artwork |
| `/images/budget-iq.png` | BudgetIQ project |
| `/images/pfunani-caring-foundation.png` | Pfunani Caring Foundation project |
| `/images/govguide-ai.png` | GOVGUIDE AI project |
| `/images/sentiment-analyzer.png` | AI Sentiment Analyzer project |
| `/images/axis-content-studio.png` | AXIS Content Studio project |
| `/images/skillbridge.svg` | SkillBridge project cover |
| `/images/personal-webpage.png` | Personal Webpage project cover |
| `/images/nova-gaming.png` | Nova Gaming project cover |
| `/images/disaster-alleviation.png` | Disaster Alleviation App project |
| `/images/capaciti.jpg` | CAPACITI experience |
| `/images/multichoice.jpg` | Multichoice experience |
| `/images/prodigy-infotech.jpg` | Prodigy InfoTech experience |
| `/images/college-of-cape-town.jpg` | College of Cape Town education |
| `/images/rosebank-international.jpg` | Rosebank International education |
| `/images/emmanuel-christian-academy.jpg` | Emmanuel Christian Academy education |
| `/images/ask-princely-ai-lightmode.png` | Ask Princely AI light-mode logo |
| `/images/ask-princely-ai-darkmode.png` | Ask Princely AI dark-mode logo |
