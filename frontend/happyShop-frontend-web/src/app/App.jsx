import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../features/product/pages/HomePage.jsx";
import ProductBrowserPage from "../features/productBrowser/pages/ProductBrowserPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import ForgetPasswordPage from "../features/auth/pages/ForgetPasswordPage.jsx";
import RegisterPage from "../features/auth/pages/RegisterPage.jsx";
import CheckoutPage from "../features/checkout/pages/CheckoutPage.jsx";

import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import { ProductLayout } from "../layouts/ProductLayout";
import { CartLayout } from "../layouts/CartLayout";
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
            <Route index element={<HomePage />} />
            <Route path="/product-browser" element={<ProductBrowserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
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

// export default function App() {
//   return (

//       <BrowserRouter>
//         <Routes>
//           //home page
//           <Route path="/" element={<RootLayout children="你好" />} />
//           //product detail page
//           <Route element={<ProductLayout />}>

//           </Route>
//           //cart page
//           <Route element={<CartLayout />}>

//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </CartProvider>
//   );
// }
