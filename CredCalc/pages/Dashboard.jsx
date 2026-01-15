// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Trophy,
  Calculator,
  FileText,
  Settings,
  LogOut,
  Briefcase,
  FolderKanban,
  BookOpen,
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  const [totalCerts, setTotalCerts] = useState(0);
  const [skillCerts, setSkillCerts] = useState(0);
  const [academicCerts, setAcademicCerts] = useState(0);
  const [activityPoints, setActivityPoints] = useState(0);

  const [recentCerts, setRecentCerts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const initials =
    userName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "U";

  // Load user + profile info
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName && storedName.trim().length > 0) {
      setUserName(storedName);
    }

    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name && !storedName) setUserName(parsed.name);
        if (parsed.branch) setBranch(parsed.branch);
        if (parsed.semester) setSemester(parsed.semester);
      } catch {
        // ignore
      }
    }
  }, []);

  // Load certificate stats + recent certs
  useEffect(() => {
    const userId = localStorage.getItem("uid");
    if (!userId) return;

    fetch(`http://localhost:5000/certificates/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setTotalCerts(data.length);
        const skill = data.filter((c) => c.category === "Skill").length;
        const academic = data.filter((c) => c.category === "Academic").length;
        setSkillCerts(skill);
        setAcademicCerts(academic);

        const sorted = [...data].sort((a, b) => {
          if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
          }
          return 0;
        });
        setRecentCerts(sorted.slice(0, 3));
      })
      .catch((err) => console.error("DASHBOARD CERTS ERROR:", err));
  }, []);

  // Load Activity Points from localStorage + recent activities
  useEffect(() => {
    const storedTotal = localStorage.getItem("activityTotal");
    if (storedTotal) {
      const num = Number(storedTotal);
      if (!Number.isNaN(num)) {
        setActivityPoints(num);
      }
    }

    const storedList = JSON.parse(localStorage.getItem("activities")) || [];
    const sortedActs = [...storedList].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setRecentActivities(sortedActs.slice(0, 3));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const menuItems = [
    { title: "Upload Certificates", icon: <Upload />, path: "/upload" },
    { title: "Activity Points", icon: <Trophy />, path: "/activity" },
    { title: "CGPA Calculator", icon: <Calculator />, path: "/calculator" },
    { title: "My Certificates", icon: <FileText />, path: "/my-certificates" },
    { title: "Resume Builder", icon: <FileText />, path: "/resume" },
    // new pages instead of Marks Cards
    { title: "Applications Tracker", icon: <Briefcase />, path: "/applications" },
    { title: "My Portfolio", icon: <FolderKanban />, path: "/portfolio" },
    { title: "Placement Resources", icon: <BookOpen />, path: "/resources" },
  ];

  // Activity progress %
  const goal = 100;
  const percent = Math.min(100, Math.round((activityPoints / goal) * 100));

  // Readiness score
  const certScore = Math.min(totalCerts * 5, 40);
  const actScore = Math.min(activityPoints, 60);
  const readinessScore = certScore + actScore; // 0–100

  const getReadinessLabel = () => {
    if (readinessScore >= 80) return "Strong profile";
    if (readinessScore >= 50) return "Growing profile";
    if (readinessScore > 0) return "Starter profile";
    return "No data yet";
  };

  const getProfileLevel = () => {
    if (readinessScore >= 80) return 4;
    if (readinessScore >= 60) return 3;
    if (readinessScore >= 40) return 2;
    if (readinessScore > 0) return 1;
    return 0;
  };

  const profileLevel = getProfileLevel();

  // Badge logic
  const badges = [
    {
      id: "cert-starter",
      title: "Certificate Starter",
      condition: totalCerts >= 1,
      description: "Add your first certificate.",
    },
    {
      id: "cert-pro",
      title: "Certificate Pro",
      condition: totalCerts >= 10,
      description: "Collect 10 or more certificates.",
    },
    {
      id: "active-member",
      title: "Active Member",
      condition: activityPoints >= 20,
      description: "Earn 20 activity points.",
    },
    {
      id: "highly-active",
      title: "Highly Active",
      condition: activityPoints >= 60,
      description: "Earn 60+ activity points.",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-overlay">
        {/* HEADER */}
        <div className="dashboard-header">
          <div className="dashboard-user">
            <div className="user-avatar">
              <span>{initials}</span>
            </div>
            <div className="user-info">
              <h2>Hi, {userName}</h2>
              <p>
                Student • Portfolio System
                {profileLevel > 0 && (
                  <span className="profile-level"> • Level {profileLevel}</span>
                )}
              </p>
            </div>
          </div>

          <div className="header-buttons">
            <button
              onClick={() => navigate("/profile")}
              className="header-btn"
            >
              <Settings size={20} />
            </button>

            <button onClick={handleLogout} className="header-btn">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          {branch || "Branch not set"} •{" "}
          {semester ? `Semester ${semester}` : "Semester not set"}
        </p>

        {/* STATS */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <span className="stat-label">Certificates</span>
            <span className="stat-value">{totalCerts}</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="stat-label">Skill / Academic</span>
            <span className="stat-value">
              {skillCerts} / {academicCerts}
            </span>
          </div>

          <div className="dashboard-stat-card">
            <span className="stat-label">Activity Points</span>
            <span className="stat-value">{activityPoints}</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="stat-label">
              Readiness score
              <span
                className="stat-help"
                title="Combined score from certificates (max 40) and activity points (max 60)."
              >
                ⓘ
              </span>
            </span>
            <span className="stat-value">{readinessScore}</span>
            <span className="stat-note">{getReadinessLabel()}</span>
          </div>
        </div>

        {/* ACHIEVEMENTS / BADGES */}
        <div className="dashboard-badges">
          <h3 className="badges-title">Achievements</h3>
          <div className="badges-row">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={
                  "badge-card " +
                  (badge.condition ? "badge-unlocked" : "badge-locked")
                }
              >
                <div className="badge-dot" />
                <div className="badge-main">
                  <div className="badge-title">{badge.title}</div>
                  <div className="badge-desc">{badge.description}</div>
                </div>
                <div className="badge-status">
                  {badge.condition ? "Unlocked" : "Locked"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACHIEVEMENTS */}
        <div className="dashboard-recent">
          <h3 className="recent-title">Recent achievements</h3>
          <div className="recent-list">
            {recentCerts.map((c) => (
              <div key={c._id} className="recent-item">
                <span className="recent-tag">Certificate</span>
                <span className="recent-name">{c.title || c.name}</span>
                <span className="recent-meta">{c.date}</span>
              </div>
            ))}

            {recentActivities.map((a) => (
              <div key={a.id} className="recent-item">
                <span className="recent-tag">Activity</span>
                <span className="recent-name">{a.name}</span>
                <span className="recent-meta">
                  {a.date} • {a.points} pts
                </span>
              </div>
            ))}

            {recentCerts.length === 0 && recentActivities.length === 0 && (
              <p className="recent-empty">
                No achievements yet. Start by adding a certificate or activity.
              </p>
            )}
          </div>
        </div>

        {/* PROGRESS */}
        {activityPoints > 0 && (
          <div className="dashboard-progress">
            <div className="progress-text">
              Activity completion: {percent}%
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        {/* CARD GRID */}
        <div className="dashboard-grid">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="dashboard-card"
              onClick={() => navigate(item.path)}
            >
              <div className="icon-wrapper">{item.icon}</div>
              <div className="dashboard-card-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
