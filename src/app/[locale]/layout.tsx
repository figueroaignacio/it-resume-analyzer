import { NextIntlClientProvider } from "next-intl";

// Fonts
import { geistSans } from "@/lib/fonts";

//
import { routing } from "@/i18n/routing";
import { hasLocale, Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Resume Analyzer - AI-powered",
  description:
    "Analyze, improve and optimize your IT resume for ATS and real recruiters",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
