// src/App.jsx

//import { Routes, Route } from "react-router-dom";
// Add Routes and Route inside the curly braces
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import CgpaCalculator from "./pages/CgpaCalculator.jsx";

import Activity from "./pages/Activity.jsx";
import ViewCertificates from "./pages/ViewCertificates.jsx";
import MyCertificates from "./pages/MyCertificates.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
//import ResumeBuilderAdvanced from "./pages/ResumeBuilderAdvanced.jsx";
// Upload pages
import UploadCertificates from "./pages/UploadCertificates.jsx";
import UploadSkillCertificates from "./pages/UploadSkillCertificates.jsx";
import UploadCoCurricularCertificates from "./pages/UploadCoCurricularCertificates.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Profile from "./pages/Profile.jsx";
import UploadStudyCertificates from "./pages/UploadStudyCertificates.jsx";
export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Tools */}
      <Route path="/calculator" element={<CgpaCalculator />} />
      <Route path="/activity" element={<Activity />} />

      {/* Upload Menu */}
      <Route path="/upload" element={<UploadCertificates />} />

      {/* Upload Categories */}
      <Route path="/upload/skill-certificates" element={<UploadSkillCertificates />} />
      <Route path="/upload/co-curricular-certificates" element={<UploadCoCurricularCertificates />} />
      <Route path="/upload/skill" element={<UploadSkillCertificates />} />
      <Route path="/upload-certificates" element={<UploadCertificates />} />
      <Route path="/upload/cocurricular" element={<UploadCoCurricularCertificates />} />
      <Route path="/study-certificates" element={<UploadStudyCertificates />} />
      <Route path="/view-certificates" element={<ViewCertificates />} />
      <Route path="/my-certificates" element={<MyCertificates />} />
      <Route path="/resume" element={<ResumeBuilder />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
