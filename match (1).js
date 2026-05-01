export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { resume, jobDescription } = req.body;

  if (!resume || !jobDescription) {
    return res.status(400).json({ error: "Resume and job description are required." });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: "API key not configured. Add ANTHROPIC_API_KEY in Vercel Environment Variables.",
    });
  }

  const prompt = `You are an expert ATS (Applicant Tracking System) and career coach. Analyse the resume and job description below and return a JSON object ONLY — no preamble, no markdown, no explanation.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Return this exact JSON structure:
{
  "matchScore": <integer 0-100>,
  "verdict": "<one of: Strong Match | Good Match | Partial Match | Weak Match>",
  "summary": "<2-3 sentence plain English overview of the match>",
  "matchingSkills": ["<skill1>", "<skill2>", ...],
  "missingKeywords": ["<keyword1>", "<keyword2>", ...],
  "suggestions": [
    { "title": "<short title>", "detail": "<actionable advice>" }
  ],
  "strengths": ["<strength1>", "<strength2>", ...],
  "atsKeywordsToAdd": ["<keyword1>", "<keyword2>", ...]
}

Rules:
- matchScore must reflect genuine compatibility
- matchingSkills: skills/keywords present in BOTH resume and JD
- missingKeywords: important JD keywords absent from resume
- suggestions: 3-5 specific, actionable improvements
- strengths: 3-4 genuine strengths the candidate has for this role
- atsKeywordsToAdd: exact phrases from JD to weave into the resume
- Return ONLY the JSON object, nothing else`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Analysis failed. " + err.message });
  }
}
