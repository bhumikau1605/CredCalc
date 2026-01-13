import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">CredCalc</h2>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Resume</a></li>
        <li><a href="#">Uploads</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
