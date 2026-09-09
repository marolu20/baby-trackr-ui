import {
    Modal,
    ModalBody,
    ModalHeader,
    Button
} from "flowbite-react"

export function SelectBabyModal({ open, onClose }) {
    return (
        <Modal
            show={open}
            size="sm"
            popup
            onClose={onClose}
        >
            <ModalHeader />

            <ModalBody>
                <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Select a Child
                    </h3>

                    <p className="mb-5 text-sm text-gray-500">
                        Please select a child before logging an event.
                    </p>
                    <div className="flex justify-center">
                        <Button onClick={onClose}>
                            Got it
                        </Button>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    );
}
