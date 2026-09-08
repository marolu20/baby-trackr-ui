import { Radio, Button, Label, TextInput, Textarea } from "flowbite-react"
import { useState, useEffect } from "react"
import { DateTimeRangePicker } from "../../../components/DateTimeRangePicker.jsx"
import { formatDuration } from "../../../utils/DateUtils.js"
export function SleepForm({
    initialValues,
    onSave,
    isSubmitting,
    setStep,
    showBackButton,
    onCancelEdit
}) {
    const [amount, setAmount] = useState(initialValues?.amount ?? "");
    const [notes, setNotes] = useState(initialValues?.notes ?? "")
    const [selectedDates, setSelectedDates] = useState({
        start: initialValues?.startTime
            ? new Date(initialValues.startTime)
            : new Date(),

        end: initialValues?.endTime
            ? new Date(initialValues.endTime)
            : new Date(Date.now() + 60 * 60 * 1000)
    });

    const isInvalidRange = selectedDates.end < selectedDates.start;
    const durationMinutes = Math.round(
        (selectedDates.end - selectedDates.start)/(1000 * 60)
    );

    const canSave =
        !isInvalidRange &&
        durationMinutes > 0 &&
        !isSubmitting;

    useEffect(() => {
        if (!initialValues) return;

        setAmount(initialValues.amount ?? "");
        setNotes(initialValues.notes ?? "");

        setSelectedDates({
            start: initialValues.startTime
                ? new Date(initialValues.startTime)
                : new Date(),

            end: initialValues.endTime
                ? new Date(initialValues.endTime)
                : new Date(Date.now() + 60 * 60 * 1000)
        });
    }, [initialValues]);

    const handleSave = (e) => {
        e.preventDefault();
        onSave({
            amount: durationMinutes,
            notes,
            eventTime: selectedDates.start,
            startTime: selectedDates.start,
            endTime: selectedDates.end
        });
    };


    return (
        <form
            onSubmit={handleSave}
            className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100"
        >
            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Log Sleep Session</h1>
                <p className="text-sm text-gray-500 mt-1">Record your baby's sleep sessions</p>
            </div>

            <div>
                <DateTimeRangePicker
                    initialStartDate={selectedDates.start}
                    initialEndDate={selectedDates.end}
                    onDateTimeChange={setSelectedDates}
                />

                { isInvalidRange &&
                    <p className="mt-2 text-sm text-red-600">
                        End date and time must be after the start date and time
                    </p>
                }
            </div>

            <div className="space-y-4 mb-6 text-left">
                <div>
                    <Label htmlFor="amountInput" className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider pt-4">
                        Sleep Duration
                    </Label>
                    <TextInput
                        id="durationInput"
                        type="text"
                        value={formatDuration(durationMinutes)}
                        readOnly
                        disabled
                    />
                </div>

                <div>
                    <Label htmlFor="notesInput" className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Notes
                    </Label>
                    <Textarea
                        id="notesInput"
                        placeholder="Any waking up, fussiness, etc..."
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="text-sm"
                    />
                </div>

            </div>

            <div className="flex flex-col gap-2">
                <Button
                    type="submit"
                    color="blue"
                    disabled={!canSave}
                    className="w-full"
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                {showBackButton && (
                    <Button
                        type="button"
                        color="gray"
                        onClick={() => setStep(1)}
                        className="w-full"
                    >
                        Back
                    </Button>
                )}

                {onCancelEdit && (
                    <Button color="gray" type="button" onClick={onCancelEdit} disabled={isSubmitting}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}

// function formatDuration(minutes) {
//     if (minutes < 60) {
//         return `${minutes} min`;
//     }
//
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//
//     if (remainingMinutes === 0) {
//         return `${hours} hr`;
//     }
//
//     return `${hours} hr ${remainingMinutes} min`;
// }

export default SleepForm;
