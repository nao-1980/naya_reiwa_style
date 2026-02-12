import styles from './BentoCard.module.css';

interface BentoCardProps {
  icon: string;
  title: string;
  text?: string;
  href?: string;
  large?: boolean;
}

export default function BentoCard({ icon, title, text, href, large }: BentoCardProps) {
  const cardClassName = `${styles.bentoCard} ${large ? styles.large : ''} bento-card`;

  const content = (
    <>
      <div className={styles.bentoIcon}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className={styles.bentoTitle}>{title}</h3>
      {text && <p className={styles.bentoText}>{text}</p>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cardClassName}>
        {content}
      </a>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}
