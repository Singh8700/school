import connectDB from "@/db/config";
import { Student, Class } from "@/models/students";
import { NextResponse } from "next/server";

// ✅ Connect to MongoDB
connectDB();

// 📌 [POST] Register a New Student
export async function POST(req) {
  try {
    const data = await req.json();

    // console.log("student data", data);

    // 🔹 1. Check if class exists (by name)
    let classDoc = await Class.findOne({ name: data.class });

    // 🔹 2. If class doesn't exist, create it
    if (!classDoc) {
      classDoc = new Class({ name: data.class, students: [] });
      await classDoc.save();
    }

    // 🔹 3. Check for duplicate rollNumber in this class
    const existingRoll = await Student.findOne({
      classId: classDoc._id,
      rollNumber: data.rollNumber,
    });

    if (existingRoll) {
      return NextResponse.json(
        { error: `Roll number "${data.rollNumber}" already exists in this class.` },
        { status: 400 }
      );
    }

    // 🔹 4. Create new student and assign class ID
    const newStudent = new Student({
      ...data,
      classId: classDoc._id,
    });

    const savedStudent = await newStudent.save();

    // 🔹 5. Add student to class's students array
    await Class.findByIdAndUpdate(classDoc._id, {
      $push: { students: savedStudent._id },
    });

    return NextResponse.json(
      { message: "Student Registered Successfully!", student: savedStudent },
      { status: 201 }
    );
  } catch (error) {
    // console.error("POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 📌 [GET] Fetch Students (All or Single Based on Query)
// Example: /api/student.js or route handler
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");

  const students = await Student.find({ classId }); // Filter by class
  return Response.json(students);
}

// 📌 [PATCH] Update Student Details
export async function PATCH(req) {
  try {
    const { id, updateData } = await req.json();
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedStudent) {
      return NextResponse.json({ error: "Student Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Student Updated", student: updatedStudent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 📌 [DELETE] Remove Student
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return NextResponse.json({ error: "Student Not Found" }, { status: 404 });
    }

    // 🔹 Remove Student from Class Schema
    await Class.findByIdAndUpdate(deletedStudent.classId, {
      $pull: { students: deletedStudent._id },
    });

    return NextResponse.json(
      { message: "Student Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
