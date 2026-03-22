// src/features/products/components/product-info/InfoShipping.jsx
import React, { useState } from "react";

export const InfoShipping = ({ shippingMethods }) => {
  // 1.default false
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      {/* --- Header --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <h3 className="text-base font-bold text-gray-900">運送方式</h3>

        {/* + / - */}
        <span className="text-xl font-light text-gray-800">
          {isOpen ? "−" : "＋"}
        </span>
      </button>

      {/* --- Content --- */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6">
          {/* 列表渲染 */}
          <div className="flex flex-col">
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center gap-2 py-3 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm font-bold text-gray-900">
                  {method.name}
                </span>
                <span className="text-sm text-gray-600">({method.fee})</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            * 實際運費依結帳頁面金額或到貨收款金額為準。
          </p>
        </div>
      </div>
    </div>
  );
};
