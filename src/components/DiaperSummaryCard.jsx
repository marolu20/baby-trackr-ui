import { TbDiaper } from "react-icons/tb";

export function DiaperSummaryCard({
    title,
    diaper
}) {
    return(
        <div className="rounded-xl  min-h-56 bg-white shadow-sm border border-gray-200 p-6 text-center">
            <TbDiaper className="mx-auto h-8 w-8 text-center text-emerald-500"></TbDiaper >
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
