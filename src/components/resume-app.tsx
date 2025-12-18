"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ResumeForm } from "./resume-form";
import { ResumeStats } from "./resume-stats";
import { ResumeSuggestions } from "./resume-suggestions";

export function ResumeApp() {
  const [result, setResult] = useState<any>(null);
  const t = useTranslations();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border bg-card p-6 shadow-lg md:p-8">
        <ResumeForm onResult={setResult} />
      </div>
      {result && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="font-medium">{t("result")}</span>
          </div>
          <div className="grid gap-6">
            <ResumeStats scores={result.scores} />
            <ResumeSuggestions suggestions={result.suggestions} />
          </div>
        </div>
      )}
    </div>
  );
}
