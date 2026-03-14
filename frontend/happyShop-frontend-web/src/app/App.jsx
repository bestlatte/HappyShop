import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../features/product/pages/Home.jsx";
import ProductBrowser from "../features/productBrowser/pages/ProductBrowser.jsx";
import Login from "../features/auth/pages/Login.jsx";
import ForgetPasswordPage from "../features/auth/pages/ForgetPasswordPage.jsx";
import RegisterForm from "../features/auth/components/register/RegisterForm.jsx";
import Register from "../features/auth/pages/Register.jsx";

export default function App() {
    // const user = null; // 如果要給 Home，也可在此處建立 user


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    {/* 傳入 user 給 Home（若 Home 需要） */}
                    {/*<Route index element={<Navigate to="/home" replace />} />*/}
                    <Route index element={<Home  />} />
                    <Route path="/product-browser" element={<ProductBrowser  />} />
                    <Route path="/login" element={<Login  />} />
                    <Route path="/register" element={<Register  />} />
                    <Route path="/forget-password" element={<ForgetPasswordPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

