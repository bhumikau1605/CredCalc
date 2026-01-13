import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Upload.css";

export default function UploadCertificates() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Skill");
  const [issuedBy, setIssuedBy] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- CONFIGURATION ---
  const CLOUD_NAME = "dmcdkqsmj"; 
  const UPLOAD_PRESET = "pdfviewer"; // <-- PASTE YOUR PRESET NAME HERE

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setLoading(true);

    try {
      // 1. Upload the actual file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      // This is the short URL (e.g., https://res.cloudinary.com/...)
      const secureUrl = cloudRes.data.secure_url;

      // 2. Send the URL and details to your Node.js Backend
      const certificateData = {
        userId: localStorage.getItem("uid"),
        title,
        category,
        issuedBy,
        fileData: secureUrl, // Storing only the LINK in your database
        fileType: file.type
      };

      const response = await axios.post("http://localhost:5000/certificates/upload", certificateData);
      
      if (response.status === 201) {
        alert("Certificate successfully saved! ✅");
        navigate("/my-certificates");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Error: " + (error.response?.data?.error?.message || "Check Console"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
      <form className="upload-card" onSubmit={handleUpload}>
        <h2>Upload Certificate</h2>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Skill">Skill</option>
          <option value="Academic">Academic</option>
          <option value="Workshop">Workshop</option>
        </select>
        <input placeholder="Issued By" value={issuedBy} onChange={(e) => setIssuedBy(e.target.value)} required />
        <input type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
        
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Uploading to Cloud..." : "Upload Certificate"}
        </button>
      </form>
    </div>
  );
}