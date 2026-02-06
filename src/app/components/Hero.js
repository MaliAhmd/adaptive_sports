import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>New: Adaptive Sports Community v2.0</span>
        <h1 className={styles.title}>
          Breaking Barriers<br />Through Sport
        </h1>
        <p className={styles.description}>
          Discover stories of resilience, triumph, and the transformative power of adaptive sports. 
          Join a community that believes in potential without limits.
        </p>
        <div className={styles.actions}>
          <Link href="#blog" className={styles.primaryBtn}>Start Reading</Link>
          <Link href="#about" className={styles.secondaryBtn}>Learn More</Link>
        </div>
      </div>
    </section>
  );
}
