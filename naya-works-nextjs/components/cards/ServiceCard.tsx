import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  id?: string;
  icon: string;
  title: string;
  items: string[];
  variant?: 1 | 2 | 3;
  className?: string;
}

export default function ServiceCard({
  id,
  icon,
  title,
  items,
  variant = 1,
  className = '',
}: ServiceCardProps) {
  const variantClass = variant === 2 ? styles.variant2 : variant === 3 ? styles.variant3 : styles.variant1;

  return (
    <div
      id={id}
      className={`${styles.serviceCard} ${variantClass} service-card ${className}`}
    >
      <div className={styles.serviceIcon}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <ul className={styles.serviceList}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
