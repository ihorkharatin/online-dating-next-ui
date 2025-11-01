import type { Metadata } from "next";
import { headers } from "next/headers";
import style from "./PrivacyPolicy.module.css";

/* ---------- translations (статичні імпорти з /content/privacy) ---------- */
import PrivacyEn from "@/content/privacy/privacy-en";
import PrivacyDe from "@/content/privacy/privacy-de";
import PrivacyPl from "@/content/privacy/privacy-pl";
import PrivacyUa from "@/content/privacy/privacy-ua";
import PrivacyIt from "@/content/privacy/privacy-it";
import PrivacyFr from "@/content/privacy/privacy-fr";
import PrivacyEs from "@/content/privacy/privacy-es";
import PrivacyPt from "@/content/privacy/privacy-pt";
import PrivacyNl from "@/content/privacy/privacy-nl";
import PrivacyDa from "@/content/privacy/privacy-da";

/* ---------- helpers ---------- */
type HeaderLike = { get(name: string): string | null | undefined };

const ALLOWED_HOSTS = [
  "dating.date",
  "dreamonelove.com",
  "datingcom.uk",
  "datingclassifiedads.com",
] as const;
const DEFAULT_HOST = ALLOWED_HOSTS[0];

function resolveHost(h: HeaderLike): string {
  const raw = h.get("x-forwarded-host") ?? h.get("host") ?? DEFAULT_HOST;
  const host = String(raw)
    .replace(/^www\./, "")
    .toLowerCase();
  return (ALLOWED_HOSTS as readonly string[]).includes(host)
    ? host
    : DEFAULT_HOST;
}
function resolveProto(h: HeaderLike, host: string): "http" | "https" {
  const forwarded = h.get("x-forwarded-proto");
  if (forwarded === "http" || forwarded === "https") return forwarded;
  return (ALLOWED_HOSTS as readonly string[]).includes(host) ? "https" : "http";
}

/** Локалізовані SEO-рядки */
const SEO_TEXT = {
  en: {
    title: "Privacy Policy — Dream One Love Limited (DOL)",
    description:
      "Learn how Dream One Love Limited (DOL) collects, uses and protects your personal data. Read about your rights, cookies, retention and contact details.",
    locale: "en_US",
    h1: "PRIVACY POLICY",
  },
  de: {
    title: "Datenschutzerklärung — Dream One Love Limited (DOL)",
    description:
      "Erfahren Sie, wie DOL Ihre personenbezogenen Daten erhebt, nutzt und schützt. Informationen zu Rechten, Cookies, Aufbewahrung und Kontakt.",
    locale: "de_DE",
    h1: "DATENSCHUTZERKLÄRUNG",
  },
  pl: {
    title: "Polityka Prywatności — Dream One Love Limited (DOL)",
    description:
      "Jak DOL zbiera, wykorzystuje i chroni Twoje dane. Twoje prawa, pliki cookie, okresy przechowywania i kontakt.",
    locale: "pl_PL",
    h1: "POLITYKA PRYWATNOŚCI",
  },
  ua: {
    title: "Політика конфіденційності — Dream One Love Limited (DOL)",
    description:
      "Як DOL збирає, використовує та захищає ваші дані. Ваші права, cookies, строки зберігання та контакти.",
    locale: "uk_UA",
    h1: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ",
  },
  it: {
    title: "Informativa sulla privacy — Dream One Love Limited (DOL)",
    description:
      "Come DOL raccoglie, utilizza e protegge i tuoi dati. Diritti, cookie, conservazione e contatti.",
    locale: "it_IT",
    h1: "INFORMATIVA SULLA PRIVACY",
  },
  fr: {
    title: "Politique de confidentialité — Dream One Love Limited (DOL)",
    description:
      "Comment DOL collecte, utilise et protège vos données. Droits, cookies, conservation et contact.",
    locale: "fr_FR",
    h1: "POLITIQUE DE CONFIDENTIALITÉ",
  },
  es: {
    title: "Política de privacidad — Dream One Love Limited (DOL)",
    description:
      "Cómo DOL recopila, utiliza y protege tus datos. Derechos, cookies, conservación y contacto.",
    locale: "es_ES",
    h1: "POLÍTICA DE PRIVACIDAD",
  },
  pt: {
    title: "Política de Privacidade — Dream One Love Limited (DOL)",
    description:
      "Como a DOL recolhe, usa e protege os seus dados. Direitos, cookies, retenção e contacto.",
    locale: "pt_PT",
    h1: "POLÍTICA DE PRIVACIDADE",
  },
  nl: {
    title: "Privacybeleid — Dream One Love Limited (DOL)",
    description:
      "Hoe DOL uw gegevens verzamelt, gebruikt en beschermt. Rechten, cookies, bewaartermijnen en contact.",
    locale: "nl_NL",
    h1: "PRIVACYBELEID",
  },
  da: {
    title: "Privatlivspolitik — Dream One Love Limited (DOL)",
    description:
      "Hvordan DOL indsamler, bruger og beskytter dine data. Rettigheder, cookies, opbevaring og kontakt.",
    locale: "da_DK",
    h1: "PRIVATLIVSPOLITIK",
  },
} as const;

const KEYWORDS = [
  "Privacy Policy",
  "Data Protection",
  "Cookies",
  "User Rights",
  "Retention",
  "Security",
  "DOL",
  "Dream One Love",
];

/* Мапа компонентів контенту */
const CONTENT: Record<string, React.ComponentType> = {
  en: PrivacyEn,
  de: PrivacyDe,
  pl: PrivacyPl,
  ua: PrivacyUa,
  it: PrivacyIt,
  fr: PrivacyFr,
  es: PrivacyEs,
  pt: PrivacyPt,
  nl: PrivacyNl,
  da: PrivacyDa,
};

/* ---------- SEO: generateMetadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHost(h);
  const proto = resolveProto(h, host);

  const loc = (SEO_TEXT as any)[lang] ?? SEO_TEXT.en;
  const baseUrl = `${proto}://${host}`;
  const url = `${baseUrl}/${lang}/privacy`;

  return {
    title: loc.title,
    description: loc.description,
    keywords: KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: host,
      title: loc.title,
      description: loc.description,
      images: [
        {
          url: "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png",
          width: 1200,
          height: 630,
          alt: "Dream One Love",
        },
      ],
      locale: loc.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: loc.title,
      description: loc.description,
      images: [
        "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    category: "legal",
  };
}

/* ---------- Page (server component) ---------- */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const loc = (SEO_TEXT as any)[lang] ?? SEO_TEXT.en;

  // JSON-LD
  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHost(h);
  const proto = resolveProto(h, host);
  const baseUrl = `${proto}://${host}`;
  const url = `${baseUrl}/${lang}/privacy`;

  const OrgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: host,
    url: baseUrl,
    logo: "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png",
  };
  const WebPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: loc.title,
    url,
    inLanguage: loc.locale,
    description: loc.description,
    isPartOf: { "@type": "WebSite", url: baseUrl, name: host },
  };
  const BreadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/${lang}`,
      },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: url },
    ],
  };

  const Content = CONTENT[lang] ?? CONTENT.en;

  return (
    <div className={style.page}>
      <div className={style.container}>
        {/* JSON-LD */}
        <script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OrgLd) }}
        />
        <script
          id="ld-webpage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageLd) }}
        />
        <script
          id="ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbLd) }}
        />

        <h1 className={style.title}>{loc.h1}</h1>
        <div className={style.subtitle}>Last updated December 06, 2024</div>

        <article className={style.content}>
          <Content />
        </article>
      </div>
    </div>
  );
}
