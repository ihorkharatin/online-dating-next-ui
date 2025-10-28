import "../globals.css";

export async function generateStaticParams() {
  return ["en", "pl", "de", "ua", "it", "fr", "es", "pt", "nl", "da"].map(
    (lang) => ({ lang })
  );
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
