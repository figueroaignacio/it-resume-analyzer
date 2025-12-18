import { generateWithGemini } from "@/lib/ai/gemini";
import { resumePrompt } from "@/lib/ai/prompts";
import { normalizeResume } from "@/lib/normalize";
import { parseResume } from "@/lib/parsers";
import type { Locale } from "next-intl";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const role = formData.get("role") as string;
    const locale = (formData.get("locale") as Locale) || "en"; // ⬅️ Obtener locale del formData

    if (!file || !role) {
      return Response.json({ error: "Missing file or role" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawText = await parseResume(buffer, file.name);
    const cleanText = normalizeResume(rawText);

    const prompt = resumePrompt({
      resumeText: cleanText,
      role: role,
      locale: locale, // ⬅️ Pasar locale al prompt
    });

    const aiResponse = await generateWithGemini(prompt);

    const cleanJsonString = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return Response.json(JSON.parse(cleanJsonString));
  } catch (error: any) {
    console.error("Error en API:", error);
    return Response.json(
      { error: "Error procesando el resume", details: error.message },
      { status: 500 }
    );
  }
}
