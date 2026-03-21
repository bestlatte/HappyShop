// src/features/products/sections/ProductDetailSection.jsx
import { ProductImageGallery } from "../components/ProductImageGallery";
import { ProductInfo } from "../components/ProductInfo";
import {
  getMockProductImages,
  getMockProductInfo,
} from "../services/mockProductService";

export const ProductDetailSection = () => {
  // 1. 發起 API 請求 (目前是 Mock)
  const allImages = getMockProductImages();
  const productInfoData = getMockProductInfo();

  // 2. 組合多個 Components，並處理版面邏輯
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto p-4">
      <div className="w-full md:w-1/2">
        <ProductImageGallery images={allImages} />
      </div>

      <div className="w-full md:w-1/2">
        <ProductInfo info={productInfoData} />
      </div>
    </div>
  );
};
