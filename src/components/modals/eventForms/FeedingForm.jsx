import { Radio, Button, Label, TextInput, Textarea } from "flowbite-react"
import { useState, useEffect } from "react"
import DateTimeSelector from "../../DateTimePicker.jsx";

export function FeedingForm({ initialValues, onSave, isSubmitting, setStep, showBackButton, onCancelEdit  }) {
    const [amount, setAmount] = useState(initialValues?.amount ?? "");
    const [notes, setNotes] = useState(initialValues?.notes ?? "");
    const [eventTime, setEventTime ] = useState(initialValues?.eventTime ?? new Date())

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ amount: Number(amount), notes, eventTime });
    };

    return (
        <form
            onSubmit={handleSave}
            className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100"
        >
            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Log Feeding</h1>
                <p className="text-sm text-gray-500 mt-1">Record your baby's nutrition details</p>
            </div>

            <div className="space-y-4 mb-6 text-left">

                <div>
                    <DateTimeSelector
                        value={eventTime}
                        onChange={setEventTime}
                    />
                </div>

                <div>
                    <Label htmlFor="amountInput" className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount in Ounces
                    </Label>
                    <TextInput
                        id="amountInput"
                        type="number"
                        //step="0.5"    // Allows parents to log half ounces (e.g. 3.5 oz)
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
                        placeholder="Any spitting up, fussiness, etc..."
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
export default FeedingForm;
