import { useState } from "react";
import axios from "axios";

export default function UploadCertificates() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Skill");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const userId = localStorage.getItem("uid");

    if (!title || !file || !userId) {
      alert("Missing title / file / user");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("userId", userId);
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:5000/certificates/upload",
        formData
      );

      alert("Uploaded successfully ✅");
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
      alert("Upload failed — check backend console");
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

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="Skill">Skill</option>
        <option value="Academic">Academic</option>
      </select>

      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
