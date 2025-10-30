import "../globals.css";
import "antd/dist/reset.css";
import React from "react";
import SetHtmlLang from "@/components/SetHtmlLang";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Щоб Next пререндерив лише ці мови і не намагався генерити інші
export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "pl", "de", "ua", "it", "fr", "es", "pt", "nl", "da"].map(
    (lang) => ({ lang })
  );
}

// У Next 16 params є Promise — використовуємо React.use(...)
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <SetHtmlLang lang={lang} />
      <Header />
      {children}
      <Footer />
    </>
  );
}
