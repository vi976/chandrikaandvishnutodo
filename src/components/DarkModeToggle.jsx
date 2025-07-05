import { useEffect, useState } from "react";
import "./DarkModeToggle.css";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkmode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("darkmode", darkMode);
    localStorage.setItem("darkmode", darkMode);
  }, [darkMode]);

  const handleChange = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="dark-toggle">
      <span className="icon">{darkMode ? "🌙" : "☀️"}</span>
      <input
        type="checkbox"
        id="toggle"
        checked={darkMode}
        onChange={handleChange}
      />
      <label htmlFor="toggle" className="switch"></label>
      <span className="label-text">{darkMode ? "Dark Mode" : "Light Mode"}</span>
    </div>
  );
}

export default DarkModeToggle;
