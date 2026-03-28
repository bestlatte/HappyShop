// src/features/products/sections/ProductDetailSection.jsx
import { useState, useEffect, useMemo } from "react";
import { ProductImageGallery } from "../components/ProductImageGallery";
import { ProductInfo } from "../components/ProductInfo";
import { fetchProductDetail, postCartItem } from "../services/productApi";
import { mockProducts } from "../data/productMockData";
import { useCart } from "../../../app/contexts/CartContext";

export const ProductDetailSection = ({ productId = "product_001" }) => {
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
    return mockProducts.find((p) => p.id === productId) || mockProducts[0];
  }, [productId]);

  //initialization =>> 讀取商品詳細資料
  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      try {
        const response = await fetchProductDetail(productId, {
          signal: controller.signal,
        });
        setProduct(response);
      } catch (error) {
        if (controller.signal.aborted) return;

        if (!allowMockFallback) {
          console.error("[ProductDetail] API failed", error);
          setProduct(null);
          return;
        }

        // API(404) =>> fake success with mock data
        console.warn("[ProductDetail] API failed, fallback to mock data");
        setProduct(fallbackProduct);
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
    if (!payload.subSpec) {
      alert("請先選擇商品規格！");
      return;
    }
    const cartItem = {
      productId: payload.productId,
      size: payload.size,
      subSpec: payload.subSpec,
      quantity: payload.quantity,
      spec: `${payload.size} - ${payload.subSpec}`,
      name: product.name,
      image: product.images?.[0],
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
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        正在為您尋找商品...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        找不到此商品，請回上一頁
      </div>
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
