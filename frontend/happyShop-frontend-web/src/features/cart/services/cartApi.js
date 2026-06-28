// src/features/cart/services/cartApi.js

import { apiRequest } from "../../../app/api/apiClient.js";

// Data Normalization
function normalizeCartItem(raw = {}) {
  return {
    id: raw.id,
    productId: raw.productId ?? raw.product_id,
    name: raw.name ?? raw.title ?? "未命名商品",
    spec: raw.spec ?? raw.specification ?? "",
    price: Number(raw.price ?? 0),
    quantity: Number(raw.quantity ?? 1),
    imageUrl: raw.imageUrl ?? raw.imageKey ?? "",
    selected: true,
    isPreorder: Boolean(raw.isPreorder ?? false),
  };
}

// 獲取購物車資料 R
export async function fetchCartData({ signal } = {}) {
  const payload = await apiRequest("/cart", {
    method: "get",
    signal,
  });

  const items = Array.isArray(payload) ? payload : (payload.items ?? []);
  return items.map((item) => normalizeCartItem(item));
}

// 獲取購物車促銷資訊 R
export async function fetchCartPromotions({ signal } = {}) {
  const payload = await apiRequest("/cart/promotions", {
    method: "get",
    signal,
  });

  return Array.isArray(payload) ? payload : (payload.items ?? []);
}

// 更新購物車項目數量 U (+, -)
export async function updateCartItemQuantity({
  cartItemId,
  quantity,
  signal,
} = {}) {
  const payload = await apiRequest(`/cart/items/${cartItemId}`, {
    method: "put",
    body: { quantity },
    signal,
  });

  return payload;
}
// 刪除購物車項目 D
export async function deleteCartItem({ cartItemId, signal } = {}) {
  const payload = await apiRequest(`/cart/items/${cartItemId}`, {
    method: "delete",
    signal,
  });

  return payload;
}
// 建立訂單 C
export async function createOrder({ data, signal } = {}) {
  const payload = await apiRequest("/orders", {
    method: "post",
    body: data,
    signal,
    withAuth: true,
  });

  return payload;
}

// backward compatible alias
export async function submitCheckout({ data, signal } = {}) {
  return createOrder({ data, signal });
}
