import React, { useState, useEffect } from "react";

function Timer() {
    const defaultTime = 25 * 60;
    const [time, setTime] = useState(defaultTime);
    const [isRunning, setIsRunning] = useState(false);
    useEffect(() => {
        if (time <= 0 || !isRunning) return;

        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time, isRunning]);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    useEffect(() => {
        document.title = minutes + ":" + (seconds < 10 ? "0" : "" + seconds);
    }, [time])
    const toggleTimer = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const resetTimer = () => {
        setTime(defaultTime);
        setIsRunning(false);
    };

    return (
        <div className="box">
            <span>
                <div className="countdown">{minutes}:</div>
                <button className="start" onClick={toggleTimer}>{isRunning ? 'STOP' : 'START'}</button>

            </span>
            <span>
                <div className="countdown">{seconds < 10 ? "0" : ""}{seconds}</div>
                <button className="reset" onClick={resetTimer}>RESET</button>
            </span>
        </div>
    );
}

export default Timer;