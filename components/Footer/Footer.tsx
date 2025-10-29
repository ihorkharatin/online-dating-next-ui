import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = ({}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.iconRow}>
        <div className={styles.socialIcons}>
          <Link
            href="https://www.instagram.com/datinglifecoachuk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              loading="lazy"
              decoding="async"
              src="/site-images/instagram.png"
              alt="Instagram"
              width="30"
              height="30"
            />
          </Link>
          <Link
            href="https://www.youtube.com/@IkharatinKharatin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              loading="lazy"
              decoding="async"
              src="/site-images/instagram.png"
              alt="YouTube"
              width="30"
              height="30"
            />
          </Link>
          <Link
            href="https://www.facebook.com/dateandlifecoachuk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              loading="lazy"
              decoding="async"
              src="/site-images/instagram.png"
              alt="Facebook"
              width="30"
              height="30"
            />
          </Link>
          <Link
            href="https://x.com/DatinCoachUK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              loading="lazy"
              decoding="async"
              src="/site-images/instagram.png"
              alt="Twitter"
              width="30"
              height="30"
            />
          </Link>
        </div>
        <div className={styles.paymentIcons}>
          <Image
            loading="lazy"
            decoding="async"
            src="/site-images/instagram.png"
            alt="Visa"
            width="30"
            height="30"
          />
          <Image
            loading="lazy"
            decoding="async"
            src="/site-images/instagram.png"
            alt="MasterCard"
            width="30"
            height="30"
          />
        </div>
      </div>

      <div className={styles.footerText}>
        <p> Owned By DREAMONELOVE LIMITED</p>

        <p>3rd Floor 207 Regent Street, London, W1B 3HH</p>

        <p>
          <Link href="/terms-and-conditions" className={styles.link}>
            Terms Of Use
          </Link>
          |
          <Link href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>
          |
          <Link href="/refund-policy" className={styles.link}>
            Refund Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
