import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// API को dynamic बनाना ज़रूरी है
export const dynamic = "force-dynamic"; 

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful' });

  // Token Cookie Remove करना
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
