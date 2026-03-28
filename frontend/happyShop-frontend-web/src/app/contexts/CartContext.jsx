import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("happyShopCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("happyShopCart", JSON.stringify(cartItems));
  }, [cartItems]);

  //  用 useCallback 包住，確保函式參考穩定，不會每次 render 都產生新的
  const addToCart = useCallback((newItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === newItem.productId && item.spec === newItem.spec,
      );

      if (existingItemIndex !== -1) {
        //  用 map 建立全新陣列＋展開運算子建立新物件，避免直接 mutate 原本的資料
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  }, []);

  //  移除商品
  const removeFromCart = useCallback((productId, spec) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.spec === spec),
      ),
    );
  }, []);

  //  更新數量（例如使用者在購物車頁直接輸入數量）
  const updateQuantity = useCallback((productId, spec, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.spec === spec
          ? { ...item, quantity: newQty }
          : item,
      ),
    );
  }, []);

  //  清空購物車（結帳完成後使用）
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  //  衍生資料：購物車商品總數（navbar 角標用）
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  //  衍生資料：購物車總金額
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  //  用 useMemo 包住 value，避免每次 render 都產生新物件導致不必要的重新渲染
  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
