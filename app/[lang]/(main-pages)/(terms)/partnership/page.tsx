// app/[lang]/(legal)/partnership/page.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import style from "./PartnershipPage.module.css";

/* ---------- статичні імпорти контенту ---------- */
import PartnershipEn from "@/content/partnership/partnership-en";
import PartnershipDe from "@/content/partnership/partnership-de";
import PartnershipPl from "@/content/partnership/partnership-pl";
import PartnershipUa from "@/content/partnership/partnership-ua";
import PartnershipIt from "@/content/partnership/partnership-it";
import PartnershipFr from "@/content/partnership/partnership-fr";
import PartnershipEs from "@/content/partnership/partnership-es";
import PartnershipPt from "@/content/partnership/partnership-pt";
import PartnershipNl from "@/content/partnership/partnership-nl";
import PartnershipDa from "@/content/partnership/partnership-da";

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

/* ---------- локалізований SEO-текст ---------- */
const SEO_TEXT = {
  en: {
    title: "Partner with DOL — Grow Your Dating Agency",
    description:
      "Collaborate with Dream One Love to expand your dating agency. Access a global audience, flexible terms, and a trusted platform.",
    locale: "en_US",
    h1: "Partner with DOL",
  },
  de: {
    title: "Partnerschaft mit DOL — Ihre Dating-Agentur ausbauen",
    description:
      "Kooperieren Sie mit Dream One Love. Erreichen Sie ein globales Publikum, flexible Konditionen und eine vertrauenswürdige Plattform.",
    locale: "de_DE",
    h1: "Partnerschaft mit DOL",
  },
  pl: {
    title: "Współpraca z DOL — Rozwijaj swoją agencję",
    description:
      "Nawiąż współpracę z Dream One Love. Globalny zasięg, elastyczne warunki i zaufana platforma randkowa.",
    locale: "pl_PL",
    h1: "Współpraca z DOL",
  },
  ua: {
    title: "Партнерство з DOL — Розвивайте свою агенцію",
    description:
      "Співпрацюйте з Dream One Love: глобальна аудиторія, гнучкі умови та надійна платформа.",
    locale: "uk_UA",
    h1: "Партнерство з DOL",
  },
  it: {
    title: "Collabora con DOL — Fai crescere la tua agenzia",
    description:
      "Collabora con Dream One Love: pubblico globale, termini flessibili e piattaforma affidabile.",
    locale: "it_IT",
    h1: "Collabora con DOL",
  },
  fr: {
    title: "Devenez partenaire de DOL — Développez votre agence",
    description:
      "Collaborez avec Dream One Love : audience mondiale, conditions flexibles et plateforme fiable.",
    locale: "fr_FR",
    h1: "Partenariat avec DOL",
  },
  es: {
    title: "Asóciate con DOL — Haz crecer tu agencia",
    description:
      "Colabora con Dream One Love: audiencia global, condiciones flexibles y plataforma confiable.",
    locale: "es_ES",
    h1: "Asóciate con DOL",
  },
  pt: {
    title: "Parceria com a DOL — Faça sua agência crescer",
    description:
      "Colabore com a Dream One Love: audiência global, termos flexíveis e plataforma confiável.",
    locale: "pt_PT",
    h1: "Parceria com a DOL",
  },
  nl: {
    title: "Partner worden van DOL — Groei met uw bureau",
    description:
      "Werk samen met Dream One Love: wereldwijd bereik, flexibele voorwaarden en een betrouwbaar platform.",
    locale: "nl_NL",
    h1: "Partner worden van DOL",
  },
  da: {
    title: "Bliv partner med DOL — Udvid dit bureau",
    description:
      "Samarbejd med Dream One Love: globalt publikum, fleksible vilkår og en betroet platform.",
    locale: "da_DK",
    h1: "Bliv partner med DOL",
  },
} as const;

const KEYWORDS = [
  "dating agency partnership",
  "partner with Dream One Love",
  "global matchmaking",
  "collaboration",
  "affiliate",
  "agency growth",
];

/* ---------- карта контент-компонентів ---------- */
const CONTENT: Record<string, React.ComponentType> = {
  en: PartnershipEn,
  de: PartnershipDe,
  pl: PartnershipPl,
  ua: PartnershipUa,
  it: PartnershipIt,
  fr: PartnershipFr,
  es: PartnershipEs,
  pt: PartnershipPt,
  nl: PartnershipNl,
  da: PartnershipDa,
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
  const url = `${baseUrl}/${lang}/partnership`;

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

/* ---------- сторінка ---------- */
export default async function PartnershipPage({
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
  const url = `${baseUrl}/${lang}/partnership`;

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
      { "@type": "ListItem", position: 2, name: "Partnership", item: url },
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
        <article className={style.content}>
          <Content />
        </article>
      </div>
    </div>
  );
}
