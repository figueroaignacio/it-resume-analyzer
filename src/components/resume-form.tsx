"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { RoleSelect } from "./role-select";

export function ResumeForm({ onResult }: { onResult: (data: any) => void }) {
  const locale = useLocale(); // ⬅️ Obtener locale
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !role) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", role);
      formData.append("locale", locale); // ⬅️ Enviar locale al API

      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error en el servidor");
      }

      const data = await res.json();
      onResult(data);
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al analizar el CV. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="w-full rounded-lg border p-3 text-sm"
      />

      <RoleSelect value={role} onChange={setRole} />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 text-white disabled:opacity-50">
        {loading ? "Analyzing…" : "Analyze Resume"}
      </button>
    </form>
  );
}
