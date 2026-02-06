'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../Admin.module.css'; // Reuse container styles or specific ones
import Link from 'next/link';

export default function PostEditor() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.id; // If id exists, it's edit mode
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Admin'
  });
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/blogs/${params.id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error(err));
    }
  }, [isEdit, params.id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    
    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data
        });
        const json = await res.json();
        if (json.success) {
            setFormData(prev => ({...prev, image: json.url}));
        }
    } catch (err) {
        console.error(err);
        alert('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEdit ? `/api/blogs/${params.id}` : '/api/blogs';
    const method = isEdit ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    if (res.ok) {
        router.push('/admin');
        router.refresh();
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{isEdit ? 'Edit Post' : 'New Post'}</h1>
        <Link href="/admin" className={styles.actionBtn}>Cancel</Link>
      </header>
      
      <div className={styles.card} style={{maxWidth: '800px', margin: '0 auto'}}>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div>
                <label className={styles.cardLabel}>Title</label>
                <input 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange}
                    style={{width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px'}}
                    required
                />
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div>
                    <label className={styles.cardLabel}>Category</label>
                    <input 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        style={{width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px'}}
                        required
                    />
                </div>
                <div>
                    <label className={styles.cardLabel}>Author</label>
                    <input 
                        name="author" 
                        value={formData.author} 
                        onChange={handleChange}
                        style={{width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px'}}
                    />
                </div>
            </div>

            <div>
                <label className={styles.cardLabel}>Cover Image</label>
                <input type="file" onChange={handleImageUpload} style={{marginBottom: '0.5rem'}} />
                {uploading && <span>Uploading...</span>}
                {formData.image && (
                    <div style={{marginTop: '0.5rem'}}>
                        <img src={formData.image} alt="Preview" style={{height: '100px', borderRadius: '8px'}} />
                    </div>
                )}
            </div>

            <div>
                <label className={styles.cardLabel}>Excerpt</label>
                <textarea 
                    name="excerpt" 
                    value={formData.excerpt} 
                    onChange={handleChange}
                    style={{width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', minHeight: '80px'}}
                    required
                />
            </div>

            <div>
                <label className={styles.cardLabel}>Content (HTML Supported)</label>
                <textarea 
                    name="content" 
                    value={formData.content} 
                    onChange={handleChange}
                    style={{width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', minHeight: '300px', fontFamily: 'monospace'}}
                    required
                />
            </div>

            <button type="submit" style={{
                padding: '1rem', 
                background: 'var(--primary)', 
                color: '#000', 
                fontWeight: 'bold', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                marginTop: '1rem'
            }}>
                {isEdit ? 'Update Post' : 'Publish Post'}
            </button>
        </form>
      </div>
    </main>
  );
}
