import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import Admin from "@/models/userModel";
import jwt from "jsonwebtoken";
// import { redirect } from "next/navigation";
import applyCors  from '@/app/lib/cors';

export async function POST(req) {
    
    try {
        await applyCors(req)
        await connectDB(); // ✅ Ensure DB Connection
        const body = await req.json(); // ✅ Parse Request Body
        const { email, password } = body;

        console.log("Received:", email, password);

        if (!email || !password) {
            return NextResponse.json({ message: "Invalid user" }, { status: 400 });
        }

        console.log("Checking user in DB...");
        const userData = await Admin.findOne({ email }); // ✅ Correct Query Syntax

        if (!userData) {
           return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        console.log("User found:", userData);

        // ✅ Generate JWT Token
        const token = jwt.sign({ email }, process.env.JWTTOKEN , { expiresIn: "1h" });

        if (!token) {
            return NextResponse.json({ message: "Token generation failed" }, { status: 500 });
        }

        console.log("JWT Token Generated:", token);

        // ✅ Send Response with Cookie
        const response = NextResponse.json({ message: "User authenticated" }, { status: 200 });
        response.headers.set(
            "Set-Cookie",
            `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
        );

        return response;
    } catch (error) {
        console.error("Error in login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
