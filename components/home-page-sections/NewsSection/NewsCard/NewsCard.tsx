import NewsItem from "@/types/news";
import style from "./NewsCard.module.css";
import Link from "next/link";

type Props = {
  data: NewsItem;
};

const NewsCard = ({ data }: Props) => {
  return (
    <div className={style.newsCard}>
      {/* TODO Change into Image */}
      <img
        loading="lazy"
        decoding="async"
        src={data.files[0]}
        alt={data.topic}
      />
      <div className={style.cardDescription}>
        <h2>{data.topic}</h2>
        <p>{data.description}</p>
        <div className={style.btnContainer}>
          <Link href={`/en/news/${data._id}`}>More</Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
