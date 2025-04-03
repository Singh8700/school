import AdminClient from './AdminClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWTTOKEN; // Ensure this is set in your .env file

async function getProducts() {
  try {
    const res = await fetch('/api/login', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function AdminPage() {
  try {
    // 🍪 Get token from cookies
    const cookieStore = cookies();
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

    // ✅ Fetch products after authentication
    const products = await getProducts();
    return <AdminClient initialProducts={products} />;
  } catch (error) {
    // console.error('Error in AdminPage:', error);
    redirect('/admin/login');
  }
}
