// src/features/products/pages/ProductDetail.jsx
import { ProductImageGallery } from "../components/ProductImageGallery";
import {
  getMockProductImages,
  getMockProductInfo,
} from "../services/mockProductService";

//Mocking Backend Data
const ProductDetail = () => {
  const allImages = getMockProductImages();
  const productInfo = getMockProductInfo();

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto p-4">
      <div className="w-full md:w-1/2">
        {/*左邊圖片區*/}
        <ProductImageGallery images={allImages} />
      </div>

      {/*右邊商品資訊區*/}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold">{productInfo.name}</h1>
        <p className="text-gray-500 mt-2">{productInfo.price}</p>
        <p className="text-gray-500 mt-2">{productInfo.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
