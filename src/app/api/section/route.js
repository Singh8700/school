export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import { Class, Section, Student } from "@/models/students";

await connectDB();

// 🔹 GET: Fetch all classes (unchanged)
export async function GET() {
  try {
    const classes = await Class.find({});
    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}

// 🔹 POST: Add new class (unchanged)
export async function POST(req) {
  try {
    const { name, section } = await req.json();
    const newClass = new Class({ name, section });
    await newClass.save();
    return NextResponse.json({ message: "Class created successfully", newClass });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 });
  }
}

// 🔹 PUT: Update class (unchanged)
export async function PUT(req) {
  try {
    const { classId, name, section } = await req.json();
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, section },
      { new: true }
    );
    return NextResponse.json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update class" }, { status: 500 });
  }
}

// 🔹 DELETE: Delete class + its related sections and students (✅ updated)
export async function DELETE(req) {
  try {
    const sectionId = req.nextUrl.searchParams.get("id");
    console.log("Received Section ID:", sectionId);

    if (!sectionId) {
      return NextResponse.json({ error: "Section ID is required" }, { status: 400 });
    }

    // Optionally: Delete related students if needed
    await Student.deleteMany({ section: sectionId });

    // Delete the section itself
    await Section.findByIdAndDelete(sectionId);

    return NextResponse.json({ message: "Section and its students deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete section" }, { status: 500 });
  }
}


