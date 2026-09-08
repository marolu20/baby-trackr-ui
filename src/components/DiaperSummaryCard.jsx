import { TbDiaper } from "react-icons/tb";

export function DiaperSummaryCard({
    title,
    diaper
}) {
    return(
        <div className="rounded-xl min-h-56 bg-white shadow-sm border border-gray-200 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <TbDiaper className="h-10 w-10 text-emerald-500" />
            </div>
            <h2 className="text-lg text-gray-700 pb-5 hover:text-blue-600 font-semibold">
                {title}
            </h2>

            { diaper.totalDiaperChanges === 0 ? (
                <p className="mt-4 text-gray-500 italic">
                    No diaper changes have been logged today.
                </p>
            ): (
               <>
                   <p className="text-center">{diaper.totalDiaperChanges} Diaper Changes</p>
                   <p className="text-center">{diaper.totalWetDiapers} Wet Diapers</p>
                   <p className="text-center">{diaper.totalSolidDiapers} Solid Diapers</p>
                   <p className="text-center">{diaper.totalMixedDiapers} Mixed Diapers</p>
               </>
            )}
        </div>
    );
}

export default DiaperSummaryCard;
