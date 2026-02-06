import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { getDb } from '@/lib/db';

const SECRET_KEY = new TextEncoder().encode('your-super-secret-key-change-this-in-prod');

export async function POST(request) {
  const { username, password } = await request.json();
  const db = getDb();
  
  const user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Create JWT
  const token = await new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET_KEY);

  const response = NextResponse.json({ success: true });
  
  // Set HttpOnly Cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
