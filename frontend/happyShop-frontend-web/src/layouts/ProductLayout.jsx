// 檔案路徑: src/layouts/ProductLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";

export const ProductLayout = () => {
  return (
    <div className="product-layout">
      <Navbar /> {/* 公共導覽列 */}
      <main className="min-h-screen">
        {/* Outlet 會渲染 ProductDetailPage 的內容 */}
        <Outlet />
      </main>
      <Footer /> {/* 公共頁尾 */}
    </div>
  );
};
