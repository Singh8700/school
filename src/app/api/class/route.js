import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import { Class } from "@/models/class"; // Make sure it's not "@/models/students"

// 🔹 GET: Fetch All Classes
export async function GET() {
  try {
    await connectDB();
    const classes = await Class.find({});
    return NextResponse.json(classes);
  } catch (error) {
    console.error("❌ GET error:", error);
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}

// 🔹 POST: Add New Class
export async function POST(req) {
  try {
    await connectDB();
    const { name, section } = await req.json();
    const newClass = new Class({ name, section });
    await newClass.save();
    return NextResponse.json({ message: "Class created successfully", newClass });
  } catch (error) {
    console.error("❌ POST error:", error);
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 });
  }
}

// 🔹 PUT: Update Class Details
export async function PUT(req) {
  try {
    await connectDB();
    const { classId, name, section } = await req.json();
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, section },
      { new: true }
    );
    return NextResponse.json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    console.error("❌ PUT error:", error);
    return NextResponse.json({ error: "Failed to update class" }, { status: 500 });
  }
}

// 🔹 DELETE: Delete a Class
export async function DELETE(req) {
  try {
    await connectDB();
    const { classId } = await req.json();
    await Class.findByIdAndDelete(classId);
    return NextResponse.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete class" }, { status: 500 });
  }
}
