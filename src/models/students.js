import mongoose from "mongoose";

// 🔹 CLASS SCHEMA
const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  section: { type: String, default: "A" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

const Class = mongoose.models.Class || mongoose.model("Class", ClassSchema);

// 🔹 STUDENT SCHEMA (Without Education Details)
// ✅ Final Updated Student Schema

const StudentSchema = new mongoose.Schema({
  // 📌 Basic Student Info
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }, // ❌ removed "unique"

  // 📌 Guardian Details
  motherName: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  guardianRelation: { type: String, required: true },

  // 📌 School Info
  rollNumber: { type: String, required: true }, // ❌ removed "unique"
  admissionDate: { type: Date, default: Date.now },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },

  // 📌 Education Details
  educationDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],

  // 📌 Student Status
  status: {
    type: String,
    enum: ["Active", "Inactive", "Alumni"],
    default: "Active",
  },
}, { timestamps: true });

// ✅ COMPOUND INDEX: Same roll number allowed across different classes
StudentSchema.index({ classId: 1, rollNumber: 1 }, { unique: true });

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);



  // 🔹 EDUCATION SCHEMA (Separate)

const EducationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true // ✅ Each student can have only ONE mark entry
  },
  maths: {
    type: Number,
    default: 0,
  },
  hindi: {
    type: Number,
    default: 0,
  },
  science: {
    type: Number,
    default: 0,
  },
  english: {
    type: Number,
    default: 0,
  },
  socialScience: {
    type: Number,
    default: 0,
  },
  physicalEducation: {
    type: Number,
    default: 0,
  },
  grade: {
    type: String,
    default: "N/A",
  },
}, { timestamps: true });

export const Education = mongoose.models.Education || mongoose.model("Education", EducationSchema);

export { Class, Student, Education };
