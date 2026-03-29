// src/features/cart/components/CartDeliveryRegion.jsx

export const CartDeliveryRegion = ({
  selectedRegion = "taiwan", // 預設為台灣
  onChange = () => {}, // 預設空函式防呆
}) => {
  return (
    <div className="py-6 border-b border-gray-200">
      {/* 標題 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        您希望訂單配送至何處？
      </h2>

      {/* 按鈕群組 */}
      <div className="flex gap-4">
        {/* 台灣按鈕 */}
        <button
          onClick={() => onChange("taiwan")}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg border-2 transition-colors
            ${
              selectedRegion === "taiwan"
                ? "border-black text-black font-bold" // 選中時：黑框、粗體
                : "border-gray-200 text-gray-600 hover:border-gray-300" // 未選中時：灰框
            }
          `}
        >
          {/* 簡單的箱子 Icon (SVG) TODO */}
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          台灣（國內）
        </button>

        {/* 海外按鈕 */}
        <button
          onClick={() => onChange("overseas")}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg border-2 transition-colors
            ${
              selectedRegion === "overseas"
                ? "border-black text-black font-bold"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }
          `}
        >
          {/* 簡單的地球 Icon (SVG) TODO */}
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          海外
        </button>
      </div>
    </div>
  );
};
