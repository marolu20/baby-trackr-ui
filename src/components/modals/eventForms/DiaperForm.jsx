import { Radio, Button, Label, TextInput, Textarea } from "flowbite-react"
import { useState, useEffect } from "react"
import DateTimeSelector from "../../DateTimePicker.jsx";

export function DiaperForm({ onSave, isSubmitting, setStep }) {
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [eventTime, setEventTime ] = useState('');
    const [diaperType, setDiaperType] = useState(null);

    const handleSave = (e) => {
        e.preventDefault();
        onSave({
            diaperType,
            notes,
            eventTime
        });
    };

    return (
        <form
            onSubmit={handleSave}
            className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100"
        >
            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Log Diapers</h1>
                <p className="text-sm text-gray-500 mt-1">Record your baby's diapers</p>
            </div>

            <div className="space-y-4 mb-6 text-left">

                <div>
                    <DateTimeSelector
                        value={eventTime}
                        onChange={setEventTime}
                    />
                </div>

                <div className="flex max-w-md flex-col gap-4">
                    <Label htmlFor="notesInput" className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Diaper Type
                    </Label>
                    <div className="flex items-center gap-2">
                        <Radio
                            id="wet"
                            name="diaper-type"
                            value="wet"
                            checked={diaperType === "wet"}
                            onChange={(e) => setDiaperType(e.target.value)}
                        />
                        <Label htmlFor="wet">Wet</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio
                            id="solid"
                            name="diaper-type"
                            value="solid"
                            checked={diaperType === "solid"}
                            onChange={(e) => setDiaperType(e.target.value)}
                        />
                        <Label htmlFor="solid">Solid</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio
                            id="mixed"
                            name="diaper-type"
                            value="mixed"
                            checked={diaperType === "mixed"}
                            onChange={(e) => setDiaperType(e.target.value)}
                        />
                        <Label htmlFor="mid">Mixed</Label>
                    </div>
                </div>

                <div>
                    <Label htmlFor="notesInput" className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Notes
                    </Label>
                    <Textarea
                        id="notesInput"
                        placeholder="Any unusual colors, textures, etc..."
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
                    disabled={isSubmitting}
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
export default DiaperForm;
