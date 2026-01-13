// src/pages/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [branch, setBranch] = useState("");
  const [usn, setUsn] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing data
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    setDisplayName(user.displayName || "");

    const load = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setBranch(data.branch || "");
        setUsn(data.usn || "");
      }
    };

    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login again.");

    try {
      setLoading(true);

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: displayName.trim(),
      });

      // Store extra info in Firestore
      const ref = doc(db, "users", user.uid);
      await setDoc(
        ref,
        {
          branch: branch.trim(),
          usn: usn.trim(),
        },
        { merge: true }
      );

      alert("Profile updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <button
          className="edit-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h2>Edit Profile</h2>

        <form onSubmit={handleSave} className="edit-form">
          <label>
            Name
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label>
            Branch
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="E.g. CSE, ECE..."
            />
          </label>

          <label>
            USN / Roll No.
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              placeholder="Your USN"
            />
          </label>

          <button type="submit" className="edit-save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
