// src/features/products/components/product-info/ProductThumbnail.jsx
import React from "react";
//公用商品縮圖component
export const ProductThumbnail = ({ src, alt, ...props }) => {
  return (
    <div
      className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border border-gray-200 hover:border-gray-400 transition-colors duration-300 relative shrink-0"
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};
