import { useState } from 'react';
import { Label } from 'flowbite-react';
import { HiOutlineCalendar } from 'react-icons/hi'

export function TimeRangePicker({ onTimeChange }) {
    const [startTime, setStartTime] = useState('12:00');
    const [endTime, setEndTime] = useState('13:00');

    const handleStartChange = (e) => {
        const newStart = e.target.value;
        setStartTime(newStart);
        onTimeChange({ start: newStart, end: endTime });
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value;
        setEndTime(newEnd);
        onTimeChange({ start: startTime, end: newEnd });
    };

    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 my-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-3 text-center">
        Event Duration
      </span>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="startTime" className="text-xs text-gray-500 mb-1 block">
                        Start Time
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <HiOutlineClock className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            type="time"
                            id="startTime"
                            value={startTime}
                            onChange={handleStartChange}
                            className="bg-white border border-gray-300 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="endTime" className="text-xs text-gray-500 mb-1 block">
                        End Time
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <HiOutlineClock className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            type="time"
                            id="endTime"
                            min={startTime} // Prevents parents from setting an end time before the start time
                            value={endTime}
                            onChange={handleEndChange}
                            className="bg-white border border-gray-300 text-gray-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeRangePicker;
