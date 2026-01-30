"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useResumeAnalysis } from "@/hooks/use-resume-analysis";
import { Loader2, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type React from "react";
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

  const isFormValid = fileUpload.file && role;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
          <Sparkles className="h-3.5 w-3.5" />
          {t("form.badge")}
        </div>
        <h2 className="text-2xl font-bold text-white">{t("form.title")}</h2>
        <p className="mt-2 text-sm text-violet-200/60">{t("form.subtitle")}</p>
      </div>
      {error && (
        <div className="animate-shake rounded-xl border border-red-500/30 bg-red-950/30 p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              ⚠
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-200">{t("error")}</p>
              <p className="mt-1 text-sm text-red-200/80">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
            1
          </div>
          <h3 className="text-sm font-semibold text-violet-100">
            {t("form.step1")}
          </h3>
        </div>
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
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-500/20 text-sm font-bold text-fuchsia-300">
            2
          </div>
          <h3 className="text-sm font-semibold text-violet-100">
            {t("form.step2")}
          </h3>
        </div>
        <RoleSelect
          value={role}
          onChange={(v) => {
            setRole(v);
            clearError();
          }}
          t={t}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg disabled:hover:shadow-violet-500/25">
        <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />

        {loading ? (
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("form.analyzing")}
          </span>
        ) : (
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            {isFormValid ? t("form.submitValid") : t("form.submitInvalid")}
          </span>
        )}
      </button>
      {loading && (
        <div className="space-y-2">
          <div className="h-1 overflow-hidden rounded-full bg-violet-950/50">
            <div className="h-full w-full origin-left animate-progress bg-linear-to-r from-violet-500 via-fuchsia-500 to-violet-500" />
          </div>
          <p className="text-center text-xs text-violet-200/60">
            {t("form.processingMessage")}
          </p>
        </div>
      )}
    </form>
  );
}
