import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard  from "./pages/Dashboard";
import Baby from "./pages/Baby"
import BabyListPage from "./pages/BabyListPage"
import BabyProfile from "./pages/BabyProfile"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<RootLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path ="dashboard" element={<Dashboard />} />
                    <Route path ="babies" element={<BabyListPage />} />
                    <Route path ="/babies/:id" element={<Baby />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
    export default App;
