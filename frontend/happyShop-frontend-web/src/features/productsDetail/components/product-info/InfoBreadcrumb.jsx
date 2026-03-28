// src/features/products/components/product-info/InfoBreadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";

export const InfoBreadcrumb = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="text-sm text-gray-500 mb-4">
      {" "}
      {/* 增加下方間距 */}
      <ul className="flex flex-wrap items-center gap-2">
        {categories.map((category, index) => {
          const isLast = index === categories.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <Link
                  to={`/category/${category}`}
                  className="font-bold text-black border-b border-black cursor-default"
                  // onClick={(e) => e.preventDefault()}防預設跳轉閃爍
                >
                  {category}
                </Link>
              ) : (
                <Link
                  to={`/category/${category}`}
                  className="hover:text-black transition-colors"
                >
                  {category}
                </Link>
              )}

              {!isLast && <span className="text-gray-300">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
