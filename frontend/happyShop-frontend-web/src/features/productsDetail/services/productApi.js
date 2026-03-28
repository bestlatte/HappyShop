// src/features/products/services/productApi.js
import { apiRequest } from "../../../app/api/apiClient";

/**
 * 任務一：獲取單一商品詳細資料
 * @param {string} productId - 商品的 ID (例如: "product_001")
 */

export async function fetchProductDetail(productId, { signal } = {}) {
  const payload = await apiRequest(`/products/${productId}`, {
    method: "get",
    signal,
  });

  return payload;
}

/**
 * 任務二：加入購物車
 * @param {Object} payload - 包含要加入的商品資訊
 */

export async function postCartItem({ productId, spec, quantity, signal } = {}) {
  const payLoad = await apiRequest("/cart/items", {
    method: "post",
    body: {
      productId,
      spec,
      quantity,
    },
    signal,
  });

  return payLoad;
}
