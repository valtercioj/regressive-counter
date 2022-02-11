import { React, useState, useEffect, useRef } from "react";

const TOTAL_COUNTER_TIME = 300; // seconds

const BUTTON_TEXTS = {
  START: "Start",
  PAUSE: "Pause",
  RESET: "Reset"
};

let timerTimeout = null;

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_COUNTER_TIME);
  const [buttonText, setButtonText] = useState(BUTTON_TEXTS.START);
  const minutesRef = useRef(null)
  const startTime = ()=>{
      minutesRef.current = (timeLeft/60).toString()[0]
      if(timeLeft==300){
          return `${minutesRef.current}:00`
      }
      else{
          return `${minutesRef.current}:${timeLeft%60}`
      }
  }
  const handleClick= ()=> {
    switch (buttonText) {
      case BUTTON_TEXTS.START:
        return startCounter();
      case BUTTON_TEXTS.PAUSE:
        return pauseCounter();
      case BUTTON_TEXTS.RESET:
        return resetCounter();
      default:
        return;
    }
  }

  const startCounter= () =>{
    setButtonText("Pause");
    setTimeLeft((previous) => previous - 1);
  }

  const pauseCounter = () =>{
    setButtonText("Start");
    clearTimeout(timerTimeout);
  }

  const resetCounter = () => {
    setButtonText("Start");
    setTimeLeft(TOTAL_COUNTER_TIME);
  }

  useEffect(() => {
    if (buttonText !== BUTTON_TEXTS.PAUSE) return;

    if (timeLeft > 0) {
      timerTimeout = setTimeout(() => {
        setTimeLeft((previous) => previous - 1);
      }, 1000);
    } else {
      setButtonText("Reset");
    }

    return () => timerTimeout && clearTimeout(timerTimeout);
  }, [timeLeft, buttonText]);

  return (
    <>
      <button onClick={handleClick}>{buttonText}</button>
      {startTime()}
    </>
  );
}