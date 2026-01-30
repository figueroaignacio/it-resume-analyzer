import { ResumeApp } from "@/components/resume-app";
import { Brain, FileCheck, Sparkles, Zap } from "lucide-react";
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
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-linear-to-br from-violet-950/40 via-fuchsia-950/20 to-cyan-950/30" />

      {/* Animated grid pattern */}
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

      {/* Floating orbs */}
      <div className="fixed left-[10%] top-[20%] h-[400px] w-[400px] animate-float rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="fixed right-[10%] top-[60%] h-[300px] w-[300px] animate-float-delayed rounded-full bg-fuchsia-500/20 blur-[100px]" />
      <div className="fixed bottom-[10%] left-[50%] h-[350px] w-[350px] animate-float-slow rounded-full bg-cyan-500/20 blur-[110px]" />

      <div className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          {/* Hero Section */}
          <div className="mb-20 text-center">
            {/* Badge */}
            <div
              className="animate-fade-in-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-violet-950/50 px-5 py-2.5 text-sm font-medium text-violet-200 backdrop-blur-sm shadow-lg shadow-violet-500/10"
              style={{
                animationDelay: "0.1s",
                animationFillMode: "backwards",
              }}>
              <Sparkles className="h-4 w-4 animate-pulse text-violet-300" />
              <span className="bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                AI-Powered Resume Analysis
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="animate-fade-in-up mb-6 text-balance font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
              style={{
                animationDelay: "0.2s",
                animationFillMode: "backwards",
              }}>
              <span className="bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-in-up mx-auto mb-12 max-w-2xl text-balance text-lg leading-relaxed text-violet-200/80 md:text-xl"
              style={{
                animationDelay: "0.3s",
                animationFillMode: "backwards",
              }}>
              {t("subtitle")}
            </p>

            {/* Stats Row */}
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

          {/* Main App Component */}
          <div
            className="animate-fade-in-up mx-auto max-w-4xl"
            style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
            <ResumeApp />
          </div>

          {/* Features Grid */}
          <div
            className="animate-fade-in-up mx-auto mt-24 grid max-w-5xl gap-6 md:grid-cols-3"
            style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}>
            <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/30 p-8 backdrop-blur-sm transition-all hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/10">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition-all group-hover:bg-violet-500/20" />
              <div className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 transition-all group-hover:scale-110 group-hover:bg-violet-500/20">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Instant Analysis
                </h3>
                <p className="text-sm leading-relaxed text-violet-200/70">
                  Get comprehensive feedback on your resume in seconds with
                  advanced AI
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-950/50 to-violet-950/30 p-8 backdrop-blur-sm transition-all hover:border-fuchsia-500/40 hover:shadow-2xl hover:shadow-fuchsia-500/10">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-2xl transition-all group-hover:bg-fuchsia-500/20" />
              <div className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300 transition-all group-hover:scale-110 group-hover:bg-fuchsia-500/20">
                  <Brain className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Role-Specific
                </h3>
                <p className="text-sm leading-relaxed text-violet-200/70">
                  Tailored insights for your target developer role and career
                  goals
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/50 to-violet-950/30 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-all group-hover:bg-cyan-500/20" />
              <div className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 transition-all group-hover:scale-110 group-hover:bg-cyan-500/20">
                  <FileCheck className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Actionable Tips
                </h3>
                <p className="text-sm leading-relaxed text-violet-200/70">
                  Receive concrete suggestions to improve and optimize your
                  resume
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
