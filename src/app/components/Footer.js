import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h3>Adaptive.</h3>
          <p>Empowering athletes of all abilities to reach their peak potential through community, technology, and support.</p>
        </div>
        
        <div className={styles.column}>
          <h4>Platform</h4>
          <ul>
            <li><Link href="#">Features</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Events</Link></li>
          </ul>
        </div>
        
        <div className={styles.column}>
          <h4>Company</h4>
          <ul>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
        
        <div className={styles.column}>
          <h4>Legal</h4>
          <ul>
            <li><Link href="#">Privacy</Link></li>
            <li><Link href="#">Terms</Link></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Adaptive Sports. All rights reserved.</p>
      </div>
    </footer>
  );
}
