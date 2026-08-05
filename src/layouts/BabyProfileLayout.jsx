import { TabItem, Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import BabyOverview from "../components/baby/BabyOverview.jsx";
import BabyProfile  from "../components/baby/BabyProfile.jsx";
import BabyEvents from "../components/baby/BabyEvents.jsx";
import DashboardGrid from "../layouts/DashboardGrid.jsx"

function BabyProfileLayout({baby, loadBaby, dashboard, loadDashboard}) {
    return (
        <Tabs aria-label="Tabs with underline" variant="underline">
            <TabItem active title="Summary" icon={MdDashboard}>
                <DashboardGrid dashboard={dashboard}/>
            </TabItem>
            <TabItem title="Profile" icon={HiUserCircle}>
                <BabyProfile
                    baby={baby}
                    loadBaby={loadBaby}
                />
            </TabItem>
            <TabItem title="Events" icon={HiClipboardList}>
                <BabyEvents
                    babyId={baby?.id}
                    />
            </TabItem>
        </Tabs>
    );
}

export default BabyProfileLayout;
