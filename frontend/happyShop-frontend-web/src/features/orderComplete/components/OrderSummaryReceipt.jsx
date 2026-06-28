export const OrderSummaryReceipt = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 w-full max-w-md mx-auto bg-white shadow-sm">
      {/* 商品明細 */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
        <div className="w-16 h-16 bg-gray-100 shrink-0 rounded">
          {/* img */}
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium mb-1">
            Prepara Latchlok系列Tritan保鮮盒1號2入組
          </p>
          <p className="text-gray-400">NT$ 193 · F / F</p>
        </div>
      </div>

      {/* 金額計算區 */}
      <div className="space-y-4 text-sm font-medium">
        <div className="flex justify-between">
          <span className="text-gray-600">數量：1</span>
          <span>NT$ 193</span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-4">
          <span className="text-gray-600">商品金額</span>
          <span>NT$ 193</span>
        </div>
        <div className="flex justify-between border-b border-gray-100 pb-4">
          <span className="text-gray-600">寄送費用</span>
          <span>NT$ 80</span>
        </div>
        <div className="flex justify-between text-base pt-2">
          <span className="font-bold">總計 (TWD)</span>
          <span className="font-bold">273</span>
        </div>
      </div>
    </div>
  );
};
