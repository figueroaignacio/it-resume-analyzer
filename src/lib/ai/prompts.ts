import type { Locale } from "next-intl";

export function resumePrompt({
  resumeText,
  role,
  locale,
}: {
  resumeText: string;
  role: string;
  locale: Locale;
}) {
  const language = locale === "es" ? "Spanish" : "English";

  return `
You are a senior technical recruiter specialized in IT and software roles.

Analyze the following resume for an IT professional applying for a ${role} position.

Your evaluation must reflect real hiring practices used by:
- Technical recruiters
- Hiring managers
- ATS (Applicant Tracking Systems)

Evaluate the resume across these dimensions:

1. ATS Compatibility
- Section structure and standard headings
- Bullet point formatting
- Parser readability
- Keyword placement

2. Technical Keywords & Stack
- Role-relevant technologies, frameworks, tools
- Missing critical keywords
- Overuse of vague or generic terms

3. Experience Quality
- Clarity of responsibilities
- Seniority signals
- Complexity and scope
- Ownership and autonomy

4. Achievements & Impact
- Use of measurable results
- Performance, scale, quality, business impact
- Clear distinction between tasks and outcomes

5. Writing Quality & Orthography
- Grammar and spelling
- Professional tone
- Conciseness and clarity

6. Resume Layout & Readability
- Information density
- Logical ordering
- Consistency in dates and roles

7. Overall Market Competitiveness
- Junior / Mid / Senior readiness
- Competitiveness in the current IT market

IMPORTANT:
- Return the response in ${language}
- Return ONLY valid JSON
- Do not include explanations outside JSON

JSON format:

{
  "scores": {
    "overall": number,
    "atsReadiness": number,
    "keywordMatch": number,
    "writingQuality": number,
    "layoutQuality": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "missingKeywords": string[],
  "suggestions": string[]
}

Resume:
"""
${resumeText}
"""
`;
}
