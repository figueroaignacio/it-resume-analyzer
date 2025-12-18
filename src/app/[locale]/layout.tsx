import { NextIntlClientProvider } from "next-intl";

// Fonts
import { geistSans } from "@/lib/fonts";

// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Resume Analyzer - AI-powered",
  description:
    "Analyze, improve and optimize your IT resume for ATS and real recruiters",
};

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
