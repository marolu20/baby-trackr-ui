import { Modal, Button, ModalHeader, ModalBody, Label, TextInput  } from "flowbite-react";
import { useState, useEffect } from "react";
import { EventTypeSelector } from "./eventForms/EventTypeSelector.jsx";
import { FeedingForm} from "./eventForms/FeedingForm.jsx";
import { SleepForm } from "./eventForms/SleepForm.jsx";
import { DiaperForm } from "./eventForms/DiaperForm.jsx";
import { ENDPOINTS } from "../../config/endpoints.js"

export function EventFormModal({mode = "create", babyId, event = null, open, onClose, onEventCreated, onSaved}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [eventType, setEventType] = useState(null)
    const [eventTime, setEventTime] = useState(new Date());

    useEffect(() => {
        if (open) {
            if (mode === "edit" && event) {
                const uiType = event.eventType === "FEED" ? "FEEDING" : event.eventType;
                setEventType(uiType);
                setStep(2); // Edit Flow: Skip Step 1 to prohibit user from selecting event type
            } else {
                setStep(1); // Creation Flow
                setEventType(null);
            }
        }
    }, [open, mode, event]);


    // Extract initial form values safely from structural payload
    const getInitialValues = () => {
        if (!event || mode !== "edit") return {};
        const payload = event.payload || {};

        return {
            amount: payload.feedingAmount ?? payload.sleepDuration ?? payload.sleepDurationMin ?? "",
            notes: payload.notes ?? "",
            diaperType: payload.diaperType ?? "",
            startTime: payload.startTime ?? payload.eventTime ?? "",
            endTime: payload.endTime ?? "",
            eventTime: payload.eventTime ?? "",
        };
    };

    async function handleSave(data) {
        const incomingTime = data.eventTime;
        const finalTimestamp = incomingTime instanceof Date
            ? incomingTime.toISOString()
            : incomingTime
                ? new Date(incomingTime).toISOString()
                : new Date().toISOString();        const finalNotes = data.notes.trim() === '' ? null: data.notes;

        let request;
        switch(eventType) {
            case "FEEDING":
                request = {
                    eventType: "FEED",
                    payload: {
                        feedingAmount: parseInt(data.amount, 10),
                        notes: finalNotes,
                        eventTime: finalTimestamp
                    }
                };
                break;
            case "SLEEP":
                request = {
                    eventType: "SLEEP",
                    payload: {
                        sleepDurationMin: parseInt(data.amount, 10),
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
                        diaperType: data.diaperType?.trim().toUpperCase(),
                        notes: finalNotes,
                        eventTime: finalTimestamp
                    }
                };
                break;
        }

        setIsSubmitting(true);

        try {
            // Determine HTTP method and construct target API endpoint
            const isEdit = mode === "edit";
            const requestBody = isEdit
                ? { payload: request.payload }
                : { eventType: eventType === "FEEDING" ? "FEED" : eventType, payload: request.payload };


            const url = isEdit
                ? `${ENDPOINTS.events(babyId)}/${event.id}`
                : ENDPOINTS.events(babyId);
            const method = isEdit ? "PATCH" : "POST";

            const response = await fetch(
                url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            if (onEventCreated) {
                await onEventCreated();
            }

            if (onEventCreated) await onEventCreated();
            if (onSaved) await onSaved();

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

    const initialValues = getInitialValues();

    const editCancelHandler = mode === "edit" ? onClose : null;

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

                {step === 2 && eventType === "FEEDING" && (
                    <FeedingForm
                        initialValues={initialValues}
                        onSave={handleSave}
                        isSubmitting={isSubmitting}
                        setStep={setStep}
                        showBackButton={mode === "create"}
                        onCancelEdit={editCancelHandler}
                    />
                )}

                { step === 2 && eventType === "SLEEP" && (
                    <SleepForm
                        initialValues={initialValues}
                        onSave={handleSave}
                        isSubmitting={isSubmitting}
                        setStep={setStep}
                        showBackButton={mode === "create"}
                        onCancelEdit={editCancelHandler}
                    />
                )}

                { step === 2 && eventType === "DIAPER" && (
                    <DiaperForm
                        initialValues={initialValues}
                        onSave={handleSave}
                        isSubmitting={isSubmitting}
                        setStep={setStep}
                        showBackButton={mode === "create"}
                        onCancelEdit={editCancelHandler}
                    />
                )}
            </ModalBody>
        </Modal>

    );
}

export default EventFormModal;
