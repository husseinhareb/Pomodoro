import React, { useState, useEffect } from "react";

function Timer() {
    const [defaultTime, setDefaultTime] = useState(3 * 60); // Initial default time is 3 minutes
    const [time, setTime] = useState(defaultTime);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedMode, setSelectedMode] = useState(""); // Track the selected timer mode

    const modeOptions = {
        Pomodoro: 8,
        ShortBreak: 5,
        LongBreak: 7 
    };

    useEffect(() => {
        if (selectedMode && !isRunning) {
            setDefaultTime(modeOptions[selectedMode]);
            setTime(modeOptions[selectedMode]);
        }
    }, [selectedMode, isRunning]);

    useEffect(() => {
        if (time <= 0 && isRunning) {
            if (selectedMode === "Pomodoro") {
                setSelectedMode("ShortBreak");
            } else {
                setSelectedMode("Pomodoro");
            }
            setIsRunning(false);
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

    const selectMode = (mode) => {
        setSelectedMode(mode);
        setIsRunning(false); // Stop the timer when the mode is changed
    };

    const startTimer = () => {
        setIsRunning(true);
    };

    const resetTimer = () => {
        setTime(modeOptions[selectedMode]);
        setIsRunning(false);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        document.title = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }, [time]);

    return (
        <div className="box">
            <div className="topButtons">
                <button onClick={() => selectMode("Pomodoro")}>Pomodoro</button>
                <button onClick={() => selectMode("ShortBreak")}>Short Break</button>
                <button onClick={() => selectMode("LongBreak")}>Long Break</button>
            </div>
            <div className="bottomButtons">
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
            </div>
        </div>
    );
}

export default Timer;
