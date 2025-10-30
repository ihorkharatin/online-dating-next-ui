// app/[lang]/(main-pages)/news/[...newsSlug]/page.tsx
import { headers } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import style from "./NewsDetailsPage.module.css";
import { getNewsDetails } from "@/lib/newsApi";
import GalleryAntd from "@/components/news/GalleryAntd";

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

/** Дістаємо Mongo ObjectId з "..._<24hex>" або з останнього сегмента */
function extractIdFromMaybeSlug(value?: string | string[]): string | null {
  if (!value) return null;

  const last = Array.isArray(value) ? value[value.length - 1] : String(value);

  // 1) Якщо рядок закінчується ObjectId
  const byTail = last.match(/([a-f0-9]{24})$/i);
  if (byTail) return byTail[1];

  // 2) Якщо формат "title_<id>"
  const parts = last.split("_");
  const maybe = parts[parts.length - 1];
  return /^[a-f0-9]{24}$/i.test(maybe) ? maybe : null;
}

function fallbackDescription(text?: string, limit = 180) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > limit ? clean.slice(0, limit - 1) + "…" : clean;
}

/* ---------- SEO ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; newsSlug: string[] }>;
}): Promise<Metadata> {
  const { lang, newsSlug } = await params;

  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHost(h);
  const proto = resolveProto(h, host);

  const id = extractIdFromMaybeSlug(newsSlug);
  if (!id) return { title: "News" };

  const news = await getNewsDetails(id);
  if (!news?._id) return { title: "News" };

  const title = news.topic || "News";
  const description =
    news.description || fallbackDescription(news.text) || "News article";

  const images = (news.files ?? []).slice(0, 6);
  const url = `${proto}://${host}/${lang}/news/${encodeURIComponent(
    Array.isArray(newsSlug) ? newsSlug.join("/") : String(newsSlug)
  )}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: host,
      title,
      description,
      images: images.length
        ? images.map((u) => ({ url: u, width: 1200, height: 630, alt: title }))
        : undefined,
      locale: lang === "ua" ? "uk_UA" : `${lang}_${lang.toUpperCase()}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.length ? [images[0]] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "news",
    keywords:
      news.keywords
        ?.split(",")
        .map((s: string) => s.trim())
        .filter(Boolean) ?? undefined,
  };
}

/* ---------- Сторінка ---------- */
export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ lang: string; newsSlug: string[] }>;
}) {
  const { lang, newsSlug } = await params;

  const id = extractIdFromMaybeSlug(newsSlug);
  if (!id) notFound();

  const news = await getNewsDetails(id!);
  if (!news?._id) notFound();

  const dateStr = news.createdAt
    ? new Date(news.createdAt).toLocaleDateString(
        lang === "ua" ? "uk-UA" : lang || "en",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  const keywords =
    news.keywords
      ?.split(",")
      .map((x: string) => x.trim())
      .filter(Boolean) ?? [];

  const files = Array.isArray(news.files) ? news.files : [];
  const hero = files[0];
  const gallery = files.slice(1);

  // JSON-LD
  const h = (await headers()) as unknown as HeaderLike;
  const host = resolveHost(h);
  const proto = resolveProto(h, host);
  const articleUrl = `${proto}://${host}/${lang}/news/${encodeURIComponent(
    Array.isArray(newsSlug) ? newsSlug.join("/") : String(newsSlug)
  )}`;

  const newsArticleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.topic,
    description:
      news.description || fallbackDescription(news.text) || undefined,
    image: files.slice(0, 6),
    datePublished: news.createdAt ?? undefined,
    dateModified: news.updatedAt ?? news.createdAt ?? undefined,
    author: { "@type": "Organization", name: "DREAMONELOVE LIMITED" },
    publisher: {
      "@type": "Organization",
      name: host,
      logo: {
        "@type": "ImageObject",
        url: "https://dating-date-photos.s3.us-east-2.amazonaws.com/logo.png",
      },
    },
    mainEntityOfPage: articleUrl,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${proto}://${host}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${proto}://${host}/${lang}/news`,
      },
      { "@type": "ListItem", position: 3, name: news.topic, item: articleUrl },
    ],
  };

  return (
    <div className={style.page}>
      <div className={style.container}>
        {/* JSON-LD */}
        <script
          id="ld-newsarticle"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleLd) }}
        />
        <script
          id="ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />

        <Link
          href={`/${lang}/news`}
          className={style.back}
          aria-label="Go back to all news"
        >
          ← Back to news
        </Link>

        <h1 className={style.title}>{news.topic}</h1>

        {news.description && (
          <p className={style.subtitle}>{news.description}</p>
        )}
        {dateStr && <div className={style.date}>{dateStr}</div>}

        {!!keywords.length && (
          <div className={style.tags}>
            {keywords.map((tag, i) => (
              <span className={style.tag} key={`${tag}-${i}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {hero && (
          <div className={style.hero}>
            <img
              loading="lazy"
              decoding="async"
              src={hero}
              alt={news.topic}
              className={style.heroContain}
            />
          </div>
        )}

        {news.text && (
          <div className={style.content} style={{ whiteSpace: "pre-wrap" }}>
            {news.text}
          </div>
        )}

        {!!gallery.length && (
          <GalleryAntd
            images={gallery}
            alt={news.topic}
            classes={{
              container: style.gallery,
              card: style.card,
              thumb: style.thumb,
            }}
          />
        )}
      </div>
    </div>
  );
}
