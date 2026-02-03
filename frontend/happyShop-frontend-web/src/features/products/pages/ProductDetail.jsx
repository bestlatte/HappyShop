// src/features/products/pages/ProductDetail.jsx
import { ProductImageGallery } from "../components/ProductImageGallery";
import { ProductInfo } from "../components/ProductInfo";
import {
  getMockProductImages,
  getMockProductInfo,
} from "../services/mockProductService";

//Mocking Backend Data
const ProductDetail = () => {
  const allImages = getMockProductImages();
  const productInfoData = getMockProductInfo();

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto p-4">
      <div className="w-full md:w-1/2">
        {/*左邊圖片區*/}
        <ProductImageGallery images={allImages} />
      </div>

      {/*右邊商品資訊區*/}
      <div className="w-full md:w-1/2">
        <ProductInfo info={productInfoData} />
      </div>
    </div>
  );
};

export default ProductDetail;
