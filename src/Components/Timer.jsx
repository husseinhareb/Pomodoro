import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
function Timer() {

  const [defaultPomodoroTime, setDefaultPomodoroTime] = useState({ minutes: 25, seconds: 0 });
  const [shortBreak, setShortBreak] = useState({ minutes: 5, seconds: 0 });
  const [longBreak, setLongBreak] = useState({ minutes: 15, seconds: 0 });
  
  const [time, setTime] = useState(defaultPomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Pomodoro");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [counter, setCounter] = useState(1);

  const [alarmSound] = useState(new Audio('sound/alarm.mp3'));
  const modeOptions = {
    Pomodoro: { time: defaultPomodoroTime, color: "#f55549", boxColor: "#a11b0e" },
    ShortBreak: { time: shortBreak, color: "#496df2", boxColor: "#0e31a1" },
    LongBreak: { time: longBreak, color: "#3da10e", boxColor: "#1ee60b" }
  };

  useEffect(() => {
    let prevPomodoroTime = null;
    let prevShortBreakTime = null;
    let prevLongBreakTime = null;
  
    const handleCookieChange = () => {
      const pomodoroTimeCookie = Cookies.get("pomodoroTime");
      const shortBreakTimeCookie = Cookies.get("shortBreakTime");
      const longBreakTimeCookie = Cookies.get("longBreakTime");
  
      if (pomodoroTimeCookie) {
        const parsedPomodoroTime = JSON.parse(pomodoroTimeCookie);
        if (JSON.stringify(parsedPomodoroTime) !== JSON.stringify(prevPomodoroTime)) {
          setDefaultPomodoroTime(parsedPomodoroTime);
          setTime(parsedPomodoroTime);
          prevPomodoroTime = parsedPomodoroTime;
        }
      }
  
      if (shortBreakTimeCookie) {
        const parsedShortBreakTime = JSON.parse(shortBreakTimeCookie);
        if (JSON.stringify(parsedShortBreakTime) !== JSON.stringify(prevShortBreakTime)) {
          setShortBreak(parsedShortBreakTime);
          setTime(parsedShortBreakTime);
          prevShortBreakTime = parsedShortBreakTime;
        }
      }
  
      if (longBreakTimeCookie) {
        const parsedLongBreakTime = JSON.parse(longBreakTimeCookie);
        if (JSON.stringify(parsedLongBreakTime) !== JSON.stringify(prevLongBreakTime)) {
          setLongBreak(parsedLongBreakTime);
          setTime(parsedLongBreakTime);
          prevLongBreakTime = parsedLongBreakTime;
        }
      }
    };
  
    handleCookieChange();
    const intervalId = setInterval(handleCookieChange, 1000);
    return () => clearInterval(intervalId);
  }, []);
  

  useEffect(() => {
    if (selectedMode && !isRunning) {
      const { time, color, boxColor } = modeOptions[selectedMode];
      setTime(time);
      setBackgroundColor(color);
    }
  }, [selectedMode, isRunning, shortBreak, longBreak, defaultPomodoroTime]);

  useEffect(() => {
    if (time <= 0 && isRunning) {
      handleTimerEnd();
    }
  }, [time, isRunning, selectedMode]);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(intervalId);
            handleTimerEnd();
            return prevTime;
          }
          if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);
  

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const selectMode = (mode) => {
    setSelectedMode(mode);
    setIsRunning(false);
  };

  const startTimer = () => {
    if(isRunning){
      setIsRunning(false);
    }
    else{
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    const { time, color } = modeOptions[selectedMode];
    setTime(time);
    setIsRunning(false);
    setBackgroundColor(color);
  };

  const handleTimerEnd = () => {
    if (selectedMode === 'Pomodoro' && counter < 4) {
      setSelectedMode('ShortBreak');
    } else if (selectedMode === 'ShortBreak' && counter < 4) {
      setCounter(prevCounter => prevCounter + 1);
      setSelectedMode('Pomodoro');
    } else if (selectedMode === 'Pomodoro' && counter === 4) {
      setSelectedMode('LongBreak');
    } else if (selectedMode === 'LongBreak') {
      setSelectedMode('Pomodoro');
      setCounter(1);
    }
    setIsRunning(false);
    playAlarm();
  };

  const minutes = time.minutes;
  const seconds = time.seconds;

  useEffect(() => {
    if(selectedMode === 'Pomodoro'){
    document.title = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} Focus! :|`;
    }
    else if(selectedMode === 'ShortBreak'){
      document.title = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} Short Break! :)`;

    }
    else if(selectedMode === 'LongBreak'){
      document.title = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} Go Outside :D`;
    }
  }, [time]);
  const playAlarm = () =>{
    alarmSound.play();
  }
  return (
    <div className="box">
      <div className="topButtons">
        <button className={`button ${selectedMode === "Pomodoro" ? "selected" : ""}`} onClick={() => selectMode("Pomodoro")}>Pomodoro</button>
        <button className={`button ${selectedMode === "ShortBreak" ? "selected" : ""}`} onClick={() => selectMode("ShortBreak")}>Short Break</button>
        <button className={`button ${selectedMode === "LongBreak" ? "selected" : ""}`} onClick={() => selectMode("LongBreak")}>Long Break</button>

      </div>
      <div className="buttomButtons">
        <span>
          <div className="countdown">{minutes}:</div>
          <button className="start" onClick={startTimer}>
            {isRunning ? "STOP" : "START"}
          </button>
        </span>
        <span>
          <div className="countdown">
            {seconds < 10 ? "0" : ""}
            {seconds}
          </div>
          <button className="reset" onClick={resetTimer}>
            RESET
          </button>
        </span>
        <span>
          <button onClick={handleTimerEnd}>Skip</button>
        </span>
      </div>
    </div>
  );
}

export default Timer;
