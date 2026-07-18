import SummaryCard from "../components/SummaryCard.jsx";

export function DashboardGrid() {
    return (
        <div className="min-h-screen bg-blue-50 p-6">
            <div className="border-b border-gray-300 pb-4 mb-8">
                <h1 className="text-xl text-left font-semibold lg:text-3xl text-heading">Today's Summary </h1>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">

                <SummaryCard title="Today's Feedings"></SummaryCard>
                <SummaryCard title="Today's Sleep"></SummaryCard>
                <SummaryCard title="Today's Diapers"></SummaryCard>

            </div>

            <div className="border-t border-gray-300 pt-4 pb-4 mt-8">
                <h1 className="text-xl text-left font-semibold lg:text-2xl text-heading">Recent Activity </h1>
            </div>
            <div className="rounded-xl  min-h-56 bg-white shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg text-gray-700 font-semibold">
                    Activity Placeholder
                </h2>

            </div>
        </div>

    );
 }

 export default DashboardGrid;
