import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";

import RootLayout from "../layouts/RootLayout";
import HomePage from "../features/product/pages/HomePage.jsx";
import ProductBrowserPage from "../features/productBrowser/pages/ProductBrowserPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import ForgetPasswordPage from "../features/auth/pages/ForgetPasswordPage.jsx";
import RegisterPage from "../features/auth/pages/RegisterPage.jsx";
import CheckoutPage from "../features/checkout/pages/CheckoutPage.jsx";
import ProductDetailPage from "../features/productsDetail/pages/ProductDetailPage.jsx";
import CartPage from "../features/cart/pages/CartPage";

export default function App() {
  // const user = null; // 如果要給 Home，也可在此處建立 user

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* 傳入 user 給 Home（若 Home 需要） */}
            {/*<Route index element={<Navigate to="/home" replace />} />*/}
            {/* 1. 首頁 */}
            <Route index element={<HomePage />} />

            {/* 2. 商品瀏覽 */}
            <Route path="/product-browser" element={<ProductBrowserPage />} />

            {/* 3. 會員系統 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />

            {/* 4. 購物與結帳 (RootLayout 會自動偵測 /cart 並調整樣式) */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* 5. 商品詳細頁 */}
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Route>
          {/*//結帳畫面*/}
          {/*<Route element={<CheckOutLayout />}>*/}
          {/*    <Route path="/checkout" element={<CheckoutPage />} />*/}
          {/*</Route>*/}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
