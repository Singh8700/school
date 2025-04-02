import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful' },{status:"200"});

  // Token Cookie Delete करना
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // तुरंत expire कर देगा
    path: '/',
  });

  return response;
}
