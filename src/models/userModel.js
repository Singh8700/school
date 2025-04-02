import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// ✅ OverwriteModelError fix: Pehle check kar lo model exist karta hai ya nahi
const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default Admin;
