import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import getBaby from "../api/BabyApi";
import BabyProfile from "../pages/BabyProfile.jsx"
import EmptyBabyState from "../components/EmptyBabyState.jsx"
import BabyFormModal from "../components/modals/BabyFormModal.jsx"
import BabyProfileLayout from "../layouts/BabyProfileLayout.jsx"
import { Spinner } from "flowbite-react";
import getDashboard from "../api/dashboardApi.js";

function Baby () {
    const { id } = useParams();
    const [ baby, setBaby ] = useState(null);
    const [ hasBaby, setHasBaby ] = useState(true)
    const [ createOpen, setCreateOpen ] = useState(false)
    const [ dashboard, setDashboard ] = useState()

    async function loadBaby() {
        try {
            const data = await getBaby(id)
            setBaby(data);
            setHasBaby(true)
        } catch(error) {
            if (error.status === 404) {
                setBaby(null);
                setHasBaby(false)
            } else {
                console.error(error)
            }
        }
    }

    async function loadDashboard() {
        console.log("Loading Dashboard")
        try {
            const data = await getDashboard(id);
            setDashboard(data);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        }
    }


    useEffect(() => {
        loadBaby();
        loadDashboard();

        function handleRefresh() {
            console.log("Baby page received eventDataChanged")
            setTimeout(() => {
                loadDashboard();
            }, 5000);
        }

        window.addEventListener("eventDataChanged", handleRefresh);

        return () => window.removeEventListener("eventDataChanged", handleRefresh);
    }, [id]);

    if (!hasBaby) {
        return (
            <>
            <EmptyBabyState
                onCreateClick={()=> setCreateOpen(true)}
            />
            <BabyFormModal
                mode="create"
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSaved={loadBaby}
            />
            </>
        );
    }

    if (!baby || !dashboard) {
        return <Spinner aria-label="Loading dashboard" />;
    }

    return <BabyProfileLayout
        baby={baby}
        dashboard={dashboard}
        loadBaby={loadBaby}
        loadDashboard={loadDashboard}
    />
}

export default Baby;
