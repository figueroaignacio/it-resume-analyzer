"use client";

import type React from "react";

import { FileText, Upload, X } from "lucide-react";

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
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-foreground">
        Upload your resume
      </label>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed 
          transition-all duration-200 ease-in-out
          ${
            isDragging
              ? "border-primary bg-primary/5 shadow-md"
              : file
              ? "border-primary/50 bg-primary/5"
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
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
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                isDragging ? "bg-primary/10" : "bg-muted"
              }`}>
              <Upload
                className={`h-8 w-8 ${
                  isDragging ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </div>
            <p className="mb-2 text-base font-semibold text-foreground">
              {isDragging ? "Drop your file here" : "Drag and drop your resume"}
            </p>
            <p className="mb-1 text-sm text-muted-foreground">
              or click to browse files
            </p>
            <p className="mt-3 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              PDF or DOCX • Max 10MB
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              disabled={loading}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
