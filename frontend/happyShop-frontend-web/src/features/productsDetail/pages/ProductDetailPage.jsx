// src/features/products/pages/ProductDetailPage.jsx
import { ProductDetailSection } from "../sections/ProductDetailSection";

const ProductDetailPage = () => {
  // TODO讀取 URL 的 ID (例如使用 useParams)
  // const { productId } = useParams();

  // TODO設定 SEO Meta Data (例如使用 react-helmet)
  // <Helmet><title>商品詳細頁</title></Helmet>

  return (
    <main>
      <ProductDetailSection />
    </main>
  );
};

export default ProductDetailPage;
