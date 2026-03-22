// src/features/cart/components/CartSummary.jsx

export const CartSummary = ({ totalAmount = 0 }) => {
  return (
    <div className="flex justify-end mt-8 mb-12">
      <div className="w-full md:w-1/3 p-6 bg-white">
        {/* 商品金額 (小計) */}
        <div className="flex justify-between items-center mb-6 text-gray-900 font-medium text-sm">
          <span>商品金額</span>
          <span>NT$ {totalAmount.toLocaleString()}</span>
        </div>

        {/* 總計 (大字體) */}
        <div className="flex justify-between items-center mb-8 text-gray-900 font-bold text-xl">
          <span>總計</span>
          <span>NT$ {totalAmount.toLocaleString()}</span>
        </div>

        {/* 黑色結帳按鈕 */}
        <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors">
          結帳
        </button>
      </div>
    </div>
  );
};
