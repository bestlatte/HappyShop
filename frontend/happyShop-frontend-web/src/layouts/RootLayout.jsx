// src/layouts/RootLayout.jsx
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MobileCategoryDrawer from "../features/productBrowser/components/MobileCategoryDrawer.jsx";
import { defaultDatas } from "../features/productBrowser/data/defaultDatas.js";
import { useCart } from "./../app/contexts/useCart.js";

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();

  // if current path is "/cart", then it's cart page
  const isCartPage = location.pathname === "/cart";

  const user = null;
  /* 
        const user = {

        name: "李軒毅",

        email: "b409105065@tmu.edu.tw",

     };
     */

  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const handleNavClick = (navKey) => {
    const firstKey = defaultDatas[navKey]?.[0]?.key;
    const url = `/product-browser?nav=${navKey}&category=${firstKey || ""}`;
    navigate(url);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar
          onHamburgerClick={() => setMobileCategoryOpen(true)}
          onNavClick={handleNavClick}
          user={user}
          cartCount={cartCount}
        />
      </div>

      <MobileCategoryDrawer
        open={mobileCategoryOpen}
        onClose={() => setMobileCategoryOpen(false)}
      />

      {/* 動態調整 main 的樣式：
          cartPage? 補上 pb-24 (預留結帳條空間) && pt-8
      */}
      <main className={`grow ${isCartPage ? "pb-24 pt-8" : ""}`}>
        <Outlet />
      </main>

      {!isCartPage && <Footer />}
    </div>
  );
}
