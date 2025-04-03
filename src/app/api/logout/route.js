import { NextResponse } from 'next/server';

export const dynamic = "force-static"

export async function GET() {

  const response = NextResponse.json({ message: 'Logout successful' });
  
  response.headers.set(
    "Set-Cookie",
    `token=""; Path=/; HttpOnly; Secure; SameSite=Strict`
)
  return response;
}
