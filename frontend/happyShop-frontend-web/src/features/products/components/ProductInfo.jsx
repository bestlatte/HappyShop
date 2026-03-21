// src/features/products/components/ProductInfo.jsx
import { useState } from "react";
import { InfoBreadcrumb } from "./product-info/InfoBreadcrumb";
import { InfoHeader } from "./product-info/InfoHeader";
import { InfoDescription } from "./product-info/InfoDescription";
import { InfoBundle } from "./product-info/InfoBundle";
import { InfoRelated } from "./product-info/InfoRelated";
import { InfoPromotions } from "./product-info/InfoPromotions";
import { InfoActionBtn } from "./product-info/InfoActionBtn";
import { InfoShipping } from "./product-info/InfoShipping";
// import { ProductDrawer } from "./ProductDrawer";
import { ProductModal } from "./ProductModal";

export const ProductInfo = ({ info }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
        <InfoDescription
          description={info.description}
          warning={info.warning}
        />

        <InfoBundle bundles={info.bundles} />

        {/* 1. 相關商品 */}
        <InfoRelated relatedProducts={info.relatedProducts} />

        {/* 2. 優惠區 */}
        <InfoPromotions promotions={info.promotions} />

        {/* 加入購物車btn => 開啟抽屜 */}
        <InfoActionBtn onOpenDrawer={openModal} />

        {/* 運送方式 */}
        <InfoShipping shippingMethods={info.shippingMethods} />
      </div>

      <ProductModal isOpen={isModalOpen} onClose={closeModal} info={info} />
    </>
  );
};
