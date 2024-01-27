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
        const extraProps = {
            isCountDown: false,
            isCountUp: true,
            shouldStartTimer: true,
            isReadOnly: true,
            label: `counte-down-timer-${worldTimers.length + 1}`
        }
        setWorldTimers([
            ...worldTimers,
            { ...newTimer, ...extraProps },
        ])
    }

    const getTimers = (timers) => {
        return timers.map((timer) => {
            return (
                <>
                    <span>{timer.label}</span>
                    <Timer
                        key={timer.timerId}
                        isCountDown={timer?.isCountDown}
                        isCountUp={timer?.isCountUp}
                        shouldStartTimer={timer?.shouldStartTimer}
                        hours={timer.hours}
                        minutes={timer.minutes}
                        seconds={timer.seconds}
                    />
                </>
            )
        })
    }

    return <>
        <div className="fake-timer-wrapper">
            <FakeTimer setTimerCallback={setNewTimer} />
        </div>
        <div className="timer-list">
            {
                getTimers(timers)
            }
        </div>
        <div className="world-clock">
            <WorldClock setTimeForTimeZone={setNewWorldTimer} />
            <div className="timer-list">
                {
                    getTimers(worldTimers)
                }
            </div>
        </div>
    </>
}

export default Home;