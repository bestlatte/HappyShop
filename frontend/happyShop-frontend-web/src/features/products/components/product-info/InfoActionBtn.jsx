// src/features/products/components/product-info/InfoAction.jsx
import React from "react";

export const InfoActionBtn = () => {
  return (
    <div className="py-6 border-b border-gray-100">
      <button
        type="button"
        //TODO cart API
        onClick={() => alert("已加入購物車！")}
        className="w-full bg-black text-white text-lg font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-md active:scale-95 duration-200"
      >
        購 買
      </button>
    </div>
  );
};
