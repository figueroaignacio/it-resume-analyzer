import { ResumeApp } from "@/components/resume-app";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="container space-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold">IT Resume Analyzer</h1>
        <p className="text-muted-foreground">
          Analyze, improve and optimize your IT resume for ATS and real
          recruiters
        </p>
      </div>
      <ResumeApp />
    </main>
  );
}
