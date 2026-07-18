import {
    Navbar,
    NavbarBrand
} from "flowbite-react";

export function AppNavigationBar() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand>
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BabyTrackr App</span>
            </NavbarBrand>
        </Navbar>
    );
}

export default AppNavigationBar;
