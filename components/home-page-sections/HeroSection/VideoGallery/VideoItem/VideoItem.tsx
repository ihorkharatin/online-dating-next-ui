"use client";
import { useRef } from "react";
import "./VideoItem.css";
import { Flex } from "antd";

import Link from "next/link";

type Props = {
  src: string;
  title: string;
  id: number;
};

const VideoItem = ({ src, title, id }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleMouseEnter = () => {
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <Flex className="video-card" vertical>
      <Link
        className="video-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        href={`/video-stories/story_${id}`}
      >
        <video
          className="video-item"
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          title={title}
        />
        <div className="info">
          <h2 className="name">{title}</h2>
        </div>
      </Link>
    </Flex>
  );
};

export default VideoItem;
