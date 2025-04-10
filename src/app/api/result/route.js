import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import {Student,Education,Class,Section } from "@/models/students";

await connectDB
// POST: Get student + result by roll number, class name, section name
export async function POST(req) {
    try {
      
  
      const { rollNumber, className, sectionName } = await req.json();
  
      // Find the class
      console.log("class anme is",className)
      const cls = await Class.findOne({ name: className });
      if (!cls) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
      }
      console.log("class id",cls._id)
      // Find the section
      console.log("class section name",sectionName)
      const section = await Section.findOne({ name: sectionName, classId: cls._id });
      if (!section) {
        return NextResponse.json({ error: "Section not found" }, { status: 404 });
      }
  
      // Find student by roll number within the found class & section
      console.log("student roll number",rollNumber)
      const student = await Student.findOne({
        rollNumber,
        classId: cls._id,
        sectionId: section._id,
      })
        .populate("classId")
        .populate("sectionId");
  
        console.log("full details",student)
      if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }

  
      // Fetch education details
      const education = await Education.findOne({ studentId: student._id });
  
      if (!education) {
        return NextResponse.json({
          message: "Student found but result not declared",
          student,
          education: null,
        });
      }
  
      return NextResponse.json({
        message: "Result fetched successfully",
        student,
        education,
      });
    } catch (error) {
      console.error("API ERROR:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
