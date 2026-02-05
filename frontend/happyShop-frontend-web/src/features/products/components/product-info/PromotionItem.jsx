// src/features/products/components/product-info/PromotionItem.jsx
import React from "react";
import { ProductGrid } from "./ProductGrid";

// => iconFile: tag.svg
const TagIcon = () => (
  <svg
    className="w-5 h-5 text-black flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

export const PromotionItem = ({ promo, isOpen, onToggle }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* 標題區 */}
      <div
        className="flex items-start gap-3 cursor-pointer group"
        onClick={onToggle}
      >
        <TagIcon />
        <h4 className="text-sm font-bold text-gray-900 leading-relaxed group-hover:text-gray-600 transition-colors">
          {promo.title}
        </h4>
      </div>

      {/* 展開內容區 */}
      {isOpen && (
        <div className="pl-8 text-xs text-gray-500 flex flex-col gap-2 animate-fadeIn">
          {promo.period && <p>- 優惠期間：{promo.period}</p>}

          {promo.rules &&
            promo.rules.map((rule, idx) => (
              <p key={idx}>
                - {rule}
                {idx === 0 && (
                  <span className="underline ml-1 cursor-pointer text-black font-bold">
                    查看
                  </span>
                )}
                {rule.includes("不可累計") && (
                  <span className="underline ml-1 cursor-pointer text-black font-bold">
                    說明
                  </span>
                )}
              </p>
            ))}

          {promo.gift && (
            <p>
              - 活動贈品：<span className="underline">{promo.gift}</span>
            </p>
          )}

          {/* addon? => show Grid */}
          {promo.type === "addon" && promo.products && (
            <div className="mt-2">
              <ProductGrid products={promo.products} />
              <button className="mt-3 font-bold text-black border-b border-black self-start hover:text-gray-600 transition-colors">
                查看全部加購商品
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
