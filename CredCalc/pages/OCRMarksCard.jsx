import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import "../styles/Upload.css";

// ✅ PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

export default function OCRMarksCard() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState("");
  const [parsed, setParsed] = useState(null);

  // -------------------------
  // File upload
  // -------------------------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOcrText("");
    setParsed(null);
  };

  // -------------------------
  // MAIN OCR FUNCTION
  // -------------------------
  const runOCR = async () => {
    if (!file) {
      alert("Upload a marks card PDF");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Read PDF
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      // 2️⃣ Render FIRST PAGE only
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
        const subjects = extractSubjects(ocrText);

localStorage.setItem(
  "ocrSubjects",
  JSON.stringify(subjects)
);

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      // 3️⃣ Convert to image
      const image = canvas.toDataURL("image/png");

      // 4️⃣ OCR
      const result = await Tesseract.recognize(image, "eng");
      const text = cleanText(result.data.text);
        preprocessImage(canvas);

Tesseract.recognize(canvas, "eng", {
  tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:",
});

      setOcrText(text);
      parseMarksCard(text);
    } catch (err) {
      console.error(err);
      alert("OCR failed. This is a scanned PDF – retrying may help.");
    } finally {
      setLoading(false);
    }
  };
  const preprocessImage = (canvas) => {
  const ctx = canvas.getContext("2d");
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imgData.data.length; i += 4) {
    const avg =
      (imgData.data[i] +
        imgData.data[i + 1] +
        imgData.data[i + 2]) / 3;

    imgData.data[i] = avg;
    imgData.data[i + 1] = avg;
    imgData.data[i + 2] = avg;
  }

  ctx.putImageData(imgData, 0, 0);
};

  // -------------------------
  // Clean OCR noise
  // -------------------------
  const cleanText = (t) =>
    t.replace(/[^a-zA-Z0-9:/.\-\s]/g, " ").replace(/\s+/g, " ").trim();

  // -------------------------
  // Extract SAFE fields
  // -------------------------
  const parseMarksCard = (text) => {
  const upper = text.toUpperCase();

  const name =
    upper.match(/NAME\s*[:\-]?\s*([A-Z\s]{5,})/) ||
    upper.match(/BHUMIKA[A-Z\s]*/);

  const reg =
    upper.match(/REG\s*\.?\s*NO\s*[:\-]?\s*(\d{8,12})/) ||
    upper.match(/\b\d{10}\b/);

  const total =
    upper.match(/TOTAL\s+OBTAINED\s+MARKS\s*(\d{3})/) ||
    upper.match(/\b[4-6]\d{2}\b/);

  const result =
    upper.match(/DISTINCTION|FIRST\s+CLASS|PASS|FAIL/);

  setParsed({
    name: name ? name[0].replace("NAME", "").trim() : "",
    regNo: reg ? reg[1] || reg[0] : "",
    total: total ? total[1] || total[0] : "",
    result: result ? result[0] : "",
  });
};
const extractSubjects = (text) => {
  const upper = text.toUpperCase();

  const subjects = [];

  const subjectPatterns = [
    { name: "KANNADA", regex: /KANNADA\s+(\d{2,3})/ },
    { name: "ENGLISH", regex: /ENGLISH\s+(\d{2,3})/ },
    { name: "PHYSICS", regex: /PHYSICS\s+(\d{2,3})/ },
    { name: "CHEMISTRY", regex: /CHEMISTRY\s+(\d{2,3})/ },
    { name: "MATHEMATICS", regex: /MATHEMATICS\s+(\d{2,3})/ },
    { name: "BIOLOGY", regex: /BIOLOGY\s+(\d{2,3})/ },
  ];

  subjectPatterns.forEach((sub) => {
    const match = upper.match(sub.regex);
    if (match) {
      subjects.push({
        subject: sub.name,
        marks: Number(match[1]),
        credits: 4, // default (can be changed)
      });
    }
  });

  return subjects;
};


  // -------------------------
  // Save confirmation
  // -------------------------
  const confirmSave = () => {
    localStorage.setItem("marksCardOCR", JSON.stringify(parsed));
    alert("Marks card saved successfully ✅");
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h2>Scan Marks Card (PDF OCR)</h2>

        <input type="file" accept="application/pdf" onChange={handleFileChange} />

        <button className="upload-btn" onClick={runOCR} disabled={loading}>
          {loading ? "Scanning..." : "Scan Marks Card"}
        </button>

        {ocrText && (
          <>
            <h3>Extracted Text</h3>
            <textarea rows="6" value={ocrText} readOnly />
          </>
        )}

        {parsed && (
          <>
            <h3>Detected Details</h3>
            <div className="ocr-confirm-box">
              <p><b>Name:</b> {parsed.name || "Not detected"}</p>
              <p><b>Register No:</b> {parsed.regNo || "Not detected"}</p>
              <p><b>Total Marks:</b> {parsed.total || "Not detected"}</p>
              <p><b>Result:</b> {parsed.result || "Not detected"}</p>
            </div>

            <button className="upload-btn" onClick={confirmSave}>
              Confirm & Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}
