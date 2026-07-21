import {
    Navbar,
    NavbarBrand
} from "flowbite-react";

export function AppNavigationBar() {
    return (
        <Navbar fluid className="bg-white shadow-sm">
            <NavbarBrand>
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                        🍼
                    </div>
                    <span className="text-xl font-bold text-gray-800">
                BabyTrackr
            </span>
                </div>
            </NavbarBrand>
        </Navbar>

    );
}

export default AppNavigationBar;
