import { Outlet } from "react-router-dom";
import { AppNavigationBar } from "../components/AppNavigationBar.jsx";
import { AppSideBar } from "../components/AppSideBar";

function RootLayout() {
    return (
        <div className="flex h-screen">
            <AppSideBar />
                <div className="flex flex-col flex-1">
                    <AppNavigationBar />

                    <main className="flex-1 p-6 overflow-auto">
                        < Outlet />
                    </main>
                </div>
        </div>
    );
}

export default RootLayout;
