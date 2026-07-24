import FeedSummaryCard from "../components/FeedSummaryCard.jsx";
import SleepSummaryCard from "../components/SleepSummaryCard.jsx";
import DiaperSummaryCard from "../components/DiaperSummaryCard.jsx";
import getActivityIcon from "../utils/ActivityIcons.jsx"
import {formatDateWithHoursMinutes, formatDateWithWeekday} from "../utils/DateUtils.js"

export function DashboardGrid({dashboard}) {

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200/80 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                        Today's Summary
                    </h1>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                        {formatDateWithWeekday(dashboard.date)}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FeedSummaryCard title="Today's Feedings" feed={dashboard.feed} />
                <SleepSummaryCard title="Today's Sleep Sessions" sleep={dashboard.sleep} />
                <DiaperSummaryCard title="Today's Diapers" diaper={dashboard.diaper} />
            </div>

            <div className="mt-14 mb-6">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    Recent Activity
                </h2>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                {dashboard.recentActivity && dashboard.recentActivity.length > 0 ? (
                    <ul className="relative border-l border-gray-200 pl-4 ml-3 space-y-8">
                        {dashboard.recentActivity.map((event, index) => (
                            <li key={index} className="relative flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">

                                <div className="absolute -left-[33px] flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-600">
                                    {getActivityIcon(event.eventType)}
                                </div>

                                <div className="sm:w-28 pl-4 sm:pl-0 pt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    {formatDateWithHoursMinutes(event.timestamp)}
                                </div>

                                <div className="pl-4 sm:pl-0 flex-1">
                                    <p className="font-semibold text-gray-800 uppercase tracking-wide text-sm">
                                        {event.eventType}
                                    </p>
                                    <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">
                                        {event.summary}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
                        <p className="text-sm font-medium text-gray-400">No recent activity logged yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
 }

 export default DashboardGrid;
