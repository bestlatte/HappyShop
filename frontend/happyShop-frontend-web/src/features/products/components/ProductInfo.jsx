// src/features/products/components/ProductInfo.jsx
import { InfoBreadcrumb } from "./product-info/InfoBreadcrumb";
import { InfoHeader } from "./product-info/InfoHeader";
import { InfoDescription } from "./product-info/InfoDescription";

export const ProductInfo = ({ info }) => {
  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 flex flex-col gap-4 custom-scrollbar">
      {/* 1. Header */}
      <InfoHeader
        tags={info.tags}
        name={info.name}
        price={info.price}
        originalPrice={info.originalPrice}
      />
      {/* 2. Breadcrumb */}
      <InfoBreadcrumb categories={info.categories} />

      <hr className="border-gray-100 my-2" />

      {/* 3. 描述區 */}
      <InfoDescription description={info.description} warning={info.warning} />

      {/* --- TODO佈局測試 --- */}
      <div className="p-4 border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg">
        <h3 className="font-bold text-blue-600 mb-2"></h3>
        <p className="text-sm text-blue-500 mb-4"></p>

        {/* 1000px 高 */}
        <div className="h-[1000px] bg-gradient-to-b from-blue-100 to-white flex items-center justify-center text-gray-300">
          1000px
        </div>
      </div>
      {/* --- 測試last --- */}

      {/* TODO待完成 */}
      <div className="mt-4 bg-gray-50 p-4">(組合商品)</div>
    </div>
  );
};
