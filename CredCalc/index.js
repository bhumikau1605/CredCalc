const express = require("express");
const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");


app.use(cors());
app.use(express.json());
// Increase the limit to 50mb to handle image/pdf strings

mongoose.connect(
  "mongodb+srv://BhumikaU:bhoom@credcalc.dlqnd5s.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"));
const ProfileSchema = new mongoose.Schema({
  uid: String,
  name: String,
  usn: String,
  branch: String,
  semester: String,
  instagram: String,
  linkedin: String,
  sgpa: String,
  cgpa: String,
  points: String,
  photo: String
});
const Profile = mongoose.model("Profile", ProfileSchema);
const upload = multer({ dest: "uploads/" });
app.get("/profile/:uid", async (req, res) => {
  const profile = await Profile.findOne({ uid: req.params.uid });
  res.json(profile || {});
});
app.post("/profile", upload.single("photo"), async (req, res) => {
  const data = req.body;
  if (req.file) data.photo = req.file.filename;
  await Profile.findOneAndUpdate(
    { uid: data.uid },
    data,
    { upsert: true }
  );
  res.json({ success: true });
});
app.delete('/certificates/:id', async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});
app.listen(5000, () => console.log("Server running on 5000"));
// Add this route to handle certificate deletion
// Add this to your backend index.js
app.delete('/certificates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // This assumes your Mongoose model is named Certificate
    const result = await Certificate.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).send({ message: "Certificate not found" });
    }
    
    res.status(200).send({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error during deletion" });
  }
});