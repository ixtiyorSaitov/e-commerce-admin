import mongoose from "mongoose";

const PromocodeSchema = new mongoose.Schema(
  {
    key: { type: String, require: true },
    description: { type: String, require: true },
    minOrder: Number,
    type: { type: String, enum: ["percentage", "fixAmount"] },
    maxUsers: Number,
    expiresAt: Date,
    usage: { type: Number, default: 0 },
    isExpired: Boolean,
  },
  { timestamps: true, strict: true }
);

const Promocode =
  mongoose.models["Promocode"] || mongoose.model("Promocode", PromocodeSchema);

export default Promocode;
