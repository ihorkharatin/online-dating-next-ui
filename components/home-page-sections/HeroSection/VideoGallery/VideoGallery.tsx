"use client";
import styles from "./VideoGallery.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import VideoItem from "./VideoItem/VideoItem";
import { storyList } from "@/mock-data/videoStories";

const VideoGallery = ({}) => {
  return (
    <div className={styles.container}>
      <Swiper
        grabCursor={true}
        effect={"cards"}
        modules={[EffectCards]}
        className={styles.mySwiper}
        loop={true}
        style={{ width: "100%", maxWidth: "375px" }}
      >
        {storyList.map((el, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            <VideoItem src={el.src} title={el.title} id={el.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoGallery;
