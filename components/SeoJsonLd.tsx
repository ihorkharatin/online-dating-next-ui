// components/SeoJsonLd.tsx
import Script from "next/script";

type Props = {
  id: string; // унікальний id тега <script>
  data: Record<string, any>; // сам JSON-LD об'єкт
};

/** Рендерить <script type="application/ld+json"> з переданим об'єктом */
export default function SeoJsonLd({ id, data }: Props) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
