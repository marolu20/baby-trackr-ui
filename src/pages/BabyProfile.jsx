import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { LiaUserCircle } from "react-icons/lia";
import { ProfileField } from "../components/ProfileField.jsx"
import { formatDate, formatDateWithHoursMinutes } from "../utils/DateUtils.js"
import { BabyFormModal } from "../components/modals/BabyFormModal.jsx"
import { DeleteBabyModal } from "../components/modals/DeleteBabyModal.jsx";
import { getAgeDisplay } from "../utils/AgeUtils.js";

export function BabyProfile({baby, loadBaby}) {

    const [editOpen, setEditOpen ] = useState(false)
    const [deleteOpen, setDeleteOpen ] = useState(false)
    const navigate = useNavigate()

    if (!baby) {
        return (
            <div className="min-h-screen rounded-xl bg-slate-50 p-8 flex items-center justify-center">
                <p className="text-gray-500 font-medium">Retrieving profile data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen rounded-xl shadow-md bg-slate-50 border border-gray-200 p-8">
            <Card className="max-w-3x1">
                <div className="mb-8 flex items-center justify-between">
                    <h4 className="text-gray-400">Created on {formatDateWithHoursMinutes(baby.createdOn)}</h4>
                </div>
                <div className="mt-1 flex items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <LiaUserCircle className="h-12 w-12 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        {baby.firstName}
                    </h1>
                </div>


                    <div className="divide-y divide-gray-200">
                        <ProfileField
                            label="Full Name"
                            value={`${baby.firstName} ${baby.lastName}`}
                        />

                        <ProfileField
                            label="Nickname"
                            value={baby.nickname || "N/A" }
                        />

                        <ProfileField
                            label="Gender"
                            value={baby.sex.charAt(0)+ baby.sex.slice(1).toLowerCase()}
                        />

                        <ProfileField
                            label="Birthday"
                            value={formatDate(baby.birthDate)}
                        />

                        <ProfileField
                            label="Age"
                            value={getAgeDisplay(baby)}
                        />
                    </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        color="blue"
                        onClick={() => setEditOpen(true)}
                    >
                        Edit Profile
                    </Button >
                    <Button
                        color="red"
                        onClick={() => setDeleteOpen(true)}
                    >Delete
                    </Button>


                    <BabyFormModal
                        mode="edit"
                        baby={baby}
                        open={editOpen}
                        onClose={() => setEditOpen(false)}
                        onSaved={loadBaby}
                    />

                        <DeleteBabyModal
                            baby={baby}
                            open={deleteOpen}
                            onClose={() => setDeleteOpen(false)}
                            onDeleted={() => navigate("/babies")}
                        />
                </div>
                </Card>
        </div>
);
}

export default BabyProfile;
