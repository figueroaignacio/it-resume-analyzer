"use client";

import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle2,
  FileText,
  Lightbulb,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface ResumeResultsProps {
  result: any;
  onNewAnalysis: () => void;
  isTransitioning: boolean;
}

export function ResumeResults({
  result,
  onNewAnalysis,
  isTransitioning,
}: ResumeResultsProps) {
  const t = useTranslations("results");
  const scores = result?.scores || {};
  const suggestions = result?.suggestions || [];

  const scoreEntries = Object.entries(scores);
  const averageScore =
    scoreEntries.length > 0
      ? Math.round(
          scoreEntries.reduce((acc, [, val]) => acc + (val as number), 0) /
            scoreEntries.length,
        )
      : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-white";
    if (score >= 60) return "text-[#e5e5e5]";
    if (score >= 40) return "text-[#b0b0b0]";
    return "text-[#909090]";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t("scoreLabels.excellent");
    if (score >= 60) return t("scoreLabels.good");
    if (score >= 40) return t("scoreLabels.fair");
    return t("scoreLabels.needsWork");
  };

  return (
    <div className="space-y-5">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onNewAnalysis}
        disabled={isTransitioning}
        className="group flex items-center gap-2 text-sm font-medium text-[#7a7a7a] transition-all hover:text-white disabled:opacity-50">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t("backButton")}
      </motion.button>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-lg border border-[#2a2b2c] bg-[#1e1f20] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              {t("successTitle")}
            </h3>
            <p className="text-sm text-[#7a7a7a]">{t("successMessage")}</p>
          </div>
        </div>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-lg border border-[#2a2b2c] bg-[#1e1f20] p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-white/5">
            <Award className="h-7 w-7 text-white" />
          </div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#7a7a7a]">
            {t("overallScore")}
          </h3>
          <div className="mb-2 text-5xl font-semibold text-white">
            {averageScore}
            <span className="text-2xl text-[#7a7a7a]">/100</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-sm font-medium text-white">
            {getScoreLabel(averageScore)}
          </div>
        </div>
      </motion.div>

      {/* Detailed Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-lg border border-[#2a2b2c] bg-[#1e1f20]">
        <div className="border-b border-[#2a2b2c] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
              <Target className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {t("detailedScores")}
              </h3>
              <p className="text-sm text-[#7a7a7a]">{t("categoryBreakdown")}</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {scoreEntries.map(([key, value], index) => {
              const score = value as number;
              const formattedKey = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim();

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {formattedKey}
                    </span>
                    <span
                      className={`text-sm font-semibold ${getScoreColor(score)}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{
                        delay: 0.6 + index * 0.08,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-white"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden rounded-lg border border-[#2a2b2c] bg-[#1e1f20]">
        <div className="border-b border-[#2a2b2c] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {t("improvementSuggestions")}
              </h3>
              <p className="text-sm text-[#7a7a7a]">
                {suggestions.length} {t("actionableTips")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {suggestions.map((suggestion: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.08 }}
                className="flex gap-3 rounded-lg border border-[#2a2b2c] bg-black/20 p-4 transition-all hover:border-[#3a3b3c]">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                  <AlertCircle className="h-3 w-3" />
                </div>
                <p className="text-sm leading-relaxed text-[#e5e5e5]">
                  {suggestion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Analyze Another Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onNewAnalysis}
        disabled={isTransitioning}
        className="group relative w-full overflow-hidden rounded-lg border border-[#2a2b2c] bg-white py-3.5 font-medium text-black transition-all hover:bg-white/90 disabled:opacity-50">
        <span className="flex items-center justify-center gap-2">
          <FileText className="h-4 w-4" />
          {t("analyzeAnother")}
        </span>
      </motion.button>
    </div>
  );
}
