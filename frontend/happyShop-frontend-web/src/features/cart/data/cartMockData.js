// src/features/cart/data/cartMockData.js

// 產生假圖片的路徑
const getProductImage = (index) =>
  new URL(`../../../assets/product1-${index}.jpg`, import.meta.url).href;

export const MOCK_CART_DATA = [
  {
    id: "item_001",
    productId: "prod_001",
    name: "YiTi SOLO膠囊",
    spec: "F / 30顆/盒",
    price: 1680,
    quantity: 1,
    imageUrl: getProductImage(0),
    selected: true,
    isPreorder: false,
  },
  {
    id: "item_002",
    productId: "prod_002",
    name: "YITI 專利白番茄膠囊",
    spec: "F / 30顆/盒",
    price: 1680,
    quantity: 1,
    imageUrl: getProductImage(1),
    selected: true,
    isPreorder: false,
  },
  {
    id: "item_003",
    productId: "prod_003",
    name: "冰磁透涼除臭短T 2.0・多入優惠",
    spec: "水藍 / XS",
    price: 330,
    quantity: 1,
    imageUrl: getProductImage(0),
    selected: false, // 預設沒打勾
    isPreorder: false,
  },
  {
    id: "item_004",
    productId: "prod_004",
    name: "LEAN IN 果蜜燈泡霜",
    spec: "F / 35ml/罐",
    price: 880,
    quantity: 1,
    imageUrl: getProductImage(1),
    selected: false,
    isPreorder: true,
  },
];

export const MOCK_CART_PROMOTIONS = [
  {
    orderTitle: "優惠順序 1：",
    items: [
      "1. 202603優惠價加購（滿 1 件加購商品）",
      "2. 加購 | 快電商品牌 手提收納袋/中性筆/提袋（滿 1 件加購商品）",
      "3. YiTi SOLO膠囊・買1送1 (若購物車中無顯示即為贈完)（滿 1 件送贈品 1 件）",
    ],
  },
  {
    orderTitle: "優惠順序 2：",
    items: ["1. 全館滿$699免運（滿 699 元免運費）"],
  },
];
