import React, { useState } from "react";
import Clock from "./Clock";
import Settings from "./Settings";

function Navbar() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleCloseSettings = () => {
    setShowSettings(false); // Set showSettings to false to close the settings window
  };

  return (
    <nav className="navbar">
      <ul>
        <li>Pomodoro</li>
        <li>
          <Clock />
        </li>
        <li>Home</li>
        <li>
          <button onClick={toggleSettings} className="settingsButton">
            Settings
          </button>
        </li>
      </ul>
      {showSettings && <Settings onClose={handleCloseSettings} />}
    </nav>
  );
}

export default Navbar;
