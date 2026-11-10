import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { answerPortfolioQuestion, assistantRequestSchema } from "./portfolioAssistant";
import { imageStorageKeys } from "../images/manifest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "12kb" }));

  app.get("/images/:filename", async (req, res) => {
    const filename = req.params.filename;
    const storageKey = Object.prototype.hasOwnProperty.call(imageStorageKeys, filename)
      ? imageStorageKeys[filename as keyof typeof imageStorageKeys]
      : undefined;

    if (!storageKey) {
      res.status(404).type("text/plain").send("Image not found");
      return;
    }

    const localAssetPath = path.resolve(__dirname, "..", "images", "assets", filename);
    if (fs.existsSync(localAssetPath)) {
      res.sendFile(localAssetPath);
      return;
    }

    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
    if (!forgeBaseUrl || !forgeKey) {
      res.status(500).type("text/plain").send("Image storage is not configured");
      return;
    }

    try {
      const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
      forgeUrl.searchParams.set("path", storageKey);
      const forgeResp = await fetch(forgeUrl, { headers: { Authorization: `Bearer ${forgeKey}` } });
      if (!forgeResp.ok) {
        res.status(502).type("text/plain").send("Image storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url?: string };
      if (!url) {
        res.status(502).type("text/plain").send("Image storage returned no URL");
        return;
      }

      res.redirect(307, url);
    } catch {
      res.status(502).type("text/plain").send("Image storage error");
    }
  });

  app.post("/api/ask-princely", async (req, res) => {
    const parsed = assistantRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Please send a question between 1 and 600 characters." });
      return;
    }

    try {
      const answer = await answerPortfolioQuestion(parsed.data.message);
      res.json({ answer });
    } catch (error) {
      console.error("[Ask Princely AI] Request failed:", error);
      res.status(503).json({ error: "The assistant is temporarily unavailable. Please try again shortly." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true, hmr: { server } }, appType: "spa" });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const templatePath = path.resolve(__dirname, "..", "client", "index.html");
        const template = await vite.transformIndexHtml(url, fs.readFileSync(templatePath, "utf-8"));
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  } else {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
