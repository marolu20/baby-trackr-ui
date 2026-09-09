import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "flowbite-react";
import getActivityIcon from "../utils/ActivityIcons.jsx";
import {formatDate, formatDateWithHoursMinutes, formatDateWithWeekday} from "../utils/DateUtils.js";
import { toTitleCase } from "../utils/StringUtils.js"
import { ENDPOINTS } from "../config/endpoints.js";

export function ActivityLog() {

    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const babyId = searchParams.get("babyId")

    const PAGE_SIZE = 20;
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: PAGE_SIZE,
        totalPages: 1,
        totalItems: 0
    })

    const babyName = activity.length > 0
        ? activity[0].babyFirstName
        : null;

    // What the user is currently selecting
    const [draftFilters, setDraftFilters] = useState({
        type: "",
        startDate: "",
        endDate: "",
        sort: "timestamp,descending"
    });

    // What is actually applied to the API
    const [appliedFilters, setAppliedFilters] = useState({
        type: "",
        startDate: "",
        endDate: "",
        sort: "timestamp,descending"
    });

    const currentDate = new Date();

    const groupedActivities = groupActivitiesByDate(activity)

    async function loadActivity(page, filters) {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (babyId) {
                params.set("babyId", babyId);
            }

            params.set("page", page);
            params.set("pageSize", PAGE_SIZE);
            params.set("sortBy", filters.sort);

            if (filters.type) {
                params.set("type", filters.type);
            }

            if (filters.startDate && filters.endDate) {
                params.set("startDate", filters.startDate);
                params.set("endDate", filters.endDate);
            }

            const url = `${ENDPOINTS.activity}?${params.toString()}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to load activity");
            }

            const result = await response.json();

            setActivity(result.data ?? []);

            setPagination(prev => ({
                ...prev,
                page: result.page ?? page,
                pageSize: result.pageSize ?? PAGE_SIZE,
                totalPages: result.totalPages ?? 1,
                totalItems: result.totalItems ?? 0
            }));

        } catch (error) {
            console.error("Activity request failed:", error);
            setActivity([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        function refreshActivity() {
            loadActivity(
                pagination.page,
                appliedFilters
            );
        }

        refreshActivity();
        window.addEventListener("eventDataChanged", refreshActivity);

        return () => {
            window.removeEventListener("eventDataChanged", refreshActivity)
        }
    }, [
        babyId,
        pagination.page,
        appliedFilters.type,
        appliedFilters.startDate,
        appliedFilters.endDate,
        appliedFilters.sort
    ]);

    useEffect(() => {
        setPagination(prev => ({
        ...prev,
        page: 1
        }));
    }, [babyId]);

    const onPageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            page
        }));
    };

    function handleApply() {
        setAppliedFilters(draftFilters);
        setPagination(prev => ({
            ...prev,
            page: 1
        }));
    }

    return(
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-10 flex flex-col gap-6 border-b border-gray-200/80 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                        Activity Log
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {babyId && babyName
                            ? `View ${babyName}'s activity history.`
                            : "View your baby's activity history."
                        }
                    </p>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <select
                        value={draftFilters.type}
                        onChange={(event) =>
                            setDraftFilters(prev => ({
                                ...prev,
                                type: event.target.value
                            }))
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                        <option value="">All Activities</option>
                        <option value="FEED">Feed</option>
                        <option value="SLEEP">Sleep</option>
                        <option value="DIAPER">Diaper</option>
                    </select>

                    <select
                        value={draftFilters.sort}
                        onChange={(event) =>
                            setDraftFilters(prev => ({
                                ...prev,
                                sort: event.target.value
                            }))
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                        <option value="timestamp,descending">Newest First</option>
                        <option value="timestamp,ascending">Oldest First</option>
                        <option value="type,descending">Activity Type A–Z</option>
                        <option value="type,ascending">Activity Type Z–A</option>
                    </select>

                    <input
                        type="date"
                        value={draftFilters.startDate}
                        onChange={(event) =>
                            setDraftFilters(prev => ({
                                ...prev,
                                startDate: event.target.value
                            }))
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    />

                    <input
                        type="date"
                        value={draftFilters.endDate}
                        onChange={(event) =>
                            setDraftFilters(prev => ({
                                ...prev,
                                endDate: event.target.value
                            }))
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    />

                    <button
                        type="button"
                        onClick={handleApply}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Apply
                    </button>
                </div>

            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                {loading ? (
                    <div className="flex min-h-[150px] items-center justify-center">
                        <p className="text-sm font-medium text-gray-400">Loading timeline...</p>
                    </div>
                ) : activity && activity.length > 0 ? (
                    <>
                        <div className="relative border-l border-gray-200 pl-4 ml-3">
                            {Object.entries(groupedActivities).map(([date, events]) => (
                                <div key={date} className="mb-10">

                                    <div className="relative -ml-4 mb-6">
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 bg-white inline-block px-2">
                                            {date}
                                        </h2>
                                    </div>

                                    <ul className="space-y-8">
                                        {events.map((event) => (
                                            <li
                                                key={event.eventId}
                                                className="relative flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8"
                                            >
                                                <div className="absolute -left-[33px] flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-600">
                                                    {getActivityIcon(event)}
                                                </div>
                                                <div className="sm:w-36 pl-4 sm:pl-0 pt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                    {formatDateWithHoursMinutes(event.timestamp)}
                                                </div>
                                                <div className="pl-4 sm:pl-0 flex-1">
                                                    <p className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                                                        <span className="text-indigo-600 font-bold">
                                                            {event.babyFirstName} |
                                                        </span>
                                                        {event.title}
                                                    </p>
                                                    <p className="mt-0.5 text-sm text-gray-600 leading-relaxed">
                                                        {toTitleCase(event.description)}

                                                        {event.notes && (
                                                            <span className="text-gray-400 italic block text-xs mt-0.5">
                                                                Notes: {event.notes}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center border-t border-gray-100 pt-6 overflow-x-auto">
                            <Pagination
                                currentPage={pagination.page}
                                totalPages={pagination.totalPages}
                                onPageChange={onPageChange}
                                showIcons
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
                        <p className="text-sm font-medium text-gray-400">No Activity Logged Yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function groupActivitiesByDate(activities) {
    return activities.reduce((groups, activity) => {
        const date = new Date(activity.timestamp);

        if (Number.isNaN(date.getTime())) {
            console.error("Invalid activity timestamp:", activity.timestamp);
            return groups;
        }

        const dateKey = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }

        groups[dateKey].push(activity);

        return groups;
    }, {});
}

export default ActivityLog;
