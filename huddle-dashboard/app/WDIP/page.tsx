import Header from "../ui/header";
import Search from "../ui/search";

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
            {/* <Header title="WDIP"/> */}
            <div className="mt-20">
                <div className="flex justify-center mt-10">
                    <Search placeholder={"Enter a service"} />
                </div>
                {/* <div className="flex justify-center text-3xl">
                    Date: {now}
                </div> */}
                <div className="flex justify-center text-3xl mt-20">
                    Current Staffing Schedule: {shift.charAt(0).toUpperCase() + shift.slice(1)}
                </div>
                <table className="flex justify-center mt-20">
                    <tbody className="rounded-2xl overflow-hidden border border-gray-400/50">
                        <tr>
                        <td className="border-r border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Indiana</td>
                        <td className="border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Indianapolis</td>
                        </tr>
                        <tr>
                        <td className="border-r border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Ohio</td>
                        <td className="border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Columbus</td>
                        </tr>
                        <tr>
                        <td className="border-r border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Michigan</td>
                        <td className="bg-gray-800/30 py-4 pl-16 pr-16 text-white">Detroit</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}