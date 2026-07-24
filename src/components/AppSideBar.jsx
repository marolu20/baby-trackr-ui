import { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
    HiChartPie,
    HiUser,
    HiDocumentReport,
    HiTrendingUp,
    HiOutlineUserCircle,
    HiChevronDown,
    HiChevronUp
} from "react-icons/hi";
import { LuBaby } from "react-icons/lu";
import { useLocation, Link } from "react-router-dom";

export function AppSideBar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const [isActivityOpen, setIsActivityOpen] = useState(false);

    const getLinkClass = (path) => {
        const baseClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full";
        const activeClass = "bg-blue-50 text-blue-600 font-semibold";
        const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
        return `${baseClass} ${currentPath === path ? activeClass : inactiveClass}`;
    };

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 px-4 py-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2.5 px-4 mb-8">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                        <LuBaby className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 tracking-tight">
                        BabyTracker
                    </span>
                </div>

                <nav className="space-y-1.5">
                    <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                        <HiChartPie className="h-5 w-5 opacity-80" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/babies" className={getLinkClass("/babies")}>
                        <HiUser className="h-5 w-5 opacity-80" />
                        <span>Babies</span>
                    </Link>

                    <div className="w-full">
                        <button
                            onClick={() => setIsActivityOpen(!isActivityOpen)}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full text-left transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <HiDocumentReport className="h-5 w-5 opacity-80" />
                                <span>Activity Logs</span>
                            </div>
                            {isActivityOpen ? <HiChevronUp className="h-4 w-4" /> : <HiChevronDown className="h-4 w-4" />}
                        </button>

                        {isActivityOpen && (
                            <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
                                <Link
                                    to="/activity/feed"
                                    className={`block px-4 py-2 text-xs font-medium rounded-md transition-colors ${currentPath === '/activity/feed' ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    🍼 Feeding Logs
                                </Link>
                                <Link
                                    to="/activity/sleep"
                                    className={`block px-4 py-2 text-xs font-medium rounded-md transition-colors ${currentPath === '/activity/sleep' ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    🌙 Sleep Logs
                                </Link>
                                <Link
                                    to="/activity/diaper"
                                    className={`block px-4 py-2 text-xs font-medium rounded-md transition-colors ${currentPath === '/activity/diaper' ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    💩 Diaper Logs
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/reports" className={getLinkClass("/reports")}>
                        <HiTrendingUp className="h-5 w-5 opacity-80" />
                        <span>Reports</span>
                    </Link>
                </nav>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <Link to="/settings" className={getLinkClass("/settings")}>
                    <HiOutlineUserCircle className="h-5 w-5 opacity-80" />
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
}

export default AppSideBar;
