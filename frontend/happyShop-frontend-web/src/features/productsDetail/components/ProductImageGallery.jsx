//happyShop-frontend-web/src/features/products/components/ProductImageGallery.jsx
export const ProductImageGallery = ({ images }) => {
  // 如果沒有圖片，就回傳空或載入中
  if (!images || images.length === 0) {
    return (
      <div className="animate-pulse bg-gray-200 aspect-3/4 w-full rounded-2xl" />
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4 max-w-2xl mx-auto">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`商品詳情圖 ${index + 1}`}
          className="w-full h-auto object-contain rounded-xl "
          // loading="lazy" 可以幫助優化效能，讓滑到那才載入
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ProductImageGallery;
