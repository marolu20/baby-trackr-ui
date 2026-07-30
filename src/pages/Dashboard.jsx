import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {Spinner} from "flowbite-react";
import getDashboard from "../api/dashboardApi";
import DashboardGrid from "../layouts/DashboardGrid.jsx";
import {ENDPOINTS} from "../config/endpoints.js";

function Dashboard() {
    const { id } = useParams()
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
        loadDashboard();

        function handleRefresh() {
            setTimeout(() => {
                loadDashboard();
            }, 5000);
        }

        window.addEventListener("refreshDashboardData", handleRefresh);

        return () => window.removeEventListener("refreshDashboardData", handleRefresh);
    }, [id]);

    if (!dashboard) {
        return <Spinner aria-label="Loading dashboard" />;
    }

    return <DashboardGrid dashboard={dashboard} />

}

export default Dashboard;
