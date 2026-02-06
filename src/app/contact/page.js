'use client';

import styles from './Contact.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <main className={styles.container}>
      <Navbar />
      
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <div>
              <h1>Let's Connect</h1>
              <p>Have a question or want to get involved? Send us a message and we'll get back to you within 24 hours.</p>
            </div>
            
            <div className={styles.contactDetails}>
              <div>hello@adaptivesports.com</div>
              <div>+1 (555) 123-4567</div>
              <div>San Francisco, CA</div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input type="text" className={styles.input} placeholder="John Doe" required />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" className={styles.input} placeholder="john@example.com" required />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <textarea className={styles.textarea} placeholder="Tell us what's on your mind..." required></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
