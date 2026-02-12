'use client';

import styles from './Contact.module.css';
import InfoCard from '@/components/cards/InfoCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const MAILTO_HREF = "mailto:nao@naya-works.jp?subject=【NAYAwebサイトよりご相談】&body=【ご相談内容をどうぞ】%0D%0A箇条書きでも構いません。%0D%0Aご希望があれば、オンラインでのご相談も承ります。%0D%0A%0D%0A▼ご相談内容：%0D%0A";

export default function Contact() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.contactContainer} reveal`} ref={containerRef}>
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className={styles.contactTitle}>まずは、お気軽にご相談ください</h2>
          <a href={MAILTO_HREF} className={`btn btn-primary ${styles.contactBtn}`}>
            お問い合わせ
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>

        <div className={styles.contactInfoGrid}>
          <InfoCard
            icon="fa-map-marker-alt"
            iconType="location"
            label="所在地"
            text="神奈川県横浜市"
          />
          <InfoCard
            icon="fa-clock"
            iconType="time"
            label="営業時間"
            text="営業時間：10:00–18:00<br>定休日：月曜日"
          />
          <InfoCard
            icon=""
            iconType="about"
            label="About"
            text="NAYA WORKS"
            href="/about"
            isPlantIcon
          />
        </div>
      </div>
    </section>
  );
}
