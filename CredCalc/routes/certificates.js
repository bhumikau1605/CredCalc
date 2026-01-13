import express from "express";
import multer from "multer";
import Certificate from "../models/Certificate.js";

const router = express.Router();

// Use memory storage (simpler & safer for now)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 GET certificates by user
router.get("/:userId", async (req, res) => {
  try {
    const certs = await Certificate.find({ userId: req.params.userId });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPLOAD certificate (PDF / image)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, category, userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const cert = new Certificate({
      title,
      category,
      userId,
      fileUrl: base64File, // stored directly (OK for demo)
    });

    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

// 🔹 DELETE certificate
router.delete("/:id", async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
