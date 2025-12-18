"use client";

import type React from "react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useResumeAnalysis } from "@/hooks/use-resume-analysis";
import { Loader2 } from "lucide-react";
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
        <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <span className="font-semibold">⚠</span>
          <div>
            <strong className="font-semibold">{t("error")}:</strong>{" "}
            <span>{error}</span>
          </div>
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
        className="group relative w-full overflow-hidden rounded-xl bg-primary py-4 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary disabled:hover:shadow-lg">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("analyzing")}
          </span>
        ) : (
          <span>{t("analyze")}</span>
        )}
      </button>
    </form>
  );
}
