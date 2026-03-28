// src/features/cart/components/CartNotice.jsx

export const CartNotice = () => {
  return (
    <div className="py-8">
      {/* 區塊標題 */}
      <h3 className="text-2xl font-bold text-gray-900  mb-6">
        您購物車中的項目
      </h3>

      {/* 灰底提醒文字框 */}
      <div className="bg-gray-200 rounded-xl p-6 text-sm text-gray-900 font-bold leading-relaxed space-y-1">
        <p>
          ＊
          提醒您：目前結帳的商品物流僅支援「黑貓」「7-11」「全家」。(實際物流依結帳頁為準)
        </p>
        <p>＊ 不同廠商出貨無法合併訂單，請分次做結帳，謝謝您的配合。</p>
      </div>
    </div>
  );
};
