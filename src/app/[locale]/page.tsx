import { ResumeApp } from "@/components/resume-app";
import { Sparkles } from "lucide-react";
import { useTranslations, type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("hero");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0118]">
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="mb-20 text-center">
            <div
              className="animate-fade-in-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-violet-950/50 px-5 py-2.5 text-sm font-medium text-violet-200 backdrop-blur-sm shadow-lg shadow-violet-500/10"
              style={{
                animationDelay: "0.1s",
                animationFillMode: "backwards",
              }}>
              <Sparkles className="h-4 w-4 animate-pulse text-violet-300" />
              <span className="bg-linear-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                AI-Powered Resume Analysis
              </span>
            </div>
            <h1
              className="animate-fade-in-up mb-6 text-balance font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
              style={{
                animationDelay: "0.2s",
                animationFillMode: "backwards",
              }}>
              <span className="bg-linear-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p
              className="animate-fade-in-up mx-auto mb-12 max-w-2xl text-balance text-lg leading-relaxed text-violet-200/80 md:text-xl"
              style={{
                animationDelay: "0.3s",
                animationFillMode: "backwards",
              }}>
              {t("subtitle")}
            </p>
            <div
              className="animate-fade-in-up mx-auto mb-16 flex max-w-2xl flex-wrap items-center justify-center gap-8 text-sm"
              style={{
                animationDelay: "0.4s",
                animationFillMode: "backwards",
              }}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-violet-200/70">Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400"
                  style={{ animationDelay: "0.5s" }}
                />
                <span className="text-violet-200/70">ATS Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"
                  style={{ animationDelay: "1s" }}
                />
                <span className="text-violet-200/70">Role-Specific</span>
              </div>
            </div>
          </div>
          <div
            className="animate-fade-in-up mx-auto max-w-4xl"
            style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
            <ResumeApp />
          </div>
        </div>
      </div>
    </main>
  );
}
