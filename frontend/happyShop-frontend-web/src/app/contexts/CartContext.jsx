import {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  fetchCartData,
  fetchCartPromotions,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../features/cart/services/cartApi";
import { postCartItem } from "../../features/productsDetail/services/productApi";
import {
  MOCK_CART_DATA,
  MOCK_CART_PROMOTIONS,
} from "../../features/cart/data/cartMockData";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("happyShopCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const allowMockFallback =
    import.meta.env.DEV &&
    String(import.meta.env.VITE_ENABLE_API_MOCK_FALLBACK).toLowerCase() ===
      "true";

  const loadCartData = useCallback(
    async (signal) => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const [cartResponse, promoResponse] = await Promise.all([
          fetchCartData({ signal }),
          fetchCartPromotions({ signal }),
        ]);
        setCartItems(cartResponse);
        setPromotions(promoResponse);
      } catch (error) {
        if (signal?.aborted) return;
        console.warn(
          "[CartContext] API failed, using localStorage + mock promotions",
          error,
        );

        const savedCart = localStorage.getItem("happyShopCart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        } else if (allowMockFallback) {
          setCartItems(MOCK_CART_DATA);
        } else {
          setCartItems([]);
        }

        setPromotions(MOCK_CART_PROMOTIONS);
        if (!allowMockFallback) {
          setLoadError("購物車資料載入失敗，請稍後再試。");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [allowMockFallback],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadCartData(controller.signal);
    return () => controller.abort();
  }, [loadCartData]);

  const reloadCart = useCallback(() => {
    loadCartData();
  }, [loadCartData]);

  // ==========================================
  // localStorage 同步：cartItems 有變動就寫入
  // ==========================================
  useEffect(() => {
    localStorage.setItem("happyShopCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ==========================================
  // useRef 存快照：給 addToCart rollback 用
  // 避免 addToCart 依賴 cartItems 導致每次都重建函式
  // ==========================================
  const cartItemsRef = useRef(cartItems);
  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  // ==========================================
  // addToCart：樂觀更新 + API + rollback
  // ==========================================
  const addToCart = useCallback(
    async (newItem) => {
      const previousItems = cartItemsRef.current;

      // 先樂觀更新
      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (item) =>
            item.productId === newItem.productId && item.spec === newItem.spec,
        );
        if (existingIndex !== -1) {
          return prevItems.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item,
          );
        }
        return [...prevItems, newItem];
      });

      // 打 API
      try {
        await postCartItem(newItem);
      } catch (error) {
        if (allowMockFallback) {
          console.warn(
            "[CartContext] addToCart failed, using mock fallback",
            error,
          );
          return;
        }
        console.error("[CartContext] addToCart failed, rolling back", error);
        setCartItems(previousItems);
        throw error; // 讓商品頁可以接到錯誤並顯示提示
      }
    },
    [allowMockFallback],
  );

  // ==========================================
  // removeFromCart：樂觀更新 + API + rollback
  // ==========================================
  const removeFromCart = useCallback(
    async (cartItemId) => {
      const previousItems = cartItemsRef.current;

      // 先樂觀更新
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId),
      );

      // 打 API
      try {
        await deleteCartItem({ cartItemId });
      } catch (error) {
        if (allowMockFallback) {
          console.warn(
            "[CartContext] removeFromCart failed, using mock fallback",
            error,
          );
          return;
        }
        console.error(
          "[CartContext] removeFromCart failed, rolling back",
          error,
        );
        setCartItems(previousItems); // rollback
      }
    },
    [allowMockFallback],
  );

  // ==========================================
  // updateQuantity：樂觀更新 + API + rollback
  // ==========================================
  const updateQuantity = useCallback(
    async (cartItemId, newQty) => {
      if (newQty < 1) return; // 防呆：數量不能小於 1

      const previousItems = cartItemsRef.current;

      // 先樂觀更新
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item,
        ),
      );

      // 打 API
      try {
        await updateCartItemQuantity({ cartItemId, quantity: newQty });
      } catch (error) {
        if (allowMockFallback) {
          console.warn(
            "[CartContext] updateQuantity failed, using mock fallback",
            error,
          );
          return;
        }
        console.error(
          "[CartContext] updateQuantity failed, rolling back",
          error,
        );
        setCartItems(previousItems); // rollback
      }
    },
    [allowMockFallback],
  );

  // ==========================================
  // toggleItem：單一商品打勾（純前端，不需要打 API）
  // ==========================================
  const toggleItem = useCallback((cartItemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, selected: !item.selected } : item,
      ),
    );
  }, []);

  // ==========================================
  // toggleAll：全選 / 取消全選（純前端）
  // ==========================================
  const toggleAll = useCallback((isChecked) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: isChecked })),
    );
  }, []);

  // ==========================================
  // clearCart：清空購物車（結帳完成後用）
  // ==========================================
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ==========================================
  // 衍生資料
  // ==========================================

  // Navbar 角標：所有商品的總數量（不管有沒有勾選）
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  // 結帳金額：只加總有勾選的商品
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => (item.selected ? sum + item.price * item.quantity : sum),
        0,
      ),
    [cartItems],
  );

  // 全選狀態
  const isAllSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((item) => item.selected),
    [cartItems],
  );

  // ==========================================
  // value
  // ==========================================
  const value = useMemo(
    () => ({
      cartItems,
      promotions,
      isLoading,
      loadError,
      cartCount,
      cartTotal,
      isAllSelected,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleItem,
      toggleAll,
      clearCart,
      reloadCart,
    }),
    [
      cartItems,
      promotions,
      isLoading,
      loadError,
      cartCount,
      cartTotal,
      isAllSelected,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleItem,
      toggleAll,
      clearCart,
      reloadCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export { CartContext };
