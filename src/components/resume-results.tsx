"use client";

import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle2,
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
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
    if (score >= 80)
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
      };
    if (score >= 60)
      return {
        text: "text-cyan-400",
        bg: "bg-cyan-500/20",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/20",
      };
    if (score >= 40)
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/30",
        glow: "shadow-yellow-500/20",
      };
    return {
      text: "text-orange-400",
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      glow: "shadow-orange-500/20",
    };
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t("scoreLabels.excellent");
    if (score >= 60) return t("scoreLabels.good");
    if (score >= 40) return t("scoreLabels.fair");
    return t("scoreLabels.needsWork");
  };

  const avgColors = getScoreColor(averageScore);

  return (
    <div className="space-y-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onNewAnalysis}
        disabled={isTransitioning}
        className="group flex items-center gap-2 text-sm font-medium text-violet-200/70 transition-all hover:text-violet-200 disabled:opacity-50">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t("backButton")}
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-linear-to-r from-violet-950/50 to-fuchsia-950/40 p-6 backdrop-blur-sm">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
            <CheckCircle2 className="h-6 w-6 text-violet-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {t("successTitle")}
            </h3>
            <p className="text-sm text-violet-200/70">{t("successMessage")}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`relative overflow-hidden rounded-2xl border ${avgColors.border} bg-linear-to-br from-violet-950/40 to-transparent p-8 backdrop-blur-sm shadow-xl ${avgColors.glow}`}>
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500/20 to-fuchsia-500/20">
            <Award className="h-8 w-8 text-violet-200" />
          </div>
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-violet-200/70">
            {t("overallScore")}
          </h3>
          <div className="mb-2 text-6xl font-bold text-white">
            {averageScore}
            <span className="text-3xl text-violet-200/50">/100</span>
          </div>
          <div
            className={`inline-flex items-center gap-2 rounded-full ${avgColors.bg} px-4 py-1.5 text-sm font-medium ${avgColors.text}`}>
            <TrendingUp className="h-4 w-4" />
            {getScoreLabel(averageScore)}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-950/40 to-transparent backdrop-blur-sm">
        <div className="border-b border-violet-500/20 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20">
              <Target className="h-5 w-5 text-violet-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {t("detailedScores")}
              </h3>
              <p className="text-sm text-violet-200/60">
                {t("categoryBreakdown")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {scoreEntries.map(([key, value], index) => {
              const score = value as number;
              const colors = getScoreColor(score);
              const formattedKey = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim();

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-violet-200">
                      {formattedKey}
                    </span>
                    <span className={`text-sm font-bold ${colors.text}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-violet-950/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full bg-linear-to-r ${
                        score >= 80
                          ? "from-emerald-500 to-emerald-400"
                          : score >= 60
                            ? "from-cyan-500 to-cyan-400"
                            : score >= 40
                              ? "from-yellow-500 to-yellow-400"
                              : "from-orange-500 to-orange-400"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-fuchsia-500/20 bg-linear-to-br from-fuchsia-950/40 to-transparent backdrop-blur-sm">
        <div className="border-b border-fuchsia-500/20 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-500/20">
              <Lightbulb className="h-5 w-5 text-fuchsia-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {t("improvementSuggestions")}
              </h3>
              <p className="text-sm text-violet-200/60">
                {suggestions.length} {t("actionableTips")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {suggestions.map((suggestion: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="group flex gap-3 rounded-xl border border-fuchsia-500/10 bg-fuchsia-950/20 p-4 transition-all hover:border-fuchsia-500/30 hover:bg-fuchsia-950/30">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-300">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <p className="text-sm leading-relaxed text-violet-100">
                  {suggestion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onNewAnalysis}
        disabled={isTransitioning}
        className="group relative w-full overflow-hidden rounded-xl border border-violet-500/30 bg-linear-to-r from-violet-600 to-fuchsia-600 py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50">
        <span className="relative z-10 flex items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          {t("analyzeAnother")}
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.button>
    </div>
  );
}
