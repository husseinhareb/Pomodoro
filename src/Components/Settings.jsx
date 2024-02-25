import React, { useState } from "react";
import Cookies from "js-cookie";

function Settings({ onClose }) {
  const [pomodoroTime, setPomodoroTime] = useState({ minutes: 25, seconds: 0 });

  const handleClick = () => {
    onClose(pomodoroTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClick();
    Cookies.set("pomodoroTime", JSON.stringify(pomodoroTime), { sameSite: "None", secure: true });
};


  return (
    <div className="settings-window">
      <button onClick={handleClick} className="closeSettings">
        X
      </button>
      <hr />
      <h1>Timer Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Pomodoro</h3>
          <input
            type="number"
            placeholder="25"
            className="minutes"
            value={pomodoroTime.minutes}
            onChange={(e) =>
              setPomodoroTime({ ...pomodoroTime, minutes: parseInt(e.target.value) || 0 })
            }
          />
          <input
            type="number"
            placeholder="00"
            className="seconds"
            value={pomodoroTime.seconds}
            onChange={(e) =>
              setPomodoroTime({ ...pomodoroTime, seconds: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
}

export default Settings;
