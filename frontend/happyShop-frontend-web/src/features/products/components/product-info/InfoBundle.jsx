// src/features/products/components/product-info/InfoBundle.jsx
import React from "react";
import { ProductThumbnail } from "./ProductThumbnail";

export const InfoBundle = ({ bundles }) => {
  if (!bundles || bundles.length === 0) return null;

  return (
    <div className="py-6 border-b border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-2">組合商品</h3>
      <p className="text-sm text-gray-500 mb-4">* 此組合包含以下商品。</p>

      <div className="flex flex-wrap gap-4 mb-4">
        {bundles.map((item) => (
          <ProductThumbnail
            key={item.id}
            src={item.imageUrl}
            alt={item.name}
            // TODO這裡的 onClick 可以連到組合商品的詳細頁/直接加入購物車
            onClick={() => console.log(`點擊組合: ${item.name}`)}
          />
        ))}
      </div>

      <button
        className="text-sm font-bold text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors"
        onClick={() => alert("功能開發中")}
      >
        查看全部組合商品
      </button>
    </div>
  );
};
