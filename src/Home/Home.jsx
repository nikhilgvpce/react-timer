import { useState } from "react";
import "./Home.css";
import Timer from "../Timer/Timer";
import FakeTimer from "../FakeTimer/FakeTimer";

const Home = () => {

    const [timers, setTimers] = useState([]);

    const setNewTimer = (newTimer) => {
        setTimers([
            ...timers,
            { ...newTimer, isCountDown: true, shouldStartTimer: true, isReadOnly: true },
        ])
    }

    return <>
        <div className="fake-timer-wrapper">
            <FakeTimer setTimerCallback={setNewTimer} />
        </div>
        <div className="timer-list">
            {
                timers.map((timer) => {
                    return (
                        <Timer
                            key={timer.timerId}
                            timerId={timer?.timerId}
                            isCountDown={timer?.isCountDown}
                            shouldStartTimer={timer?.shouldStartTimer}
                            hours={timer.hours}
                            minutes={timer.minutes}
                            seconds={timer.seconds}
                        />
                    )
                })
            }
        </div>
    </>
}

export default Home;