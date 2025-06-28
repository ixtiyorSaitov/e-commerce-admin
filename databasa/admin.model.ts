import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    phone: String,
  },
  { timestamps: true, strict: true }
);

const Admin = mongoose.models["Admin"] || mongoose.model("Admin", AdminSchema);

export default Admin;
