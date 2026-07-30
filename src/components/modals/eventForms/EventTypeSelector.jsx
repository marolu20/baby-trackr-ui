import { Radio, Button } from "flowbite-react"
import { GiBabyBottle, GiNightSleep  } from "react-icons/gi";
import { TbDiaper } from "react-icons/tb";

export function EventTypeSelector({eventType, setEventType, onContinue, onCancel}) {
    const EVENT_OPTIONS = [
        { id: "FEEDING", label: "Feeding", icon: GiBabyBottle, color: "blue" },
        { id: "SLEEP", label: "Sleep", icon: GiNightSleep, color: "indigo" },
        { id: "DIAPER", label: "Diaper", icon: TbDiaper, color: "green" },
    ];
    return (
        <div className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100">

            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900">Log Event</h1>
                <p className="text-sm text-gray-500">What would you like to log?</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {EVENT_OPTIONS.map((option) => {
                    const isSelected = eventType === option.id;

                    const IconComponent = option.icon;

                    return (
                        <label
                            key={option.id}
                            onClick={() => setEventType(option.id)}
                            className={`flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all text-center text-xs font-semibold
                ${isSelected
                                ? `border-${option.color}-500 bg-${option.color}-50 text-${option.color}-700`
                                : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"}`}
                        >
                            <IconComponent className="h-6 w-6 mb-1.5 stroke-[2]" />

                            {option.label}
                        </label>
                    );
                })}
            </div>


            <div className="flex flex-col gap-2">
                <Button color="blue" onClick={onContinue} disabled={!eventType} className="w-full py-2.5">
                    Continue
                </Button>
                <Button color="gray" onClick={onCancel} className="w-full py-2.5">
                    Cancel
                </Button>
            </div>

        </div>
    );
}

export default EventTypeSelector;
