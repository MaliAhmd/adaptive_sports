'use client';

import styles from './Newsletter.module.css';

export default function Newsletter() {
  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join the Community</h2>
          <p className={styles.description}>
            Get the latest stories, training tips, and community event updates delivered straight to your inbox.
          </p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
