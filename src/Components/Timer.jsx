import React, { useState, useEffect } from "react";

function Timer() {
    const [defaultTime, setDefaultTime] = useState(); 
    const [time, setTime] = useState(defaultTime);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedMode, setSelectedMode] = useState("Pomodoro"); 
    const [backgroundColor, setBackgroundColor] = useState("");
    const [counter, setCounter] = useState(1); 

    const modeOptions = {
        Pomodoro: { time: 1, color: "#f55549", boxColor: "#a11b0e" },
        ShortBreak: { time: 2, color: "#496df2", boxColor: "#0e31a1" },
        LongBreak: { time: 1, color: "#3da10e", boxColor: "#1ee60b" }
    };

    useEffect(() => {
        if (selectedMode && !isRunning) {
            const { time, color, boxColor } = modeOptions[selectedMode];
            setDefaultTime(time);
            setTime(time);
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
        if (selectedMode === 'Pomodoro' && counter <4) {
            setSelectedMode('ShortBreak');
        } else if (selectedMode === 'ShortBreak' && counter < 4) {
            setCounter(prevCounter => prevCounter + 1);
            setSelectedMode('Pomodoro');
        } else if (selectedMode === 'Pomodoro' && counter === 4) {
            setSelectedMode('LongBreak');
        }
        else if(selectedMode === 'LongBreak'){
            setSelectedMode('Pomodoro');
            setCounter(0); 
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
                <button onClick={() => selectMode("Pomodoro")}>Pomodoro</button>
                <button onClick={() => selectMode("ShortBreak")}>Short Break</button>
                <button onClick={() => selectMode("LongBreak")}>Long Break</button>
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
