import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    category: String,
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
