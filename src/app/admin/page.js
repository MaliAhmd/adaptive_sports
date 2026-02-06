'use client';
import { useEffect, useState } from 'react';
import styles from './Admin.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
      if (!confirm('Are you sure you want to delete this post?')) return;
      
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
          fetchPosts(); // Refresh list
      }
  };

  if (loading) return <div className={styles.container}>Loading dashboard...</div>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.user}>
          <Link href="/admin/posts/new" className={styles.badge} style={{background: 'var(--primary)', color: '#000', padding: '0.8rem 1.5rem', textDecoration: 'none', fontSize: '1rem'}}>
             + New Post
          </Link>
          <div className={styles.avatar}>A</div>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Total Posts</div>
          <div className={styles.cardValue}>{posts.length}</div>
        </div>
        {/* Placeholder stats */}
        <div className={styles.card}>
          <div className={styles.cardLabel}>Views</div>
          <div className={styles.cardValue}>12.5k</div>
        </div>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Manage Posts</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{post.date}</td>
                  <td>
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <Link href={`/admin/posts/${post.id}`} className={styles.actionBtn}>Edit</Link>
                        <span onClick={() => deletePost(post.id)} className={styles.actionBtn} style={{color: 'red'}}>Delete</span>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                  <tr><td colSpan="4" style={{textAlign: 'center'}}>No posts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      
      <div style={{marginTop: '2rem'}}>
          <Link href="/" style={{color: '#94a3b8'}}>Home Website</Link>
      </div>
    </main>
  );
}
