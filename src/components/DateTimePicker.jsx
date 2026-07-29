import { Datepicker, Label } from "flowbite-react";
import { useMemo } from "react";

export function DateTimeSelector({ value, onChange }) {
    const now = useMemo(() => new Date(), []);

    // Fallback to current time if value is undefined/null
    const currentDateTime = value instanceof Date ? value : now;

    // Extract variables
    const isToday = currentDateTime.toDateString() === now.toDateString();
    const currentFormattedTime = now.toTimeString().slice(0, 5); // "HH:MM"

    const selectedFormattedTime = currentDateTime instanceof Date
        ? currentDateTime.toTimeString().slice(0, 5)
        : "00:00";

    const handleUpdate = (newDate, newTimeStr) => {
        if (!newDate) return;

        const finalTimeStr = newTimeStr || "00:00";

        const updated = new Date(newDate);
        const [hours, minutes] = finalTimeStr.split(":").map(Number);
        updated.setHours(hours, minutes, 0, 0);

        // Prevent future drifting if today is picked
        if (updated > now) {
            onChange(now);
        } else {
            onChange(updated);
        }
    };

    return (
        <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                Date & Time
            </Label>
            <div className="flex gap-4 items-center">
                <div className="w-48">
                    <Datepicker
                        maxDate={now}
                        value={currentDateTime}
                        onChange={(date) => handleUpdate(date, selectedFormattedTime)}
                    />
                </div>

                <div className="relative">
                    <input
                        type="time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={selectedFormattedTime}
                        max={isToday ? currentFormattedTime : undefined}
                        onChange={(e) => handleUpdate(currentDateTime, e.target.value)}
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default DateTimeSelector;
