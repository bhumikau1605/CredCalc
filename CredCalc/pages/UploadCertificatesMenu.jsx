import { useNavigate } from "react-router-dom";
import "./UploadCertificatesMenu.css";

export default function UploadCertificates() {
    const navigate = useNavigate();

    return (
        <div className="upload-menu-wrapper">
            <div className="upload-menu-card">
                <h2>Select Certificate Category</h2>

                <div className="upload-menu-buttons">
                    <button 
                        className="upload-menu-btn" 
                        onClick={() => navigate("/upload-skill")}
                    >
                        Skill / Educational Certificates
                    </button>

                    <button 
                        className="upload-menu-btn" 
                        onClick={() => navigate("/upload-cocurricular")}
                    >
                        Co-Curricular Certificates
                    </button>
                </div>

                <button 
                    className="upload-back-btn" 
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}
