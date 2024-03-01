import React, { useState } from "react";
import Clock from "./Clock";
import Settings from "./Settings";
import settingsIco from "../assets/icons/settingsIco.svg";
import homeIco from "../assets/icons/homeIco.svg";

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
        <li>
          <button className="homeButton">
            <img className="homeIco" src={homeIco} alt="Icon" /> Home
          </button>
        </li>
        <li>
          <button onClick={toggleSettings} className="settingsButton">
            <img className="settingsIco" src={settingsIco} alt="Icon" /> Settings
          </button>
        </li>
      </ul>
      {showSettings && <Settings onClose={handleCloseSettings} />}
    </nav>
  );
}

export default Navbar;
