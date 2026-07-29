import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {Spinner} from "flowbite-react";
import getDashboard from "../api/dashboardApi";
import DashboardGrid from "../layouts/DashboardGrid.jsx";
import {ENDPOINTS} from "../config/endpoints.js";

function Dashboard() {
    const { id } = useParams()
    const [ dashboard, setDashboard ] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            const data = await getDashboard(id);
            setDashboard(data)
        }

        loadDashboard();
    }, [id]);

    if (!dashboard) {
        return <Spinner aria-label="Loading dashboard" />;
    }

    return <DashboardGrid dashboard={dashboard} />

}

export default Dashboard;
