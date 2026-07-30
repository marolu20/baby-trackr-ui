import { Radio, Button, Label, TextInput, Textarea } from "flowbite-react"
import { useState, useEffect } from "react"
import { DateTimeRangePicker } from "../../../components/DateTimeRangePicker.jsx"

export function SleepForm({ onSave, isSubmitting, setStep }) {
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');

    const [selectedDates, setSelectedDates] = useState({ start: new Date(), end: new Date() });

    const handleSave= (e) => {
        e.preventDefault();
        onSave({
            amount: Number(amount),
            notes,
            startTime: selectedDates.start.toISOString(),
            endTime: selectedDates.end.toISOString()
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
                />
            </div>

            <div className="space-y-4 mb-6 text-left">
                <div>
                    <Label htmlFor="amountInput" className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider pt-4">
                        Duration in Minutes
                    </Label>
                    <TextInput
                        id="amountInput"
                        type="number"
                        min="0"
                        placeholder="0"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
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
                    disabled={isSubmitting || !amount}
                    className="w-full"
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>

                <Button
                    type="button"
                    color="gray"
                    onClick={() => setStep(1)}
                    className="w-full"
                >
                    Back
                </Button>
            </div>
        </form>
    );
}
export default SleepForm;
