import { ResumeApp } from "@/components/resume-app";
import { FileText, Sparkles } from "lucide-react";
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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Resume Analysis</span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              {t("subtitle")}
            </p>
          </div>
          <ResumeApp />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed feedback on your resume in seconds
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">Role-Specific</h3>
              <p className="text-sm text-muted-foreground">
                Tailored insights for your target developer role
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">Actionable Tips</h3>
              <p className="text-sm text-muted-foreground">
                Receive concrete suggestions to improve your resume
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
