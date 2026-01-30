"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useResumeAnalysis } from "@/hooks/use-resume-analysis";
import { ArrowRight, FileCheck, Loader2 } from "lucide-react";
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
      {/* Header */}
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#a0a0a0] uppercase tracking-wider">
          <FileCheck className="h-3 w-3" />
          {t("form.badge")}
        </div>
        <h2 className="text-xl font-semibold text-white">{t("form.title")}</h2>
        <p className="mt-2 text-sm text-[#7a7a7a]">{t("form.subtitle")}</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="animate-shake rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
              !
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-400">{t("error")}</p>
              <p className="mt-1 text-sm text-red-400/80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Upload File */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-xs font-semibold text-white">
            1
          </div>
          <h3 className="text-sm font-medium text-white">{t("form.step1")}</h3>
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

      {/* Step 2: Select Role */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-xs font-semibold text-white">
            2
          </div>
          <h3 className="text-sm font-medium text-white">{t("form.step2")}</h3>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className="group relative w-full overflow-hidden rounded-lg bg-white py-3.5 font-medium text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("form.analyzing")}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {isFormValid ? t("form.submitValid") : t("form.submitInvalid")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </button>

      {/* Loading Progress */}
      {loading && (
        <div className="space-y-2">
          <div className="h-1 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-full origin-left animate-progress bg-white" />
          </div>
          <p className="text-center text-xs text-[#7a7a7a]">
            {t("form.processingMessage")}
          </p>
        </div>
      )}
    </form>
  );
}
