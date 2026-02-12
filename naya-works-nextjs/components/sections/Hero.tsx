import styles from './Hero.module.css';
import BentoCard from '@/components/cards/BentoCard';

const MAILTO_HREF = "mailto:nao@naya-works.jp?subject=【NAYAwebサイトよりご相談】&body=【ご相談内容をどうぞ】%0D%0A箇条書きでも構いません。%0D%0Aご希望があれば、オンラインでのご相談も承ります。%0D%0A%0D%0A▼ご相談内容：%0D%0A";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroBg}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.heroGradient}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Ideas,<br />
            <span className={styles.gradient}>Connected</span><br />
            by Design
          </h1>
          <p className={styles.heroDescription}>
            ビジネスをもっと自由に
          </p>
          <div className={styles.heroCta}>
            <a href={MAILTO_HREF} className="btn btn-primary">
              お問い合わせ
              <i className="fas fa-arrow-right"></i>
            </a>
            <a href="#services" className="btn btn-secondary">
              サービスを見る
            </a>
          </div>
        </div>

        <div className={styles.heroBento}>
          <BentoCard
            href="#service-design"
            icon="fa-palette"
            title="Visual & Design"
          />
          <BentoCard
            href="#service-communication"
            icon="fa-comments"
            title="Communication"
          />
          <BentoCard
            href="#service-ai"
            icon="fa-robot"
            title="AI & Technology"
            large
          />
        </div>
      </div>
    </section>
  );
}
