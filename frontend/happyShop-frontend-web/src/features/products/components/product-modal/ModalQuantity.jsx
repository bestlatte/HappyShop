// src/features/products/components/product-modal/ModalQuantity.jsx
import { useState } from "react";

export const ModalQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  return (
    <div className="border border-yellow-400 p-4 rounded-lg mb-6">
      <h4 className="text-sm font-bold text-gray-900 mb-3">選擇數量</h4>

      {/* 加減數量區塊 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black"
        >
          −
        </button>

        <span className="w-8 text-center font-bold text-gray-900">
          {quantity}
        </span>

        <button
          onClick={handleIncrease}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black"
        >
          ＋
        </button>
      </div>
    </div>
  );
};
