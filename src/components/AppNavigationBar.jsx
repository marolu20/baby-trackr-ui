import { Navbar, Dropdown, Button } from "flowbite-react";
import { HiPlus, HiOutlineBell, HiChevronDown } from "react-icons/hi";
import { LuBaby } from "react-icons/lu";

export function AppNavigationBar({ currentBabyName = "Byron", onLogClick }) {
    return (
        <Navbar fluid className="bg-white border-b border-gray-100 shadow-sm px-6 py-3">

            <div className="flex items-center gap-2">
                <Dropdown
                    label={
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-slate-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                            <LuBaby className="h-4 w-4 text-blue-600" />
                            <span>Active: {currentBabyName}</span>
                            <HiChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    }
                    inline
                    arrowIcon={false}
                >
                    <Dropdown.Header>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Switch Child</span>
                    </Dropdown.Header>
                    <Dropdown.Item icon={LuBaby}>Byron</Dropdown.Item>
                    <Dropdown.Item icon={LuBaby}>Liam</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-blue-600 font-medium">+ Add New Baby</Dropdown.Item>
                </Dropdown>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    color="blue"
                    size="sm"
                    className="shadow-sm shadow-blue-500/10 font-medium"
                    onClick={onLogClick}
                >
                    <HiPlus className="mr-1.5 h-4 w-4" />
                    Log Event
                </Button>

                <button className="relative p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                    <HiOutlineBell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                <div className="h-5 w-px bg-gray-200" />

                <Dropdown
                    label={
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-xs text-blue-700 select-none">
                            M
                        </div>
                    }
                    inline
                    arrowIcon={false}
                >
                    <Dropdown.Header>
                        <span className="block text-sm font-semibold text-gray-900">User Name</span>
                        <span className="block truncate text-xs text-gray-500">username@email.com</span>
                    </Dropdown.Header>
                </Dropdown>
            </div>
        </Navbar>
    );
}
export default AppNavigationBar;
