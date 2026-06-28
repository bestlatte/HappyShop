import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";

import RootLayout from "../layouts/RootLayout";
import HomePage from "../features/product/pages/HomePage.jsx";
import ProductBrowserPage from "../features/productBrowser/pages/ProductBrowserPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import ForgetPasswordPage from "../features/auth/pages/ForgetPasswordPage.jsx";
import RegisterPage from "../features/auth/pages/RegisterPage.jsx";
import CheckoutPage from "../features/checkout/pages/CheckoutPage.jsx";
import ProductDetailPage from "../features/productsDetail/pages/ProductDetailPage.jsx";
import CartPage from "../features/cart/pages/CartPage";
import { OrderCompletePage } from "../features/orderComplete/pages/OrderCompletePage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              {/* 1. 首頁 */}
              <Route index element={<HomePage />} />

              {/* 2. 商品瀏覽 */}
              <Route path="/product-browser" element={<ProductBrowserPage />} />
              <Route
                path="/productBrowser"
                element={<Navigate to="/product-browser" replace />}
              />

              {/* 3. 會員系統 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forget-password" element={<ForgetPasswordPage />} />

              {/* 4. 購物與結帳 (RootLayout 會自動偵測 /cart 並調整樣式) */}
              <Route
                path="/checkout"
                element={
                  <RequireAuth>
                    <CheckoutPage />
                  </RequireAuth>
                }
              />
              <Route path="/cart" element={<CartPage />} />

              {/* 5. 商品詳細頁 */}
              <Route
                path="/products/:productId/:title"
                element={<ProductDetailPage />}
              />
              <Route path="/order-complete" element={<OrderCompletePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
