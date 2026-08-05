import { Outlet, useLocation, matchPath } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppNavigationBar } from "../components/AppNavigationBar.jsx";
import { AppSideBar } from "../components/AppSideBar";
import { EventFormModal } from "../components/modals/EventFormModal"
import {ENDPOINTS} from "../config/endpoints.js";

function RootLayout() {
    const [ eventModalOpen, setEventModalOpen ] = useState(false)
    const [ loading, setLoading ] = useState(true);
    const location = useLocation()

    async function loadBabies() {
        try {
            const response = await fetch(`${ENDPOINTS.babies}/babies`)
            if (!response.ok) {
                throw new Error("No babies found")
            }

            const data = await response.json();

            const babyList = Array.isArray(data) ? data : (data.babies ?? []);

            setBabies(babyList)

        } catch(error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const [ babies, setBabies ] = useState([]);

    const match =
        matchPath("/babies/:id", location.pathname) ||
        matchPath("/dashboard/:id", location.pathname);

    const currentBabyId = Number(match?.params?.id);
    const currentBaby = babies.find(b => b.id === currentBabyId)

    useEffect(() => {
        loadBabies();
    }, []);

    useEffect(() => {
        console.log("Current Baby:", currentBaby);
    }, [currentBaby])

    return (
        <div className="flex h-screen">
            <AppSideBar />
                <div className="flex flex-col flex-1">
                    <AppNavigationBar
                        currentBaby={currentBaby}
                        babies={babies}
                        onLogEvent={() => setEventModalOpen(true)}
                    />
                    <main className="flex-1 p-6 overflow-auto">
                        < Outlet />
                    </main>
                    <EventFormModal
                        open={eventModalOpen}
                        onClose={() => setEventModalOpen(false)}
                        babyId={currentBaby?.id}
                    />
                </div>
        </div>
    );
}

export default RootLayout;
