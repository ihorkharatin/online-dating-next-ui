"use client";

import { Image } from "antd";
import clsx from "clsx";

type Classes = {
  container?: string;
  card?: string;
  thumb?: string;
};

export default function GalleryAntd({
  images,
  alt,
  classes,
}: {
  images: string[];
  alt: string;
  classes?: Classes;
}) {
  const list = (images || []).filter(Boolean);
  if (!list.length) return null;

  return (
    <div className={clsx(classes?.container)}>
      <Image.PreviewGroup>
        {list.map((src, i) => (
          <div key={i} className={clsx(classes?.card)}>
            <div className={clsx(classes?.thumb)}>
              <Image
                src={src}
                alt={alt}
                // маска на ховер (кастомний текст за бажанням)
                preview={{ mask: "Open" }}
                placeholder
              />
            </div>
          </div>
        ))}
      </Image.PreviewGroup>
    </div>
  );
}
