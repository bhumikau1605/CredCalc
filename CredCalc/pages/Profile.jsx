import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    usn: "",
    branch: "",
    semester: "",
    instagram: "",
    linkedin: "",
    github: "",
    photo: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved successfully ✅");
  };

  return (
    <div className="profile-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-photo">
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" />
          ) : (
            <span>No Photo</span>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handlePhotoUpload} />

        <input name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} />
        <input name="usn" placeholder="USN" value={profile.usn} onChange={handleChange} />
        <input name="branch" placeholder="Branch" value={profile.branch} onChange={handleChange} />
        <input name="semester" placeholder="Semester" value={profile.semester} onChange={handleChange} />
          {/* Social */}
        <div className="card-section">
          <h3>Social Profiles</h3>
          <div className="grid">
            <input name="instagram" placeholder="Instagram URL" value={profile.instagram} onChange={handleChange} />
            <input name="linkedin" placeholder="LinkedIn URL" value={profile.linkedin} onChange={handleChange} />
            <input name="github" placeholder="GitHub URL" value={profile.github} onChange={handleChange} />
          </div>
        </div>
        <button className="save-btn" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
