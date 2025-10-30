import Link from "next/link";
import type NewsItem from "@/types/news";
import style from "./NewsCard.module.css";

type Props = {
  data: NewsItem;
  /** Поточна мова в шляху (optional, default "en") */
  lang?: string;
};

/** Простий slugify + обрізка */
function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export default function NewsCard({ data, lang = "en" }: Props) {
  const img =
    Array.isArray(data.files) && data.files.length > 0 ? data.files[0] : "";
  const title = data.topic ?? "News";
  const slug = `${slugify(title)}_${data._id}`;
  const href = `/${(lang || "en").toLowerCase()}/news/${encodeURIComponent(
    slug
  )}`;

  return (
    <article className={style.newsCard}>
      {/* TODO: замінити на <Image /> коли будуть точні розміри */}
      <img loading="lazy" decoding="async" src={img} alt={title} />
      <div className={style.cardDescription}>
        <h2 title={title}>{title}</h2>
        {data.description && <p title={data.description}>{data.description}</p>}

        <div className={style.btnContainer}>
          <Link
            href={href}
            className={style.btnLink}
            aria-label={`Read more: ${title}`}
          >
            <span>More</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
