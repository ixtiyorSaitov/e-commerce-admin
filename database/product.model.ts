import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    oldPrice: Number,
    isOriginal: Boolean,
    slug: { type: String, required: true, unique: true },
    images: [String],
    categories: [String],
    benefits: [String],
    favourites: Number,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
