// src/features/products/components/product-modal/ModalQuantity.jsx
export const ModalQuantity = ({ quantity, onQuantityChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="border border-yellow-400 p-4 rounded-lg mb-6">
      <h4 className="text-sm font-bold text-gray-900 mb-3">選擇數量</h4>

      {/* 加減數量區塊 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
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
