// app/[lang]/(legal)/refund/page.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import style from "./RefundPolicy.module.css";

/* ---------- translations (статичні імпорти) ---------- */
import RefundEn from "@/content/refund/refund-en";
import RefundDe from "@/content/refund/refund-de";
import RefundPl from "@/content/refund/refund-pl";
import RefundUa from "@/content/refund/refund-ua";
import RefundIt from "@/content/refund/refund-it";
import RefundFr from "@/content/refund/refund-fr";
import RefundEs from "@/content/refund/refund-es";
import RefundPt from "@/content/refund/refund-pt";
import RefundNl from "@/content/refund/refund-nl";
import RefundDa from "@/content/refund/refund-da";

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
    title: "Refund & Return Policy — Dream One Love Limited (DOL)",
    description:
      "Read our Refund & Return Policy: eligibility, timelines, return shipping, exchanges, and how to contact support for assistance.",
    locale: "en_US",
    h1: "REFUND POLICY",
    updated: "Last updated December 12, 2024",
  },
  de: {
    title: "Rückerstattungs- & Rückgabebedingungen — Dream One Love (DOL)",
    description:
      "Erfahren Sie alles über Erstattungen, Rückgaben, Fristen, Rücksendungen, Umtausch und Supportkontakt.",
    locale: "de_DE",
    h1: "RÜCKERSTATTUNGSRICHTLINIE",
    updated: "Zuletzt aktualisiert: 12. Dezember 2024",
  },
  pl: {
    title: "Polityka zwrotów i reklamacji — Dream One Love (DOL)",
    description:
      "Zasady zwrotów: kwalifikowalność, terminy, koszty wysyłki zwrotnej, wymiany oraz kontakt z pomocą.",
    locale: "pl_PL",
    h1: "POLITYKA ZWROTÓW",
    updated: "Ostatnia aktualizacja: 12 grudnia 2024",
  },
  ua: {
    title: "Політика повернення коштів — Dream One Love (DOL)",
    description:
      "Умови повернення/обміну: критерії, строки, зворотня доставка та контакти служби підтримки.",
    locale: "uk_UA",
    h1: "ПОЛІТИКА ПОВЕРНЕННЯ КОШТІВ",
    updated: "Останнє оновлення: 12 грудня 2024",
  },
  it: {
    title: "Politica di rimborso e resi — Dream One Love (DOL)",
    description:
      "Dettagli su rimborsi, resi, tempistiche, spedizioni di reso, cambi e contatti dell’assistenza.",
    locale: "it_IT",
    h1: "POLITICA DI RIMBORSO",
    updated: "Ultimo aggiornamento: 12 dicembre 2024",
  },
  fr: {
    title: "Politique de remboursement et de retour — Dream One Love (DOL)",
    description:
      "Conditions d’éligibilité, délais, retours, échanges et contact du support.",
    locale: "fr_FR",
    h1: "POLITIQUE DE REMBOURSEMENT",
    updated: "Dernière mise à jour : 12 décembre 2024",
  },
  es: {
    title: "Política de reembolsos y devoluciones — Dream One Love (DOL)",
    description:
      "Elegibilidad, plazos, envío de devoluciones, cambios y contacto con soporte.",
    locale: "es_ES",
    h1: "POLÍTICA DE REEMBOLSO",
    updated: "Última actualización: 12 de diciembre de 2024",
  },
  pt: {
    title: "Política de reembolso e devoluções — Dream One Love (DOL)",
    description:
      "Elegibilidade, prazos, envios de devolução, trocas e contacto do suporte.",
    locale: "pt_PT",
    h1: "POLÍTICA DE REEMBOLSO",
    updated: "Última atualização: 12 de dezembro de 2024",
  },
  nl: {
    title: "Terugbetalings- & retourbeleid — Dream One Love (DOL)",
    description:
      "Voorwaarden, termijnen, retourzending, omruilingen en contact met support.",
    locale: "nl_NL",
    h1: "TERUGBETALINGSBELEID",
    updated: "Laatst bijgewerkt: 12 december 2024",
  },
  da: {
    title: "Refusions- og returpolitik — Dream One Love (DOL)",
    description:
      "Berettigelse, frister, returforsendelse, ombytninger og kontakt til support.",
    locale: "da_DK",
    h1: "REFUSIONSPOLITIK",
    updated: "Senest opdateret: 12. december 2024",
  },
} as const;

const KEYWORDS = [
  "Refund Policy",
  "Return Policy",
  "Exchanges",
  "Refund Eligibility",
  "Return Shipping",
  "Customer Support",
  "Dream One Love",
  "DOL",
];

/* Мапа контент-компонентів */
const CONTENT: Record<string, React.ComponentType> = {
  en: RefundEn,
  de: RefundDe,
  pl: RefundPl,
  ua: RefundUa,
  it: RefundIt,
  fr: RefundFr,
  es: RefundEs,
  pt: RefundPt,
  nl: RefundNl,
  da: RefundDa,
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
  const url = `${baseUrl}/${lang}/refund`;

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
export default async function RefundPolicyPage({
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
  const url = `${baseUrl}/${lang}/refund`;

  const OrgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: host,
    url: baseUrl,
    logo: "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png",
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
      { "@type": "ListItem", position: 2, name: "Refund Policy", item: url },
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
        <div className={style.subtitle}>{loc.updated}</div>

        <article className={style.content}>
          <Content />
        </article>
      </div>
    </div>
  );
}
