
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { verifyAdmin } from '@/lib/auth-server';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    // Generate slug from title if not provided
    const slug = body.slug || body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const newBlog = await Blog.create({
      ...body,
      slug,
      author: admin.username, // Record who created it
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    // Handle duplicate key error (slug)
    if (error.code === 11000) {
       return NextResponse.json({ error: 'Blog post with this title/slug already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
