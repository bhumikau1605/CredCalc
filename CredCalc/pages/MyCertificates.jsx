// src/pages/MyCertificates.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCertificates.css";

export default function MyCertificates() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("uid");
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCerts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/certificates/${userId}`);
        const data = await res.json();
        setCertificates(data || []);
      } catch (err) {
        console.error("MY CERTS ERROR:", err);
        alert("Could not load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;

    try {
      await fetch(`http://localhost:5000/certificates/${id}`, {
        method: "DELETE",
      });
      setCertificates((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("DELETE CERT ERROR:", err);
      alert("Could not delete certificate");
    }
  };

  return (
  <div className="certs-page">
    {/* back button outside card */}
    <button className="back-btn" onClick={() => navigate("/dashboard")}>
      ← Back to Dashboard
    </button>

    <div className="certs-overlay">
      <header className="certs-header">
        <h1 className="certs-title">My Certificates</h1>
        <span className="certs-count">Total: {certificates.length}</span>
      </header>

      {loading ? (
        <p>Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p>No certificates uploaded yet.</p>
      ) : (
        <div className="certs-grid">
          {certificates.map((c) => (
            <div key={c._id} className="cert-card">
              <div className="cert-info">
                <div className="cert-icon" />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.category}</p>
                </div>
              </div>

              <div className="cert-actions">
                <button
                  className="view-btn"
                  onClick={() => window.open(c.fileUrl, "_blank")}
                >
                  View / Download
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
