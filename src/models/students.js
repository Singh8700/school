import mongoose from "mongoose";

// 🔹 CLASS SCHEMA
const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section", default: [] }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student", default: [] }]  
});

const Class = mongoose.models.Class || mongoose.model("Class", ClassSchema);

// 🔹 SECTION SCHEMA
const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "A", "B", etc.
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

SectionSchema.index({ classId: 1, name: 1 }, { unique: true }); // class ke andar section name unique ho

const Section = mongoose.models.Section || mongoose.model("Section", SectionSchema);

// 🔹 STUDENT SCHEMA
const StudentSchema = new mongoose.Schema({
  // 📌 Basic Student Info
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },

  // 📌 Guardian Details
  motherName: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianPhone: { type: String, required: true },
  guardianRelation: { type: String, required: true },

  // 📌 School Info
  rollNumber: { type: String, required: true },
  admissionDate: { type: Date, default: Date.now },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },

  // 📌 Relations
  educationDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],

  // 📌 Status
  status: {
    type: String,
    enum: ["Active", "Inactive", "Alumni"],
    default: "Active",
  },
}, { timestamps: true });

// ✅ Compound Index to prevent same roll number in same class+section
StudentSchema.index({ classId: 1, sectionId: 1, rollNumber: 1 }, { unique: true });

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

// 🔹 EDUCATION SCHEMA
const EducationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true
  },
  maths: { type: Number, default: 0 },
  hindi: { type: Number, default: 0 },
  science: { type: Number, default: 0 },
  english: { type: Number, default: 0 },
  socialScience: { type: Number, default: 0 },
  physicalEducation: { type: Number, default: 0 },
  grade: { type: String, default: "N/A" },
}, { timestamps: true });

const Education = mongoose.models.Education || mongoose.model("Education", EducationSchema);

// 🔹 Exporting all models
export { Class, Section, Student, Education };
