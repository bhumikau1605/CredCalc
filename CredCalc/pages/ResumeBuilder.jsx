import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResumeBuilder.css";
import html2pdf from "html2pdf.js";
/* ============================
   IT RESUME TEMPLATE
============================ */
function ITResume({ data }) {
  return (
    <div className="resume it-resume">
      <h1>{data.name || "Your Name"}</h1>
      <h3>{data.role}</h3>
      {/*IMAGE*/}
      {data.photo && (
        <img
        src={data.photo}
        className="it-photo"
        alt="profile"
        />
      )} 
      <div className="resume-section">
        <h2>Summary</h2>
        <p>{data.summary}</p>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <p>{data.education}</p>
      </div>

      <div className="resume-section">
        <h2>Experience</h2>
        <p>{data.experience}</p>
      </div>

      <div className="resume-section">
        <h2>Skills / Certifications</h2>
        <p>{data.certifications}</p>
      </div>
    </div>
  );
}

/* ============================
   NON-IT RESUME TEMPLATE
============================ */
function NonITResume({ data }) {
  return (
    <div className="resume nonit-resume">
      <div className="nonit-header">
        <h1>{data.name || "Your Name"}</h1>
        <p>{data.role}</p>
        <small>
          {data.email} | {data.phone} | {data.location}
        </small>
      </div>
      {/*IMAGE*/}
      {data.photo && (
        <img
        src={data.photo}
        className="nonit-photo"
        alt="profile"
        />
      )} 
      <section>
        <h2>Career Objective</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>{data.education}</p>
      </section>

      <section>
        <h2>Work Experience</h2>
        <p>{data.experience}</p>
      </section>

      <section>
        <h2>Skills & Certifications</h2>
        <p>{data.certifications}</p>
      </section>
    </div>
  );
}

/* ============================
   CREATIVE RESUME TEMPLATE ✅ FIXED
============================ */
function CreativeTemplate({ data }) {
  return (
    <div className="creative-resume">
      {/* LEFT PANEL */}
      <div className="creative-left">
        <div className="creative-photo">
          {data.photo && <img src={data.photo} alt="Profile" />}
        </div>

        <h3>CONTACT</h3>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.location}</p>
        <p>{data.linkedin}</p>

        <h3>EDUCATION</h3>
        <p>{data.education}</p>

        <h3>CERTIFICATIONS</h3>
        <p>{data.certifications}</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="creative-right">
        <h1 className="creative-name">{data.name}</h1>
        <p className="creative-role">{data.role}</p>

        <section className="creative-section">
          <h2>ABOUT ME</h2>
          <p>{data.summary}</p>
        </section>

        <section className="creative-section">
          <h2>EXPERIENCE</h2>
          <p>{data.experience}</p>
        </section>

        <section className="creative-section">
          <h2>SKILLS</h2>
          <div className="creative-skills">
            {data.certifications
              .split(",")
              .map((skill, i) => (
                <span key={i} className="creative-skill">
                  {skill.trim()}
                </span>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============================
   MAIN COMPONENT
============================ */
export default function ResumeBuilder() {
  const navigate = useNavigate();

  const [template, setTemplate] = useState("IT");

  const [profile, setProfile] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    education: "",
    experience: "",
    certifications: "",
    photo: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
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

  const saveResume = () => {
    localStorage.setItem("resumeData", JSON.stringify(profile));
    alert("Resume saved successfully");
  };
  const downloadPDF = () => {
  const element = document.getElementById("resume-preview");

  const options = {
    margin: 0.3,
    filename: `${profile.name || "Resume"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait"
    }
  };

  html2pdf().from(element).set(options).save();
};

  return (
    <div className="resume-builder-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="resume-builder-container">
        {/* LEFT FORM */}
        <div className="resume-form">
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="IT">IT Resume</option>
            <option value="NONIT">Non-IT Resume</option>
            <option value="CREATIVE">Creative Resume</option>
          </select>

          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="role" placeholder="Role" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="linkedin" placeholder="LinkedIn" onChange={handleChange} />
          <label className="photo-upload">
            Upload Profile Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </label>

          <textarea name="summary" placeholder="Summary" onChange={handleChange} />
          <textarea name="education" placeholder="Education" onChange={handleChange} />
          <textarea name="experience" placeholder="Experience" onChange={handleChange} />
          <textarea
            name="certifications"
            placeholder="Skills / Certifications (comma separated)"
            onChange={handleChange}
          />

          <button className="save-btn" onClick={saveResume}>
            Save Resume
          </button>
        
          <button className="pdf-btn" onClick={downloadPDF}>
            Download as PDF
            </button>
          </div>

        {/* RIGHT PREVIEW */}
        <div className="resume-preview" id="resume-preview">
          {template === "IT" && <ITResume data={profile} />}
          {template === "NONIT" && <NonITResume data={profile} />}
          {template === "CREATIVE" && <CreativeTemplate data={profile} />}
        </div>
      </div>
    </div>
  );
}
