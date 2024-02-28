import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Timer() {
  const [defaultTime, setDefaultTime] = useState();
  const [time, setTime] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Pomodoro");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [counter, setCounter] = useState(1);

  const modeOptions = {
    Pomodoro: { time: 25, color: "#f55549", boxColor: "#a11b0e" },
    ShortBreak: { time: 5, color: "#496df2", boxColor: "#0e31a1" },
    LongBreak: { time: 15, color: "#3da10e", boxColor: "#1ee60b" }
  };

  useEffect(() => {
    let prevPomodoroTime = null;  
    const handleCookieChange = () => {
      const pomodoroTimeCookie = Cookies.get("pomodoroTime");
      if (pomodoroTimeCookie) {
        const parsedPomodoroTime = JSON.parse(pomodoroTimeCookie);
        if (JSON.stringify(parsedPomodoroTime) !== JSON.stringify(prevPomodoroTime)) {
          setTime(parsedPomodoroTime.minutes * 60 + parsedPomodoroTime.seconds);
          console.log(parsedPomodoroTime); 
          prevPomodoroTime = parsedPomodoroTime;
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
      setDefaultTime(time * 60); 
      setTime(time * 60);
      setBackgroundColor(color);
    }
  }, [selectedMode, isRunning]);

    useEffect(() => {
        if (time <= 0 && isRunning) {
            handleTimerEnd();
        }
    }, [time, isRunning, selectedMode]);

    useEffect(() => {
        if (isRunning && time > 0) {
            const intervalId = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [time, isRunning]);

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
    }, [backgroundColor]);

    const selectMode = (mode) => {
        setSelectedMode(mode);
        setIsRunning(false);
    };

    const startTimer = () => {
        setIsRunning(true);
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
        }
        else if (selectedMode === 'LongBreak') {
            setSelectedMode('Pomodoro');
            setCounter(1);
        }
        setIsRunning(false);
        console.log(counter);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        document.title = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }, [time]);

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
