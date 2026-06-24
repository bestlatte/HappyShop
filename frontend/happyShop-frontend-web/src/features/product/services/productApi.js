import { fetchProductCatalog } from "./productCatalogApi.js";

export async function fetchProductsData({ nav, category, signal } = {}) {
  return fetchProductCatalog({ nav, category, signal });
}
