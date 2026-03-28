// src/features/products/components/product-info/InfoRelated.jsx
import React, { useState } from "react";
import { ProductThumbnail } from "./ProductThumbnail";

export const InfoRelated = ({ relatedProducts }) => {
  const [hoveredProductName, setHoveredProductName] = useState(null);

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="py-6 border-b border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">相關商品</h3>

      <div className="flex flex-wrap gap-4 mb-4">
        {relatedProducts.map((product) => (
          <ProductThumbnail
            key={product.id}
            src={product.imageUrl}
            alt={product.name}
            onMouseEnter={() => setHoveredProductName(product.name)}
            onMouseLeave={() => setHoveredProductName(null)}
          />
        ))}
      </div>

      <div className="h-10 flex items-center overflow-hidden">
        <div
          className={`bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-500 transition-all duration-300 ease-out transform ${
            hoveredProductName
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          {hoveredProductName || ""}
        </div>
      </div>
    </div>
  );
};
