import {
    Button, Modal, ModalHeader, ModalBody} from "flowbite-react";
import { useState, useEffect, useCallback  } from 'react';



function DeleteEventModal({ show, onClose, eventId, onSubmit }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    return(
        <Modal show={show} onClose={onClose} size="md" popup={true}>
            <ModalHeader />
            <ModalBody>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this event?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="red" type="submit" onClick={() => onSubmit(eventId)}>
                            Yes, Delete
                        </Button>
                        <Button color="gray" type="button" onClick={onClose}>
                            No, Cancel
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default DeleteEventModal;
