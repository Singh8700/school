// 📁 pages/api/section.js

import connectDB from "@/db/config"; // ✅ dbConnect ka path sahi hona chahiye
import { Section } from "@/models/students"; // ✅ Section model yahan import hona chahiye

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { classId } = req.query;

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }

    try {
      const sections = await Section.find({ classId });
      return res.status(200).json(sections);
    } catch (err) {
      console.error("Error fetching sections:", err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
