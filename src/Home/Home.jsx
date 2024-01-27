import { useState } from "react";
import "./Home.css";
import Timer from "../Timer/Timer";
import FakeTimer from "../FakeTimer/FakeTimer";
import WorldClock from "../WorldClock/WorldClock";

const Home = () => {

    const [timers, setTimers] = useState([]);

    const [worldTimers, setWorldTimers] = useState([]);

    const setNewTimer = (newTimer) => {
        setTimers([
            ...timers,
            { ...newTimer, isCountDown: true, shouldStartTimer: true, isReadOnly: true },
        ])
    }

    const setNewWorldTimer = (newTimer) => {
        setWorldTimers([
            ...worldTimers,
            { ...newTimer, isCountDown: false, isCountUp: true, shouldStartTimer: true, isReadOnly: true },
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
        <div className="world-clock">
            <WorldClock setTimeForTimeZone={setNewWorldTimer} />
            <div className="timer-list">
                {
                    worldTimers.map((timer) => {
                        return (
                            <Timer
                                key={timer.timerId}
                                isCountDown={timer?.isCountDown}
                                isCountUp={timer?.isCountUp}
                                shouldStartTimer={timer?.shouldStartTimer}
                                hours={timer.hours}
                                minutes={timer.minutes}
                                seconds={timer.seconds}
                            />
                        )
                    })
                }
            </div>
        </div>
    </>
}

export default Home;