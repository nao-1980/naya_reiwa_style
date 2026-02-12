'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const MAILTO_HREF = "mailto:nao@naya-works.jp?subject=【NAYAwebサイトよりご相談】&body=【ご相談内容をどうぞ】%0D%0A箇条書きでも構いません。%0D%0Aご希望があれば、オンラインでのご相談も承ります。%0D%0A%0D%0A▼ご相談内容：%0D%0A";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="NAYAWORKS"
              width={120}
              height={32}
              className={styles.logoImg}
              priority
            />
          </Link>
          <ul className={styles.navMenu}>
            <li>
              <a
                href="#home"
                className={styles.navLink}
                onClick={(e) => handleSmoothScroll(e, '#home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={styles.navLink}
                onClick={(e) => handleSmoothScroll(e, '#services')}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={styles.navLink}
                onClick={(e) => handleSmoothScroll(e, '#contact')}
              >
                Contact
              </a>
            </li>
            <li>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>
          </ul>
          <a href={MAILTO_HREF} className={styles.navCta}>
            お問い合わせ
          </a>
          <button
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <ul className={styles.mobileMenuList}>
          <li>
            <a
              href="#home"
              className={styles.mobileMenuLink}
              onClick={(e) => {
                handleSmoothScroll(e, '#home');
                closeMobileMenu();
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={styles.mobileMenuLink}
              onClick={(e) => {
                handleSmoothScroll(e, '#services');
                closeMobileMenu();
              }}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={styles.mobileMenuLink}
              onClick={(e) => {
                handleSmoothScroll(e, '#contact');
                closeMobileMenu();
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <Link
              href="/about"
              className={styles.mobileMenuLink}
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
          <li>
            <a
              href={MAILTO_HREF}
              className={styles.mobileMenuLink}
              onClick={closeMobileMenu}
            >
              お問い合わせ
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
