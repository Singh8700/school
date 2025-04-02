import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 🛑 REMOVE `export const dynamic = "force-dynamic";`

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.set(
    "Set-Cookie",
    `token=""; Path=/; HttpOnly; Secure; SameSite=Strict`
)
  return response;
}
