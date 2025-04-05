import AdminClient from './AdminClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWTTOKEN; // Ensure this is set in your .env file



export default async function AdminPage() {
  try {
    // 🍪 Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // ❌ If no token, redirect to login
    if (!token) {
      redirect('/admin/login');
      return;
    }

    // 🔍 Verify JWT Token
    try {
      const decoded = jwt.verify(token, process.env.JWTTOKEN);
      // console.log("✅ Token Verified: ", decoded);
    } catch (error) {
      // console.error("❌ Invalid Token:", error);
      return redirect('/admin/login');
    }

    return <AdminClient/>;
  } catch (error) {
    // console.error('Error in AdminPage:', error);
    redirect('/admin/login');
  }
}
