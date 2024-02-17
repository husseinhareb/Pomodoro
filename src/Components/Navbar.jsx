import React from "react";
import Clock from "./Clock";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>Pomodoro</li>
        <li><Clock /></li>
        <li>Home</li>
        <li>Settings</li>
      </ul>
    </nav>
  );
}

export default Navbar;
