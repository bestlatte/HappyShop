// src/features/cart/components/CartPromoList.jsx

export const CartPromoList = ({ promotions = [] }) => {
  // 防呆：如果沒資料就不渲染
  if (promotions.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-4 mb-8">
      <h4 className="text-gray-900 font-bold mb-4">
        結帳商品符合的活動：
      </h4>
      
      {/* 動態渲染活動區塊 */}
      <div className="space-y-4">
        {/*  第一層迴圈：遍歷每個「優惠順序群組」 */}
        {promotions.map((promoGroup, index) => (
          <div key={index}>
            {/* 動態印出標題 (例如：優惠順序 1：) */}
            <p className="text-gray-900 font-bold text-sm mb-2">
              {promoGroup.orderTitle}
            </p>
            
            <ul className="space-y-2">
              {/* 第二層迴圈：遍歷該群組底下的所有活動字串 */}
              {promoGroup.items.map((itemStr, idx) => (
                <li key={idx} className="text-[#00c99d] text-sm">
                  {itemStr}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* 底部靜態的灰色小字備註保持不變 */}
      <div className="mt-8 text-gray-400 text-xs space-y-1">
        <p>＊ 活動優惠將以順序進行折抵，折抵完順序 1 才會接續折抵順序 2、3。</p>
        <p>＊ 贈品/加購於下一頁做選取</p>
        <p>＊ 若贈品/加購品庫存低於可選數量，只能選擇贈品/加購品剩餘庫存量。</p>
        <p>＊ 若贈品/加購品無庫存，將無法選購該贈品/加購品。</p>
      </div>
    </div>
  );
};