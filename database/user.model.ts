import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImage: { type: String },
    phone: String,
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    favourited: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    totalSpent: [Number],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    notifications: [
      {
        notification: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Notification",
        },
        isViewed: Boolean,
      },
    ],
  },
  { timestamps: true, strict: true }
);

const User = mongoose.models["User"] || mongoose.model("User", UserSchema);

export default User;
