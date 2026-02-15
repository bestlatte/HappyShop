import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../features/product/pages/Home.jsx";
import ProductBrowser from "../features/productBrowser/pages/ProductBrowser.jsx";

export default function App() {
    const user = null; // 如果要給 Home，也可在此處建立 user

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    {/* 傳入 user 給 Home（若 Home 需要） */}
                    {/*<Route index element={<Navigate to="/home" replace />} />*/}
                    <Route index element={<Home user={user} />} />
                    <Route path="/productBrowser" element={<ProductBrowser  />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

