import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../features/product/pages/HomePage.jsx";
import ProductBrowserPage from "../features/productBrowser/pages/ProductBrowserPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import ForgetPasswordPage from "../features/auth/pages/ForgetPasswordPage.jsx";
import RegisterForm from "../features/auth/components/register/RegisterForm.jsx";
import RegisterPage from "../features/auth/pages/RegisterPage.jsx";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import { ProductLayout } from "../layouts/ProductLayout";
import CheckOutLayout from "../layouts/CheckOutLayout.jsx";
import CheckoutPage from "../features/checkout/pages/CheckoutPage.jsx";

export default function App() {
    // const user = null; // 如果要給 Home，也可在此處建立 user


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    {/* 傳入 user 給 Home（若 Home 需要） */}
                    {/*<Route index element={<Navigate to="/home" replace />} />*/}
                    <Route index element={<HomePage  />} />
                    <Route path="/product-browser" element={<ProductBrowserPage  />} />
                    <Route path="/login" element={<LoginPage  />} />
                    <Route path="/register" element={<RegisterPage  />} />
                    <Route path="/forget-password" element={<ForgetPasswordPage/>} />
                    <Route path="/checkout" element={<CheckoutPage/>} />
                </Route>

                //商品詳細頁面
                <Route element={<ProductLayout />}>
                    <Route path="/products/:id/:title" element={<ProductDetailPage />} />
                </Route>

                {/*//結帳畫面*/}
                {/*<Route element={<CheckOutLayout />}>*/}
                {/*    <Route path="/checkout" element={<CheckoutPage />} />*/}
                {/*</Route>*/}









            </Routes>
        </BrowserRouter>

    );
}