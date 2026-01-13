// src/components/ITResume.jsx
import "../styles/ITTemplate.css";

export default function ITTemplate({ data }) {
  return (
    <div className="it-resume">
      {/* HEADER */}
      <div className="it-header">
        <h1>{data.name || "Your Name"}</h1>
        <h2>{data.role || "Your Role"}</h2>
      </div>

      {/* BODY */}
      <div className="it-body">
        <section>
          <h3>Career Objective</h3>
          <p>{data.summary}</p>
        </section>

        <section>
          <h3>Education</h3>
          <p>{data.education}</p>
        </section>

        <section>
          <h3>Experience</h3>
          <p>{data.experience}</p>
        </section>

        <section>
          <h3>Skills & Certifications</h3>
          <p>{data.certifications}</p>
        </section>

        <section>
          <h3>Contact</h3>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Location: {data.location}</p>
          <p>LinkedIn: {data.linkedin}</p>
        </section>
      </div>
    </div>
  );
}
