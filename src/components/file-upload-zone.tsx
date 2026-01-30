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
          relative overflow-hidden rounded-lg border transition-all duration-200
          ${
            isDragging
              ? "scale-[1.01] border-white bg-[#2a2b2c]"
              : file
                ? "border-[#3a3b3c] bg-[#1e1f20]"
                : "cursor-pointer border-[#2a2b2c] bg-[#1e1f20] hover:border-[#3a3b3c] hover:bg-[#252626]"
          }
          ${loading ? "pointer-events-none opacity-50" : ""}
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
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg transition-all ${
                isDragging ? "bg-white/10" : "bg-white/5"
              }`}>
              <Upload
                className={`h-6 w-6 transition-colors ${
                  isDragging ? "text-white" : "text-[#a0a0a0]"
                }`}
              />
            </div>
            <p className="mb-2 text-sm font-medium text-white">
              {isDragging ? t("dropHere") : t("dragDrop")}
            </p>
            <p className="mb-4 text-xs text-[#7a7a7a]">{t("orClick")}</p>
            <div className="flex items-center gap-2 rounded-md border border-[#2a2b2c] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#a0a0a0]">
              <div className="h-1 w-1 rounded-full bg-[#7a7a7a]" />
              {t("fileInfo")}
            </div>
          </div>
        ) : (
          <div className="group relative">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-medium text-white">{file.name}</p>
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#7a7a7a]">
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                    <span>•</span>
                    <span className="text-white">{t("readyToAnalyze")}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="rounded-md p-2 text-[#7a7a7a] transition-all hover:bg-red-500/10 hover:text-red-500"
                disabled={loading}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
