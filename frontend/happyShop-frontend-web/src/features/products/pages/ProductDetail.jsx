// src/features/products/pages/ProductDetail.jsx
import { ProductImageGallery } from "../components/ProductImageGallery";

const ProductDetail = () => {
  const totalImageCount = 10;

  const allImages = Array.from({ length: totalImageCount }, (_, index) => {
    return new URL(`../../../assets/product1-${index}.jpg`, import.meta.url)
      .href;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto p-4">
      <div className="w-full md:w-1/2">
        <ProductImageGallery images={allImages} />
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold">商品名稱</h1>
        <p className="text-gray-500 mt-2">info</p>
      </div>
    </div>
  );
};

export default ProductDetail;
