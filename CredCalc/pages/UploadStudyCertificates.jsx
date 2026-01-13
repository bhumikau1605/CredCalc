import { useState } from "react";
//import Tesseract from "tesseract.js";

export default function UploadStudyCertificates() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const runOCR = () => {
    if (!image) return alert("Please upload an image");

    setLoading(true);

    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch(() => {
        alert("OCR failed");
        setLoading(false);
      });
  };
  const cgpa = extractCGPA(text);
if (cgpa) {
  localStorage.setItem("cgpa", cgpa);
}

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Marks Card</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={runOCR} disabled={loading}>
        {loading ? "Scanning..." : "Scan using OCR"}
      </button>

      {text && (
        <>
          <h3>Extracted Text</h3>
          <textarea
            value={text}
            readOnly
            rows={12}
            style={{ width: "100%" }}
          />
        </>
      )}
      <button onClick={() => {
  localStorage.setItem("ocrText", text);
  alert("Data saved");
}}>
  Confirm & Save
</button>

    </div>
  );
}
