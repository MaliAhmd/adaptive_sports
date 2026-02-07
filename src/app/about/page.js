import styles from './About.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dbConnect from '@/lib/mongoose';
import AboutModel from '@/models/About';

async function getAboutData() {
  try {
    await dbConnect();
    const about = await AboutModel.findOne({});
    if (!about) {
      return {
        title: 'Empowering Every Athlete',
        description: 'We believe sport is a universal language that should be accessible to everyone, regardless of physical ability.',
        images: []
      };
    }
    return JSON.parse(JSON.stringify(about));
  } catch (error) {
    console.error(error);
    return {
      title: 'About Us',
      description: 'Error loading content.',
      images: []
    };
  }
}

export default async function About() {
  const data = await getAboutData();
  
  return (
    <main className={styles.container}>
      <Navbar />
      
      <section className={styles.hero}>
        <h1 className={styles.title}>{data.title}</h1>
        {/* If description is long, we might want to split it or show a part here */}
      </section>

      <div className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
             {data.images && data.images[0] ? (
                 <img src={data.images[0]} alt="About Us" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px'}} />
             ) : (
                 <div style={{width: '100%', minHeight: '300px', background: 'linear-gradient(45deg, #1e293b, #0f172a)', borderRadius: '12px'}}></div>
             )}
          </div>
          <div className={styles.content}>
            <h2>Our Story</h2>
            <div dangerouslySetInnerHTML={{ __html: data.description.replace(/\n/g, '<br/>') }} />
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
