import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 🛑 REMOVE `export const dynamic = "force-dynamic";`

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful' });

  // 🍪 Clear Cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
