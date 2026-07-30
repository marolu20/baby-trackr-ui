import { Modal, Button, ModalHeader, ModalBody, Label, TextInput  } from "flowbite-react";
import { useState, useEffect } from "react";
import { EventTypeSelector } from "./eventForms/EventTypeSelector.jsx";
import { FeedingForm} from "./eventForms/FeedingForm.jsx";
import { SleepForm } from "./eventForms/SleepForm.jsx";
import { DiaperForm } from "./eventForms/DiaperForm.jsx";
import { ENDPOINTS } from "../../config/endpoints.js"
import { USER_ID } from "../../config/api.js"

export function EventFormModal({activeBaby, open, onClose, onEventCreated}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [eventType, setEventType] = useState(null)
    const [eventTime, setEventTime] = useState(new Date());

    async function handleSave(data) {
        const finalTimestamp = eventTime instanceof Date ? eventTime.toISOString() : new Date().toISOString();
        const finalNotes = data.notes.trim() === '' ? null: data.notes;

        let request;
        switch(eventType) {
            case "FEEDING":
                request = {
                    eventType: "FEED",
                    payload: {
                        feedingAmount: data.amount,
                        notes: finalNotes,
                        eventTime: finalTimestamp
                    }
                };
                break;
            case "SLEEP":
                request = {
                    eventType: "SLEEP",
                    payload: {
                        sleepDurationMin: data.amount,
                        notes: finalNotes,
                        startTime: data.startTime,
                        endTime: data.endTime,
                    }
                };
                break;
            case "DIAPER":
                request = {
                    eventType: "DIAPER",
                    payload: {
                        diaperType: data.diaperType,
                        notes: finalNotes,
                        eventTime: finalTimestamp
                    }
                };
                break;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(
                ENDPOINTS.events(activeBaby.id), {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            if (onEventCreated) {
                await onEventCreated();
            }

            console.log("Dispatching refreshDashboardData");
            window.dispatchEvent(new Event("refreshDashboardData"));


            setStep(1);
            setEventType(null);
            onClose();
        } catch (error) {
            console.error("Failed to save session:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        console.log("Modal Active Baby:", activeBaby);
    }, [activeBaby])

    return(
        <Modal show={open} size="md" popup onClose={onClose}>
            <ModalHeader />
            <ModalBody>
                { step === 1 && (
                    <EventTypeSelector
                        eventType={eventType}
                        setEventType={setEventType}
                        onContinue={() => setStep(2)}
                        onCancel={onClose}
                    />
                )}

                { step === 2 && eventType === "FEEDING" && (
                    <FeedingForm
                        onSave={handleSave}
                        isSubmitting={isSubmitting}
                        setStep={setStep}
                    />
                )}

                { step === 2 && eventType === "SLEEP" && (
                    <SleepForm
                        onSave={handleSave}
                        isSubmitting={isSubmitting}
                        setStep={setStep}
                    />
                )}

                { step === 2 && eventType === "DIAPER" && (
                    <DiaperForm
                        onSave={handleSave}
                        isSubmitting={isSubmitting}
                        setStep={setStep}
                    />
                )}
            </ModalBody>
        </Modal>

    );
}

export default EventFormModal;
