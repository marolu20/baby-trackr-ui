    import { Outlet, useLocation, matchPath, useNavigate } from "react-router-dom";
    import { useState, useEffect } from "react";
    import { AppNavigationBar } from "../components/AppNavigationBar.jsx";
    import { AppSideBar } from "../components/AppSideBar";
    import { EventFormModal } from "../components/modals/EventFormModal";
    import { SelectBabyModal } from "../components/modals/SelectBabyModal";
    import {ENDPOINTS} from "../config/endpoints.js";
    
    function RootLayout() {
        const [ eventModalOpen, setEventModalOpen ] = useState(false)
        const [ deleteModalOpen, setDeleteModalOpen] = useState(false);
        const [ selectBabyModalOpen, setSelectBabyModalOpen] = useState(false)
        const [ loading, setLoading ] = useState(true);

        const [ babies, setBabies ] = useState([]);
        const [ currentBaby, setCurrentBaby ] = useState(null)

        const location = useLocation();
        const navigate = useNavigate();

        const match =
            matchPath("/babies/:id", location.pathname) ||
            matchPath("/dashboard/:id", location.pathname);
    
        const searchParams = new URLSearchParams(location.search)
        const queryBabyId = searchParams.get("babyId");
    
        const currentBabyId = Number(
            match?.params?.id ?? queryBabyId
        );

    
        function handleBabyChange(baby) {
            setCurrentBaby(baby)
            if (location.pathname === "/activity") {
                navigate(`/activity?babyId=${baby.id}`);
            } else {
                navigate(`/babies/${baby.id}`);
            }
        }

        function handleLogEvent() {
            if (!currentBaby) {
                setSelectBabyModalOpen(true)
                return;
            }
            setEventModalOpen(true);
        }

        useEffect(() => {
            const idFromUrl = match?.params?.id ?? queryBabyId;

            if (!idFromUrl || babies.length === 0) {
                return;
            }

            const baby = babies.find(
                baby => baby.id === Number(idFromUrl)
            );

            if (baby) {
                setCurrentBaby(baby);
            }
        }, [location.pathname, location.search, babies]);
    
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
                            onBabyChange={handleBabyChange}
                            onLogEvent={handleLogEvent}
                        />
                        <main className="flex-1 p-6 overflow-auto">
                            < Outlet />
                        </main>
                        <SelectBabyModal
                            open={selectBabyModalOpen}
                            onClose={() => setSelectBabyModalOpen(false)}
                        />
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
