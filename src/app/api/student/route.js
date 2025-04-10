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


// 📌 [PUT] Update an Existing Student

export async function PUT(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Student ID is required." }, { status: 400 });
    }

    const incomingData = await req.json();

    // 🔍 Find student first
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    // 🧠 Merge existing + new data (fallback to old values)
    const mergedData = {
      name: incomingData.name || student.name,
      motherName: incomingData.motherName || student.motherName,
      dob: incomingData.dob || student.dob,
      gender: incomingData.gender || student.gender,
      address: incomingData.address || student.address,
      phone: incomingData.phone || student.phone,
      email: incomingData.email || student.email,
      guardianName: incomingData.guardianName || student.guardianName,
      guardianPhone: incomingData.guardianPhone || student.guardianPhone,
      guardianRelation: incomingData.guardianRelation || student.guardianRelation,
      rollNumber: incomingData.rollNumber || student.rollNumber,
      class: incomingData.class || student.class,
      section: incomingData.section || student.section,
    };

    // 🔎 Check or create class
    let classDoc = await Class.findOne({ name: mergedData.class });
    if (!classDoc) {
      classDoc = await new Class({ name: mergedData.class, sections: [], students: [] }).save();
    }

    // 🔎 Check or create section
    let sectionDoc = await Section.findOne({ name: mergedData.section, classId: classDoc._id });
    if (!sectionDoc) {
      sectionDoc = await new Section({
        name: mergedData.section,
        classId: classDoc._id,
        students: [],
      }).save();

      if (!classDoc.sections.includes(sectionDoc._id)) {
        classDoc.sections.push(sectionDoc._id);
        await classDoc.save();
      }
    }

    // 🚫 Check for duplicate roll number in same class-section (excluding self)
    const duplicate = await Student.findOne({
      _id: { $ne: id },
      rollNumber: mergedData.rollNumber,
      classId: classDoc._id,
      sectionId: sectionDoc._id,
    });

    if (duplicate) {
      return NextResponse.json({
        error: `Roll number "${mergedData.rollNumber}" already exists in Class ${mergedData.class}, Section ${mergedData.section}.`,
      }, { status: 400 });
    }

    const oldClassId = student.classId?.toString();
    const oldSectionId = student.sectionId?.toString();

    // ✏️ Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        ...mergedData,
        classId: classDoc._id,
        sectionId: sectionDoc._id,
      },
      { new: true }
    );

    // 🔁 Remove from old class/section if changed
    if (oldClassId && oldClassId !== classDoc._id.toString()) {
      await Class.findByIdAndUpdate(oldClassId, { $pull: { students: id } });
    }

    if (oldSectionId && oldSectionId !== sectionDoc._id.toString()) {
      await Section.findByIdAndUpdate(oldSectionId, { $pull: { students: id } });
    }

    // ➕ Add to new class/section
    await Class.findByIdAndUpdate(classDoc._id, {
      $addToSet: { students: id },
    });

    await Section.findByIdAndUpdate(sectionDoc._id, {
      $addToSet: { students: id },
    });

    return NextResponse.json({
      message: "✅ Student updated successfully.",
      student: updatedStudent,
    });

  } catch (error) {
    console.error("❌ Update error:", error);
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




