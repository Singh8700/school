import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/db/config';
import Admin from '@/models/userModel';
import  applyCors  from '@/app/lib/cors';

export async function POST(req) {
  
  try {
    await applyCors(req);
    await connectDB();
    const { email, password } = await req.json();

    console.log("Received Data:", { email, password });

    // Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Admin({ email, password: hashedPassword });
    await newUser.save();

    console.log("New User Created:", newUser);

    const response = await NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 },{ok:"true"});
    console.log("Response Sent:", response);
    return response;

  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
