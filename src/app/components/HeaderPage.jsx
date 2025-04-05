// src/app/components/HeaderPage.jsx

import Header from './Header';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWTTOKEN;

export default async function HeaderPage() {
  const cookieStore = await cookies(); // ✅ No need to await in Server Component
  const token = cookieStore.get('token')?.value;

  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, SECRET_KEY); // ✅ Optional: Verify token
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  return <Header button={isAuthenticated} />;
}
