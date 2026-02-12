'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const MAILTO_HREF = "mailto:nao@naya-works.jp?subject=【NAYAwebサイトよりご相談】&body=【ご相談内容をどうぞ】%0D%0A箇条書きでも構いません。%0D%0Aご希望があれば、オンラインでのご相談も承ります。%0D%0A%0D%0A▼ご相談内容：%0D%0A";

export default function About() {
  const profileRef = useScrollReveal<HTMLDivElement>();

  return (
    <main>
      {/* About Hero */}
      <section className={styles.aboutHero}>
        <div className={styles.heroGradient}></div>
        <div className={styles.aboutHeroContent}>
          <h1 className={styles.pageTitle}>
            About<br />
            <Image
              src="/images/logo.png"
              alt="NAYA WORKS"
              width={200}
              height={60}
              className={styles.titleLogo}
              priority
            />
          </h1>
          <p className={styles.aboutSubtitle}>想いを、きちんと伝わる形に</p>
        </div>
      </section>

      {/* Profile Section */}
      <section className={styles.profileSection}>
        <div className={styles.profileContainer}>
          <div className={`${styles.profileCard} reveal`} ref={profileRef}>
            <div className={styles.profileContent}>
              <div className={styles.profileBlock}>
                <h3>
                  <i className="fas fa-heart"></i>
                  NAYAに込めた想い
                </h3>
                <p>
                  NAYAという屋号は、「導く」「新しい」「意味を持つ」という意味と、「納屋」ー想いやアイデアを蓄積する場所ーの両方を重ね合わせています。
                </p>
                <p>
                  テクノロジーやAIは、効率化のためだけでなく、人を助け、価値を高めるための手段として活用します。
                </p>
                <p>
                  コミュニケーションを軸に、情報がきちんと伝わる仕組みづくりに取り組みながら、一つひとつの関わりを大切にし、ともに前に進んでいくパートナーでありたいと考えています。
                </p>
              </div>

              <div className={styles.profileBlock}>
                <h3>
                  <i className="fas fa-handshake-angle"></i>
                  大切にしていること
                </h3>
                <p>
                  「想いはあるけど、どう形にしたらいいかわからない」という方や、「もっと多くの人に届けたい」と考えている方々と、チームとして取り組みます。
                </p>
                <p>
                  医療・ヘルスケア、地域づくり、カルチャー、ライフスタイルなど、人の暮らしや心に寄り添うプロジェクトを、肩書きや規模にこだわらず誠実に向き合っていきたいと考えています。
                </p>
              </div>

              <div className={styles.valuesGrid}>
                <div className={`${styles.valueCard} value-card`}>
                  <h4>
                    <i className="fas fa-seedling"></i>
                    ベース
                  </h4>
                  <p>
                    医療やケア、生活に近い分野での学びや経験が、今の仕事のスタンスのベースになっています
                  </p>
                </div>
                <div className={`${styles.valueCard} value-card`}>
                  <h4>
                    <i className="fas fa-award"></i>
                    保有資格
                  </h4>
                  <p>
                    メディカルクラーク / フィトセラピスト / ハンドケアマイスター / 第二級陸上特殊無線技士 / 一級小型船舶操縦士 / J.S.A. SAKE検定
                  </p>
                </div>
              </div>

              <div className={styles.ctaSection}>
                <p className={styles.ctaText}>
                  「こんなこと相談していいのかな？」と思うようなことでも大丈夫です。<br />
                  まずは一度、お話ししてみませんか？
                </p>
                <div className={styles.ctaButtons}>
                  <a href={MAILTO_HREF} className="btn btn-primary">
                    お問い合わせ
                    <i className="fas fa-arrow-right"></i>
                  </a>
                  <Link href="/#services" className="btn btn-secondary">
                    サービスを見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
