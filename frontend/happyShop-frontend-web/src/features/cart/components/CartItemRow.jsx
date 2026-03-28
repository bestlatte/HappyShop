// src/features/cart/components/CartItemRow.jsx

export const CartItemRow = ({ item, onToggle, onQuantityChange, onDelete }) => {
  return (
    <div className="flex flex-col py-6 border-b border-gray-100 last:border-0 md:flex-row md:items-center">
      <div className="flex md:contents">
        <div className="flex items-center justify-start pr-3 shrink-0 md:w-12 md:justify-center md:pr-0">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={onToggle}
            className="w-5 h-5 accent-black cursor-pointer"
          />
        </div>

        <div className="w-19 shrink-0 bg-gray-100 rounded-lg overflow-hidden aspect-[3/4] md:w-24">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 pl-4 md:pl-0 md:contents">
          <div className="flex justify-between items-start md:contents">
            <div className="md:flex-1 md:px-6">
              <h4 className="text-gray-900 font-bold text-[15px] leading-snug md:font-medium md:text-base">
                {item.name}
              </h4>
              {item.isPreorder && (
                <p className="hidden md:block text-gray-400 text-sm mt-2">
                  ＊
                  此商品為預購商品，若與一般商品一起結帳，訂單會等預購商品到貨後一起寄出。
                </p>
              )}
            </div>
            {/* 手機版垃圾桶 */}
            <button
              onClick={onDelete}
              className="text-gray-900 p-1 -mt-1 -mr-1 md:hidden disabled:opacity-50"
            >
              <svg
                className="w-5.5 h-5.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-gray-500 text-sm mt-1 md:mt-0 md:w-32 md:shrink-0">
            {item.spec}
          </div>
          <div className="text-gray-400 text-[13px] mt-1 md:hidden">
            NT$ {item.price.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 下半部 (小螢幕)：數量、總計金額 */}

      <div className="flex justify-between items-center mt-5 w-full md:w-auto md:mt-0 md:contents">
        <div className="flex justify-between items-center w-[55%] md:w-32 md:justify-center md:gap-4 md:shrink-0">
          {/* - */}
          <button
            onClick={() => onQuantityChange(item.id, item.quantity, -1)}
            disabled={item.quantity <= 1}
            className="text-gray-900 hover:text-black text-xl font-medium transition-colors px-2 md:text-gray-400 md:text-lg md:px-0"
          >
            −
          </button>
          <span className="text-center text-gray-900 font-medium">
            {item.quantity}
          </span>
          {/* + */}
          <button
            onClick={() => onQuantityChange(item.id, item.quantity, 1)}
            className="text-gray-900 hover:text-black text-xl font-medium transition-colors px-2 md:text-gray-400 md:text-lg md:px-0"
          >
            +
          </button>
        </div>

        {/* 總計金額 (保持在最右側) */}
        <div className="text-gray-900 font-bold text-[15px] md:w-28 md:text-center md:font-medium md:text-base md:shrink-0">
          NT$ {(item.price * item.quantity).toLocaleString()}
        </div>

        {/* 大螢幕專用垃圾桶 */}
        <div className="hidden md:flex w-12 justify-center shrink-0">
          {/* 垃圾桶 */}
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {item.isPreorder && (
        <p className="md:hidden mt-4 text-[13px] text-gray-400">
          ＊
          此商品為預購商品，若與一般商品一起結帳，訂單會等預購商品到貨後一起寄出。
        </p>
      )}
    </div>
  );
};
