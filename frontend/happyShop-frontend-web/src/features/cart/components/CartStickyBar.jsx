// src/features/cart/components/CartStickyBar.jsx

export const CartStickyBar = ({ totalAmount = 0 }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* 左側：總計金額 */}
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-bold text-gray-900">總計</span>
          <span className="text-xl font-bold text-gray-900">
            NT$ {totalAmount.toLocaleString()}
          </span>
        </div>

        {/* 右側：黑色結帳按鈕 */}
        <button className="bg-black text-white font-bold py-3 px-10 rounded-xl hover:bg-gray-800 transition-colors">
          結帳
        </button>
      </div>
    </div>
  );
};
