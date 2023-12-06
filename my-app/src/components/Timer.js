import React, { useEffect, useState } from "react"

function Timer ({
    isActive,
    setIsActive,
    onExpiration,
    seconds,
    setSeconds,
    initialTime
}) {
    /*created a separate variable in case we want to allow users to set their own times*/
    /*Right now its hard-coded for 25 mins*/


    useEffect(()=> {
        let intervalId

        if (isActive && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds -1)
            }, 1000)
        } else if (seconds === 0) {
            clearInterval(intervalId)
            onExpiration()
        }

        return () => clearInterval(intervalId)
    },[isActive, seconds, onExpiration])
    function resetTimer () {
        setSeconds(initialTime)
        setIsActive(false)
    }

    function toggleTimer() {
        setIsActive((prev) => !prev)
    }

    function formatTime (secs) {
        const minutes = Math.floor(secs / 60)
        const remainingSeconds = secs % 60
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
    }

    return (
        <div>
            <h1>Countdown Timer:</h1>
            <h2>{formatTime(seconds)}</h2>
            <button onClick={toggleTimer}>
                {isActive ? "Pause":"Start"}
            </button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    )
}

export default Timer