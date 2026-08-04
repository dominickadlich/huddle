import { UserIcon } from "@heroicons/react/24/outline";

const callList = [
    "0600 IVRM (2)",
    "0700 IVRM (2)",
    "TPN",
    "IVDP",
    "IV RPh (2)",
    "SC",
    "CHM",
    "CA RPh (2)",
]

export default function RollCall() {
   return (
    <>
        <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
            {/* Content */}
            <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
                <div className="flex items-center justify-center gap-2 flex-1">
                <UserIcon className="h-6 w-6 text-md font-semibold text-gray-300  transition-colors duration-300" />
                <h3 className="text-lg font-semibold text-gray-300  transition-colors duration-300">
                    Roll Call
                </h3>
                </div>
            </div>
            </div>

            {/* Value Display */}
            <div className="flex flex-col items-start gap-1 min-h-[2rem]">
                {callList.map((roll) => (
                    <p key={roll} className="text-xl font-bold text-white  transition-colors duration-300">
                        {roll}
                    </p>
                ))}
            </div>
        </div>
        </>
    );
}