import { useEffect, useState } from "react";
import "./WorldClock.css"
import LoadingScreen from "../Loader/Loader";

const fetchTimeFromTimeZone = async (timezone) => {
    const url = "https://worldtimeapi.org/api/timezone/";
    try {
        const timezoneUrl = url + `${timezone}`;
        const rawAreaData = await fetch(timezoneUrl);
        const jsonAreaData = await rawAreaData.json();
        console.log('jsonAreaData.datetime', jsonAreaData.datetime)
        return jsonAreaData.datetime
    } catch (err) {
        console.error(err)
    }
}

const parsedTime = (worldTime) => {
    const [hours, minutes, seconds] = worldTime.split('T')[1].split('.')[0].split(':');
    return {
        hours: +hours,
        minutes: +minutes,
        seconds: +seconds
    }
}


const WorldClock = ({setTimeForTimeZone}) => {

    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [timezoneOptions, setTimezoneOptions] = useState([]);
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        if (!selectedTimeZone) return;
        async function getTimeFromTimeZone() {
            setLoading(true)
            const response = await fetchTimeFromTimeZone(selectedTimeZone)
            const { hours, minutes, seconds } = parsedTime(response);
            const callBackParams = {
                timerId: crypto.randomUUID(), 
                hours, 
                minutes, 
                seconds, 
                label: `selected time zone ${selectedTimeZone}`
            }
            setTimeForTimeZone(callBackParams)
            setLoading(false)
        }
        getTimeFromTimeZone()
    }, [selectedTimeZone])



    useEffect(() => {
        async function fetchTimeZones() {
            const url = "https://worldtimeapi.org/api/timezone";
            const rawData = await fetch(url);
            const json = await rawData.json();
            setTimezoneOptions(json);
        }
        fetchTimeZones();
    }, [])

    const handleTimeZoneChange = (e) => {
        setSelectedTimeZone(e.target.value)
    }
    return (
        <>
            <hr></hr>
            <LoadingScreen isLoading={isLoading} />
            <label for="timezone-select">Choose a timezone:</label>
            <select disabled={isLoading} onChange={handleTimeZoneChange} value={selectedTimeZone}>
                <option value="">--Please choose an option--</option>
                {
                    timezoneOptions.map((timezone) => {
                        return (
                            <option value={timezone}>{timezone}</option>
                        )
                    })
                }
            </select></>
    )
}


export default WorldClock