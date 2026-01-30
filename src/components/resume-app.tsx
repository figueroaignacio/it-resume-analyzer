"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ResumeForm } from "./resume-form";
import { ResumeResults } from "./resume-results";

export function ResumeApp() {
  const [result, setResult] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNewAnalysis = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setResult(null);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            <div className="relative overflow-hidden rounded-xl border border-[#2a2b2c] bg-[#1e1f20] p-8 md:p-10">
              <ResumeForm onResult={setResult} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}>
            <ResumeResults
              result={result}
              onNewAnalysis={handleNewAnalysis}
              isTransitioning={isTransitioning}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
