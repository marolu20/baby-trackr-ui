import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard  from "./pages/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<RootLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path ="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
    export default App;
