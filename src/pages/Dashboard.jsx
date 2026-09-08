import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {Spinner} from "flowbite-react";
import getDashboard from "../api/dashboardApi";
import DashboardGrid from "../layouts/DashboardGrid.jsx";

function Dashboard() {
    const { id } = useParams()
    console.log("Dashboard component rendered, baby:", id)
    const [ dashboard, setDashboard ] = useState(null);

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
        console.log("Dashboard listener REGISTERED")
        loadDashboard();

        function handleRefresh() {
            console.log("Dashboard received eventDataChanged");
            loadDashboard();
            // setTimeout(() => {
            //     loadDashboard();
            // }, 5000);
        }

        window.addEventListener("eventDataChanged", handleRefresh);

        return () => {
            console.log("Dashboard listener REMOVED")
            window.removeEventListener("eventDataChanged", handleRefresh);
        }
    }, [id]);

    if (!dashboard) {
        return <Spinner aria-label="Loading dashboard" />;
    }

    return <DashboardGrid dashboard={dashboard} />

}

export default Dashboard;
