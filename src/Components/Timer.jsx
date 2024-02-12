import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';

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
        document.title = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }, [time])
    const toggleTimer = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const resetTimer = () => {
        setTime(defaultTime);
        setIsRunning(false);
    };

    const addMinute = () => {

        if (!isRunning) {
            setTime((prevTime) => prevTime + 60);
        }
    };
    const addSecond = () => {
        if (!isRunning) {
            setTime((prevTime) => prevTime + 1);
        }
    }
    const substractMinute = () => {
        if (!isRunning) {
            setTime((prevTime) => prevTime - 60);
        }
    }
    const substractSecond = () => {
        if (!isRunning) {
            setTime((prevTime) => prevTime - 1);
        }
    }
    return (
        <div className="box">
            <span>
                <button className="addMinute" onClick={addMinute}><i className="fas fa-plus"></i></button>
                <div className="countdown">{minutes}:</div>
                <button className="addMinute" onClick={substractMinute}><i className="fas fa-minus"></i></button><br></br>
                <button className="start" onClick={toggleTimer}>{isRunning ? 'STOP' : 'START'}</button>

            </span>
            <span>
                <button className="addSecond" onClick={addSecond}><i className="fas fa-plus"></i></button>
                <div className="countdown">{seconds < 10 ? "0" : ""}{seconds}</div>
                <button className="addSecond" onClick={substractSecond}><i className="fas fa-minus"></i></button><br></br>
                <button className="reset" onClick={resetTimer}>RESET</button>
            </span>
        </div>
    );
}

export default Timer;
