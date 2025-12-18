import { useState } from "react";

interface AnalyzeResumeParams {
  file: File;
  role: string;
  locale: string;
}

export function useResumeAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async (
    params: AnalyzeResumeParams
  ): Promise<any | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", params.file);
      formData.append("role", params.role);
      formData.append("locale", params.locale);

      console.log("Submitting:", {
        fileName: params.file.name,
        fileSize: params.file.size,
        role: params.role,
        locale: params.locale,
      });

      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        console.error("Server error:", errorData);
        throw new Error(errorData.error || errorData.details || "Server error");
      }

      const data = await res.json();
      console.log("Success! Received data:", data);
      return data;
    } catch (err) {
      console.error("Error submitting form:", err);

      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    analyzeResume,
    loading,
    error,
    clearError,
  };
}
