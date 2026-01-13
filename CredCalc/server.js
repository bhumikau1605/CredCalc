import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // 👈 MUST MATCH FILE
import certificateRoutes from "./routes/certificates.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/certificates", certificateRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
