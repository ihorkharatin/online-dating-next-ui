import "../globals.css";
import React from "react";
import SetHtmlLang from "@/components/SetHtmlLang";

// Щоб Next пререндерив лише ці мови і не намагався генерити інші
export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "pl", "de", "ua", "it", "fr", "es", "pt", "nl", "da"].map(
    (lang) => ({ lang })
  );
}

// У Next 16 params є Promise — використовуємо React.use(...)
export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = React.use(params);

  return (
    <>
      <SetHtmlLang lang={lang} />
      {children}
    </>
  );
}
