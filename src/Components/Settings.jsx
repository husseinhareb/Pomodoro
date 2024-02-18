import React, { useState } from "react";

function Settings({ onClose }) {
  const [pomodoroTime, setPomodoroTime] = useState({ minutes: 25, seconds: 0 });
  const [shortBreakTime, setShortBreakTime] = useState({ minutes: 5, seconds: 0 });
  const [longBreakTime, setLongBreakTime] = useState({ minutes: 15, seconds: 5 });

  const handleClick = () => {
    onClose(pomodoroTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <div className="settings-window">
      <button onClick={handleClick} className="closeSettings">X</button>
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
        {/* Similar input fields for Short Break and Long Break */}
        <button type="submit">Ok</button>
      </form>
    </div>
  );
}

export default Settings;
