import { useState, useEffect } from "react"

import { Modal,
    ModalHeader,
    ModalBody,
    Label,
    TextInput,
    Button,
    Datepicker,
    Select
} from "flowbite-react";
import { ENDPOINTS } from "../../config/endpoints.js"
import { USER_ID } from "../../config/api.js"

export function BabyFormModal({
       mode,
       baby=null,
       open,
       onClose,
       onSaved,
}) {

    const isEdit = mode === "edit";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [sex, setSex] = useState("MALE");
    const [birthDate, setBirthDate] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setFirstName(baby?.firstName ?? "");
            setLastName(baby?.lastName ?? "");
            setNickname(baby?.nickname ?? "");
            setSex(baby?.sex ?? "MALE");
            setBirthDate(
                baby?.birthDate
                    ? new Date(baby.birthDate)
                    : new Date()
            );
        }
    }, [baby, open]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

    const formattedDate = birthDate.toISOString().split('T')[0];

        const payload = {
            firstName,
            lastName,
            nickname,
            sex,
            birthDate: formattedDate
        }

        if (!isEdit) {
            payload.userId = USER_ID;
        }

        try {
            const response = await fetch(
                isEdit
                    ? `${ENDPOINTS.baby(baby.id)}`
                    : `${ENDPOINTS.babies}/babies`,
                {
                method: isEdit ? "PATCH": "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });



            if (!response.ok) {
                throw new Error('Failed to update backend');
            }

            if (onSaved) {
                await onSaved()
            }
            onClose();

        } catch (error) {
            console.error("Error updating baby profile:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

        return(
            <Modal show={open} size="md" onClose={onClose} popup>

                    <ModalHeader />
                    <ModalBody>
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    {isEdit ? "Edit Baby" : "Create Baby"}
                                </h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="firstname">First Name</Label>
                                    </div>
                                    <TextInput
                                        id="firstname"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lastname">Last Name</Label>
                                    </div>
                                    <TextInput
                                        id="lastname"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="nickname">Nickname</Label>
                                    </div>
                                    <TextInput
                                        id="nickname"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password">Gender</Label>
                                    </div>
                                    <Select
                                        value={sex}
                                        onChange={(e)=>setSex(e.target.value)}
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </Select>

                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password">Birthday</Label>
                                    </div>
                                    <Datepicker
                                        id="birthdate"
                                        value={birthDate}
                                        onChange={(date) => setBirthDate(date)}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button color="gray" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" color="blue" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Save'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
        </Modal>
    )
}

export default BabyFormModal;
