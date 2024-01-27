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
        <FakeTimer setTimerCallback={setNewTimer} />
        <div className="timer-wrapper">
            {
                timers.map((timer) => {
                    return (
                        <div key={timer.timerId}>
                            <Timer
                                timerId={timer?.timerId}
                                isCountDown={timer?.isCountDown}
                                shouldStartTimer={timer?.shouldStartTimer}
                                hours={timer.hours}
                                minutes={timer.minutes}
                                seconds={timer.seconds}
                            />
                        </div>
                    )
                })
            }
        </div>
    </>
}

export default Home;