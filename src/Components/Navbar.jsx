import React, { useState } from "react";
import Clock from "./Clock";
import Settings from "./Settings";

function Navbar() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <nav className="navbar">
      <ul className="left-items">
        <li className="pomodoroName">Pomodoro</li>
        <li>
          <Clock />
        </li>
      </ul>
      <ul className="right-items">
        <li>Home</li>
        <li>
          <button onClick={toggleSettings} className="settingsButton">
            Settings
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
