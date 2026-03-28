// src/features/products/components/product-info/ProductGrid.jsx
import React from "react";
import { ProductThumbnail } from "./ProductThumbnail";
//one line of small images, >3? => show "+N" button
export const ProductGrid = ({ products }) => {
  const maxDisplay = 3;
  const hasMore = products.length > maxDisplay + 1;
  const displayProducts = hasMore ? products.slice(0, maxDisplay) : products;
  const remainingCount = products.length - maxDisplay;

  return (
    <div className="flex gap-2">
      {displayProducts.map((product) => (
        <div key={product.id} className="w-20 md:w-24">
          <ProductThumbnail src={product.imageUrl} alt={product.name} />
        </div>
      ))}

      {hasMore && (
        <div className="w-20 md:w-24 h-32 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
