import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Activity.css";

export default function Activity() {
  const navigate = useNavigate();

  const [activityName, setActivityName] = useState("");
  const [points, setPoints] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([]);

  // Load activities from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(saved);
  }, []);

  const addActivity = () => {
    if (!activityName || !points || !date) {
      alert("Please fill all fields");
      return;
    }
    const removeActivity = (id) => {
    const updated = activities.filter((a) => a.id !== id);
  setActivities(updated);
  localStorage.setItem("activities", JSON.stringify(updated));
};

    const newActivity = {
      name: activityName,
      points: Number(points),
      date: date,
    };

    const updatedActivities = [...activities, newActivity];

    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));

    // reset inputs
    setActivityName("");
    setPoints("");
    setDate("");
  };

  // ✅ TOTAL POINTS (THIS IS WHAT YOU ASKED)
 const totalPoints = activities.reduce(
  (sum, activity) => sum + Number(activity.points),
  0
);


  return (
    <div className="activity-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {/* ADD ACTIVITY CARD */}
      <div className="card add-card">
        <h2>Add Activity</h2>

        <input
          placeholder="Activity Name"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addActivity}>Add Activity</button>
      </div>
      <h3 className="total-points">
           Total Activity Points: <span> {totalPoints} </span>
      </h3>
      

      {/* VIEW ACTIVITIES CARD */}
      <div className="card view-card">
        <h2>My Activities</h2>

        {activities.length === 0 && <p>No activities added yet</p>}

        {activities.map((a, index) => (
          <div key={index} className="activity-item">
            <strong>{a.name}</strong>
            <p>Points: {a.points}</p>
            <p>Date: {a.date}</p>
             <button
              className="remove-btn"
              onClick={() => removeActivity(a.id)}
          >
            ❌ Remove
        </button>
          </div>
        ))}
      </div>
    </div>
  );
}
