// import RootLayout from "../layouts/RootLayout";

// export default function App() {
//   return <RootLayout children="你好"></RootLayout>;
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ProductDetailPage from "../features/products/pages/ProductDetail";
import { ProductLayout } from "../layouts/ProductLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        //home page
        <Route path="/" element={<RootLayout children="你好" />} />
        //product detail page
        <Route element={<ProductLayout />}>
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
