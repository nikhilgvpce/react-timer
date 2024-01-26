import { useEffect, useReducer, useState } from "react";
import Input from "../UIComponents/Input/Input";

const initialState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalTimeinMs: 0
}

const Timer = ({ shouldStartTimer }) => {


    const reducer = (state = { initialState }, action = { type: null, payload: {} }) => {
        switch (action.type) {
            case 'SET_HOURS':
                return {
                    ...state,
                    hours: action.payload
                }
            case 'SET_MINUTES':
                return {
                    ...state,
                    minutes: action.payload
                }
            case 'SET_SECONDS':
                return {
                    ...state,
                    seconds: action.payload
                }
        }
    }

    const [timer, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        let intervalId = setInterval(() => {
            let currentSeconds = timer.seconds;
            currentSeconds = currentSeconds - 1;
            let currentMinutes = timer.minutes;
            let currentHours = timer.hours;
            if (currentHours === 0 && currentMinutes == 0 && currentSeconds < 0) {
                clearInterval(intervalId);
                intervalId = null;
                return;
            }
            if (currentSeconds < 0) {
                currentSeconds = 59;
                if (currentMinutes > 0) {
                    dispatch({
                        type: 'SET_SECONDS',
                        payload: currentSeconds
                    })
                    dispatch({
                        type: 'SET_MINUTES',
                        payload: currentMinutes - 1
                    })
                } else if (currentMinutes == 0) {
                    currentMinutes = 59
                    if (currentHours >= 1) {
                        dispatch({
                            type: 'SET_HOURS',
                            payload: currentHours - 1
                        })
                        dispatch({
                            type: 'SET_MINUTES',
                            payload: currentMinutes
                        })
                        dispatch({
                            type: 'SET_SECONDS',
                            payload: currentSeconds
                        })
                    }
                }
            } else {
                dispatch({
                    type: 'SET_SECONDS',
                    payload: currentSeconds
                })
            }
        }, 1000)
    }, [shouldStartTimer])

    const handleHours = (e) => {
        dispatch({
            type: 'SET_HOURS',
            payload: Number(e.target.value)
        })
    }

    const handleMinutes = (e) => {
        dispatch({
            type: 'SET_MINUTES',
            payload: Number(e.target.value)
        })
    }

    const handleSeconds = (e) => {
        dispatch({
            type: 'SET_SECONDS',
            payload: Number(e.target.value)
        })
    }

    return (
        <>
            <Input placeholder={'enter hours'} value={timer.hours} onChange={handleHours} />
            <Input placeholder={'enter minutes'} value={timer.minutes} onChange={handleMinutes} />
            <Input placeholder={'enter seconds'} value={timer.seconds} onChange={handleSeconds} />
        </>

    )
}

export default Timer;