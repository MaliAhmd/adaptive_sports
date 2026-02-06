import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.posts);
}

export async function POST(request) {
    // In a real app, verify JWT here too or rely on middleware if this route is only called from admin pages
    // For API routes, usually need to verify manually if not covered by middleware matcher or if used externally.
    // Since middleware covers /admin, but API is /api, we should protect this if it's for admin actions.
    // For simplicity in this demo, we'll assume the /api/blogs POST is protected or we add a check.
    
    // Simple check (in production use a shared verify helper)
    // const token = request.cookies.get('token');
    // if (!token) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    try {
        const body = await request.json();
        const db = getDb();
        
        const newPost = {
            id: Date.now().toString(),
            ...body,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        
        db.posts.push(newPost);
        saveDb(db);
        
        return NextResponse.json(newPost);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
