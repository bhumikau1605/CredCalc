import React, { useState, useEffect } from "react";
import { storage, db, auth } from "../firebase";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//import "./UploadCoCurricularCertificates.css";

export default function UploadCoCurricularCertificates() {
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return unsub;
    }, []);

    const handleUpload = () => {
        if (!file) return alert("Please select a file!");
        if (!user) return alert("Please login again.");

        const path = `certificates/cocurricular/${user.uid}/${Date.now()}_${file.name}`;
        const fileRef = ref(storage, path);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            "state_changed",
            (s) => setProgress((s.bytesTransferred / s.totalBytes) * 100),
            (err) => alert("Upload failed"),
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);

                await addDoc(collection(db, "certificates"), {
                    uid: user.uid,
                    category: "cocurricular",   // ✔ FIXED
                    fileName: file.name,
                    fileUrl: url,               // ✔ FIXED
                    storagePath: path,
                    uploadedAt: serverTimestamp(),
                });

                alert("Uploaded Successfully!");
                navigate("/dashboard");
            }
        );
    };

    return (
        <div className="upload-page">
            <div className="upload-card">
                <button className="back-btn" onClick={() => navigate("/upload")}>
                    ← Categories
                </button>

                <h2>Upload Co-Curricular Certificates</h2>

                <input type="file" className="file-input" onChange={(e) => setFile(e.target.files[0])} />

                {progress > 0 && <p>Uploading: {progress.toFixed(0)}%</p>}

                <button className="upload-btn" onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}
