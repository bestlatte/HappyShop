// src/features/products/components/product-info/InfoDescription.jsx
import React, { useState } from "react";

export const InfoDescription = ({ description, warning }) => {
  // 1.isExpanded default false
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-4 border-b border-gray-100">
      {/* 2. 警語 (如果有傳 warning 進來才顯示) */}
      {warning && (
        <div className="flex gap-2 mb-4 text-sm text-gray-800 leading-relaxed">
          {/* 紅色圓點 */}
          <span className="flex-shrink-0 w-3 h-3 mt-1.5 bg-rose-500 rounded-full" />
          {/* 警告文字 */}
          <p>{warning}</p>
        </div>
      )}

      {/* 3. 描述內容區 */}
      {/* line-clamp-3 => 只顯示 3 行，多餘截斷為 ...*/}
      <div
        className={`text-gray-700 text-sm leading-7 whitespace-pre-line ${
          !isExpanded ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </div>

      {/* 4. 收合鈕 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)} // click=> true/false
        className="mt-3 font-bold text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors"
      >
        {isExpanded ? "收合內容" : "查看更多"}
      </button>
    </div>
  );
};
