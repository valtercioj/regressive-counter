import { React, useState, useEffect, useRef} from "react";
import Cicle from "../Cicle";
import formatTime from "../../utils";
import Modal from '../Modal'
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
    const [modal, setModal] = useState(false)
    const minutesRef = useRef(null)
    
   
    const handleClick = () => {
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

    const startCounter = () => {
        setButtonText("Pause");
        setTimeLeft((previous) => previous - 1);
    }

    const pauseCounter = () => {
        setButtonText("Start");
        clearTimeout(timerTimeout);
    }

    const resetCounter = () => {
        setModal(false)
        setButtonText("Start");
        setTimeLeft(TOTAL_COUNTER_TIME);
    }

    
    useEffect(() => {
        if (buttonText !== BUTTON_TEXTS.PAUSE) return;

        if (timeLeft > 0) {
            
            timerTimeout = setTimeout(() => {
                setTimeLeft((previous) => previous - 1);
            }, 10);
        } else {
            setButtonText("Reset");
            new Audio('./assets/audio/notification.mp3').play()
            setModal(true)
        }

        return () => timerTimeout && clearTimeout(timerTimeout);
    }, [timeLeft, buttonText]);

    return (
        <>
        
        {modal? <Modal />:null}
        
            <Cicle timeLeft={timeLeft} TOTAL_COUNTER_TIME={TOTAL_COUNTER_TIME}/>
            
            <span id="base-timer-label" className="base-timer__label">
                {formatTime(timeLeft, minutesRef)}

                <button onClick={handleClick} className="base-timer-button">{buttonText}</button>
            </span>

        </>
    );
}