import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Baby from "./pages/Baby"
import BabyListPage from "./pages/BabyListPage"
import BabyProfile from "./pages/BabyProfile"
import ActivityLog from "./pages/ActivityLog"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<RootLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path ="babies" element={<BabyListPage />} />
                    <Route path ="/babies/:id" element={<Baby />} />
                    <Route path ="/activity" element={<ActivityLog />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
    export default App;
