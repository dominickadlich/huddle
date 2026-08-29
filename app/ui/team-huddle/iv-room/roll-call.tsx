import { UserIcon } from "@heroicons/react/24/outline";

const callList = [
    "0600",
    "0700",
    "TPN",
    "IVDP",
    "IV RPh",
    "SC",
    "CHM",
    "8B",
    "CAIV",
]

export default function RollCall() {
   return (
    <>
        <div className="group relative overflow-hidden rounded-2xl backdrop-blur-sm p-2">
            {/* Content */}
            {/* <div className="relative z-10"> */}
            {/* Header */}
            {/* <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
                <div className="flex items-center justify-center gap-2 flex-1">
                <UserIcon className="h-6 w-6 text-md font-semibold text-gray-300  transition-colors duration-300" />
                <h3 className="text-lg font-semibold text-gray-300  transition-colors duration-300">
                    Roll Call
                </h3>
                </div>
            </div>
            </div> */}

            {/* Value Display */}
            <div className="flex">
                {/* <p className="text-xl text-white whitespace-nowrap">Roll Call:</p> */}
            <div className="flex grow divide-x divide-gray-700 ">
                {callList.map((roll) => (
                    <p key={roll} className="grow text-xl text-white text-center transition-colors duration-300">
                        {roll}
                    </p>
                ))}
            </div>
            </div>
        </div>
        </>
    );
}