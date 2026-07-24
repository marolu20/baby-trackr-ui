import { useState, useEffect } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { Link, useParams } from 'react-router-dom';
import { ENDPOINTS } from "../config/endpoints.js"
import { BabyFormModal } from "../components/modals/BabyFormModal.jsx"
import {formatDate, formatDateWithHoursMinutes} from "../utils/dateUtils.js";
import EmptyBabyState from "../components/EmptyBabyState"

export function BabyListPage() {

    const [babies, setBabies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createOpen, setCreateOpen ] = useState(false)

    async function loadBabies() {
        try {
            const response = await fetch(`${ENDPOINTS.babies}/babies`)
            if (!response.ok) {
                throw new Error("No babies found")
            }
            const data = await response.json();
            setBabies(Array.isArray(data) ? data : data.babies ?? []);
        } catch(error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadBabies();
    }, []);

    if (loading) return <div className="p-6 text-center text-sm text-gray-500">Loading profiles...</div>;

    if (babies.length === 0) {
        return (
            <>
                <EmptyBabyState
                    onCreateClick={() => setCreateOpen(true)}
                />
                <BabyFormModal
                    mode="create"
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                    onSaved={loadBabies}
                />
            </>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Profiles</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{babies.length} profiles active</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {babies.map((baby) => (
                    <Link
                        key={baby.id}
                        to={`/babies/${baby.id}`}
                        className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow duration-200 relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 ${
                            baby.sex === 'MALE' ? 'bg-blue-400' : 'bg-pink-400'
                        }`} />

                        <div className="mb-3">
                            <h2 className="font-medium text-gray-900 dark:text-white text-base">
                                {baby.firstName} {baby.lastName}
                            </h2>
                            {baby.nickname && (
                                <span className="text-xs font-medium text-gray-400 dark:text-zinc-500">
                                  Last Updated: {formatDateWithHoursMinutes(baby.modifiedOn)}
                                </span>
                            )}
                        </div>

                        <div className="space-y-1.5 text-xs text-gray-600 dark:text-zinc-400 border-t border-gray-50 dark:border-zinc-800/60 pt-3">
                            <div className="flex justify-between">
                                <span>Age</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {Math.floor(baby.ageMonths / 12)}y {baby.ageMonths % 12}m
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Born</span>
                                <span className="font-mono text-gray-500 dark:text-zinc-500">
                                  {new Date(baby.birthDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                  })}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pt-8">
                <Button
                    color="blue"
                    size="md"
                    className="shadow-sm shadow-blue-500/10 font-semibold"
                    onClick={() => setCreateOpen(true)}
                >
                    <HiPlus className="mr-2 h-5 w-5" />
                    Add Baby
                </Button>
                <BabyFormModal
                    mode="create"
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                    onSaved={loadBabies}
                />
            </div>
        </div>
    );
}

export default BabyListPage;
