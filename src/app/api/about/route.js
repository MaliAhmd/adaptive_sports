
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import About from '@/models/About';
import { verifyAdmin } from '@/lib/auth-server';

// GET: Public buffer to view About content
export async function GET() {
  try {
    await dbConnect();
    // Return the first document found (Singleton pattern)
    // or a default object if none exists
    const about = await About.findOne({});
    if (!about) {
        return NextResponse.json({ 
            title: 'Welcome', 
            description: 'About content has not been set yet.',
            images: []
        });
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

// POST/PUT: Admin only updates (or creates)
export async function POST(request) {
    try {
        const admin = await verifyAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await request.json();
        await dbConnect();
        
        // Find the existing one and update it, or create if not exists.
        // We use findOneAndUpdate with upsert: true. 
        // passing an empty filter `{}` implies we update the first one found, 
        // but if none found, we insert. To prevent multiple documents, 
        // we should ideally have a unique index, but logic here suffices for basic usage.
        
        const existing = await About.findOne({});
        
        let result;
        if (existing) {
             result = await About.findByIdAndUpdate(existing._id, body, { new: true, runValidators: true });
        } else {
             result = await About.create(body);
        }
        
        return NextResponse.json(result);
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
    }
}
