import { getNewsDetails } from "@/lib/newsApi";
import style from "./NewsDetailsPage.module.css";
import { Image } from "antd";

type Props = {
  params: Promise<{ lang: string; newsId: string }>;
};

export default async function NewsDetailsPage({ params }: Props) {
  const { newsId } = await params;
  const newsData = await getNewsDetails(newsId);

  const dateStr = newsData.createdAt
    ? new Date(newsData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const keywordList =
    newsData.keywords
      ?.split(",")
      .map((el) => el.trim())
      .filter(Boolean) || [];

  return (
    <div className={style.page}>
      <div className={style.container}>
        <button className={style.back} aria-label="Go back">
          ← Back
        </button>

        <h1 className={style.title}>{newsData.topic}</h1>

        {newsData.description && (
          <p className={style.subtitle}>{newsData.description}</p>
        )}
        {dateStr && <div className={style.date}>{dateStr}</div>}

        {!!keywordList.length && (
          <div className={style.tags}>
            {keywordList.map((tag, i) => (
              <span className={style.tag} key={i}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {newsData?.files?.[0] && (
          <div className={style.hero}>
            <img
              loading="lazy"
              decoding="async"
              src={newsData.files[0]}
              alt={newsData.topic}
              className={style.heroContain}
            />
          </div>
        )}

        {newsData?.text && (
          <div className={style.content} style={{ whiteSpace: "pre-wrap" }}>
            {newsData.text}
          </div>
        )}

        {!!newsData?.files?.length && (
          <div className={style.gallery}>
            <Image.PreviewGroup>
              {newsData.files.map((src, i) => (
                <Image
                  key={i}
                  className={style.galleryItem}
                  src={src}
                  alt={newsData.topic}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
      </div>
    </div>
  );
}
