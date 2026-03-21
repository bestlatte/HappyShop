// src/features/products/components/product-modal/ModalVariant.jsx
import { useState } from "react";

export const ModalVariant = ({ variants }) => {
  // default selected options
  const [selectedSize, setSelectedSize] = useState(variants?.sizes[0] || "");
  const [selectedSubSpec, setSelectedSubSpec] = useState(
    variants?.subSpecs[0]?.name || "",
  );

  // 顯示條碼
  const currentSubSpecObj = variants?.subSpecs.find(
    (spec) => spec.name === selectedSubSpec,
  );

  return (
    <div className="flex flex-col gap-4 my-6">
      {/* 區塊 1：規格 */}
      <div className="border border-blue-400 p-4 rounded-lg">
        <h4 className="text-sm font-bold text-gray-900 mb-3">規格</h4>
        <div className="flex flex-wrap gap-2">
          {/* 用 map 動態渲染大小選項 */}
          {variants?.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-1.5 border rounded-md text-sm transition-colors ${
                selectedSize === size
                  ? "border-black font-bold"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 區塊 2：子規格 */}
      <div className="border border-purple-400 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-gray-900">子規格</h4>
          {/* 動態顯示對應的 SKU 條碼 */}
          <span className="text-xs text-gray-400">
            {currentSubSpecObj?.sku}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* 用 map 動態渲染子規格選項 */}
          {variants?.subSpecs.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSubSpec(spec.name)}
              className={`px-4 py-1.5 border rounded-md text-sm transition-colors ${
                selectedSubSpec === spec.name
                  ? "border-black font-bold"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {spec.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
