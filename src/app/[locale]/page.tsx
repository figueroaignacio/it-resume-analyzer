import { ResumeApp } from "@/components/resume-app";
import { FileCheck } from "lucide-react";
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
    <main className="relative min-h-screen overflow-hidden bg-[#000000]">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2a2b2c 1px, transparent 1px),
            linear-gradient(to bottom, #2a2b2c 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          {/* Header */}
          <div className="mb-16 text-center">
            <div
              className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#2a2b2c] bg-[#1e1f20] px-4 py-2 text-xs font-medium text-[#a0a0a0] uppercase tracking-wider"
              style={{
                animationDelay: "0.1s",
                animationFillMode: "backwards",
              }}>
              <FileCheck className="h-3.5 w-3.5" />
              <span>AI-Powered Analysis</span>
            </div>

            <h1
              className="animate-fade-in-up mb-4 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{
                animationDelay: "0.2s",
                animationFillMode: "backwards",
              }}>
              {t("title")}
            </h1>

            <p
              className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[#a0a0a0] md:text-lg"
              style={{
                animationDelay: "0.3s",
                animationFillMode: "backwards",
              }}>
              {t("subtitle")}
            </p>

            <div
              className="animate-fade-in-up mx-auto mb-12 flex max-w-2xl flex-wrap items-center justify-center gap-6 text-xs"
              style={{
                animationDelay: "0.4s",
                animationFillMode: "backwards",
              }}>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[#7a7a7a]">Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[#7a7a7a]">ATS Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[#7a7a7a]">Role-Specific</span>
              </div>
            </div>
          </div>

          {/* Main App */}
          <div
            className="animate-fade-in-up mx-auto max-w-3xl"
            style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
            <ResumeApp />
          </div>
        </div>
      </div>
    </main>
  );
}
