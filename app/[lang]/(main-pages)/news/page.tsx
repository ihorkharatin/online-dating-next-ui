import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import style from "./NewsPage.module.css";

import PaginationClient from "@/components/PaginationClient";
import { getAllNews } from "@/lib/newsApi";
import NewsCard from "@/components/home-page-sections/NewsSection/NewsCard/NewsCard";

/* ---------------- helpers ---------------- */
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

/** Локалізовані SEO-рядки для сторінки новин */
const SEO_TEXT = {
  en: {
    title: "News & Updates",
    description:
      "Latest news and platform updates. Discover stories, announcements and helpful tips from our team.",
    locale: "en_US",
    h1: "News",
  },
  ua: {
    title: "Новини та оновлення",
    description:
      "Останні новини та оновлення платформи. Історії, оголошення та корисні поради від нашої команди.",
    locale: "uk_UA",
    h1: "Новини",
  },
  pl: {
    title: "Aktualności i nowości",
    description:
      "Najnowsze aktualności i zmiany na platformie. Historie, ogłoszenia i przydatne wskazówki.",
    locale: "pl_PL",
    h1: "Aktualności",
  },
  de: {
    title: "News & Aktualisierungen",
    description:
      "Neuigkeiten und Plattform-Updates. Geschichten, Ankündigungen und hilfreiche Tipps.",
    locale: "de_DE",
    h1: "News",
  },
  it: {
    title: "Notizie e aggiornamenti",
    description:
      "Ultime notizie e aggiornamenti della piattaforma. Storie, annunci e consigli utili.",
    locale: "it_IT",
    h1: "Notizie",
  },
  fr: {
    title: "Actualités et mises à jour",
    description:
      "Dernières actualités et mises à jour de la plateforme. Histoires, annonces et conseils.",
    locale: "fr_FR",
    h1: "Actualités",
  },
  es: {
    title: "Noticias y actualizaciones",
    description:
      "Últimas noticias y novedades de la plataforma. Historias, anuncios y consejos útiles.",
    locale: "es_ES",
    h1: "Noticias",
  },
  pt: {
    title: "Notícias e atualizações",
    description:
      "Últimas notícias e atualizações da plataforma. Histórias, anúncios e dicas úteis.",
    locale: "pt_PT",
    h1: "Notícias",
  },
  nl: {
    title: "Nieuws en updates",
    description:
      "Laatste nieuws en platformupdates. Verhalen, aankondigingen en nuttige tips.",
    locale: "nl_NL",
    h1: "Nieuws",
  },
  da: {
    title: "Nyheder og opdateringer",
    description:
      "Seneste nyheder og platformopdateringer. Historier, meddelelser og nyttige tips.",
    locale: "da_DK",
    h1: "Nyheder",
  },
} as const;

const KEYWORDS = [
  "News",
  "Updates",
  "Announcements",
  "Platform",
  "Tips",
  "Stories",
];

/* ---------------- SEO ---------------- */
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { lang } = await params;
  const sp = await searchParams;
  const page = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1;

  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHost(h);
  const proto = resolveProto(h, host);

  const loc = (SEO_TEXT as any)[lang] ?? SEO_TEXT.en;
  const baseUrl = `${proto}://${host}`;
  const url = `${baseUrl}/${lang}/news${page > 1 ? `?page=${page}` : ""}`;

  return {
    title: loc.title,
    description: loc.description,
    keywords: KEYWORDS,
    alternates: { canonical: `${baseUrl}/${lang}/news` }, // канонікал без ?page
    openGraph: {
      type: "website",
      url,
      siteName: host,
      title: loc.title,
      description: loc.description,
      locale: loc.locale,
    },
    twitter: {
      card: "summary",
      title: loc.title,
      description: loc.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

/* ---------------- Page ---------------- */
export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  const sp = await searchParams;

  const page = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1;
  const perPage = 12;

  // серверний фетч новин
  const data = await getAllNews({
    // @ts-expect-error бек приймає page/perPage разом із type/typeAccount
    page,
    perPage,
    type: "news",
    typeAccount: "all",
  }).catch(() => ({ news: [], page: 1, perPage, totalItems: 0 }));

  const list = data.news ?? [];
  const totalItems = (data as any).totalItems ?? list.length;

  const loc = (SEO_TEXT as any)[lang] ?? SEO_TEXT.en;

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <h1>{loc.h1}</h1>

        <div className={style.paginationWrap}>
          <PaginationClient
            current={page}
            pageSize={perPage}
            total={totalItems}
          />
        </div>

        <ul className={style.wrapContainer}>
          {list.map((item) => (
            <li className={style.newsSectionList} key={item._id}>
              <NewsCard data={item} lang={lang} />
            </li>
          ))}
          {list.length === 0 && (
            <li style={{ color: "var(--text)", opacity: 0.8 }}>No news yet.</li>
          )}
        </ul>

        <div className={style.paginationWrap}>
          <PaginationClient
            current={page}
            pageSize={perPage}
            total={totalItems}
          />
        </div>

        <Link href={`/${lang}`} className={style.backHome}>
          ← {lang === "ua" ? "На головну" : "Back to home"}
        </Link>
      </div>
    </div>
  );
}
