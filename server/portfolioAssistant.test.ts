import { describe, expect, it } from "vitest";
import {
  PORTFOLIO_ONLY_FALLBACK,
  PORTFOLIO_UNKNOWN_FALLBACK,
  answerPortfolioQuestion,
  buildAssistantMessages,
  isPortfolioQuestion,
} from "./portfolioAssistant";

describe("portfolio assistant guardrails", () => {
  it("recognizes portfolio questions", () => {
    expect(isPortfolioQuestion("What projects has Princely built?")) .toBe(true);
    expect(isPortfolioQuestion("Does he use .NET?")) .toBe(true);
  });

  it("rejects unrelated questions before calling the model", async () => {
    await expect(answerPortfolioQuestion("What is the capital of France?")).resolves.toBe(PORTFOLIO_ONLY_FALLBACK);
    await expect(answerPortfolioQuestion("Tell me a joke.")).resolves.toBe(PORTFOLIO_ONLY_FALLBACK);
  });

  it("keeps the portfolio source of truth in the system prompt", () => {
    const messages = buildAssistantMessages("Tell me about CAPACITI.");
    expect(messages[0]?.content).toContain("PORTFOLIO KNOWLEDGE");
    expect(messages[0]?.content).toContain("Ballast IT");
    expect(messages[0]?.content).toContain(PORTFOLIO_UNKNOWN_FALLBACK);
  });
});
