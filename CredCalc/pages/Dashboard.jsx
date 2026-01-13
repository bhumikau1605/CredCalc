import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Trophy,
  Calculator,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  // ✅ Load name from localStorage (or fallback)
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (parsed.name) {
        setUserName(parsed.name);
      }
    }
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { title: "Upload Certificates", icon: <Upload />, path: "/upload" },
    { title: "Marks Cards", icon: <FileText />, path: "/scan-marks-card" },
    { title: "Activity Points", icon: <Trophy />, path: "/activity" },
    { title: "CGPA Calculator", icon: <Calculator />, path: "/calculator" },
    { title: "My Certificates", icon: <FileText />, path: "/my-certificates" },
    { title: "Resume Builder", icon: <FileText />, path: "/resume" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div
          className="dashboard-user"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <div className="user-avatar">
            <User size={22} />
          </div>
          <div className="user-info">
            <h2>Hi, {userName}</h2>
            <p>Student • Portfolio System</p>
          </div>
        </div>

        <div className="header-buttons">
          <button onClick={() => navigate("/profile")} className="header-btn">
            <Settings size={22} />
          </button>

          <button onClick={handleLogout} className="header-btn">
            <LogOut size={22} />
          </button>
        </div>
      </div>

      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-grid">
        {menuItems.map((item, i) => (
          <div
            key={i}
            className="dashboard-card"
            onClick={() => navigate(item.path)}
          >
            <div className="icon-wrapper">{item.icon}</div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
