"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ResumeForm } from "./resume-form";
import { ResumeStats } from "./resume-stats";
import { ResumeSuggestions } from "./resume-suggestions";

export function ResumeApp() {
  const [result, setResult] = useState<any>(null);
  const t = useTranslations();

  const handleNewAnalysis = () => {
    setResult(null);
  };

  if (result) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-6">
          <button
            onClick={handleNewAnalysis}
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Analyze another resume
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Analysis Complete
              </h3>
              <p className="text-sm text-muted-foreground">
                Here's your detailed resume analysis
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ResumeStats scores={result.scores} />
            <ResumeSuggestions suggestions={result.suggestions} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-lg md:p-8">
      <ResumeForm onResult={setResult} />
    </div>
  );
}
