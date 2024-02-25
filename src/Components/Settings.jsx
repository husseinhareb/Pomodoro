import React, { useState } from "react";
import Cookies from "js-cookie";

function Settings({ onClose }) {
  const [pomodoroTime, setPomodoroTime] = useState({ minutes: 25, seconds: 0 });

  const handleClose = () => {
    onClose(pomodoroTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    Cookies.set("pomodoroTime", JSON.stringify(pomodoroTime), { sameSite: "None", secure: true });
  };

  const handleMinutesChange = (e) => {
    setPomodoroTime((prevTime) => ({
      ...prevTime,
      minutes: parseInt(e.target.value) || 0
    }));
  };

  const handleSecondsChange = (e) => {
    setPomodoroTime((prevTime) => ({
      ...prevTime,
      seconds: parseInt(e.target.value) || 0
    }));
  };

  return (
    <div className="settings-window">
      <button onClick={handleClose} className="closeSettings">
        X
      </button>
      <hr />
      <h1>Timer Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Pomodoro</h3>
          <label htmlFor="minutes">Minutes:</label>
          <input
            type="number"
            id="minutes"
            placeholder="25"
            className="minutes"
            value={pomodoroTime.minutes}
            onChange={handleMinutesChange}
          />
          <label htmlFor="seconds">Seconds:</label>
          <input
            type="number"
            id="seconds"
            placeholder="00"
            className="seconds"
            value={pomodoroTime.seconds}
            onChange={handleSecondsChange}
          />
        </div>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
}

export default Settings;
