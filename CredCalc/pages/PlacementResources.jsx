import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlacementResources.css";

export default function PlacementResources() {
  const navigate = useNavigate();

  // default data
  const defaultAptitudeLinks = [
    {
      label: "IndiaBix Aptitude",
      url: "https://www.indiabix.com/aptitude/questions-and-answers/",
    },
    {
      label: "GeeksforGeeks Aptitude",
      url: "https://www.geeksforgeeks.org/aptitude-questions-and-answers/",
    },
  ];

  const defaultDsaLinks = [
    { label: "LeetCode", url: "https://leetcode.com" },
    { label: "GFG DSA", url: "https://www.geeksforgeeks.org/data-structures" },
  ];

  const defaultInterviewLinks = [
    { label: "InterviewBit – Interview Questions", url: "https://www.interviewbit.com" },
    {
      label: "CS Interview Roadmap (GFG)",
      url: "https://www.geeksforgeeks.org/complete-roadmap-to-cracking-coding-interviews",
    },
  ];

  const defaultChecklist = [
    "Resume finalised and reviewed by a senior.",
    "LinkedIn profile updated with photo, headline, and projects.",
    "GitHub / portfolio links added to resume.",
    "At least 20–30 coding problems solved recently.",
    "One mock interview done with a friend or senior.",
  ];

  // state for links & checklist (load from localStorage if present)
  const [aptitudeLinks, setAptitudeLinks] = useState(defaultAptitudeLinks);
  const [dsaLinks, setDsaLinks] = useState(defaultDsaLinks);
  const [interviewLinks, setInterviewLinks] = useState(defaultInterviewLinks);
  const [checklist, setChecklist] = useState(defaultChecklist);

  const [open, setOpen] = useState({
    aptitude: true,
    dsa: true,
    interview: true,
  });
  const [checked, setChecked] = useState({});
  const [tip, setTip] = useState("");

  // temp inputs for new items
  const [newAptitude, setNewAptitude] = useState({ label: "", url: "" });
  const [newDsa, setNewDsa] = useState({ label: "", url: "" });
  const [newInterview, setNewInterview] = useState({ label: "", url: "" });
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const tips = [
    "Keep your resume to one page and tailor it to each role.",
    "Convert projects into 2–3 bullet points with clear impact.",
    "Practice at least 1–2 coding problems daily instead of long gaps.",
    "Collect feedback on your resume from a senior or mentor.",
  ];

  // load from localStorage on mount
  useEffect(() => {
    const savedChecklistChecks = localStorage.getItem("placementChecklist");
    if (savedChecklistChecks) {
      try {
        setChecked(JSON.parse(savedChecklistChecks));
      } catch {
        // ignore
      }
    }

    const savedAptitude = localStorage.getItem("placementAptitudeLinks");
    const savedDsa = localStorage.getItem("placementDsaLinks");
    const savedInterview = localStorage.getItem("placementInterviewLinks");
    const savedChecklistItems = localStorage.getItem("placementChecklistItems");

    if (savedAptitude) {
      try {
        setAptitudeLinks(JSON.parse(savedAptitude));
      } catch {}
    }
    if (savedDsa) {
      try {
        setDsaLinks(JSON.parse(savedDsa));
      } catch {}
    }
    if (savedInterview) {
      try {
        setInterviewLinks(JSON.parse(savedInterview));
      } catch {}
    }
    if (savedChecklistItems) {
      try {
        setChecklist(JSON.parse(savedChecklistItems));
      } catch {}
    }

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  // helpers to persist to localStorage
  const saveLinks = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const saveChecklistItems = (items) => {
    localStorage.setItem("placementChecklistItems", JSON.stringify(items));
  };

  const toggleCheck = (index) => {
    const updated = { ...checked, [index]: !checked[index] };
    setChecked(updated);
    localStorage.setItem("placementChecklist", JSON.stringify(updated));
  };

  // add link handlers
  const handleAddLink = (type) => {
    if (type === "aptitude") {
      if (!newAptitude.label || !newAptitude.url) return;
      const updated = [...aptitudeLinks, newAptitude];
      setAptitudeLinks(updated);
      saveLinks("placementAptitudeLinks", updated);
      setNewAptitude({ label: "", url: "" });
    } else if (type === "dsa") {
      if (!newDsa.label || !newDsa.url) return;
      const updated = [...dsaLinks, newDsa];
      setDsaLinks(updated);
      saveLinks("placementDsaLinks", updated);
      setNewDsa({ label: "", url: "" });
    } else if (type === "interview") {
      if (!newInterview.label || !newInterview.url) return;
      const updated = [...interviewLinks, newInterview];
      setInterviewLinks(updated);
      saveLinks("placementInterviewLinks", updated);
      setNewInterview({ label: "", url: "" });
    }
  };

  // remove link handlers
  const handleRemoveLink = (type, index) => {
    if (type === "aptitude") {
      const updated = aptitudeLinks.filter((_, i) => i !== index);
      setAptitudeLinks(updated);
      saveLinks("placementAptitudeLinks", updated);
    } else if (type === "dsa") {
      const updated = dsaLinks.filter((_, i) => i !== index);
      setDsaLinks(updated);
      saveLinks("placementDsaLinks", updated);
    } else if (type === "interview") {
      const updated = interviewLinks.filter((_, i) => i !== index);
      setInterviewLinks(updated);
      saveLinks("placementInterviewLinks", updated);
    }
  };

  // checklist add/remove
  const handleAddChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    const updated = [...checklist, newChecklistItem.trim()];
    setChecklist(updated);
    saveChecklistItems(updated);
    setNewChecklistItem("");
  };

  const handleRemoveChecklistItem = (index) => {
    const updated = checklist.filter((_, i) => i !== index);
    setChecklist(updated);
    saveChecklistItems(updated);

    // also clean up checkbox state
    const newChecked = { ...checked };
    delete newChecked[index];
    // shift indices above removed one
    const shifted = {};
    updated.forEach((_, i) => {
      shifted[i] = newChecked[i] || false;
    });
    setChecked(shifted);
    localStorage.setItem("placementChecklist", JSON.stringify(shifted));
  };

  return (
    <div className="resources-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
      <div className="resources-card">
        <h2>Placement Resources</h2>

        {tip && (
          <div className="resources-tip">
            <strong>Tip of the day:</strong> {tip}
          </div>
        )}

        {/* Aptitude */}
        <section>
          <button
            type="button"
            className="resources-section-header"
            onClick={() =>
              setOpen((o) => ({ ...o, aptitude: !o.aptitude }))
            }
          >
            <h3>Aptitude</h3>
            <span>{open.aptitude ? "−" : "+"}</span>
          </button>
          {open.aptitude && (
            <>
              <ul>
                {aptitudeLinks.map((item, index) => (
                  <li key={item.url + index} className="resource-item">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                    <button
                      type="button"
                      className="resource-remove-btn"
                      onClick={() => handleRemoveLink("aptitude", index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="resource-add-form">
                <input
                  type="text"
                  placeholder="Link label"
                  value={newAptitude.label}
                  onChange={(e) =>
                    setNewAptitude((v) => ({ ...v, label: e.target.value }))
                  }
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newAptitude.url}
                  onChange={(e) =>
                    setNewAptitude((v) => ({ ...v, url: e.target.value }))
                  }
                />
                <button type="button" onClick={() => handleAddLink("aptitude")}>
                  Add
                </button>
              </div>
            </>
          )}
        </section>

        {/* DSA & Coding */}
        <section>
          <button
            type="button"
            className="resources-section-header"
            onClick={() => setOpen((o) => ({ ...o, dsa: !o.dsa }))}
          >
            <h3>DSA & Coding</h3>
            <span>{open.dsa ? "−" : "+"}</span>
          </button>
          {open.dsa && (
            <>
              <ul>
                {dsaLinks.map((item, index) => (
                  <li key={item.url + index} className="resource-item">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                    <button
                      type="button"
                      className="resource-remove-btn"
                      onClick={() => handleRemoveLink("dsa", index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="resource-add-form">
                <input
                  type="text"
                  placeholder="Link label"
                  value={newDsa.label}
                  onChange={(e) =>
                    setNewDsa((v) => ({ ...v, label: e.target.value }))
                  }
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newDsa.url}
                  onChange={(e) =>
                    setNewDsa((v) => ({ ...v, url: e.target.value }))
                  }
                />
                <button type="button" onClick={() => handleAddLink("dsa")}>
                  Add
                </button>
              </div>
            </>
          )}
        </section>

        {/* Interview Prep */}
        <section>
          <button
            type="button"
            className="resources-section-header"
            onClick={() =>
              setOpen((o) => ({ ...o, interview: !o.interview }))
            }
          >
            <h3>Interview Prep</h3>
            <span>{open.interview ? "−" : "+"}</span>
          </button>
          {open.interview && (
            <>
              <ul>
                {interviewLinks.map((item, index) => (
                  <li key={item.url + index} className="resource-item">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                    <button
                      type="button"
                      className="resource-remove-btn"
                      onClick={() => handleRemoveLink("interview", index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="resource-add-form">
                <input
                  type="text"
                  placeholder="Link label"
                  value={newInterview.label}
                  onChange={(e) =>
                    setNewInterview((v) => ({ ...v, label: e.target.value }))
                  }
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newInterview.url}
                  onChange={(e) =>
                    setNewInterview((v) => ({ ...v, url: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() => handleAddLink("interview")}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </section>

        {/* Checklist */}
        <section>
          <h3>Placement Checklist</h3>
          <ul className="checklist">
            {checklist.map((text, i) => (
              <li key={i} className="checklist-row">
                <label className="checklist-item">
                  <input
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={() => toggleCheck(i)}
                  />
                  <span>{text}</span>
                </label>
                <button
                  type="button"
                  className="checklist-remove-btn"
                  onClick={() => handleRemoveChecklistItem(i)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="checklist-add-form">
            <input
              type="text"
              placeholder="New checklist item"
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
            />
            <button type="button" onClick={handleAddChecklistItem}>
              Add item
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
