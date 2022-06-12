import "./CountdownTimer.css";
import { useState } from "react";
import { useEffect } from "react";
import {getTimeMs} from './TimerLogic';


const defaultTime = {
    seconds: '00',
    minutes: '00',
    hours: '00'
}

const CountdownTimer = ({CountdownTimerMs}) =>{

    const [remainingTime, setRemainingTime]= useState(defaultTime);

    useEffect(() => {
        const intervalid = setInterval(() => {
            updateRemainingTime(CountdownTimerMs);
        },1000);
        return () => clearInterval(intervalid);
    },[CountdownTimerMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getTimeMs(countdown));

    }
    return(
        <div className="countdowntimer">
            <span>{remainingTime.hours}</span>
            <span>Hours</span>
            <span>{remainingTime.minutes}</span>
            <span>Minutes</span>
            <span>{remainingTime.seconds}</span>
            <span>Seconds</span>
        </div>
    );
}

export default CountdownTimer;