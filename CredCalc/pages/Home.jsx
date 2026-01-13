import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {

  const text = "Your Digital Portfolio";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;

      if (index > text.length) {
        clearInterval(interval);
      }
    }, 120); // typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-container">
      <div className="home-overlay"></div>

      <div className="home-content fade-in">

        <h1 className="typing-title">
          {displayText}
          <span className="cursor">|</span>
        </h1>

        <p className="home-subtitle">
          Build your profile, upload certificates, track activity points,
          calculate CGPA, and generate a professional resume — all in one place.
        </p>

        <div className="home-buttons">
          <Link to="/login">
            <button className="home-btn primary">Login</button>
          </Link>

          <Link to="/signup">
            <button className="home-btn secondary">Sign Up</button>
          </Link>
        </div>

      </div>
    </section>
  );
}
