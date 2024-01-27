import { useState } from "react"
import Input from "../UIComponents/Input/Input"

export const FakeTimer = ({ setTimerCallback }) => {

    const [time, setFakeTime] = useState({
        timerId: null,
        hours: '',
        minutes: '',
        seconds: ''
    })

    const handleClick = () => {
        setTimerCallback({
            timerId: crypto.randomUUID(),
            ...time
        })
        setFakeTime(() => {
            return {
                timerId: null,
                hours: '',
                minutes: '',
                seconds: ''
            }
        })
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        const className = e.target.className;
        setFakeTime({
            ...time,
            [className]: value
        })
    }

    const inputs = [
        {
            class: 'hours',
            placeholder: 'enter hours',
            value: time?.hours
        },
        {
            class: 'minutes',
            placeholder: 'enter minutes',
            value: time?.minutes
        },
        {
            class: 'seconds',
            placeholder: 'enter seconds',
            value: time?.seconds
        },
    ]

    return (
        <div onChange={handleInputChange}>
            {
                inputs.map(input => <Input type={'number'} placeholder={input.placeholder} className={input.class} value={input.value} />)
            }
            <button onClick={handleClick}>Start Cout down</button>
        </div>
    )
}

export default FakeTimer;