export type ResumeAnalysis = {
  score: number;
  atsReadiness: number;
  keywordMatch: number;
  writingQuality: number;
  layoutQuality: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  suggestions: string[];
};
