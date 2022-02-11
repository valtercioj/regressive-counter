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

    const startTime = () => {
        minutesRef.current = (timeLeft / 60).toString()[0]
        if (timeLeft === 300) {
            return `${minutesRef.current}:00`
        }
        else {
            return `${minutesRef.current}:${timeLeft % 60}`
        }
    }
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
        setButtonText("Start");
        setTimeLeft(TOTAL_COUNTER_TIME);
    }

    const calculateFraction = () => {
        return timeLeft / TOTAL_COUNTER_TIME;
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
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray={(calculateFraction() * 283).toFixed(0) + " 283"}
                        className="base-timer__path-remaining"
                        d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">
                {startTime()}
                <button onClick={handleClick}>{buttonText}</button>
            </span>

        </>
    );
}