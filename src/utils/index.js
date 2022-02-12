const formatTime = (timeLeft, minutesRef) => {
    minutesRef.current = (timeLeft / 60).toString()[0]
    if (timeLeft === 300 || timeLeft === 0) {
        return `${minutesRef.current}:00`
    }
    
    else {
        return `${minutesRef.current}:${timeLeft % 60}`
    }
}

export default formatTime;