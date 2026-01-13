import { useState, useEffect } from "react";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./UploadTemplate.css";

export default function UploadTemplate({ title, storageFolder, category }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const q = query(
        collection(db, "certificates"),
        where("uid", "==", user.uid),
        where("category", "==", category)
      );

      const snap = await getDocs(q);
      setList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    load();
  }, [category, user]);

  const handleUpload = () => {
    if (!file) return alert("Select a file!");

    const path = `${storageFolder}/${user.uid}/${Date.now()}_${file.name}`;
    const fileRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (s) => {
        setProgress((s.bytesTransferred / s.totalBytes) * 100);
      },
      () => alert("Upload failed"),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(db, "certificates"), {
          uid: user.uid,
          fileName: file.name,
          fileUrl: url,
          category,
          storagePath: path,
          uploadedAt: serverTimestamp(),
        });

        alert("Uploaded Successfully!");
        setFile(null);
        setProgress(0);
        window.location.reload();
      }
    );
  };

  return (
    <div className="upload-page">
      <div className="upload-card">

        {/* ✅ SAFE BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>{title}</h2>

        <input
          type="file"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {progress > 0 && (
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress-text">
              Uploading: {progress.toFixed(0)}%
            </p>
          </div>
        )}

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>

        <h3>Your Uploaded Files</h3>

        {list.length === 0 ? (
          <p>No uploads yet.</p>
        ) : (
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <a href={item.fileUrl} target="_blank" rel="noreferrer">
                  📄 {item.fileName}
                </a>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}
