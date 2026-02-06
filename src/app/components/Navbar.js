import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Adaptive.
      </Link>
      <div className={styles.links}>
        <Link href="/#features" className={styles.link}>Features</Link>
        <Link href="/#blog" className={styles.link}>Blog</Link>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <Link href="#newsletter" className={styles.cta}>Subscribe</Link>
      </div>
    </nav>
  );
}
