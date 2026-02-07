'use client';
import { useEffect, useState } from 'react';
import styles from './FeaturedPosts.module.css';
import Link from 'next/link';

export default function FeaturedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.section} id="blog">
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Stories</h2>
        <p className={styles.subtitle}>Insights, news, and inspiration from the world of adaptive sports.</p>
      </div>
      
      <div className={styles.grid}>
        {posts.map(post => (
          <Link href={`/blog/${post.slug || post._id || post.id}`} key={post._id || post.id} className={styles.card}>
            <div className={styles.cardImage}>
              {post.image ? (
                  <img src={post.image} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                  <div className={styles.gradient} />
              )}
            </div>
            <div className={styles.cardContent}>
              <span className={styles.category}>{post.category}</span>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <div className={styles.meta}>
                <span>{post.date || new Date(post.createdAt).toLocaleDateString()}</span>
                <span className={styles.readMore}>Read article &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && <p style={{textAlign: 'center', gridColumn: '1/-1'}}>Loading stories...</p>}
      </div>
    </section>
  );
}
