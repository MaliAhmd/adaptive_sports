import styles from './About.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <main className={styles.container}>
      <Navbar />
      
      <section className={styles.hero}>
        <h1 className={styles.title}>Empowering Every Athlete</h1>
        <p className={styles.subtitle}>
          We believe sport is a universal language that should be accessible to everyone, regardless of physical ability.
        </p>
      </section>

      <div className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
             {/* Using a gradient placeholder instead of repeating the Image component logic for simplicity and speed, 
                 or a solid color block to simulate an image if Next.js Image isn't desired without config. 
                 Using a standard img tag with an external placeholder or local asset is also an option.
                 Here I'll use a styled div acting as an image placeholder with a gradient. */}
             <div style={{width: '100%', height: '100%', background: 'linear-gradient(45deg, #1e293b, #0f172a)'}}></div>
          </div>
          <div className={styles.content}>
            <h2>Our Mission</h2>
            <p>
              Founded in 2024, Adaptive Sports has been at the forefront of the inclusive athletics movement. 
              Our mission is simple: to break down barriers.
            </p>
            <p>
              We provide resources, community support, and cutting-edge technology insights to help paramobile 
              athletes and adaptive sports enthusiasts reach their peak potential.
            </p>
          </div>
        </div>

        <div className={styles.stats}>
          <div>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Communities</span>
          </div>
          <div>
            <span className={styles.statNumber}>2k+</span>
            <span className={styles.statLabel}>Athletes</span>
          </div>
          <div>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Dedication</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
