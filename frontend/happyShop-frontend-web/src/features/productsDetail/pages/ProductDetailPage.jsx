// src/features/products/pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { ProductDetailSection } from "../sections/ProductDetailSection";

const ProductDetailPage = () => {
  const { productId } = useParams();
  return (
    <main>
      <ProductDetailSection productId={productId} />
    </main>
  );
};

export default ProductDetailPage;
