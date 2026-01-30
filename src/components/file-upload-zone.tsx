"use client";

import { CheckCircle2, FileText, Upload, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";

interface FileUploadZoneProps {
  file: File | null;
  isDragging: boolean;
  loading?: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function FileUploadZone({
  file,
  isDragging,
  loading = false,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInput,
  onRemove,
}: FileUploadZoneProps) {
  const t = useTranslations("upload");

  return (
    <div>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !file && document.getElementById("file-input")?.click()}
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed 
          transition-all duration-300 ease-out
          ${
            isDragging
              ? "scale-[1.02] border-violet-400 bg-violet-950/30 shadow-lg shadow-violet-500/20"
              : file
                ? "border-violet-500/50 bg-violet-950/20"
                : "cursor-pointer border-violet-500/30 bg-violet-950/10 hover:border-violet-500/50 hover:bg-violet-950/20 hover:shadow-lg hover:shadow-violet-500/10"
          }
          ${loading ? "pointer-events-none opacity-60" : ""}
        `}>
        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx"
          onChange={onFileInput}
          className="hidden"
          disabled={loading}
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center px-6 py-12">
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all ${
                isDragging
                  ? "scale-110 bg-violet-500/20 shadow-lg shadow-violet-500/30"
                  : "bg-violet-500/10"
              }`}>
              <Upload
                className={`h-8 w-8 transition-colors ${
                  isDragging ? "text-violet-300" : "text-violet-400"
                }`}
              />
            </div>
            <p className="mb-2 text-base font-semibold text-white">
              {isDragging ? t("dropHere") : t("dragDrop")}
            </p>
            <p className="mb-1 text-sm text-violet-200/60">{t("orClick")}</p>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/30 px-4 py-1.5 text-xs text-violet-300">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              {t("fileInfo")}
            </div>
          </div>
        ) : (
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-violet-500/5 to-fuchsia-500/5" />
            <div className="relative flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 shadow-lg">
                  <FileText className="h-7 w-7 text-violet-300" />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-semibold text-white">{file.name}</p>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-violet-200/60">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <span>•</span>
                    <span className="text-emerald-400">
                      {t("readyToAnalyze")}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="rounded-lg p-2 text-violet-300/60 transition-all hover:bg-red-500/10 hover:text-red-400"
                disabled={loading}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        {isDragging && (
          <div className="absolute inset-0 animate-pulse rounded-xl border-2 border-violet-400/50" />
        )}
      </div>
    </div>
  );
}
