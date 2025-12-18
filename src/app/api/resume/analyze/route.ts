import { generateWithGemini } from "@/lib/ai/gemini";
import { resumePrompt } from "@/lib/ai/prompts";
import { normalizeResume } from "@/lib/normalize";
import { parseResume } from "@/lib/parsers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const role = formData.get("role") as string;
    const locale = (formData.get("locale") as string)?.startsWith("es")
      ? "es"
      : "en";

    if (!file || !role) {
      return new Response(JSON.stringify({ error: "Missing file or role" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawText = await parseResume(buffer, file.name);

    if (!rawText || rawText.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Could not extract text from file" }),
        { status: 400 }
      );
    }

    const cleanText = normalizeResume(rawText);

    const prompt = resumePrompt({
      resumeText: cleanText,
      role,
      locale,
    });

    const aiResponse = await generateWithGemini(prompt);

    if (!aiResponse) {
      return new Response(
        JSON.stringify({ error: "AI returned empty response" }),
        { status: 500 }
      );
    }

    const cleanJsonString = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJsonString);
    } catch (parseError) {
      return new Response(
        JSON.stringify({
          error: "Failed to parse AI response",
          details:
            parseError instanceof Error
              ? parseError.message
              : "Unknown parsing error",
        }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(parsedData), { status: 200 });
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({
        error: "Error processing resume",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
