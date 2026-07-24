import { useState } from "react";
import { useParams } from "react-router-dom"
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ENDPOINTS } from "../../config/endpoints.js"

export function DeleteBabyModal({baby, open, onClose, onDeleted}) {
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(ENDPOINTS.baby(id), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete in the backend');
            }

            onDeleted?.();
            onClose();

            onClose();
        } catch (error) {
            console.error("Error deleting baby profile:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

        return (
            <Modal show={open} size="md" onClose={onClose} popup>
                <ModalHeader />

                <ModalBody>
                    <form onSubmit={handleSubmit} className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Are you sure? Deleting this baby will also delete all associated events.
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Deleting...' : "Yes, I'm sure"}
                            </Button>
                            <Button color="gray" type="button" onClick={onClose}>
                                No, cancel
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        );

}

export default DeleteBabyModal;
