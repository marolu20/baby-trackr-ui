import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppNavigationBar } from "../components/AppNavigationBar.jsx";
import { AppSideBar } from "../components/AppSideBar";
import { EventFormModal } from "../components/modals/EventFormModal"
import {ENDPOINTS} from "../config/endpoints.js";

function RootLayout() {
    const [ eventModalOpen, setEventModalOpen ] = useState(false)
    const [ activeBaby, setActiveBaby ] = useState(null)
    const [ babies, setBabies] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadBabies() {
        try {
            const response = await fetch(`${ENDPOINTS.babies}/babies`)
            if (!response.ok) {
                throw new Error("No babies found")
            }

            const data = await response.json();

            const babyList = Array.isArray(data) ? data : (data.babies ?? []);

            setBabies(babyList)

            if (babyList.length > 0 && !activeBaby) {
                setActiveBaby(babyList[0]);
            }

        } catch(error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadBabies();
    }, []);

    useEffect(() => {
        console.log("Active Baby Changed:", activeBaby);
    }, [activeBaby])

    return (
        <div className="flex h-screen">
            <AppSideBar />
                <div className="flex flex-col flex-1">
                    <AppNavigationBar
                        activeBaby={activeBaby}
                        babies={babies}
                        setActiveBaby={setActiveBaby}
                        onLogEvent={() => setEventModalOpen(true)}
                    />
                    <main className="flex-1 p-6 overflow-auto">
                        < Outlet />
                    </main>
                    <EventFormModal
                        open={eventModalOpen}
                        onClose={() => setEventModalOpen(false)}
                        babyId={activeBaby?.id}
                    />
                </div>
        </div>
    );
}

export default RootLayout;
