import Link from "next/link";
import style from "./NewsSection.module.css";
import NewsCard from "./NewsCard/NewsCard";
import { getAllNews } from "@/lib/newsApi";

type Props = {
  /** Поточна мова з маршруту, напр. "en" | "ua" | ... */
  lang: string;
};

const NewsSection = async ({ lang }: Props) => {
  // захист від падіння, якщо API верне помилку
  const response = await getAllNews({ type: "news", typeAccount: "all" }).catch(
    () => ({ news: [] as any[] })
  );

  const newsList = response.news ?? [];
  const href = `/${(lang || "en").toLowerCase()}/news`;

  return (
    <section className={style.container}>
      <h2 className={style.title}>News</h2>

      <ul className={style.grid}>
        {newsList.slice(0, 4).map((item: any) => (
          <li
            className={style.item}
            key={item._id ?? `${item.topic}-${item.createdAt}`}
          >
            <NewsCard data={item} lang={lang} />
          </li>
        ))}
      </ul>

      <div className={style.ctaWrap}>
        <Link
          href={href}
          className={style.allNewsBtn}
          aria-label="Go to all news"
        >
          <span>All News</span>
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;
