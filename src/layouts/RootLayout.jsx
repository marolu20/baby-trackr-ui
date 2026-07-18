import { AppNavigationBar } from "../components/AppNavigationBar.jsx";
import { AppSideBar } from "../components/AppSideBar";
import DashboardGrid from "./DashboardGrid.jsx";

function RootLayout({ children }) {
    return (
        <div className="flex h-screen">
            <AppSideBar />

                <div className="flex flex-col flex-1">
                    <AppNavigationBar />
                    <DashboardGrid />

                    <main className="flex-1 p-6 overflow-auto">
                        { children }
                    </main>

                </div>
        </div>
    );
}

export default RootLayout;
