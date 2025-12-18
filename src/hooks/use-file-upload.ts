import { useState } from "react";

interface UseFileUploadOptions {
  allowedTypes?: string[];
  maxSizeMB?: number;
  onError?: (error: string) => void;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSizeMB = 10,
    onError,
  } = options;

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (selectedFile: File): string | null => {
    if (!allowedTypes.includes(selectedFile.type)) {
      return "Please select a valid file type";
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    const error = validateFile(selectedFile);
    if (error) {
      onError?.(error);
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    handleFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const reset = () => {
    setFile(null);
    setIsDragging(false);
  };

  return {
    file,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    removeFile,
    reset,
  };
}
