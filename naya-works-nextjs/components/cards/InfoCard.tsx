import Link from 'next/link';
import Image from 'next/image';
import styles from './InfoCard.module.css';

type IconType = 'location' | 'time' | 'about';

interface InfoCardProps {
  icon: string;
  iconType: IconType;
  label: string;
  text: string;
  href?: string;
  isPlantIcon?: boolean;
}

export default function InfoCard({
  icon,
  iconType,
  label,
  text,
  href,
  isPlantIcon = false,
}: InfoCardProps) {
  const iconClassName = `${styles.infoIcon} ${
    iconType === 'location'
      ? styles.iconLocation
      : iconType === 'time'
      ? styles.iconTime
      : styles.iconAbout
  }`;

  const content = (
    <>
      <div className={iconClassName}>
        {isPlantIcon ? (
          <Image
            src="/images/plant-icon.png"
            alt="NAYA WORKS"
            width={56}
            height={56}
            className={styles.plantIcon}
          />
        ) : (
          <i className={`fas ${icon}`}></i>
        )}
      </div>
      <h3 className={styles.infoLabel}>{label}</h3>
      <p className={styles.infoText} dangerouslySetInnerHTML={{ __html: text }} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.infoCard} ${styles.infoCardLink} info-card`}>
        {content}
      </Link>
    );
  }

  return <div className={`${styles.infoCard} info-card`}>{content}</div>;
}
