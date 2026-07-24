import { GiBabyBottle  } from "react-icons/gi";

export function FeedSummaryCard({
    title,
    feed
}) {
    return(
        <div className="rounded-xl  min-h-56 bg-white shadow-sm border border-gray-200 p-6 text-center">
            <GiBabyBottle  className="mx-auto h-8 w-8 text-blue-500" ></GiBabyBottle >
            <h2 className="text-lg text-gray-700 pb-5 hover:text-blue-600 font-semibold">
                {title}
            </h2>
            {feed.totalFeedings === 0 ? (
                <p className="mt-4 text-gray-500 italic">
                    No feedings have been logged today.
                </p>
            ) : (
                <>
                    <p>{feed.totalFeedings} Feedings</p>
                    <p>{feed.totalOunces} oz</p>
                </>
            )}

        </div>
    );
}

export default FeedSummaryCard;
