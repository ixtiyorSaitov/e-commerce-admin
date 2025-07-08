import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    message: { type: String, require: true },
    type: { type: String, enum: ["info", "warning", "success", "error"] },
    recipients: { type: String, enum: ["all", "active", "inactive"] },
    views: Number,  
  },
  { timestamps: true, strict: true }
);

const Notification =
  mongoose.models["Notification"] ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;
