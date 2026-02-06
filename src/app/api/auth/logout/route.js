import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  // Await cookies() for future Next.js compatibility, though request.cookies usually works for reading.
  // For setting/deleting, we use NextResponse or the cookies() helper in Server Actions/Route Handlers.
  
  const response = NextResponse.json({ success: true });
  
  // Clear the cookie by setting it to expire immediately
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), 
    path: '/',
  });

  return response;
}
