import { answerPortfolioQuestion, assistantRequestSchema } from "../../server/portfolioAssistant";

export default async (req: Request) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const parsed = assistantRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please send a question between 1 and 600 characters." }, { status: 400 });
  }

  try {
    const answer = await answerPortfolioQuestion(parsed.data.message);
    return Response.json({ answer });
  } catch (error) {
    console.error("[Ask Princely AI] Request failed:", error);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }
};

export const config = {
  path: "/api/ask-princely",
  method: "POST",
};
