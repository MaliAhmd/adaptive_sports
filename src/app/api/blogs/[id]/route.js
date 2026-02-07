
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { verifyAdmin } from '@/lib/auth-server';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params; 
    
    // Attempt to find by ID first, then by slug if valid ID fails or not found
    let blog = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
         blog = await Blog.findById(id);
    }
    
    if (!blog) {
        blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
      console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    await dbConnect();

    let updatedBlog;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updatedBlog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
    } else {
        // Find by slug
         updatedBlog = await Blog.findOneAndUpdate({ slug: id }, body, {
            new: true,
            runValidators: true,
        });
    }

    if (!updatedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    let deletedBlog;
     if (id.match(/^[0-9a-fA-F]{24}$/)) {
        deletedBlog = await Blog.findByIdAndDelete(id);
     } else {
        deletedBlog = await Blog.findOneAndDelete({ slug: id });
     }

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
