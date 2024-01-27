import { useState, useEffect } from "react";

function Timer()
{
    const [time,setTime] = useState(25*60);
    const [isRunning,setIsRunning] = useState(false);
    useEffect(() => {
        if(time <= 0 || !isRunning) return ;

        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
          }, 1000);
      
          return () => clearInterval(intervalId);
        }, [time,isRunning]); 
      
        const minutes = Math.floor(time /60);
        const seconds = time % 60;

        const toggleTimer = () => {
            setIsRunning((prevIsRunning)=> !prevIsRunning);
        }

        return (
            <div>
            <div className="countdown">{minutes}:{seconds < 10 ? "0" : ""}{seconds}</div>
            <button className="start" onClick={toggleTimer} >{isRunning ? 'STOP':'START'}</button>
            </div>
        )
}

export default Timer;