import type { Metadata } from "next";
import { headers } from "next/headers";

import HeroSection from "@/components/home-page-sections/HeroSection/HeroSection";
import NewsSection from "@/components/home-page-sections/NewsSection/NewsSection";
import OnlineNotification from "@/components/home-page-sections/OnlineNotification/OnlineNotification";
import OnlineUserSection from "@/components/home-page-sections/OnlineUserSection/OnlineUserSection";
import SecuritySection from "@/components/home-page-sections/SecuritySection/SecuritySection";
import ServicesSection from "@/components/home-page-sections/ServicesSection/ServicesSection";
import TestimonialsSection from "@/components/home-page-sections/TestimonialsSection/TestimonialsSection";
import SeoJsonLd from "@/components/SeoJsonLd";

/** Сумісний тип для ReadonlyHeaders/Headers */
type HeaderLike = { get(name: string): string | null | undefined };

/**
 * Якщо хочеш прибрати whitelist — просто видали ALLOWED_HOSTS і DEFAULT_HOST,
 * а в resolveHostFromHeaders повертай нормалізований host без перевірки.
 */
const ALLOWED_HOSTS = [
  "dating.date",
  "dreamonelove.com",
  "datingcom.uk",
  "datingclassifiedads.com",
] as const;

const DEFAULT_HOST = ALLOWED_HOSTS[0];
const OG_IMAGE =
  "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png";

/** Локалізовані тексти SEO */
const SEO_TEXT = {
  en: {
    title: "Connections That Turn Into Forever",
    description:
      "Discover meaningful connections and build lasting relationships with our trusted online dating platform. Join today to start your love story!",
    locale: "en_US",
    breadcrumbsHome: "Home",
  },
  ua: {
    title: "Знайомства, що стають історією",
    description:
      "Створюй осмислені звʼязки та міцні стосунки на нашій платформі знайомств. Приєднуйся вже сьогодні та почни свою історію кохання!",
    locale: "uk_UA",
    breadcrumbsHome: "Головна",
  },
  pl: {
    title: "Relacje, które trwają na zawsze",
    description:
      "Odkryj wartościowe znajomości i trwałe relacje na naszej zaufanej platformie randkowej. Dołącz i rozpocznij swoją historię miłosną!",
    locale: "pl_PL",
    breadcrumbsHome: "Strona główna",
  },
  de: {
    title: "Verbindungen, die für immer halten",
    description:
      "Finde bedeutungsvolle Verbindungen und baue dauerhafte Beziehungen auf unserer vertrauenswürdigen Dating-Plattform auf.",
    locale: "de_DE",
    breadcrumbsHome: "Startseite",
  },
  it: {
    title: "Connessioni che durano per sempre",
    description:
      "Scopri connessioni significative e costruisci relazioni durature sulla nostra piattaforma di incontri affidabile.",
    locale: "it_IT",
    breadcrumbsHome: "Home",
  },
  fr: {
    title: "Des rencontres qui durent",
    description:
      "Créez des liens authentiques et des relations durables avec notre plateforme de rencontres fiable.",
    locale: "fr_FR",
    breadcrumbsHome: "Accueil",
  },
  es: {
    title: "Conexiones que perduran",
    description:
      "Descubre conexiones significativas y relaciones duraderas en nuestra plataforma de citas.",
    locale: "es_ES",
    breadcrumbsHome: "Inicio",
  },
  pt: {
    title: "Conexões que duram para sempre",
    description:
      "Descubra conexões significativas e construa relacionamentos duradouros em nossa plataforma de namoro.",
    locale: "pt_PT",
    breadcrumbsHome: "Início",
  },
  nl: {
    title: "Verbindingen die blijvend zijn",
    description:
      "Ontdek betekenisvolle connecties en bouw duurzame relaties op ons betrouwbare datingplatform.",
    locale: "nl_NL",
    breadcrumbsHome: "Home",
  },
  da: {
    title: "Forbindelser der varer ved",
    description:
      "Find meningsfulde forbindelser og opbyg varige relationer på vores pålidelige datingplatform.",
    locale: "da_DK",
    breadcrumbsHome: "Hjem",
  },
} as const;

const KEYWORDS = [
  "Online Dating",
  "Meet Singles",
  "Find Love",
  "Relationships",
  "Friendship",
  "Companionship",
  "Safe Dating",
  "Video chat",
  "Text chat",
];

/** Хелпери */
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
  // Якщо домен із whitelist — вважаємо https
  return ALLOWED_HOSTS.includes(host as any) ? "https" : "http";
}

/** SEO для головної */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang: rawLang = "en" } = await params;
  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHostFromHeaders(h);
  const protocol = resolveProtocol(h, host);

  const lang = rawLang.toLowerCase() as keyof typeof SEO_TEXT;
  const seo = SEO_TEXT[lang] ?? SEO_TEXT.en;

  // ваша головна — це /[lang], тож без /home
  const currentUrl = `${protocol}://${host}/${lang}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: KEYWORDS,
    alternates: { canonical: currentUrl },
    openGraph: {
      type: "website",
      url: currentUrl,
      siteName: host,
      title: seo.title,
      description: seo.description,
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: "Online Dating" },
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
    category: "homepage",
  };
}

/** Сторінка */
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang = "en" } = await params;

  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHostFromHeaders(h);

  const lang = rawLang.toLowerCase() as keyof typeof SEO_TEXT;
  const seo = SEO_TEXT[lang] ?? SEO_TEXT.en;

  const baseUrl = `https://${host}`;
  const currentUrl = `${baseUrl}/${lang}`;

  // JSON-LD
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: host,
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
    name: host,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    url: currentUrl,
    description: seo.description,
    inLanguage: lang,
    isPartOf: { "@type": "WebSite", url: baseUrl, name: host },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: seo.breadcrumbsHome,
        item: currentUrl,
      },
    ],
  };

  return (
    <div>
      {/* JSON-LD */}
      <SeoJsonLd id="ld-org" data={orgLd} />
      <SeoJsonLd id="ld-website" data={websiteLd} />
      <SeoJsonLd id="ld-webpage-home" data={webPageLd} />
      <SeoJsonLd id="ld-breadcrumbs" data={breadcrumbsLd} />

      {/* Контент */}
      <HeroSection />
      <OnlineUserSection />
      <ServicesSection />
      {/* передаємо lang, щоб /[lang]/news працювало */}
      <NewsSection lang={lang} />
      <TestimonialsSection />
      <SecuritySection />
      <OnlineNotification />
    </div>
  );
}
