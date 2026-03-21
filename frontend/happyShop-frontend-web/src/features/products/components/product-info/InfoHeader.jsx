// src/features/products/components/product-info/InfoHeader.jsx
import React from "react";
import { Link } from "react-router-dom";

export const InfoHeader = ({ tags, name, price, originalPrice }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* 1. Tags(#衛生用品) */}
      {tags && tags.length > 0 && (
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/tag/${tag}`}
              className="text-blue-500 font-bold hover:underline"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* 2. 商品標題區 */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
        {/*[組合]標籤*/}
        <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded mr-2 align-middle">
          組合
        </span>
        <span className="align-middle">{name}</span>
      </h1>

      {/* 3. 價格區 */}
      <div className="flex items-baseline gap-3 mt-1">
        {/* 原價 */}
        {originalPrice && (
          <span className="text-gray-400 line-through text-lg font-medium">
            NT$ {originalPrice.toLocaleString()}
          </span>
        )}

        {/* 優惠價*/}
        <span className="text-3xl font-bold text-red-600">
          NT$ {price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
