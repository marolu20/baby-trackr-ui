import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiChartPie, HiUser, HiTrendingUp, HiDocumentReport, HiOutlineUserCircle } from "react-icons/hi";

export function AppSideBar() {

    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem href="#" icon={HiChartPie}>
                        Dashboard
                    </SidebarItem>
                    <SidebarItem href="#" icon={HiUser}>
                        Babies
                    </SidebarItem>
                    <SidebarCollapse icon={HiDocumentReport} label="Activity">
                        <SidebarItem href="#">Feed</SidebarItem>
                        <SidebarItem href="#">Sleep</SidebarItem>
                        <SidebarItem href="#">Diaper</SidebarItem>
                    </SidebarCollapse>
                    <SidebarItem href="#" icon={HiTrendingUp}>
                        Reports
                    </SidebarItem>
                    <SidebarItem href="#" icon={HiOutlineUserCircle}>
                        Settings
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}

export default AppSideBar;
