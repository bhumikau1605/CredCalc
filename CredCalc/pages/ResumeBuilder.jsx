// src/pages/ResumeBuilder.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResumeBuilder.css";
import html2pdf from "html2pdf.js";

/* ============================
   HELPER: RECOMMENDATION LOGIC
============================ */
const makeIsRecommended = (mode) => (item) => {
  if (mode === "placement") {
    return item.category === "Skill" || item.category === "Academic";
  }
  if (mode === "internship") {
    return item.category === "Skill" || item.category === "Workshop";
  }
  if (mode === "higher") {
    return item.category === "Academic";
  }
  return false;
};

/* Small helper to normalize text */
const normalize = (text) =>
  (text || "").toLowerCase().replace(/[^a-z0-9+.# ]/g, " ");

/* ============================
   IT RESUME TEMPLATE
============================ */
function ITResume({ data, resumeMode }) {
  const isRecommended = makeIsRecommended(resumeMode);

  return (
    <div className="resume it-resume">
      <h1>{data.name || "Your Name"}</h1>
      <h3>{data.role}</h3>

      {data.photo && (
        <img src={data.photo} className="it-photo" alt="profile" />
      )}

      <div className="resume-section">
        <h2>Summary</h2>
        <p>{data.summary}</p>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <p>{data.education}</p>
      </div>

      {data.experiences && data.experiences.length > 0 && (
        <div className="resume-section">
          <h2>Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="resume-experience">
              <div className="exp-header">
                <h3>{exp.role}</h3>
                <span className="exp-company">
                  {exp.company}
                  {exp.location ? ` • ${exp.location}` : ""}
                </span>
                {exp.startDate && (
                  <span className="exp-dates">
                    {exp.startDate} {exp.endDate ? ` - ${exp.endDate}` : ""}
                  </span>
                )}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="resume-section">
          <h2>Projects</h2>
          {data.projects.map((p) => (
            <div key={p.id} className="resume-project">
              <h3>{p.title}</h3>
              {p.tech && <p className="project-tech">{p.tech}</p>}
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      )}

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
function NonITResume({ data, resumeMode }) {
  const isRecommended = makeIsRecommended(resumeMode);

  return (
    <div className="resume nonit-resume">
      <div className="nonit-header">
        <h1>{data.name || "Your Name"}</h1>
        <p>{data.role}</p>
        <small>
          {data.email} | {data.phone} | {data.location}
        </small>
      </div>

      {data.photo && (
        <img src={data.photo} className="nonit-photo" alt="profile" />
      )}

      <section>
        <h2>Career Objective</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>{data.education}</p>
      </section>

      {data.experiences && data.experiences.length > 0 && (
        <section>
          <h2>Work Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="resume-experience">
              <div className="exp-header">
                <h3>{exp.role}</h3>
                <span className="exp-company">
                  {exp.company}
                  {exp.location ? ` • ${exp.location}` : ""}
                </span>
                {exp.startDate && (
                  <span className="exp-dates">
                    {exp.startDate} {exp.endDate ? ` - ${exp.endDate}` : ""}
                  </span>
                )}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          {data.projects.map((p) => (
            <div key={p.id} className="resume-project">
              <h3>{p.title}</h3>
              {p.tech && <p className="project-tech">{p.tech}</p>}
              <p>{p.description}</p>
            </div>
          ))}
        </section>
      )}

      <section>
        <h2>Skills & Certifications</h2>
        <p>{data.certifications}</p>
      </section>
    </div>
  );
}

/* ============================
   CREATIVE RESUME TEMPLATE
============================ */
function CreativeTemplate({ data, resumeMode }) {
  const isRecommended = makeIsRecommended(resumeMode);

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

        {data.experiences && data.experiences.length > 0 && (
          <section className="creative-section">
            <h2>EXPERIENCE</h2>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="resume-experience">
                <div className="exp-header">
                  <h3>{exp.role}</h3>
                  <span className="exp-company">
                    {exp.company}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </span>
                  {exp.startDate && (
                    <span className="exp-dates">
                      {exp.startDate}{" "}
                      {exp.endDate ? ` - ${exp.endDate}` : ""}
                    </span>
                  )}
                </div>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="creative-section">
            <h2>PROJECTS</h2>
            {data.projects.map((p) => (
              <div key={p.id} className="resume-project">
                <h3>{p.title}</h3>
                {p.tech && <p className="project-tech">{p.tech}</p>}
                <p>{p.description}</p>
              </div>
            ))}
          </section>
        )}

        <section className="creative-section">
          <h2>SKILLS</h2>
          <div className="creative-skills">
            {data.certifications
              .split(",")
              .filter((s) => s.trim().length > 0)
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
  const [resumeMode, setResumeMode] = useState("placement");

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
    photo: "",
    projects: [],
    experiences: [],
  });

  // ATS helper state
  const [jobDescription, setJobDescription] = useState("");
  const [jobKeywords, setJobKeywords] = useState([]);
  const [presentKeywords, setPresentKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);

  // Presets state
  const [presetName, setPresetName] = useState("");
  const [presets, setPresets] = useState([]);

  /* ---------- Load from localStorage ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile({
          projects: [],
          experiences: [],
          ...parsed,
          projects: parsed.projects || [],
          experiences: parsed.experiences || [],
        });
      } catch (e) {
        console.error("Failed to parse resumeData", e);
      }
    }

    const savedPresets = localStorage.getItem("resumePresets");
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch {
        setPresets([]);
      }
    }
  }, []);

  /* ---------- Mode-based hints ---------- */
  const getHint = (section) => {
    if (resumeMode === "placement") {
      if (section === "summary") {
        return "2–3 lines highlighting tech stack, internships, and best projects relevant to placements.";
      }
      if (section === "experience") {
        return "Use action verbs and numbers (e.g., Improved load time by 20%) for internships and jobs.";
      }
      if (section === "projects") {
        return "Focus on 2–3 strong projects with tech stack and clear outcomes.";
      }
      if (section === "skills") {
        return "Prioritize core skills (DSA, OOP, DBMS, main tools) needed for your target role.";
      }
    }

    if (resumeMode === "internship") {
      if (section === "summary") {
        return "Mention your degree, year, key skills, and the type of internship you want.";
      }
      if (section === "experience") {
        return "Include internships, part-time work, hackathons, and volunteering with impact points.";
      }
      if (section === "projects") {
        return "Highlight academic and mini projects proving you can learn tools quickly.";
      }
      if (section === "skills") {
        return "List languages and tools used in coursework and projects (e.g., React, Python, SQL).";
      }
    }

    if (resumeMode === "higher") {
      if (section === "summary") {
        return "Emphasize academic interests, CGPA, and research direction for higher studies.";
      }
      if (section === "experience") {
        return "Include research, TA roles, and internships that support your academic goals.";
      }
      if (section === "projects") {
        return "Focus on final-year and research projects; mention publications or presentations.";
      }
      if (section === "skills") {
        return "Highlight domain knowledge, research tools, and any relevant test scores.";
      }
    }

    return "";
  };

  /* ---------- Handlers for basic fields ---------- */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ---------- Dynamic Projects handlers ---------- */
  const addProject = () => {
    setProfile((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now(), title: "", tech: "", description: "" },
      ],
    }));
  };

  const updateProject = (id, field, value) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const removeProject = (id) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  /* ---------- Dynamic Experiences handlers ---------- */
  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now(),
          role: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  /* ---------- ATS keyword helper ---------- */
  const extractKeywords = () => {
    const text = normalize(jobDescription);
    if (!text.trim()) {
      setJobKeywords([]);
      setPresentKeywords([]);
      setMissingKeywords([]);
      return;
    }

    const words = text.split(/\s+/).filter((w) => w.length > 2);
    const ignore = new Set([
      "and",
      "the",
      "with",
      "for",
      "from",
      "this",
      "that",
      "have",
      "will",
      "your",
      "you",
      "are",
      "job",
      "role",
      "need",
      "must",
      "should",
      "candidate",
    ]);

    const freq = {};
    words.forEach((w) => {
      if (ignore.has(w)) return;
      freq[w] = (freq[w] || 0) + 1;
    });

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([w]) => w);

    setJobKeywords(sorted);

    const resumeText = normalize(
      [
        profile.summary,
        profile.education,
        profile.experience,
        profile.certifications,
        ...profile.projects.map(
          (p) => `${p.title} ${p.tech} ${p.description}`
        ),
        ...profile.experiences.map(
          (e) =>
            `${e.role} ${e.company} ${e.location} ${e.description} ${e.startDate} ${e.endDate}`
        ),
      ].join(" ")
    );

    const present = [];
    const missing = [];
    sorted.forEach((kw) => {
      if (resumeText.includes(kw)) present.push(kw);
      else missing.push(kw);
    });

    setPresentKeywords(present);
    setMissingKeywords(missing);
  };

  /* ---------- Presets ---------- */
  const savePreset = () => {
    if (!presetName.trim()) return;
    const newPreset = {
      id: Date.now(),
      name: presetName.trim(),
      template,
      resumeMode,
      profile,
    };
    const updated = [
      ...presets.filter((p) => p.name !== newPreset.name),
      newPreset,
    ];
    setPresets(updated);
    localStorage.setItem("resumePresets", JSON.stringify(updated));
    localStorage.setItem("resumeData", JSON.stringify(profile));
  };

  const loadPreset = (preset) => {
  if (!preset) return;
  setTemplate(preset.template || "IT");
  setResumeMode(preset.resumeMode || "placement");
  setProfile(preset.profile || {});
  localStorage.setItem("resumeData", JSON.stringify(preset.profile || {}));
};
  const deletePreset = (id) => {
  const updated = presets.filter((p) => p.id !== id);
  setPresets(updated);
  localStorage.setItem("resumePresets", JSON.stringify(updated));
};


  /* ---------- Save + PDF ---------- */
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
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
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
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="IT">IT Resume</option>
            <option value="NONIT">Non-IT Resume</option>
            <option value="CREATIVE">Creative Resume</option>
          </select>

          <div className="resume-mode-row">
            <label>Resume focus:</label>
            <select
              value={resumeMode}
              onChange={(e) => setResumeMode(e.target.value)}
            >
              <option value="placement">Placement</option>
              <option value="internship">Internship</option>
              <option value="higher">Higher Studies</option>
            </select>
          </div>

          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="role" placeholder="Role" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
          <input
            name="linkedin"
            placeholder="LinkedIn"
            onChange={handleChange}
          />

          <label className="photo-upload">
            Upload Profile Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </label>

          <textarea
            name="summary"
            placeholder="Summary"
            onChange={handleChange}
          />
          {getHint("summary") && (
            <p className="field-hint">{getHint("summary")}</p>
          )}

          <textarea
            name="education"
            placeholder="Education"
            onChange={handleChange}
          />

          <textarea
            name="certifications"
            placeholder="Skills / Certifications (comma separated)"
            onChange={handleChange}
          />
          {getHint("skills") && (
            <p className="field-hint">{getHint("skills")}</p>
          )}

          {/* ---------- Dynamic Experience UI ---------- */}
          <h3>Experience</h3>
          <p className="field-hint">{getHint("experience")}</p>
          <button type="button" onClick={addExperience}>
            + Add Experience
          </button>

          {profile.experiences.map((exp) => (
            <div key={exp.id} className="experience-form-card">
              <input
                placeholder="Job title (e.g., React Developer Intern)"
                value={exp.role}
                onChange={(e) =>
                  updateExperience(exp.id, "role", e.target.value)
                }
              />
              <input
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
              />
              <input
                placeholder="Location (e.g., Chennai)"
                value={exp.location}
                onChange={(e) =>
                  updateExperience(exp.id, "location", e.target.value)
                }
              />
              <div className="exp-dates-row">
                <input
                  placeholder="Start (e.g., Jun 2024)"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "startDate", e.target.value)
                  }
                />
                <input
                  placeholder="End (e.g., Dec 2024 / Present)"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "endDate", e.target.value)
                  }
                />
              </div>
              <textarea
                placeholder="Describe your work and achievements"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="remove-experience-btn"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ---------- Dynamic Projects UI ---------- */}
          <h3>Projects</h3>
          <p className="field-hint">{getHint("projects")}</p>
          <button type="button" onClick={addProject}>
            + Add Project
          </button>

          {profile.projects.map((project) => (
            <div key={project.id} className="project-form-card">
              <input
                placeholder="Project title"
                value={project.title}
                onChange={(e) =>
                  updateProject(project.id, "title", e.target.value)
                }
              />
              <input
                placeholder="Tech stack (e.g., React, Node, MongoDB)"
                value={project.tech}
                onChange={(e) =>
                  updateProject(project.id, "tech", e.target.value)
                }
              />
              <textarea
                placeholder="Short description / achievements"
                value={project.description}
                onChange={(e) =>
                  updateProject(project.id, "description", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="remove-project-btn"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ---------- ATS Job Description + Keywords ---------- */}
          <h3>Job Description (for ATS help)</h3>
          <textarea
            placeholder="Paste job description here to extract keywords"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button type="button" onClick={extractKeywords}>
            Analyze Keywords
          </button>

          {jobKeywords.length > 0 && (
            <div className="ats-keywords-block">
              <p>Top keywords from this JD:</p>
              <div className="keyword-chips">
                {jobKeywords.map((kw) => (
                  <span key={kw} className="keyword-chip">
                    {kw}
                  </span>
                ))}
              </div>

              {presentKeywords.length > 0 && (
                <>
                  <p>Already in your resume:</p>
                  <div className="keyword-chips present">
                    {presentKeywords.map((kw) => (
                      <span key={kw} className="keyword-chip">
                        {kw}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {missingKeywords.length > 0 && (
                <>
                  <p>Missing keywords (consider adding if relevant):</p>
                  <div className="keyword-chips missing">
                    {missingKeywords.map((kw) => (
                      <span key={kw} className="keyword-chip">
                        {kw}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ---------- Presets UI ---------- */}
          <div className="preset-list">
  {presets.map((p) => (
    <div key={p.id} className="preset-chip-wrapper">
      <button
        type="button"
        className="preset-chip"
        onClick={() => loadPreset(p)}
      >
        {p.name}
      </button>
      <button
        type="button"
        className="preset-delete-btn"
        onClick={() => deletePreset(p.id)}
        aria-label={`Delete preset ${p.name}`}
      >
        ✕
      </button>
    </div>
  ))}
</div>



          <button className="save-btn" onClick={saveResume}>
            Save Resume
          </button>

          <button className="pdf-btn" onClick={downloadPDF}>
            Download as PDF
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="resume-preview" id="resume-preview">
          {template === "IT" && (
            <ITResume data={profile} resumeMode={resumeMode} />
          )}
          {template === "NONIT" && (
            <NonITResume data={profile} resumeMode={resumeMode} />
          )}
          {template === "CREATIVE" && (
            <CreativeTemplate data={profile} resumeMode={resumeMode} />
          )}
        </div>
      </div>
    </div>
  );
}
