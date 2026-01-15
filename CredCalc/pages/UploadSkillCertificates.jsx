import { useState } from "react";
import axios from "axios";
//import "../styles/Upload.css";
export default function UploadSkillCertificates() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Skill");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleCloudinaryUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UNSIGNED_PRESET");

    const isPdf = file.type === "application/pdf";
    const endpoint = isPdf
      ? "https://api.cloudinary.com/v1_1/dmcdkqsmj/raw/upload"
      : "https://api.cloudinary.com/v1_1/dmcdkqsmj/image/upload";

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFileUrl(data.secure_url);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    alert("Cloud upload failed");
  } finally {
    setUploading(false);
  }
};


  const handleSaveCertificate = async () => {
    const userId = localStorage.getItem("uid");

    if (!title || !fileUrl || !userId) {
      alert("Missing title / file / user");
      return;
    }

    try {
      await axios.post("http://localhost:5000/certificates/upload", {
        userId,
        title,
        category,
        fileData: fileUrl, // backend saves as fileUrl
      });

      alert("Uploaded successfully ✅");
      setTitle("");
      setFileUrl("");
    } catch (err) {
      console.error(
        "UPLOAD ERROR (frontend):",
        err.response?.status,
        err.response?.data || err
      );
      alert("Error: Check Console");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload Certificate</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Skill">Skill</option>
        <option value="Academic">Academic</option>
      </select>

      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={handleCloudinaryUpload}
      />

      <button onClick={handleSaveCertificate} disabled={uploading}>
        {uploading ? "Uploading to Cloud..." : "Save Certificate"}
      </button>
    </div>
  );
}
