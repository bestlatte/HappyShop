// src/features/products/services/mockProductService.js
import { MOCK_PRODUCT_DETAIL } from "../data/productMockData";

export const getMockProductInfo = () => {
  // Only returns data
  //TODO fetch() => Call API
  return MOCK_PRODUCT_DETAIL;
};

export const getMockProductImages = () => {
  return MOCK_PRODUCT_DETAIL.images;
};
