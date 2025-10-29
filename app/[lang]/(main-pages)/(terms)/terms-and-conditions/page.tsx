// app/[lang]/(main-pages)/(terms)/terms-and-conditions/page.tsx
import { headers } from "next/headers";
import type { Metadata } from "next";
import style from "./TermsAndConditions.module.css";
import SeoJsonLd from "@/components/SeoJsonLd";

// === ПЕРЕКЛАДИ ===
import TermsEn from "@/content/terms/terms-en";
import TermsPl from "@/content/terms/terms-pl";
import TermsDe from "@/content/terms/terms-de";
import TermsUa from "@/content/terms/terms-ua";
import TermsIt from "@/content/terms/terms-it";
import TermsFr from "@/content/terms/terms-fr";
import TermsEs from "@/content/terms/terms-es";
import TermsPt from "@/content/terms/terms-pt";
import TermsNl from "@/content/terms/terms-nl";
import TermsDa from "@/content/terms/terms-da";

/** Сумісний тип для headers() */
type HeaderLike = { get(name: string): string | null | undefined };

/** Дозволені прод-домени */
const ALLOWED_HOSTS = [
  "dating.date",
  "dreamonelove.com",
  "datingcom.uk",
  "datingclassifiedads.com",
] as const;

const DEFAULT_HOST = ALLOWED_HOSTS[0];

const OG_IMAGE =
  "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png";
const LAST_UPDATED_ISO = "2024-12-06";

/** Локалізовані SEO-рядки */
const SEO_TEXT = {
  en: {
    title:
      "Comprehensive Terms of Service: Policies, Rights, and Responsibilities",
    description:
      "Discover our detailed Terms of Service, covering intellectual property, user responsibilities, payments, privacy, dispute resolution, and more.",
    locale: "en_US",
  },
  pl: {
    title: "Regulamin: zasady, prawa i obowiązki użytkownika",
    description:
      "Szczegółowy regulamin: własność intelektualna, obowiązki użytkownika, płatności, prywatność, rozwiązywanie sporów i więcej.",
    locale: "pl_PL",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen: Richtlinien, Rechte und Pflichten",
    description:
      "Umfassende AGB: geistiges Eigentum, Nutzerpflichten, Zahlungen, Datenschutz, Streitbeilegung u.v.m.",
    locale: "de_DE",
  },
  ua: {
    title: "Правила та умови: політики, права та обов’язки",
    description:
      "Детальні умови: інтелектуальна власність, обов’язки користувача, платежі, приватність, вирішення спорів тощо.",
    locale: "uk_UA",
  },
  it: {
    title: "Termini e Condizioni: politiche, diritti e responsabilità",
    description:
      "Termini completi: proprietà intellettuale, responsabilità utente, pagamenti, privacy, risoluzione delle controversie e altro.",
    locale: "it_IT",
  },
  fr: {
    title: "Conditions générales : politiques, droits et responsabilités",
    description:
      "CG complètes : propriété intellectuelle, responsabilités, paiements, confidentialité, résolution des litiges, etc.",
    locale: "fr_FR",
  },
  es: {
    title: "Términos y Condiciones: políticas, derechos y responsabilidades",
    description:
      "Términos completos: propiedad intelectual, responsabilidades, pagos, privacidad, resolución de disputas y más.",
    locale: "es_ES",
  },
  pt: {
    title: "Termos e Condições: políticas, direitos e responsabilidades",
    description:
      "Termos completos: propriedade intelectual, responsabilidades do usuário, pagamentos, privacidade, resolução de disputas e mais.",
    locale: "pt_PT",
  },
  nl: {
    title: "Algemene Voorwaarden: beleid, rechten en verantwoordelijkheden",
    description:
      "Volledige voorwaarden: intellectueel eigendom, gebruikersplichten, betalingen, privacy, geschillenbeslechting en meer.",
    locale: "nl_NL",
  },
  da: {
    title: "Vilkår og betingelser: politikker, rettigheder og ansvar",
    description:
      "Fuldstændige vilkår: immaterielle rettigheder, brugeransvar, betalinger, privatliv, tvistbilæggelse m.m.",
    locale: "da_DK",
  },
} as const;

const KEYWORDS = [
  "Terms of Service",
  "Intellectual Property Rights",
  "Privacy Policy",
  "User Responsibilities",
  "Purchases and Payment",
  "Dispute Resolution",
  "Governing Law",
  "Prohibited Activities",
  "User Contributions",
  "Electronic Communications",
  "California Residents",
  "Policies and Compliance",
  "Service Management",
  "Limitations of Liability",
  "Disclaimer",
];

/** Хелпери домен/протокол */
function resolveHostFromHeaders(h: HeaderLike): string {
  const raw = h.get("x-forwarded-host") ?? h.get("host") ?? DEFAULT_HOST;
  const host = String(raw)
    .replace(/^www\./, "")
    .toLowerCase();
  if (!ALLOWED_HOSTS.includes(host as (typeof ALLOWED_HOSTS)[number])) {
    return DEFAULT_HOST;
  }
  return host;
}

function resolveProtocol(h: HeaderLike, host: string): "http" | "https" {
  const forwarded = h.get("x-forwarded-proto");
  if (forwarded === "http" || forwarded === "https") return forwarded;
  return ALLOWED_HOSTS.includes(host as any) ? "https" : "http";
}

/** === SEO: generateMetadata (мова з params) === */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const h = (await headers()) as unknown as HeaderLike;

  const host = resolveHostFromHeaders(h);
  const protocol = resolveProtocol(h, host);
  const currentUrl = `${protocol}://${host}/terms`;

  const key = (lang ?? "en").toLowerCase() as keyof typeof SEO_TEXT;
  const seo = SEO_TEXT[key] ?? SEO_TEXT.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: KEYWORDS,
    alternates: { canonical: currentUrl },
    openGraph: {
      type: "article",
      url: currentUrl,
      siteName: host,
      title: seo.title,
      description: seo.description,
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: "Terms & Conditions" },
      ],
      locale: seo.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "terms",
  };
}

/** === Сторінка: вибір відповідного перекладу за [lang] === */
export default async function TermsAndConditionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHostFromHeaders(h);
  const website = host;

  const termsMap: Record<string, (p: { website: string }) => JSX.Element> = {
    en: TermsEn,
    pl: TermsPl,
    de: TermsDe,
    ua: TermsUa,
    it: TermsIt,
    fr: TermsFr,
    es: TermsEs,
    pt: TermsPt,
    nl: TermsNl,
    da: TermsDa,
  };
  const key = (lang ?? "en").toLowerCase();
  const TermsComponent = termsMap[key] ?? TermsEn;

  // JSON-LD
  const siteName = host;
  const baseUrl = `https://${host}`;
  const currentUrl = `${baseUrl}/terms`;

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: OG_IMAGE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-7476-887-856",
        contactType: "customer support",
        areaServed: "GB",
      },
      {
        "@type": "ContactPoint",
        telephone: "+48-500-815-139",
        contactType: "customer support",
        areaServed: "PL",
      },
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const seo = SEO_TEXT[(key as keyof typeof SEO_TEXT) ?? "en"] ?? SEO_TEXT.en;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: currentUrl,
    headline: seo.title,
    description: seo.description,
    image: [OG_IMAGE],
    dateModified: LAST_UPDATED_ISO,
    author: { "@type": "Organization", name: "DREAMONELOVE LIMITED" },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
  };

  return (
    <div className={style.termsContainer}>
      <SeoJsonLd id="ld-org" data={orgLd} />
      <SeoJsonLd id="ld-website" data={websiteLd} />
      <SeoJsonLd id="ld-article-terms" data={articleLd} />

      {/* Рендер перекладу */}
      <TermsComponent website={website} />
    </div>
  );
}
