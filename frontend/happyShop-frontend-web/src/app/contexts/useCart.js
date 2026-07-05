// src/app/contexts/useCart.js
//存取Context 的入口
import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
