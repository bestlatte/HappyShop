// import RootLayout from "../layouts/RootLayout";

// export default function App() {
//   return <RootLayout children="你好"></RootLayout>;
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import RootLayout from "../layouts/RootLayout";
import ProductDetailPage from "../features/productsDetail/pages/ProductDetailPage";
import { ProductLayout } from "../layouts/ProductLayout";
import { CartLayout } from "../layouts/CartLayout";
import CartPage from "../features/cart/pages/CartPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          //home page
          <Route path="/" element={<RootLayout children="你好" />} />
          //product detail page
          <Route element={<ProductLayout />}>
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Route>
          //cart page
          <Route element={<CartLayout />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
