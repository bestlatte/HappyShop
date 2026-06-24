import { apiRequest } from "../../../app/api/apiClient.js";

export function normalizeProductCard(raw = {}) {
  return {
    id: raw.id,
    title: raw.title,
    imageKey: raw.imageKey ?? raw.imageUrl ?? "",
    price: raw.price,
    salePrice: raw.salePrice,
    promoTop: raw.promoTop,
    promoTag: raw.promoTag,
    badge: raw.badge,
    category: raw.category,
  };
}

function extractProductItems(payload) {
  return Array.isArray(payload) ? payload : (payload.items ?? []);
}

export async function fetchProductCatalog({ nav, category, signal } = {}) {
  const payload = await apiRequest("/products", {
    method: "get",
    query: { nav, category },
    signal,
  });

  return extractProductItems(payload).map(normalizeProductCard);
}
