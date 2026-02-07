
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function GET(request) {
  try {
    await dbConnect();

    const count = await Admin.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash('password123', 10);
    const newAdmin = await Admin.create({
      username: 'admin',
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'Setup Complete: Created user "admin" with password "password123"' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
