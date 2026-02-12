'use client';

import styles from './Services.module.css';
import ServiceCard from '@/components/cards/ServiceCard';
import { useScrollReveal, useMultipleScrollReveal } from '@/hooks/useScrollReveal';

const servicesData = [
  {
    id: 'service-design',
    icon: 'fa-palette',
    title: 'ビジュアル & デザイン',
    items: [
      'ロゴ・名刺のデザイン',
      'ウェブサイト・アプリの画面デザイン',
      'チラシ・ポスターなどの印刷物',
      '動画・アニメーション制作',
    ],
    variant: 1 as const,
  },
  {
    id: 'service-communication',
    icon: 'fa-comments',
    title: 'コミュニケーション',
    items: [
      '広報サポート',
      'ラジオ番組制作',
      'プレスリリース',
      'SNS運用',
      'オウンドメディアサポート',
    ],
    variant: 2 as const,
  },
  {
    id: 'service-ai',
    icon: 'fa-robot',
    title: 'UI/UX & AI構築',
    items: [
      '使いやすさの調査・試作品づくり',
      'AIを取り入れたデザイン',
      'あなた専用のAI開発',
      '誰でも使いやすい画面設計',
    ],
    variant: 3 as const,
  },
];

export default function Services() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const setCardRef = useMultipleScrollReveal(servicesData.length);

  return (
    <section id="services" className={styles.services}>
      <div className="section-header reveal" ref={headerRef}>
        <span className="section-label">Services</span>
        <h2 className="section-title">あなたのビジョンを現実に</h2>
      </div>

      <div className={styles.servicesGrid}>
        {servicesData.map((service, index) => (
          <div key={service.id} className="reveal" ref={setCardRef(index)}>
            <ServiceCard
              id={service.id}
              icon={service.icon}
              title={service.title}
              items={service.items}
              variant={service.variant}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
