// src/features/products/components/product-info/InfoPromotions.jsx
import React, { useState } from "react";
import { PromotionItem } from "./PromotionItem";

export const InfoPromotions = ({ promotions }) => {
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);

  if (!promotions || promotions.length === 0) return null;

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const visiblePromotions = isListExpanded
    ? promotions
    : promotions.slice(0, 2);

  return (
    <div className="py-6 border-b border-gray-100">
      <div className="flex flex-col gap-4">
        {visiblePromotions.map((promo) => (
          <PromotionItem
            key={promo.id}
            promo={promo}
            isOpen={activeId === promo.id}
            onToggle={() => toggleItem(promo.id)}
          />
        ))}
      </div>

      {/* 底部按鈕 */}
      {promotions.length > 2 && (
        <button
          className="mt-6 text-sm font-bold text-black border-b border-black hover:text-gray-600 transition-colors"
          onClick={() => setIsListExpanded(!isListExpanded)}
        >
          {isListExpanded ? "收納優惠" : "展開所有優惠"}
        </button>
      )}
    </div>
  );
};
