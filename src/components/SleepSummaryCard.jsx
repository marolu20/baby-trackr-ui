import { GiNightSleep } from "react-icons/gi";


export function SleepSummaryCard({
        title,
        sleep
    }) {
    return(
        <div className="rounded-xl  min-h-56 bg-white shadow-sm border border-gray-200 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <GiNightSleep className="h-10 w-10 text-indigo-500" />
            </div>
            <h2 className="text-lg text-gray-700 pb-5 hover:text-blue-600 font-semibold">
                {title}
            </h2>

            {sleep.totalSleepSessions === 0 ? (
                <p className="mt-4 text-gray-500 italic">
                    No sleep sessions have been logged today.
                </p>
            ) : (
                <>
                    <p className="text-center">{sleep.totalSleepSessions} Sleep Sessions</p>
                    <div className="flex justify-center items-center">
                        {Math.floor(sleep.totalSleepMinutes / 60)}h {sleep.totalSleepMinutes % 60}m
                    </div>
                </>
            )}


        </div>
    );
}

export default SleepSummaryCard;
