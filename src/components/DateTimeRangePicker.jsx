import { useEffect, useState } from 'react';
import { Label, Datepicker } from 'flowbite-react';
import { HiOutlineClock } from 'react-icons/hi';

export function DateTimeRangePicker({
    initialStartDate,
    initialEndDate,
    onDateTimeChange
}) {
    const [startDate, setStartDate] = useState(
        initialStartDate ?? new Date()
    );

    const [endDate, setEndDate] = useState(
        initialEndDate ?? (() => {
            const oneHourLater = new Date();
            oneHourLater.setHours(oneHourLater.getHours() + 1);
            return oneHourLater;
        })()
    )

    const formatTimeToString = (dateObj) => {
        return dateObj.toTimeString().slice(0, 5);
    };

    const handleEndUpdate = (newDate, newTimeStr) => {
        if (!newDate) return;

        const updated = new Date(newDate);
        const [hours, minutes] = (newTimeStr || "00:00").split(":").map(Number);

        updated.setHours(hours, minutes, 0, 0);

        setEndDate(updated);

        onDateTimeChange?.({
            start: startDate,
            end: updated
        });
    };

    useEffect(() => {
        if (initialStartDate) {
            setStartDate(new Date(initialStartDate));
        }

        if (initialEndDate) {
            setEndDate(new Date(initialEndDate));
        }
    }, [initialStartDate, initialEndDate]);

    const handleStartUpdate = (newDate, newTimeStr) => {
        if (!newDate) return;

        const updated = new Date(newDate);
        const [hours, minutes] = (newTimeStr || "00:00").split(":").map(Number);

        updated.setHours(hours, minutes, 0, 0);

        setStartDate(updated);

        onDateTimeChange?.({
            start: updated,
            end: endDate
        });
    };


    return (
        <div className="w-full box-border">
            <style>{`
        input[type="time"]::-webkit-calendar-picker-indicator {
          background: none !important;
          display: none !important;
          -webkit-appearance: none !important;
        }
      `}</style>

            <div className="flex flex-col gap-4">

                <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                        Start Date & Time
                    </Label>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <div className="flex-1 min-w-0">
                            <Datepicker
                                value={startDate}
                                onChange={(date) => handleStartUpdate(date, formatTimeToString(startDate))}
                            />
                        </div>

                        <div className="relative w-36 shrink-0">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <HiOutlineClock className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formatTimeToString(startDate)}
                                onChange={(e) => handleStartUpdate(startDate, e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block">
                        End Date & Time
                    </Label>
                    <div className="flex flex-row items-center gap-4 w-full">
                        <div className="flex-1 min-w-0">
                            <Datepicker
                                minDate={startDate}
                                value={endDate}
                                onChange={(date) => handleEndUpdate(date, formatTimeToString(endDate))}
                            />
                        </div>

                        <div className="relative w-36 shrink-0">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <HiOutlineClock className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formatTimeToString(endDate)}
                                onChange={(e) => handleEndUpdate(endDate, e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DateTimeRangePicker;
