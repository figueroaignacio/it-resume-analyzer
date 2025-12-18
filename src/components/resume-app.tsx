"use client";

import { useState } from "react";
import { ResumeForm } from "./resume-form";
import { ResumeStats } from "./resume-stats";
import { ResumeSuggestions } from "./resume-suggestions";

export function ResumeApp() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="space-y-10">
      <ResumeForm onResult={setResult} />

      {result && (
        <div className="grid gap-8">
          <ResumeStats scores={result.scores} />
          <ResumeSuggestions suggestions={result.suggestions} />
        </div>
      )}
    </div>
  );
}
