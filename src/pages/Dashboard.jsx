import { useEffect, useState } from "react";
import getDashboard from "../api/dashboardApi";
import DashboardGrid from "../layouts/DashboardGrid.jsx";
import {Spinner} from "flowbite-react";

function Dashboard() {
    const [ dashboard, setDashboard ] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            const data = await getDashboard(4)
            console.log(data)
            setDashboard(data)
        }

        loadDashboard();
    }, []);

    if (!dashboard) {
        return <Spinner aria-label="Loading dashboard" />;
    }

    return <DashboardGrid dashboard={dashboard} />

}

export default Dashboard;
