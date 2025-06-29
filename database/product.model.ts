import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    isOriginal: Boolean,
    slug: { type: String, required: true, unique: true },
    images: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    benefits: [String],
    favourites: Number,
  },
  { timestamps: true }
);
ProductSchema.index(
  { "categories.name": 1 },
  {
    unique: true,
    partialFilterExpression: { "categories.name": { $exists: true } },
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
