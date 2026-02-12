'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.footerLogo}>
        <Link href="/" className={styles.footerLogoLink}>
          <Image
            src="/images/logo.png"
            alt="NAYAWORKS"
            width={150}
            height={40}
            className={styles.footerLogoImg}
          />
        </Link>
      </p>
      <p className={styles.footerText}>
        &copy; {currentYear} NAYA WORKS. All rights reserved.
      </p>
    </footer>
  );
}
