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
  // Normalizamos el locale a "es" o "en"
  const lang = locale.startsWith("es") ? "es" : "en";
  const isSpanish = lang === "es";

  const instructionHeader = isSpanish
    ? "RESPONDE EN ESPAÑOL. NO USAR INGLÉS BAJO NINGUNA CIRCUNSTANCIA.\n"
    : "RESPOND IN ENGLISH. DO NOT USE SPANISH UNDER ANY CIRCUMSTANCE.\n";

  const header = isSpanish
    ? "Eres un reclutador técnico senior especializado en IT y software."
    : "You are a senior technical recruiter specialized in IT and software roles.";

  const context = isSpanish
    ? `Analiza el siguiente currículum para un profesional aplicando al rol de ${role}.
Evalúa según prácticas reales de reclutadores técnicos, hiring managers y ATS modernos.`
    : `Analyze the following resume for a professional applying for a ${role} position.
Evaluate according to real-world practices used by technical recruiters, hiring managers, and modern ATS.`;

  return `
${instructionHeader}

${header}

${context}

EVALUA EL CV SEGÚN ESTAS DIMENSIONES / EVALUATE THE RESUME ACROSS THESE DIMENSIONS:

1. ATS Compatibility / Compatibilidad ATS
- Standard headings / Encabezados estándar
- Logical structure / Estructura lógica
- Consistent dates / Fechas consistentes
- Parser-friendly / Legible para parsers

2. Parsing & Readability / Legibilidad
- Simple bullet points / Puntos claros
- Plain text / Texto plano
- No images, icons or emojis / Sin imágenes, iconos ni emojis

3. Technical Keywords & Stack / Keywords y stack técnico
- Relevant technologies / Tecnologías relevantes
- Primary vs secondary stack / Stack principal vs secundario
- Missing keywords / Palabras clave faltantes
- Avoid buzzwords / Evitar palabras genéricas

4. Experience Quality / Calidad de experiencia
- Action verbs / Verbos de acción
- Scope & ownership / Alcance y ownership
- Clarity / Claridad

5. Achievements & Impact / Logros e impacto
- Quantifiable metrics / Métricas cuantificables
- Real impact / Impacto real
- Outcomes vs tasks / Resultados vs tareas

6. Writing Quality / Calidad de escritura
- Grammar & spelling / Gramática y ortografía
- Professional tone / Tono profesional
- Conciseness / Concisión

7. Resume Layout / Layout del CV
- Information density / Densidad de información
- Logical order / Orden lógico
- Visual consistency / Consistencia visual

8. Market Competitiveness / Competitividad en el mercado
- Junior / Mid / Senior estimation
- Likelihood to pass ATS / Probabilidad de pasar ATS

STRICT RULES / REGLAS:
- Return ONLY valid JSON / Devuelve SOLO JSON válido
- NO text outside JSON / NO texto fuera del JSON
- Do not include markdown / No incluyas markdown
- Do not include comments / No incluyas comentarios

JSON SCHEMA:

{
  "scores": {
    "overall": number,
    "atsReadiness": number,
    "parsingQuality": number,
    "keywordMatch": number,
    "experienceQuality": number,
    "writingQuality": number,
    "layoutQuality": number
  },
  "estimatedLevel": "Junior | Mid | Senior",
  "strengths": string[],
  "weaknesses": string[],
  "missingKeywords": string[],
  "atsIssues": string[],
  "suggestions": string[]
}

Currículum / Resume:
"""
${resumeText}
"""
`;
}
