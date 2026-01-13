

export default function CreativeTemplate({ profile }) {
  return (
    <div className="resume creative-resume">
      <header>
        {profile.photo && <img src={profile.photo} alt="profile" />}
        <div>
          <h1>{profile.name}</h1>
          <h3>{profile.role}</h3>
        </div>
      </header>

      <section className="block">
        <h4>ABOUT ME</h4>
        <p>{profile.summary}</p>
      </section>

      <section className="block">
        <h4>EXPERIENCE</h4>
        <p>{profile.experience}</p>
      </section>

      <section className="block">
        <h4>SKILLS</h4>
        <p>{profile.certifications}</p>
      </section>
    </div>
  );
}
