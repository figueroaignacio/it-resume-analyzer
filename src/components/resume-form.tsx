"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useResumeAnalysis } from "@/hooks/use-resume-analysis";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { FileUploadZone } from "./file-upload-zone";
import { RoleSelect } from "./role-select";

interface ResumeFormProps {
  onResult: (data: any) => void;
}

export function ResumeForm({ onResult }: ResumeFormProps) {
  const t = useTranslations("");
  const locale = useLocale();
  const { analyzeResume, loading, error, clearError } = useResumeAnalysis();

  const [role, setRole] = useState<
    | ""
    | "frontend"
    | "backend"
    | "fullstack"
    | "qa"
    | "data"
    | "devops"
    | "mobile"
  >("");

  const fileUpload = useFileUpload({ maxSizeMB: 10, onError: clearError });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUpload.file || !role) return;

    const result = await analyzeResume({
      file: fileUpload.file,
      role,
      locale: locale,
    });

    if (result) {
      onResult(result);
      fileUpload.reset();
      setRole("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <strong>{t("error")}:</strong> {error}
        </div>
      )}

      <FileUploadZone
        file={fileUpload.file}
        isDragging={fileUpload.isDragging}
        loading={loading}
        onDragOver={fileUpload.handleDragOver}
        onDragLeave={fileUpload.handleDragLeave}
        onDrop={fileUpload.handleDrop}
        onFileInput={fileUpload.handleFileInput}
        onRemove={fileUpload.removeFile}
      />

      <RoleSelect
        value={role}
        onChange={(v) => {
          setRole(v);
          clearError();
        }}
        t={t}
      />

      <button
        type="submit"
        disabled={loading || !fileUpload.file || !role}
        className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? t("analyzing") : t("analyze")}
      </button>
    </form>
  );
}
