import Header from "../ui/header";

function getCurrentShift(): 'weekday-day' | 'weekday-evening' | 'weekend' | undefined {
    const now = new Date();
    const dayOfWeek = now.getDay()
    const hour = now.getHours()

    console.log(`Date: ${now}`)
    console.log(`Date Day: ${dayOfWeek}`)
    console.log(`Date hour: ${hour}`)

    if (dayOfWeek !== 0 || 6) {
        if (hour > 1400) {
            'weekday-evening'
        } else {
            'weekday-day'
        } 
    } else {
        return 'weekend'
    }
}

export default function Page() {
    const now = new Date().toLocaleString();
    const shift = getCurrentShift()

    switch (shift) {
        case 'weekday-day':
            // return weekdayDayCoverage
        case 'weekday-evening':
            // return weekdayEveningCoverage
        case 'weekend':
            // return weekendCoverage
    }

    return (
        <>
            <Header title="WDIP"/>
            <h1>Date: {now}</h1>
            
        </>
    )
}