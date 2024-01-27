import { memo, useEffect, useMemo, useReducer, useState } from "react";
import Input from "../UIComponents/Input/Input";

const initialState = {
    hours: '',
    minutes: '',
    seconds: '',
    totalTimeinMs: 0
}


const reducer = (state = { initialState }, action = { type: null, payload: '' }) => {
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

const Timer = ({ hours, minutes, seconds, isCountDown, isCountUp, shouldStartTimer, isReadOnly }) => {

    const getInitialState = () => {
        return {
            hours, minutes, seconds, isCountDown, isCountDown, shouldStartTimer
        }
    }

    const [timer, dispatch] = useReducer(reducer, {}, getInitialState);

    const countDownTimer = () => {
        let currentSeconds = timer.seconds;
        let currentMinutes = timer.minutes;
        let currentHours = timer.hours;
        const intervalId = setInterval(() => {
            currentSeconds = currentSeconds - 1;
            if (timer.hours === 0 && timer.minutes == 0 && currentSeconds < 0) {
                clearInterval(intervalId);
                intervalId = null;
                return;
            }
            if (currentSeconds < 0) {
                currentSeconds = 59;
                if (currentMinutes > 0) {
                    currentMinutes = currentMinutes - 1;
                } else if (currentMinutes == 0) {
                    currentMinutes = 59;
                    if (currentHours > 0) {
                        currentHours = currentHours - 1;
                        dispatch({
                            type: 'SET_HOURS',
                            payload: currentHours
                        })
                    } else if(currentHours == 0) {
                        clearInterval(intervalId);
                        return;
                    }
                }
                dispatch({
                    type: 'SET_MINUTES',
                    payload: currentMinutes
                })
            }
            dispatch({
                type: 'SET_SECONDS',
                payload: currentSeconds
            })
        }, 1000)
        return intervalId
    }


    const countUpTimer = () => {
        let currentSeconds = timer.seconds;
        let currentMinutes = timer.minutes;
        let currentHours = timer.hours;
        const intervalId = setInterval(() => {

            currentSeconds = currentSeconds + 1;
            if (currentSeconds == 60) {
                currentSeconds = 0;
                if (currentMinutes < 59) {
                    currentMinutes = currentMinutes + 1;
                } else if (currentMinutes == 59) {
                    currentMinutes = 0;
                    if (currentHours < 12) {
                        currentHours = currentHours + 1;
                    } else if (currentHours == 12) {
                        currentHours = 1;
                    }
                    dispatch({
                        type: 'SET_HOURS',
                        payload: currentHours
                    })
                }
                dispatch({
                    type: 'SET_MINUTES',
                    payload: currentMinutes
                })
            }
            dispatch({
                type: 'SET_SECONDS',
                payload: currentSeconds
            })
            return intervalId;
        }, 1000)
    }


    useEffect(() => {
        let intervalId = null;
        if (!shouldStartTimer) {
            return;
        }
        if (isCountDown) {
            intervalId = countDownTimer()
        } else if (isCountUp) {
            intervalId = countUpTimer()
        }
        return () => {
            clearInterval(intervalId);
            intervalId = null;
        }
    }, [shouldStartTimer, isCountDown])

    return (
        <>
            <Input placeholder={'enter hours'} value={timer.hours} isReadOnly={isReadOnly} />
            <Input placeholder={'enter minutes'} value={timer.minutes} isReadOnly={isReadOnly} />
            <Input placeholder={'enter seconds'} value={timer.seconds} isReadOnly={isReadOnly} />
        </>

    )
}

export default Timer;