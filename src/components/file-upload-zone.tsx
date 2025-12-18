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
      <label className="mb-3 block text-center text-sm font-medium">
        Upload your resume (PDF or DOCX)
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
              ? "border-blue-500 bg-blue-50"
              : file
              ? "border-green-400 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
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
            <Upload
              className={`mb-4 h-12 w-12 ${
                isDragging ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <p className="mb-1 text-sm font-medium text-gray-700">
              {isDragging ? "Drop the file here!" : "Drag your resume here"}
            </p>
            <p className="text-xs text-gray-500">or click to select a file</p>
            <p className="mt-2 text-xs text-gray-400">PDF or DOCX • Max 10MB</p>
          </div>
        ) : (
          <div className="flex items-center justify-between px-6 py-8">
            <div className="flex items-center gap-3">
              <FileText className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
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
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              disabled={loading}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
