import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCertificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("uid");
    if (!userId) return;

    axios
      .get(`http://localhost:5000/certificates/${userId}`)
      .then((res) => setCerts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const removeCert = async (id) => {
    await axios.delete(`http://localhost:5000/certificates/${id}`);
    setCerts(certs.filter((c) => c._id !== id));
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>My Certificates</h2>

      {certs.length === 0 && <p>No certificates uploaded</p>}

      {certs.map((c) => (
        <div key={c._id} style={{ marginBottom: 20 }}>
          <h4>{c.title}</h4>
          <p>{c.category}</p>

          <a href={c.fileUrl} target="_blank">View PDF</a>
          <br />
          <a href={c.fileUrl} download>Download</a>
          <br />

          <button onClick={() => removeCert(c._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
