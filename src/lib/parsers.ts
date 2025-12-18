import mammoth from "mammoth";
import pdf from "pdf-extraction";

export async function parseResume(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase();

  try {
    if (ext === "pdf") {
      const data = await pdf(buffer);
      return data.text;
    }

    if (ext === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
  } catch (error: any) {
    console.error("Error parseando el archivo:", error);
    throw new Error(`Error en el parser: ${error.message}`);
  }

  throw new Error("Formato de archivo no soportado (solo PDF y DOCX)");
}
