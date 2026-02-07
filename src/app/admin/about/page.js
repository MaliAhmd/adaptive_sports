
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Admin.module.css'; // Re-use styles

export default function AdminAbout() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '', // comma separated string for now
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        setFormData({
            title: data.title || '',
            description: data.description || '',
            images: data.images ? data.images.join(',') : '',
        });
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Saving...');
    
    const payload = {
        ...formData,
        images: formData.images.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const res = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('About page updated successfully!');
        router.refresh();
      } else {
        setMessage('Failed to update.');
      }
    } catch (error) {
      setMessage('Error saving data.');
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit About Page</h1>
      {message && <p className={styles.msg}>{message}</p>}
      
      <form onSubmit={handleSubmit} className={styles.form} style={{maxWidth: '800px', margin: '0 auto'}}>
        <div className={styles.group}>
          <label>Page Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.group}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
            rows={10}
            required
            style={{resize: 'vertical', minHeight: '200px'}}
          />
        </div>

        <div className={styles.group}>
          <label>Image URLs (comma separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>

        <button type="submit" className={styles.button} style={{marginTop: '1rem'}}>
          Save Changes
        </button>
        
        <button 
            type="button" 
            onClick={() => router.push('/admin')}
            style={{
                marginLeft: '1rem', 
                background: 'transparent', 
                color: '#fff', 
                border: '1px solid #333',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer'
            }}
        >
            Cancel
        </button>
      </form>
    </div>
  );
}
