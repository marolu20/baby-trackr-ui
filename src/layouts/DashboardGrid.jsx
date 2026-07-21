import FeedSummaryCard from "../components/FeedSummaryCard.jsx";
import SleepSummaryCard from "../components/SleepSummaryCard.jsx";
import DiaperSummaryCard from "../components/DiaperSummaryCard.jsx";
import getActivityIcon from "../utils/ActivityIcons.jsx"
export function DashboardGrid({dashboard}) {

    const normalizedStr = dashboard.date.replace(/-/g, '/');

    const dateObj = new Date(normalizedStr);
    const customDate = dateObj.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen rounded-xl shadow-md bg-slate-50 border border-gray-200 p-8">
            <div className="border-b border-gray-300 pb-4 mb-12">
                <h1 className="text-3xl text-xl text-left font-bold lg:text-3xl text-heading tracking-tight">Today's Summary </h1>
                <p className="mt-2 text-gra-500">{customDate}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">

                <FeedSummaryCard title="Today's Feedings" feed={dashboard.feed} ></FeedSummaryCard>
                <SleepSummaryCard title="Today's Sleep" sleep={dashboard.sleep}></SleepSummaryCard>
                <DiaperSummaryCard title="Today's Diapers" diaper={dashboard.diaper}></DiaperSummaryCard>

            </div>

            <div className="border-t border-gray-300 pt-4 pb-4 mt-12">
                <h1 className="text-xl text-left font-semibold lg:text-2xl text-heading tracking-tight">Recent Activity </h1>
            </div>
            <div className="rounded-xl  min-h-56 bg-white shadow-sm border border-gray-200 p-6">

                <ul className="space-y-4">
                    {dashboard.recentActivity.map((event, index) => (
                        <li key={index} className="flex gap-4">
                            <div className="w-20 text-sm text-gray-500">
                                {new Date(event.timestamp).toLocaleString([], {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",

                                })}
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1">
                                    {getActivityIcon(event.eventType)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {event.eventType}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {event.summary}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>






            </div>
        </div>

    );
 }

 export default DashboardGrid;
