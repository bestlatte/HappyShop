// src/features/products/components/ProductModal.jsx
import { useState } from "react";
import { InfoHeader } from "./product-info/InfoHeader";
import { ModalVariant } from "./product-modal/ModalVariant";
import { ModalQuantity } from "./product-modal/ModalQuantity";

export const ProductModal = ({ isOpen, onClose, info, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(
    info?.variants?.sizes[0] || "",
  );
  const [selectedSubSpec, setSelectedSubSpec] = useState(
    info?.variants?.subSpecs[0]?.name || "",
  );
  const [quantity, setQuantity] = useState(1);
  if (!isOpen) return null; // 如果沒打開，就什麼都不渲染

  // 3. 定義點擊加入購物車的行為
  const handleAddToCartClick = () => {
    // 呼叫上層傳進來的 API 函式，並把收集到的狀態丟回給上層
    onAddToCart?.({
      productId: info.id,
      size: selectedSize,
      subSpec: selectedSubSpec,
      quantity: quantity,
    });

    onClose();

    // NOTE測試
    // if (onAddToCart) {
    //   onAddToCart(payload);
    // } else {
    //   console.log("addCarData：", payload);
    // }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 左上角 X 關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
        >
          {/* TODO=> iconFile: close.svg */}
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 內容區：切分為左右兩欄 (md:flex-row) */}
        <div className="flex flex-col md:flex-row overflow-y-auto custom-scrollbar p-6 pt-14 md:p-10 gap-8">
          {/* 左：商品圖片 (綠) */}
          <div className="w-full md:w-5/12 shrink-0">
            <div className="bg-gray-100 rounded-xl aspect-[3/4] overflow-hidden">
              <img
                src={info.images[0]}
                alt="商品圖"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 右欄：商品資訊與操作 */}
          <div className="w-full md:w-7/12 flex flex-col">
            {/* 重用 InfoHeader(紅框) */}
            <InfoHeader
              tags={info.tags}
              name={info.name}
              price={info.price}
              originalPrice={info.originalPrice}
            />

            {/* 規格選擇器 (藍 & 紫) */}
            <ModalVariant
              variants={info.variants}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              selectedSubSpec={selectedSubSpec}
              onSubSpecChange={setSelectedSubSpec}
            />

            {/* 數量選擇器 (黃) */}
            <ModalQuantity quantity={quantity} onQuantityChange={setQuantity} />

            {/* 加入購物車按鈕 */}
            <button
              className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors mt-auto"
              onClick={handleAddToCartClick}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
