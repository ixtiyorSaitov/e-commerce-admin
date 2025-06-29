import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models["Category"] || mongoose.model("Category", CategorySchema);

export default Category;
