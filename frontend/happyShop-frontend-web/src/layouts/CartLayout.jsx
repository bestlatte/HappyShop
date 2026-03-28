// src/layouts/CartLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export const CartLayout = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 頂部保留導覽列 */}
      <Navbar />

      {/* 主要內容區塊 
        pb-24 (padding-bottom) 固定在底部的結帳條 預留空間，以免內容被擋住
      */}
      <main className="pb-24 pt-8">
        <Outlet />
      </main>
    </div>
  );
};
