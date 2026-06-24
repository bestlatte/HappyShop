// src/features/cart/sections/CartSection.jsx
import { useState, useEffect, useMemo } from "react";
import { MOCK_CART_DATA, MOCK_CART_PROMOTIONS } from "../data/cartMockData";

//UI components
import { CartDeliveryRegion } from "../components/CartDeliveryRegion";
import { CartNotice } from "../components/CartNotice";
import { CartItemRow } from "../components/CartItemRow";
import { CartPromoList } from "../components/CartPromoList";
import { CartSummary } from "../components/CartSummary";
import { CartStickyBar } from "../components/CartStickyBar";
import {
  fetchCartData,
  fetchCartPromotions,
  updateCartItemQuantity,
  deleteCartItem,
} from "../services/cartApi";
import LoadingState from "../../../components/ui/LoadingState.jsx";
import ErrorState from "../../../components/ui/ErrorState.jsx";

export const CartSection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [region, setRegion] = useState("taiwan");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // ==========================================
  // allow mock fallback? =>>
  // ==========================================
  const allowMockFallback =
    import.meta.env.DEV &&
    String(import.meta.env.VITE_ENABLE_API_MOCK_FALLBACK).toLowerCase() ===
      "true";

  // 將假資料快取起來，效能優化
  const localFallbackCart = useMemo(() => MOCK_CART_DATA, []);
  const localFallbackPromotions = useMemo(() => MOCK_CART_PROMOTIONS, []);

  // ==========================================
  // 初始化：call API && Fallback 邏輯
  // ==========================================
  useEffect(() => {
    // 建立中斷控制器，防止使用者快速切換頁面導致的效能浪費
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      setLoadError(null);
      try {
        // signal: 讓 API 請求可以被中斷
        const [cartResponse, promoResponse] = await Promise.all([
          fetchCartData({ signal: controller.signal }),
          fetchCartPromotions({ signal: controller.signal }),
        ]);

        // api success =>> update state with real data
        setCartItems(cartResponse);
        setPromotions(promoResponse);
      } catch (error) {
        // 如果是因為切換頁面導致的請求中斷，就安靜退出
        if (controller.signal.aborted) return;

        //if API fail && not allow mock fallback => show error and set empty state, else show warning and use mock data
        if (!allowMockFallback) {
          console.error("[CartSection] API failed, fallback disabled", error);
          setCartItems([]);
          setPromotions([]);
          setLoadError("購物車資料載入失敗，請稍後再試。");
          return;
        }

        // api fail + allow mock fallback =>> show warning and use mock data
        console.warn("[CartSection] API failed, fallback to mock", error);

        setCartItems(localFallbackCart);
        setPromotions(localFallbackPromotions);
      } finally {
        // success || fail 都要結束 loading 狀態
        setIsLoading(false);
      }
    }

    loadData();

    // Cleanup function：組件卸載時中斷尚未完成的 API 請求
    return () => controller.abort();
  }, [allowMockFallback, localFallbackCart, localFallbackPromotions, reloadKey]);

  // ==========================================
  //  畫面互動邏輯 (打勾、全選、算錢)
  // ==========================================
  const handleGlobalSelectAll = (isChecked) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: isChecked })),
    );
  };

  const handleItemToggle = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return item.selected ? sum + item.price * item.quantity : sum;
    }, 0);
  };

  const totalAmount = calculateTotal();
  const isAllSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);

  // ==========================================
  //  處理數量增減 (包含 API 呼叫與 Mock Fallback)
  // ==========================================
  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return; // 防呆：數量不能小於 1

    try {
      //call API to update quantity
      await updateCartItemQuantity({ itemId, quantity: newQuantity });

      // backend success =>> 同步更新 UI
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch {
      // api fail =>> if allowMockFallback then fake success by updating quantity in UI, else alert error
      if (allowMockFallback) {
        console.warn(
          `[CartSection] Update API failed, fallback to mock update for item ${itemId}`,
        );
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item,
          ),
        );
      } else {
        // real failure without fallback =>> show error message
        alert("更新數量失敗，請稍後再試！");
      }
    }
  };

  const handleDeleteItem = async (itemId) => {
    // 使用者確認
    if (!window.confirm("確定要將此商品從購物車移除嗎？")) return;

    try {
      await deleteCartItem({ itemId });

      //  success => filter
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch {
      //fail => if MOCK_FALLBACK=true then fake success by removing item from UI, else alert error
      if (allowMockFallback) {
        console.warn(
          `[CartSection] Delete API failed, fallback to mock delete for item ${itemId}`,
        );
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      } else {
        alert("移除商品失敗，請稍後再試！");
      }
    }
  };

  // ==========================================
  //  UI Render
  // ==========================================
  if (isLoading) {
    return <LoadingState message="正在為您準備購物車..." />;
  }

  if (loadError) {
    return (
      <ErrorState
        title="購物車載入失敗"
        message={loadError}
        actionLabel="重新載入"
        onAction={() => setReloadKey((prev) => prev + 1)}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 mt-32 text-center text-gray-400">
        <p className="font-medium text-xl mb-4 text-gray-900">
          您的購物車目前是空的
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
          去逛逛
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <CartDeliveryRegion selectedRegion={region} onChange={setRegion} />
        <CartNotice />

        <div className="mt-8 mb-12">
          {/* 灰色表頭與全選 */}
          <div className="flex items-center text-gray-400 text-sm pb-4 border-b border-gray-200">
            <div className="w-12 flex justify-center shrink-0">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleGlobalSelectAll(e.target.checked)}
                className="w-5 h-5 accent-black cursor-pointer"
              />
            </div>
            <div className="hidden md:block w-24 text-center shrink-0">
              產品
            </div>
            <div className="hidden md:block flex-1 px-6">名稱</div>
            <div className="hidden md:block w-32 shrink-0">規格</div>
            <div className="hidden md:block w-32 text-center shrink-0">
              件數
            </div>
            <div className="hidden md:block w-28 text-center shrink-0">
              金額
            </div>
            <div className="hidden md:block w-12 text-center shrink-0">
              移除
            </div>
          </div>

          {/* 商品列表 */}
          <div className="flex flex-col">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onToggle={() => handleItemToggle(item.id)}
                onQuantityChange={handleQuantityChange}
                onDelete={() => handleDeleteItem(item.id)}
              />
            ))}
          </div>
        </div>

        <CartPromoList promotions={promotions} />
        <CartSummary totalAmount={totalAmount} />
      </div>

      <CartStickyBar totalAmount={totalAmount} />
    </>
  );
};
