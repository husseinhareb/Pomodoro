import React, { useState } from "react";
import Cookies from "js-cookie";

function Settings({ onClose }) {
  const [pomodoroTime, setPomodoroTime] = useState({ minutes: 25, seconds: 0 });
  const [shortBreakTime, setShortBreakTime] = useState({ minutes: 5, seconds: 0 });
  const [longBreakTime, setLongBreakTime] = useState({ minutes: 15, seconds: 0 });

  const handleClose = () => {
    onClose({ pomodoroTime, shortBreakTime, longBreakTime });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    Cookies.set("pomodoroTime", JSON.stringify(pomodoroTime), { sameSite: "None", secure: true });
    Cookies.set("shortBreakTime", JSON.stringify(shortBreakTime), { sameSite: "None", secure: true });
    Cookies.set("longBreakTime", JSON.stringify(longBreakTime), { sameSite: "None", secure: true });
  };

  const handlePomodoroMinutesChange = (e) => {
    setPomodoroTime((prevTime) => ({
      ...prevTime,
      minutes: parseInt(e.target.value) || 0
    }));
  };

  const handlePomodoroSecondsChange = (e) => {
    setPomodoroTime((prevTime) => ({
      ...prevTime,
      seconds: parseInt(e.target.value) || 0
    }));
  };

  const handleShortBreakMinutesChange = (e) => {
    setShortBreakTime((prevTime) => ({
      ...prevTime,
      minutes: parseInt(e.target.value) || 0
    }));
  };

  const handleShortBreakSecondsChange = (e) => {
    setShortBreakTime((prevTime) => ({
      ...prevTime,
      seconds: parseInt(e.target.value) || 0
    }));
  };

  const handleLongBreakMinutesChange = (e) => {
    setLongBreakTime((prevTime) => ({
      ...prevTime,
      minutes: parseInt(e.target.value) || 0
    }));
  };

  const handleLongBreakSecondsChange = (e) => {
    setLongBreakTime((prevTime) => ({
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
          <label htmlFor="pomodoro-minutes">Minutes:</label>
          <input
            type="number"
            id="pomodoro-minutes"
            placeholder="25"
            className="minutes"
            value={pomodoroTime.minutes}
            onChange={handlePomodoroMinutesChange}
          />
          <label htmlFor="pomodoro-seconds">Seconds:</label>
          <input
            type="number"
            id="pomodoro-seconds"
            placeholder="00"
            className="seconds"
            value={pomodoroTime.seconds}
            onChange={handlePomodoroSecondsChange}
          />
        </div>
        <div>
          <h3>Short Break</h3>
          <label htmlFor="shortbreak-minutes">Minutes:</label>
          <input
            type="number"
            id="shortbreak-minutes"
            placeholder="5"
            className="minutes"
            value={shortBreakTime.minutes}
            onChange={handleShortBreakMinutesChange}
          />
          <label htmlFor="shortbreak-seconds">Seconds:</label>
          <input
            type="number"
            id="shortbreak-seconds"
            placeholder="00"
            className="seconds"
            value={shortBreakTime.seconds}
            onChange={handleShortBreakSecondsChange}
          />
        </div>
        <div>
          <h3>Long Break</h3>
          <label htmlFor="longbreak-minutes">Minutes:</label>
          <input
            type="number"
            id="longbreak-minutes"
            placeholder="15"
            className="minutes"
            value={longBreakTime.minutes}
            onChange={handleLongBreakMinutesChange}
          />
          <label htmlFor="longbreak-seconds">Seconds:</label>
          <input
            type="number"
            id="longbreak-seconds"
            placeholder="00"
            className="seconds"
            value={longBreakTime.seconds}
            onChange={handleLongBreakSecondsChange}
          />
        </div>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
}

export default Settings;
