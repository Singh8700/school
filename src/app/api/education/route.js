import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import { Education } from "@/models/students";

// ✅ Connect DB First
await connectDB();

function calculateGrade(marks) {
  const {
    maths = 0,
    hindi = 0,
    science = 0,
    english = 0,
    socialScience = 0,
    physicalEducation = 0,
  } = marks;

  const total = maths + hindi + science + english + socialScience + physicalEducation;
  const percentage = total / 6;

  let grade = "N/A";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 75) grade = "A";
  else if (percentage >= 60) grade = "B";
  else if (percentage >= 45) grade = "C";
  else if (percentage >= 33) grade = "D";
  else grade = "F";

  return { percentage, grade };
}

// ✅ [CREATE] POST /api/marks
export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, maths, hindi, science, english, socialScience, physicalEducation } = body;

    if (!studentId) {
      return NextResponse.json({ message: "studentId is required" }, { status: 400 });
    }

    const existing = await Education.findOne({ studentId });
    if (existing) {
      return NextResponse.json({ message: "Marks already exist for this student." }, { status: 400 });
    }

    const { grade } = calculateGrade({
      maths, hindi, science, english, socialScience, physicalEducation
    });

    const newMarks = new Education({
      studentId,
      maths,
      hindi,
      science,
      english,
      socialScience,
      physicalEducation,
      grade,
    });

    await newMarks.save();

    return NextResponse.json({ message: "Marks created", data: newMarks }, { status: 201 });

  } catch (err) {
    console.error("Error in POST /marks:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ [VIEW] GET /api/marks?studentId=...
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json({ message: "studentId is required" }, { status: 400 });
    }

    const marks = await Education.findOne({ studentId }).populate("studentId");

    if (!marks) {
      return NextResponse.json({ message: "No marks found for this student." }, { status: 404 });
    }

    return NextResponse.json({ data: marks }, { status: 200 });

  } catch (err) {
    console.error("Error in GET /marks:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ [UPDATE] PUT /api/marks
export async function PUT(req) {
  try {
    const body = await req.json();
    const { studentId, maths, hindi, science, english, socialScience, physicalEducation } = body;

    if (!studentId) {
      return NextResponse.json({ message: "studentId is required" }, { status: 400 });
    }

    const existing = await Education.findOne({ studentId });

    if (!existing) {
      return NextResponse.json({ message: "Marks not found for this student" }, { status: 404 });
    }

    const { grade } = calculateGrade({
      maths, hindi, science, english, socialScience, physicalEducation
    });

    const updated = await Education.findOneAndUpdate(
      { studentId },
      {
        maths,
        hindi,
        science,
        english,
        socialScience,
        physicalEducation,
        grade,
      },
      { new: true }
    );

    return NextResponse.json({ message: "Marks updated", data: updated }, { status: 200 });

  } catch (err) {
    console.error("Error in PUT /marks:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
