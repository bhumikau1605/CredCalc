// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
  activityPoints: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);
