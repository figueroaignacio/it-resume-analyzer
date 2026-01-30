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
            transition={{ duration: 0.4, ease: "easeOut" }}>
            <div className="relative overflow-hidden rounded-3xl border border-violet-500/20  to-transparent p-1 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              <div className="rounded-[22px]  p-8 backdrop-blur-sm md:p-10">
                <ResumeForm onResult={setResult} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}>
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
