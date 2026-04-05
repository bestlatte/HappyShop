// src/features/products/pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { ProductDetailSection } from "../sections/ProductDetailSection";

const ProductDetailPage = () => {
  const { productId } = useParams();

  // TODO設定 SEO Meta Data (例如使用 react-helmet)
  // <Helmet><title>商品詳細頁</title></Helmet>

  return (
    <main>
      <ProductDetailSection productId={productId} />
    </main>
  );
};

export default ProductDetailPage;
