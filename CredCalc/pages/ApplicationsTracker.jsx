import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplicationsTracker.css";

export default function ApplicationsTracker() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    type: "Placement",
    status: "Applied",
    deadline: "",
    notes: "",
  });
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate()
  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) setApplications(JSON.parse(saved));
  }, []);

  const saveApps = (list) => {
    setApplications(list);
    localStorage.setItem("applications", JSON.stringify(list));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addApplication = () => {
    if (!form.company || !form.role) return;
    const newApp = { id: Date.now(), ...form };
    const updated = [...applications, newApp];
    saveApps(updated);
    setForm({
      company: "",
      role: "",
      type: "Placement",
      status: "Applied",
      deadline: "",
      notes: "",
    });
  };

  const deleteApplication = (id) => {
    const updated = applications.filter((a) => a.id !== id);
    saveApps(updated);
  };

  const statusCounts = applications.reduce(
    (acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    },
    { Applied: 0, Test: 0, Interview: 0, Offer: 0, Rejected: 0 }
  );

  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter((a) => a.type === filter);

  const upcoming = [...applications]
    .filter((a) => a.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

  return (
    <div className="apps-page">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
      <div className="apps-card-wrap">
  <div className="apps-header-row">
    <div>
      <h2>Applications Tracker</h2>
    </div>
    {upcoming && (
      <div className="apps-next-deadline">
        Next deadline: <strong>{upcoming.company}</strong> – {upcoming.deadline}
      </div>
    )}
  </div>

  <div className="apps-filter-bar">
    <div className="apps-filters">
      {["All", "Placement", "Internship", "Higher Studies"].map((t) => (
        <button
          key={t}
          type="button"
          className={
            "apps-filter-btn" + (filter === t ? " apps-filter-active" : "")
          }
          onClick={() => setFilter(t)}
        >
          {t}
        </button>
      ))}
    </div>

    <div className="apps-summary">
      <span>Applied: {statusCounts.Applied}</span>
      <span>Test: {statusCounts.Test}</span>
      <span>Interview: {statusCounts.Interview}</span>
      <span>Offer: {statusCounts.Offer}</span>
      <span>Rejected: {statusCounts.Rejected}</span>
    </div>
  </div>

  <div className="apps-form-section">
  {/* top row */}
  <div className="apps-form apps-form-row top">
    <input
      name="company"
      placeholder="Company"
      value={form.company}
      onChange={handleChange}
    />
    <input
      name="role"
      placeholder="Role (e.g., SDE Intern)"
      value={form.role}
      onChange={handleChange}
    />
    <select name="type" value={form.type} onChange={handleChange}>
      <option>Placement</option>
      <option>Internship</option>
      <option>Higher Studies</option>
    </select>
    <select name="status" value={form.status} onChange={handleChange}>
      <option>Applied</option>
      <option>Test</option>
      <option>Interview</option>
      <option>Offer</option>
      <option>Rejected</option>
    </select>
    <input
      type="date"
      name="deadline"
      value={form.deadline}
      onChange={handleChange}
    />
  </div>

  {/* bottom row: notes + Add */}
  <div className="apps-form apps-form-row bottom">
    <input
      name="notes"
      placeholder="Notes / portal link"
      value={form.notes}
      onChange={handleChange}
      style={{ gridColumn: "1 / span 4" }} // takes columns 1–4
    />
    <button
      type="button"
      onClick={addApplication}
      style={{ gridColumn: "5 / span 1" }} // sits under deadline, column 5
    >
      Add
    </button>
  </div>


        <div className="apps-list">
          {filteredApps.map((a) => (
            <div key={a.id} className="apps-card">
              <h3>
                {a.company} – {a.role}
              </h3>
              <p>
                <strong>Type:</strong> {a.type}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`apps-status apps-status-${a.status
                    .toLowerCase()
                    .replace(" ", "")}`}
                >
                  {a.status}
                </span>
              </p>
              {a.deadline && (
                <p>
                  <strong>Deadline:</strong> {a.deadline}
                </p>
              )}
              {a.notes && <p>{a.notes}</p>}
              <button onClick={() => deleteApplication(a.id)}>Remove</button>
            </div>
          ))}
          {filteredApps.length === 0 && (
            <p className="apps-empty">No applications in this view.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
