import React from "react";
import { Link } from "react-router-dom";
import Clock from "./Clock";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Pomodoro</Link></li>
        <li><Clock /></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
