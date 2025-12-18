import { useTranslations, type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();

  return <div>{t("home")}</div>;
}
