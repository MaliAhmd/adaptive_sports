import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = await params;
  const db = getDb();
  const post = db.posts.find(p => p.id === id);
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Increment view count
  // Note: GET requests should ideally be idempotent, but for simple view tracking this is common.
  // Alternatively, use a separate POST endpoint. We'll stick to this for simplicity as requested.
  post.views = (post.views || 0) + 1;
  saveDb(db);
  
  return NextResponse.json(post);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const db = getDb();
  
  const newPosts = db.posts.filter(p => p.id !== id);
  
  if (newPosts.length === db.posts.length) {
     return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  db.posts = newPosts;
  saveDb(db);
  
  return NextResponse.json({ success: true });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();
    
    const index = db.posts.findIndex(p => p.id === id);
    
    if (index === -1) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    db.posts[index] = { ...db.posts[index], ...body };
    saveDb(db);
    
    return NextResponse.json(db.posts[index]);
}
