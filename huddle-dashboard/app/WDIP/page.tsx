import Header from "../ui/header";

function getCurrentShift(): 'weekday-day' | 'weekday-evening' | 'weekend' {
    const now = new Date();
    const dayOfWeek = now.getDay()
    const hour = now.getHours()

    console.log(`Date: ${now}`)
    console.log(`Date Day: ${dayOfWeek}`)
    console.log(`Date hour: ${hour}`)

    let shift: 'weekday-day' | 'weekday-evening' | 'weekend'

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        if (hour >= 14) {
            shift = 'weekday-evening'
        } else {
            shift = 'weekday-day'
        }
    } else {
        shift = 'weekend'
    }
    return shift
}

export default function Page() {
    const now = new Date().toLocaleString();
    const shift = getCurrentShift()

    console.log(`shift: ${shift}`)

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
            <div className="flex justify-center text-3xl">
                Date: {now}
            </div>
            <div className="flex justify-center text-3xl mt-10">
                Viewing Shift: {shift.charAt(0).toUpperCase() + shift.slice(1)}
            </div>
        </>
    )
}