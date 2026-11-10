import { z } from "zod";

export const assistantRequestSchema = z.object({
  message: z.string().trim().min(1).max(600),
});

export const PORTFOLIO_ONLY_FALLBACK =
  "I'm Princely's portfolio assistant, so I can only answer questions about Princely, his skills, projects, experience, education and professional background.";

export const PORTFOLIO_UNKNOWN_FALLBACK =
  "I don't have that information in Princely's portfolio yet.";

export const PORTFOLIO_KNOWLEDGE = `
PROFILE
Princely is a software developer, UI/UX designer, and data analyst who builds thoughtful digital experiences where technology meets design and data. His working principle is: technology, design and data should make the next decision clearer.

EDUCATION
- College of Cape Town: MSITA Web Applications Development, Information Technology, Jan 2020 – Jan 2021.
- Rosebank International South Africa: Diploma in Software Development, Information Technology, Feb 2023 – Dec 2025.
- Emmanuel Christian Academy: NSC, Life Sciences, 2019.

EXPERIENCE
- CAPACITI, Cape Town, South Africa: Digital Associate: Web Development Trainee, Contract, Aug 2026 – Present. Selected for CAPACITI's Demand Academy programme, gaining practical experience in modern web development, software engineering, and applied artificial intelligence. Completed CAPACITI's AI Skills Accelerator Programme, developing practical skills in applied AI and prompt engineering. Designed and developed Ballast IT, an AI-powered productivity workspace focused on streamlining IT support workflows. Delivered a functional prototype, comprehensive technical documentation, and a live product walkthrough presentation.
- Multichoice Support Services (Pty) Ltd: NC: IT End User Computing L3, Internship, Jun 2021 – May 2022, South Africa · Hybrid. Built fundamentals in mathematics and communication, GUI applications for Access and email systems, Excel and data management, end-user computing technologies, and workplace skills.
- Prodigy InfoTech: Web Development Intern, Internship, Oct 2024 – Nov 2024, Remote. A hands-on educational internship focused on web development, collaboration, problem-solving, and meaningful project delivery.

SKILLS
Development: HTML, CSS, JavaScript, C#, .NET, Kotlin, React, TypeScript.
Data: SQL, Python, Data Visualization, Data Analysis, VADER, Machine Learning Fundamentals.
Design: Figma, UI/UX, Prototyping, Design Systems, Responsive Design.
Cloud and tools: Azure, Git, GitHub, Supabase, Firebase.

CERTIFICATIONS
- Google AI Essentials, Google / Coursera, 11 Aug 2026. Five-course professional certificate covering AI tools, prompting, responsible use, and productivity.
- CAPACITI AI Skills Accelerator Programme, completed as part of the CAPACITI experience.

PROJECTS
- Disaster Alleviation App: a platform designed to help coordinate and manage disaster-relief assistance. Technologies: .NET 8, ASP.NET Core MVC, C#, Azure SQL. GitHub: https://github.com/Princely24/DisasterAlleviationApplication
- Pfunani Caring Foundation: a mobile experience for connecting care, communication, and community support. Technologies: Kotlin, Jetpack Compose, Firebase. GitHub: https://github.com/Princely24/PfunaniFoundation
- BudgetIQ: a practical budgeting companion that turns personal finance into readable signals. Technologies: Kotlin, Android, Data Visualization. GitHub: https://github.com/Princely24/BudgetIQ
- GOVGUIDE AI: a clearer way to navigate public information with AI. Technologies: React, AI, Supabase, UI/UX. GitHub: https://github.com/Princely24M/GovGuide_Ai_Chatbot. Live demo: https://govguideai.lovable.app
- AI Sentiment Analyzer: a compact lens for turning language into useful patterns. Technologies: Python, VADER, Data Visualization, AI. GitHub: https://github.com/Princely24M/AI-Sentiment-Analyzer. Live demo: https://aisentiment-sp7zjfjg.manus.space
- AXIS Content Studio: an AI-powered content workspace for generating text, images, code, and optimized prompts in one place. Technologies: React, TypeScript, Supabase, AI. GitHub: https://github.com/Princely24M/axis-content-studio. Live demo: https://axis-content-studio.bolt.host

AI EXPERIENCE
Princely has applied AI experience through the Google AI Essentials certificate, CAPACITI's AI Skills Accelerator Programme, the Ballast IT productivity workspace, GOVGUIDE AI, AXIS Content Studio, and the AI Sentiment Analyzer. Do not infer experience beyond this knowledge.

CONTACT
Email: princelymakhwara@gmail.com. Portfolio and professional links are available in the website's contact section.
`;

const PORTFOLIO_TERMS = [
  "princely",
  "portfolio",
  "skill",
  "technology",
  "project",
  "experience",
  "work",
  "capaciti",
  "ballast",
  "education",
  "study",
  "certificate",
  "certification",
  "ai",
  "artificial intelligence",
  "web development",
  "software development",
  "ui",
  "ux",
  "design",
  "data",
  "analytics",
  "python",
  ".net",
  "kotlin",
  "react",
  "sql",
  "github",
  "contact",
  "hire",
  "career",
  "goal",
  "professional",
  "background",
  "currently",
  "doing",
  "employer",
  "multichoice",
  "prodigy",
  "disaster",
  "pfunani",
  "budgetiq",
  "govguide",
  "sentiment",
  "axis",
];

export function isPortfolioQuestion(message: string) {
  const normalized = message.toLowerCase();
  return PORTFOLIO_TERMS.some((term) => normalized.includes(term));
}

export function buildAssistantMessages(message: string) {
  return [
    {
      role: "system" as const,
      content: `You are Ask Princely AI, a portfolio-specific assistant. Answer only questions about Princely and the portfolio knowledge below. Never use general world knowledge to fill gaps. Never invent skills, jobs, qualifications, certifications, projects, technologies, employers, achievements, dates, or personal information. If the answer is not in the knowledge, reply exactly: "${PORTFOLIO_UNKNOWN_FALLBACK}". Keep answers concise, warm, and useful to recruiters, hiring managers, clients, and visitors. You may use Markdown sparingly.\n\nPORTFOLIO KNOWLEDGE:\n${PORTFOLIO_KNOWLEDGE}`,
    },
    { role: "user" as const, content: message },
  ];
}

export async function invokePortfolioAssistant(message: string) {
  const baseUrl = process.env.BUILT_IN_FORGE_API_URL?.replace(/\/+$/, "");
  const apiKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("AI service is not configured");
  }

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      messages: buildAssistantMessages(message),
      max_tokens: 1200,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI service returned ${response.status}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | Array<{ type?: string; text?: string }> | null }; text?: string }>;
    output_text?: string;
  };
  const content = payload.choices?.[0]?.message?.content;
  const answer = Array.isArray(content)
    ? content.map((part) => part.text || "").join(" ").trim()
    : (content || payload.choices?.[0]?.text || payload.output_text || "").trim();

  if (!answer) {
    throw new Error("AI service returned an empty response");
  }

  return answer;
}

export async function answerPortfolioQuestion(message: string) {
  const parsed = assistantRequestSchema.parse({ message });
  if (!isPortfolioQuestion(parsed.message)) {
    return PORTFOLIO_ONLY_FALLBACK;
  }
  return invokePortfolioAssistant(parsed.message);
}
