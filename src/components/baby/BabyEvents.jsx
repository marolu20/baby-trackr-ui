import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeadCell
} from "flowbite-react";
import { ENDPOINTS } from "../../config/endpoints.js"
import { useState, useEffect, useCallback  } from 'react';
import { useNavigate } from "react-router-dom"
import EmptyEventState from "../EmptyEventState.jsx";
import {formatDateWithWeekday, formatDateWithHoursMinutes, parseDate, formatDuration} from "../../utils/DateUtils.js"
import { toTitleCase } from "../../utils/StringUtils.js"
import EmptyBabyState from "../EmptyBabyState.jsx";
import EventTypeSelector from "../../components/modals/eventForms/EventTypeSelector.jsx"
import EventFormModal from "../../components/modals/EventFormModal.jsx"
import DeleteEventModal from "../../components/modals/DeleteEventModal.jsx"

export function BabyEvents({babyId, onEdit, onDelete}) {
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ createOpen, setCreateOpen ] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const [editOpen, setEditOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [ sortOrder, setSortOrder ] = useState("desc");
    const navigate = useNavigate();

    const EVENT_NAME_MAP = {
        "FEED": "Feeding",
        "SLEEP": "Sleep & Naps",
        "DIAPER": "Diaper Change",
    };

    function transformEventName(type) {
        return EVENT_NAME_MAP[type] || type;
    }

    const loadEvents = useCallback(async () => {
        if (!babyId) return;
        try {
            console.log("Fetching events");
            const response = await fetch(ENDPOINTS.events(babyId));
            if (!response.ok) {
                setEvents([]);
                return;
            }
            const data = await response.json();
            setEvents(Array.isArray(data) ? data : data.events ?? []);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [babyId]);

    useEffect(() => {
        setLoading(true);
        loadEvents();
    }, [babyId, loadEvents]);

    useEffect(() => {
        window.addEventListener("eventDataChanged", loadEvents);
        return () => {
            window.removeEventListener("eventDataChanged", loadEvents);
        };
    }, [loadEvents]);

    function triggerDeleteConfirmation(eventId) {
        setSelectedEventId(eventId);
        setDeleteModalOpen(true);
    }

    async function deleteEvent(eventId) {
        if (!eventId) return;
        try {
            console.log("Deleting event Id", eventId);
            const response = await fetch(`${ENDPOINTS.events(babyId)}/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to delete event with ID ${eventId}`);
            }

            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            if (onDelete) onDelete(eventId);
        } catch (error) {
            console.error("API delete error:", error);
            throw error;
        } finally {
            setDeleteModalOpen(false);
            setSelectedEventId(null);
        }
    }

    function toggleSortOrder() {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    }

    if (loading) return <div className="p-6 text-center text-sm text-gray-500">Loading events...</div>;

    if (events.length === 0) {
        return (
            <>
                <EmptyEventState
                    onCreateClick={()=> setCreateOpen(true)}
                />
                <EventFormModal
                    mode="create"
                    babyId={babyId}
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                />
            </>
        );
    }

    const sortedEvents = [...events].sort((a, b) => {
        const timeA = parseDate(a.eventTime);
        const timeB = parseDate(b.eventTime);

        return sortOrder === "desc"
            ? timeB - timeA
            : timeA - timeB;
    });

    function getEventDetail(event) {
        const type = event?.eventType;
        const payload = event?.payload;

        if (!payload) return "N/A";

        switch (type) {
            case "FEED":
                return `${payload.feedingAmount} Ounces`;
            case "SLEEP":
                return `${formatDuration(payload.sleepDuration)}`;
            case "DIAPER":
                const readableDiaperType = toTitleCase(payload.diaperType);
                return `${readableDiaperType} Diaper Changed`;
            default:
                return Object.values(payload).join(", ");
        }
    }

    function triggerEditFlow(event) {
        setSelectedEvent(event);
        setEditOpen(true);
    }

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Activity
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        View and manage this baby's recent events.
                    </p>
                </div>
                <Button
                    color="light"
                    onClick={() => navigate(`/activity?babyId=${babyId}`)}
                >
                    View All Activity
                </Button>
            </div>
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <Table hoverable={true} className="w-full text-left text-sm">
                        <TableHead className="bg-gray-50/70 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                            <TableRow className="border-b border-gray-100 dark:border-gray-800">
                                <TableHeadCell className="px-6 py-4">Event</TableHeadCell>
                                <TableHeadCell className="px-6 py-4">Details</TableHeadCell>
                                <TableHeadCell className="px-6 py-4">
                                    <button
                                        onClick={toggleSortOrder}
                                        className="flex items-center gap-1 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                                    >
                                        Date {sortOrder === "desc" ? "↓" : "↑"}
                                    </button>
                                </TableHeadCell>
                                <TableHeadCell className="px-6 py-4">Notes</TableHeadCell>
                                <TableHeadCell className="px-6 py-4">
                                    <span className="sr-only">Actions</span>
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {sortedEvents.map((event) => (
                                <TableRow key={event.id} className="bg-white transition-colors duration-150 hover:bg-gray-50/50 dark:bg-gray-900 dark:hover:bg-gray-800/50" >
                                    <TableCell className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {transformEventName(event.eventType)}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {getEventDetail(event)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {formatDateWithHoursMinutes(event.eventTime || event.startTime)}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {event.payload?.notes ? (
                                            <span className="text-gray-600 dark:text-gray-300">{event.payload.notes}</span>
                                        ) : (
                                            <span className="text-xs italic text-gray-400 dark:text-gray-500">No notes</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <button onClick={() => triggerEditFlow(event)} className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700" >
                                                Edit
                                            </button>
                                            <button onClick={() => triggerDeleteConfirmation(event.id)} className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100/80 transition-colors dark:text-red-400 dark:bg-red-500/10 dark:hover:bg-red-500/20" >
                                                Delete
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DeleteEventModal show={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} eventId={selectedEventId} onSubmit={deleteEvent} />
            <EventFormModal mode="create" babyId={babyId} open={createOpen} onClose={() => setCreateOpen(false)} onSaved={loadEvents} />
            {editOpen && (
                <EventFormModal mode="edit" babyId={babyId} event={selectedEvent} open={editOpen} onClose={() => { setEditOpen(false); setSelectedEvent(null); }} onSaved={() => loadEvents()} />
            )}
        </div>
    );

}

export default BabyEvents;
