'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './BlogOne.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        fetch(`/api/blogs/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div style={{background: 'var(--background)', minHeight: '100vh', padding: '100px', textAlign: 'center'}}>Loading...</div>;
  
  if (!post) return (
      <main style={{background: 'var(--background)', minHeight: '100vh'}}>
          <Navbar />
          <div style={{padding: '150px 20px', textAlign: 'center'}}>
              <h1>Post not found</h1>
              <Link href="/">Return Home</Link>
          </div>
          <Footer />
      </main>
  );

  return (
    <main style={{ background: 'var(--background)' }}>
      <Navbar />
      
      <article className={styles.container}>
        <div className={styles.hero} style={{ 
            backgroundImage: post.image ? `url(${post.image})` : 'url(https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop)' 
        }}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <div className={styles.author}>
                <div className={styles.avatar} style={{background: '#334155'}}></div>
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <Link href="/" className={styles.backLink}>
            &larr; Back to Home
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
