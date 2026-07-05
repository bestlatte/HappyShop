import { useState } from "react";
import { useCart } from "../../../app/contexts/useCart";
import { useNavigate } from "react-router-dom";

import { CartDeliveryRegion } from "../components/CartDeliveryRegion";
import { CartNotice } from "../components/CartNotice";
import { CartItemRow } from "../components/CartItemRow";
import { CartPromoList } from "../components/CartPromoList";
import { CartSummary } from "../components/CartSummary";
import { CartStickyBar } from "../components/CartStickyBar";
import LoadingState from "../../../components/ui/LoadingState.jsx";
import ErrorState from "../../../components/ui/ErrorState.jsx";

export const CartSection = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    promotions,
    isLoading,
    loadError,
    reloadCart,
    cartTotal,
    isAllSelected,
    toggleItem,
    toggleAll,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // region 是購物車頁面自己的 UI 狀態，不需要全域共享
  const [region, setRegion] = useState("taiwan");

  // ==========================================
  // UI Render
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
        onAction={reloadCart}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 mt-32 text-center text-gray-400">
        <p className="font-medium text-xl mb-4 text-gray-900">
          您的購物車目前是空的
        </p>
        <button
          className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          onClick={() => navigate("/")}
        >
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
                onChange={(e) => toggleAll(e.target.checked)}
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
                onToggle={() => toggleItem(item.id)}
                onQuantityChange={(itemId, currentQuantity, change) =>
                  updateQuantity(itemId, currentQuantity + change)
                }
                onDelete={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        </div>

        <CartPromoList promotions={promotions} />
        <CartSummary totalAmount={cartTotal} />
      </div>

      <CartStickyBar totalAmount={cartTotal} />
    </>
  );
};
