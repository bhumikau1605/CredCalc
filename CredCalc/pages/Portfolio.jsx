import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Portfolio.css";

export default function Portfolio() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [labels, setLabels] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setProjects(profile.projects || []);
      } catch {
        setProjects([]);
      }
    }

    const savedLabels = localStorage.getItem("portfolioLabels");
    if (savedLabels) {
      try {
        setLabels(JSON.parse(savedLabels));
      } catch {
        setLabels({});
      }
    }
  }, []);

  const updateLabels = (next) => {
    setLabels(next);
    localStorage.setItem("portfolioLabels", JSON.stringify(next));
  };

  const toggleLabel = (id, key) => {
    const prev = labels[id] || { shortlist: false, practice: false };
    const next = {
      ...labels,
      [id]: { ...prev, [key]: !prev[key] },
    };
    updateLabels(next);
  };

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => {
      (p.tags || []).forEach((t) => tags.add(t));
    });
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => (p.tags || []).includes(filter));
  }, [projects, filter]);

  const stats = useMemo(() => {
    const count = projects.length;
    const techSet = new Set();

    projects.forEach((p) => {
      if (p.tech) {
        p.tech
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((t) => techSet.add(t));
      }
    });
    return { count, techCount: techSet.size };
  }, [projects]);

  return (
    <div className="portfolio-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="portfolio-card-wrap">
        <header className="portfolio-header">
          <div>
            <h2>My Portfolio</h2>
            <p className="portfolio-sub">
              Projects and work that you can show in interviews and on your
              resume.
            </p>
          </div>
          <div className="portfolio-stats">
            <span>{stats.count} projects</span>
            <span>{stats.techCount} different technologies</span>
          </div>
        </header>

        {allTags.length > 1 && (
          <div className="portfolio-filter-bar">
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={
                  "portfolio-filter-btn" +
                  (filter === t ? " portfolio-filter-active" : "")
                }
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="portfolio-grid">
          {filtered.map((p) => {
            const expanded = expandedId === p.id;
            const label =
              labels[p.id] || { shortlist: false, practice: false };

            return (
              <button
                key={p.id}
                type="button"
                className={
                  "portfolio-card" +
                  (expanded ? " portfolio-card-expanded" : "")
                }
                onClick={() =>
                  setExpandedId(expanded ? null : p.id)
                }
              >
                <div className="portfolio-card-main">
                  <div className="portfolio-card-header-row">
                    <h3>{p.title}</h3>
                    {p.difficulty && (
                      <span
                        className={
                          "portfolio-badge portfolio-badge-" +
                          p.difficulty.toLowerCase()
                        }
                      >
                        {p.difficulty}
                      </span>
                    )}
                  </div>
                  {p.tech && (
                    <p className="portfolio-tech">{p.tech}</p>
                  )}
                  <p className="portfolio-desc">
                    {expanded
                      ? p.description
                      : (p.description || "").slice(0, 90) +
                        (p.description &&
                        p.description.length > 90
                          ? "..."
                          : "")}
                  </p>
                </div>

                <div
                  className="portfolio-reactions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={
                      "portfolio-chip" +
                      (label.shortlist ? " portfolio-chip-active" : "")
                    }
                    onClick={() => toggleLabel(p.id, "shortlist")}
                  >
                    {label.shortlist ? "Shortlisted" : "Shortlist"}
                  </button>
                  <button
                    type="button"
                    className={
                      "portfolio-chip" +
                      (label.practice ? " portfolio-chip-active" : "")
                    }
                    onClick={() => toggleLabel(p.id, "practice")}
                  >
                    {label.practice ? "On my radar" : "Practice again"}
                  </button>
                </div>

                <span className="portfolio-toggle-hint">
                  {expanded ? "Click to collapse" : "Click to see more"}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="portfolio-empty">
              No projects for this filter. Try adding tags in Resume Builder or
              switch back to “All”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
