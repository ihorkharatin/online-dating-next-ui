"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

/** Дозволені коди мов (перший сегмент URL) */
const SUPPORTED_LOCALES = new Set([
  "en",
  "ua",
  "pl",
  "de",
  "it",
  "fr",
  "es",
  "pt",
  "nl",
  "da",
]);

function useLangFromPath(): string {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.has(seg) ? seg : "en";
}

export default function Footer() {
  const lang = useLangFromPath();

  // Правильні локалізовані шляхи (як ми зробили на сторінках)
  const termsHref = `/${lang}/terms-and-conditions`;
  const privacyHref = `/${lang}/privacy-policy`;
  const refundHref = `/${lang}/refund-policy`;

  return (
    <footer className={styles.footerRoot}>
      {/* Внутрішній контейнер по центру */}
      <div className={styles.footer}>
        <div className={styles.iconRow}>
          <div className={styles.socialIcons}>
            <Link
              href="https://www.instagram.com/datinglifecoachuk/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image
                loading="lazy"
                decoding="async"
                src="/site-images/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </Link>

            <Link
              href="https://www.youtube.com/@datingdate"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image
                loading="lazy"
                decoding="async"
                src="/site-images/Youtube.png"
                alt="YouTube"
                width={30}
                height={30}
              />
            </Link>

            <Link
              href="https://www.facebook.com/dateandlifecoachuk/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image
                loading="lazy"
                decoding="async"
                src="/site-images/Facebook.png"
                alt="Facebook"
                width={30}
                height={30}
              />
            </Link>

            <Link
              href="https://x.com/DatinCoachUK"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <Image
                loading="lazy"
                decoding="async"
                src="/site-images/Twitter.png"
                alt="X (Twitter)"
                width={30}
                height={30}
              />
            </Link>
          </div>

          <div className={styles.paymentIcons}>
            <Image
              loading="lazy"
              decoding="async"
              src="/site-images/Visa.png"
              alt="Visa"
              width={50}
              height={32}
            />
            <Image
              loading="lazy"
              decoding="async"
              src="/site-images/Mastercard.png"
              alt="Mastercard"
              width={50}
              height={32}
            />
          </div>
        </div>

        <div className={styles.footerText}>
          <p>Owned By DREAMONELOVE LIMITED</p>
          <p>3rd Floor 207 Regent Street, London, W1B 3HH</p>

          <p className={styles.footerLinks}>
            <Link href={termsHref} className={styles.link}>
              Terms of Use
            </Link>
            <span className={styles.separator}>|</span>
            <Link href={privacyHref} className={styles.link}>
              Privacy Policy
            </Link>
            <span className={styles.separator}>|</span>
            <Link href={refundHref} className={styles.link}>
              Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
