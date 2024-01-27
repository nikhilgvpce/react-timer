import { useEffect, useState } from "react";

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
        hours: +hours > 12 ? +hours - 12 : +hours,
        minutes: +minutes,
        seconds: +seconds
    }
}


const WorldClock = ({setTimeForTimeZone}) => {

    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [timezoneOptions, setTimezoneOptions] = useState([]);


    useEffect(() => {
        if (!selectedTimeZone) return;
        async function getTimeFromTimeZone() {
            const response = await fetchTimeFromTimeZone(selectedTimeZone)
            const { hours, minutes, seconds } = parsedTime(response);
            console.info(hours, minutes, seconds);
            setTimeForTimeZone({timerId: crypto.randomUUID(), hours, minutes, seconds})
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
            <label for="timezon-select">Choose a timezone:</label>
            <select onChange={handleTimeZoneChange} value={selectedTimeZone}>
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