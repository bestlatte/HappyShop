// src/features/products/sections/ProductDetailSection.jsx
import { useState, useEffect, useMemo } from "react";
import { ProductImageGallery } from "../components/ProductImageGallery";
import { ProductInfo } from "../components/ProductInfo";
import { fetchProductDetail, postCartItem } from "../services/productApi";
import { useCart } from "../../../app/contexts/CartContext";
import { mockProductsData } from "../../../mockDatas/mockProductsData.js";
import LoadingState from "../../../components/ui/LoadingState.jsx";
import ErrorState from "../../../components/ui/ErrorState.jsx";

export const ProductDetailSection = ({ productId = "p1" }) => {
  // state：商品詳細資料
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  // Mock Fallback?
  const allowMockFallback =
    import.meta.env.DEV &&
    String(import.meta.env.VITE_ENABLE_API_MOCK_FALLBACK).toLowerCase() ===
      "true";

  const fallbackProduct = useMemo(() => {
    return mockProductsData.find((p) => p.id === productId) ?? null;
  }, [productId]);

  // 資料正規化
  const normalizeProduct = (p) => {
    const hasVariants =
      p.variants?.sizes?.length > 0 || p.variants?.subSpecs?.length > 0;

    return {
      ...p,
      name: p.name ?? p.title,
      images: Array.isArray(p.images) ? p.images : [],
      variants: hasVariants
        ? p.variants
        : { sizes: ["F"], subSpecs: [{ id: "single", name: "F", sku: "" }] },
    };
  };

  // 驗證是否為完整的詳細頁資料
  const isValidDetailProduct = (p) => {
    return (
      p && Array.isArray(p.shippingMethods) && p.variants !== undefined
      // images 不驗證，交給 normalizeProduct 補齊
    );
  };

  //initialization =>> 讀取商品詳細資料
  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      try {
        const response = await fetchProductDetail(productId, {
          signal: controller.signal,
        });
        setProduct(normalizeProduct(response));
      } catch (error) {
        if (controller.signal.aborted) return;

        if (!allowMockFallback) {
          console.error("[ProductDetail] API failed", error);
          setProduct(null);
          return;
        }

        // 找不到商品，或是商品資料不完整 (e.q 缺乏 images 或 variants)
        if (!fallbackProduct || !isValidDetailProduct(fallbackProduct)) {
          console.warn(
            `[ProductDetail] 找不到對應商品或資料不完整, id: ${productId}`,
          );
          setProduct(null);
          return;
        }

        // API(404) =>> fake success with mock data
        console.warn("[ProductDetail] API failed, fallback to mock data");
        setProduct(normalizeProduct(fallbackProduct));
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, [productId, allowMockFallback, fallbackProduct]);

  //onAddToCart
  const handleAddToCart = async (payload) => {
    //NOTE:DEL
    console.log(payload);
    // 防呆
    const isSingleSpec =
      product.variants.sizes?.length === 0 &&
      product.variants.subSpecs?.length === 0;

    if (!isSingleSpec && !payload.subSpec) {
      alert("請先選擇商品規格！");
      return;
    }
    const cartItem = {
      productId: payload.productId,
      size: payload.size || "",
      subSpec: payload.subSpec || "",
      quantity: payload.quantity,
      // 如果沒規格，就存 "單一規格"
      spec:
        payload.size || payload.subSpec
          ? `${payload.size} - ${payload.subSpec}`
          : "單一規格",
      name: product.name,
      image:
        product.images?.[0] ||
        "https://via.placeholder.com/400x500?text=No+Image",
      price: product.price,
    };

    try {
      // call real API
      await postCartItem(cartItem);

      // if success, update UI (Context)
      addToCart(cartItem);

      alert(
        `成功加入購物車！\n商品：${product.name}\n數量：${payload.quantity} 件`,
      );
    } catch (error) {
      //fail but allow mock fallback?
      if (allowMockFallback) {
        console.warn("[ProductDetail] API failed，but allow mock fallback！");

        // allow mock fallback =>> call mock addToCart and update UI (Context)
        addToCart(cartItem);
        alert("[alllow mock fallback] 已加入購物車！");
      } else {
        // not allow mock fallback =>> show error message
        console.error("加入購物車發生錯誤：", error);
        alert("加入購物車失敗，請稍後再試！");
      }
    }
  };

  //UI
  if (isLoading) {
    return <LoadingState message="正在為您尋找商品..." className="mt-0 h-screen" />;
  }

  if (!product) {
    return (
      <ErrorState
        title="找不到此商品"
        message="請返回上一頁重新選擇商品。"
        className="mt-0 h-screen flex flex-col items-center justify-center"
      />
    );
  }

  // screen assembly
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto p-4 mt-8">
      {/* 左半邊：圖片輪播 */}
      <div className="w-full md:w-1/2">
        <ProductImageGallery images={product.images || []} />
      </div>

      {/* 右半邊：商品資訊 */}
      <div className="w-full md:w-1/2">
        <ProductInfo info={product} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};
