import { fetchProductCatalog } from "../../product/services/productCatalogApi.js";

export async function fetchProductsCategory({ nav, category, signal } = {}) {
  return fetchProductCatalog({ nav, category, signal });
}