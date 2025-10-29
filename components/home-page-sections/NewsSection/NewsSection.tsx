import Link from "next/link";
import style from "./NewsSection.module.css";
import NewsCard from "./NewsCard/NewsCard";
import { getAllNews } from "@/lib/newsApi";

const NewsSection = async ({}) => {
  const response = await getAllNews({ type: "news", typeAccount: "all" });

  const newsList = response.news;
  return (
    <div className={style.container}>
      <h1>News</h1>
      <ul className={style.wrapContainer}>
        {newsList.slice(0, 4).map((item, i) => (
          <li className={style.newsSectionList} key={i}>
            <NewsCard data={item} />
          </li>
        ))}
      </ul>

      {/* Стилізоване посилання як кнопка */}
      <Link
        href="/en/news"
        className={style.allNewsBtn}
        aria-label="Перейти до всіх новин"
      >
        All News
      </Link>
    </div>
  );
};

export default NewsSection;
