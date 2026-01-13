import "../styles/NONITTemplate.css";

export default function NONITTemplate({ data }) {
  return (
    <div className="nonit-resume">
      <header className="nonit-header">
        <h1>{data.name || "Your Name"}</h1>
        <p className="nonit-role">{data.role || "Your Role"}</p>

        <div className="nonit-contact">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          <span>{data.linkedin}</span>
        </div>
      </header>

      <section>
        <h2>Career Objective</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2>Education</h2>
        <p>{data.education}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>{data.experience}</p>
      </section>

      <section>
        <h2>Skills & Certifications</h2>
        <p>{data.certifications}</p>
      </section>
    </div>
  );
}
