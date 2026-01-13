import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CgpaCalculator.css";

export default function CgpaCalculator() {
  const navigate = useNavigate();

  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([
  { name: "", grade: "", credits: "" }
]);
  const [sgpa, setSgpa] = useState(null);
  const [records, setRecords] = useState([]);

  /* ---------- Load saved semesters ---------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cgpaRecords")) || [];
    setRecords(saved);
  }, []);
  useEffect(() => {
  const savedSubjects = localStorage.getItem("ocrSubjects");
  if (savedSubjects) {
    const parsed = JSON.parse(savedSubjects);

    const mapped = parsed.map((s) => ({
      name: s.subject,
      credits: s.credits,
      grade: marksToGrade(s.marks),
    }));

    setSubjects(mapped);
  }
}, []);
const marksToGrade = (marks) => {
  if (marks >= 90) return "O";
  if (marks >= 80) return "Aplus";
  if (marks >= 70) return "A";
  if (marks >= 60) return "Bplus";
  if (marks >= 50) return "B";
  if (marks >= 40) return "C";
  return "F";
};

  /* ---------- Helpers ---------- */
  const gradeToPoints = (grade) => {
    const map = {
      O: 10,
      Aplus: 9,
      A: 8,
      Bplus: 7,
      B: 6,
      C: 5,
      F: 0,
    };
    return map[grade] || 0;
  };

  /* ---------- Subject controls ---------- */

  const addSubject = () => {
  setSubjects([...subjects, { name: "", grade: "", credits: "" }]);
};


  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  /* ---------- Calculate SGPA only ---------- */
  const calculateSgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((s) => {
      const points = gradeToPoints(s.grade);
      const credits = Number(s.credits);
      totalPoints += points * credits;
      totalCredits += credits;
    });

    if (totalCredits === 0) return;
    setSgpa((totalPoints / totalCredits).toFixed(2));
  };

  /* ---------- Finalize semester ---------- */
  const finalizeSemester = () => {
    if (!semester || sgpa === null) return;

    const updated = records.filter(r => r.semester !== semester);
    const newRecords = [...updated, { semester, sgpa: Number(sgpa) }];

    setRecords(newRecords);
    localStorage.setItem("cgpaRecords", JSON.stringify(newRecords));
    setSemester("");
    setSubjects([{ grade: "", credits: "" }]);
    setSgpa(null);
  };

  /* ---------- Delete semester ---------- */
  const deleteSemester = (sem) => {
    const updated = records.filter(r => r.semester !== sem);
    setRecords(updated);
    localStorage.setItem("cgpaRecords", JSON.stringify(updated));
  };

  /* ---------- Auto CGPA ---------- */
  const cgpa =
    records.length > 0
      ? (
          records.reduce((sum, r) => sum + r.sgpa, 0) / records.length
        ).toFixed(2)
      : null;

  return (
    <div className="cgpa-container">

      <div className="back-btn-wrapper">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="cgpa-glass">
        <h1 className="cgpa-title">CGPA / SGPA Calculator</h1>

        {/* Semester input */}
        <input
          className="semester-input"
          placeholder="Semester (e.g. 3)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        {subjects.map((sub, index) => (
  <div className="cgpa-row" key={index}>
    <input
      type="text"
      placeholder="Subject Name"
      value={sub.name}
      onChange={(e) =>
        handleChange(index, "name", e.target.value)
      }
    />

    <select
      value={sub.grade}
      onChange={(e) =>
        handleChange(index, "grade", e.target.value)
      }
    >
      <option value="">Grade</option>
      <option value="O">O (10)</option>
      <option value="Aplus">A+ (9)</option>
      <option value="A">A (8)</option>
      <option value="Bplus">B+ (7)</option>
      <option value="B">B (6)</option>
      <option value="C">C (5)</option>
      <option value="F">F (0)</option>
    </select>

    <input
      type="number"
      placeholder="Credits"
      value={sub.credits}
      min="1"
      onChange={(e) =>
        handleChange(index, "credits", e.target.value)
      }
    />
  </div>
))}


        <button className="add-btn" onClick={addSubject}>
          + Add Subject
        </button>

        <button className="calc-btn" onClick={calculateSgpa}>
          Calculate SGPA
        </button>

        {sgpa && (
          <>
            <div className="cgpa-result">
              SGPA: <strong>{sgpa}</strong>
            </div>

            <button className="finalize-btn" onClick={finalizeSemester}>
              Finalize Semester
            </button>
          </>
        )}

        {/* Stored semesters */}
        {records.length > 0 && (
          <div className="cgpa-history">
            <h3>Saved Semesters</h3>

            {records.map((r) => (
              <div className="cgpa-item" key={r.semester}>
                <span>Semester {r.semester} | </span>
                <span>SGPA: {r.sgpa}</span>
                <button onClick={() => deleteSemester(r.semester)}>✕</button>
              </div>
            ))}

            <div className="cgpa-result">
              Final CGPA: <strong>{cgpa}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
