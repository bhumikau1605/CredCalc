import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCertificates = () => {
  const [certs, setCerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCerts = async () => {
      const uid = localStorage.getItem("uid");
      try {
        const res = await axios.get(`http://localhost:5000/certificates/${uid}`);
        setCerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCerts();
  }, []);

  return (
    <div className="upload-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="upload-card">
        <h2>My Certificates ({certs.length})</h2>
        
        <div className="cert-container">
          {certs.map((cert) => (
            <div key={cert._id} className="cert-item" style={{ marginBottom: '15px', borderBottom: '1px solid #444' }}>
              <h3 style={{ margin: '0' }}>{cert.title}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#bbb' }}>{cert.category}</p>
            </div>
          ))}
        </div>

        <button 
          className="upload-btn" 
          onClick={() => navigate('/upload-certificates')}
        >
          + Add New Certificate
        </button>
      </div>
    </div>
  );
};

export default MyCertificates;