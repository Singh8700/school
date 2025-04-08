import connectDB from "@/db/config";
import { Student, Class, Education,Section } from "@/models/students";
import { NextResponse } from "next/server";

// ✅ Connect to MongoDB
await connectDB();

// 📌 [POST] Register a New Student
export async function POST(req) {
  try {
    const data = await req.json();
    const { class: className, section: sectionName, rollNumber } = data;

    // 🔹 1. Check or Create Class
    let classDoc = await Class.findOne({ name: className });
    if (!classDoc) {
      classDoc = await new Class({
        name: className,
        sections: [],
        students: []
      }).save();
    }

    // 🔹 2. Check or Create Section in that Class
    let sectionDoc = await Section.findOne({ name: sectionName, classId: classDoc._id });

    if (!sectionDoc) {
      sectionDoc = await new Section({
        name: sectionName,
        classId: classDoc._id,
        students: []
      }).save();

      // ✅ Update class with section ID
      if (!Array.isArray(classDoc.sections)) {
        classDoc.sections = [];
      }

      if (!classDoc.sections.map(id => id.toString()).includes(sectionDoc._id.toString())) {
        classDoc.sections.push(sectionDoc._id);
        await classDoc.save();
      }
    }

    // 🔹 3. Check Duplicate Roll Number
    const existing = await Student.findOne({
      classId: classDoc._id,
      sectionId: sectionDoc._id,
      rollNumber,
    });

    if (existing) {
      return NextResponse.json({
        error: `Roll number "${rollNumber}" already exists in Class ${className}, Section ${sectionName}.`
      }, { status: 400 });
    }

    // 🔹 4. Create Student
    const newStudent = new Student({
      ...data,
      classId: classDoc._id,
      sectionId: sectionDoc._id,
    });

    const savedStudent = await newStudent.save();

    // 🔹 5. Add student to class & section arrays
    await Class.findByIdAndUpdate(classDoc._id, {
      $addToSet: { students: savedStudent._id }
    });

    await Section.findByIdAndUpdate(sectionDoc._id, {
      $addToSet: { students: savedStudent._id }
    });

    return NextResponse.json({
      message: "✅ Student Registered Successfully!",
      student: savedStudent,
    }, { status: 201 });

  } catch (error) {
    // console.error("❌ Registration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// 📌 [PUT] Update Student Details
export async function PUT(req) {


  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    const { class: className, section: sectionName, rollNumber } = body;

    // 🛑 Validate
    if (!id || !className || !sectionName || !rollNumber) {
      return NextResponse.json({
        error: "Missing required fields: class, section, or rollNumber.",
      }, { status: 400 });
    }

    // 🔍 Log for debugging
    // console.log("🟢 PUT data:", { id, className, sectionName, rollNumber });

    // 🔹 1. Find old student
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // 🔹 2. Get/Create Class
    let classDoc = await Class.findOne({ name: className });
    if (!classDoc) {
      classDoc = await new Class({
        name: className,
        sections: [],
        students: []
      }).save();
    }

    // 🔹 3. Get/Create Section
    let sectionDoc = await Section.findOne({ name: sectionName, classId: classDoc._id });
    if (!sectionDoc) {
      sectionDoc = await new Section({
        name: sectionName,
        classId: classDoc._id,
        students: []
      }).save();

      if (!Array.isArray(classDoc.sections)) {
        classDoc.sections = [];
      }

      if (!classDoc.sections.map(id => id.toString()).includes(sectionDoc._id.toString())) {
        classDoc.sections.push(sectionDoc._id);
        await classDoc.save();
      }
    }

    // 🔹 4. Check for duplicate roll number (excluding current student)
    const existingRoll = await Student.findOne({
      _id: { $ne: id },
      classId: classDoc._id,
      sectionId: sectionDoc._id,
      rollNumber
    });

    if (existingRoll) {
      return NextResponse.json({
        error: `Roll number "${rollNumber}" already exists in Class ${className}, Section ${sectionName}.`
      }, { status: 400 });
    }

    const oldClassId = existingStudent.classId?.toString();
    const oldSectionId = existingStudent.sectionId?.toString();

    // 🔄 5. Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        ...body,
        classId: classDoc._id,
        sectionId: sectionDoc._id
      },
      { new: true }
    );

    // 🔁 6. Remove from old class/section
    if (oldClassId && oldClassId !== classDoc._id.toString()) {
      await Class.findByIdAndUpdate(oldClassId, { $pull: { students: id } });
    }

    if (oldSectionId && oldSectionId !== sectionDoc._id.toString()) {
      await Section.findByIdAndUpdate(oldSectionId, { $pull: { students: id } });
    }

    // 🔁 7. Add to new class/section
    await Class.findByIdAndUpdate(classDoc._id, { $addToSet: { students: id } });
    await Section.findByIdAndUpdate(sectionDoc._id, { $addToSet: { students: id } });

    return NextResponse.json(updatedStudent);

  } catch (error) {
    // console.error("❌ Update error:", error);
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

    if (!studentId) {
      return NextResponse.json({ error: "Student ID missing" }, { status: 400 });
    }

    // 🔹 1. Delete Student from Student Collection
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return NextResponse.json({ error: "Student Not Found" }, { status: 404 });
    }

    // 🔹 2. Remove Student ID from Class's students array
    await Class.findByIdAndUpdate(deletedStudent.classId, {
      $pull: { students: deletedStudent._id },
    });

    // 🔹 3. Delete all Education (marks) entries related to the student
    await Education.deleteMany({ studentId: deletedStudent._id });

    return NextResponse.json(
      { message: "Student Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




