import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    slug: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models["Category"] || mongoose.model("Category", CategorySchema);

export default Category;
