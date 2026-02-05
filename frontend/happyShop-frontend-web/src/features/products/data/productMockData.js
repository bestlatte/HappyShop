// src/features/products/data/productMockData.js.
const getRandomImage = (index) =>
  new URL(`../../../assets/product1-${index}.jpg`, import.meta.url).href;

// 加購商品產生器
const generateProducts = (count, startId) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    name: `加購商品範例 ${i + 1}`,
    imageUrl: getRandomImage(i % 6),
  }));
};

export const MOCK_PRODUCT_DETAIL = {
  // --- 基礎資訊 ---
  id: "prod_001",
  name: "愛康 超引力涼感棉系列・任選48包組",
  price: 2019,
  originalPrice: 2832,
  tags: ["衛生用品"],
  categories: ["日用", "清潔", "居家", "旅行", "衛生用品", "衛生棉"],

  // --- 警告與描述 ---
  warning:
    "依消保法公告此為個人衛生用品，基於衛生考量無法接受退換，請同意再下單。",
  description: `
- 3,000+導流孔導流孔，提升2倍瞬吸
- 仙人掌舒緩精華，呵護敏感私密肌
- 雙層晶片科技封存涼感+抑菌+保養精華
- 品牌品名：愛康 超引力涼感棉系列
- 主要成分：超導菱格棉柔層、舒緩晶片、高分子吸水聚合物、透氣底膜
- 配方成分：歐薄荷、迷迭香等草本複方精油、仙人掌萃取、深海礦物元素
  `,

  // --- 圖片列表 (左側 Gallery) ---
  images: Array.from({ length: 6 }, (_, index) => getRandomImage(index)),

  // --- 組合商品 ---
  bundles: [
    { id: 101, name: "日用型衛生棉", imageUrl: getRandomImage(1) },
    { id: 102, name: "夜用型衛生棉", imageUrl: getRandomImage(2) },
  ],

  // --- 相關商品 ---
  relatedProducts: [
    {
      id: 201,
      name: "愛康 超引力涼感棉 - 日用 24cm",
      imageUrl: getRandomImage(1),
    },
    {
      id: 202,
      name: "愛康 超引力涼感棉 - 夜用 28cm",
      imageUrl: getRandomImage(2),
    },
    {
      id: 203,
      name: "愛康 超引力涼感棉 - 加長 33cm",
      imageUrl: getRandomImage(3),
    },
    { id: 204, name: "愛康 隨身包涼感濕紙巾", imageUrl: getRandomImage(4) },
  ],

  // --- 優惠活動 ---
  promotions: [
    {
      id: "p1",
      title: "全館滿$499 + 7-11取件 · 即可獲得送中杯熱拿鐵兌換券乙張",
      type: "text",
      period: "2026/02/02 00:00:00 - 2026/02/08 23:59:59",
      rules: ["限定指定物流且訂單滿 499 元送贈品", "不可累計"],
      gift: "「202602 7-11中杯熱拿鐵」",
    },
    {
      id: "p2",
      title: "全館滿$499 + 全家取件 · 即可獲得送熱經典拿鐵中杯兌換券乙張",
      type: "text",
      period: "2026/01/17 00:00:00 - 2026/02/05 23:59:59",
      rules: ["限定指定物流且訂單滿 499 元送贈品", "不可累計"],
      gift: "「贈品 202601全家 熱經典拿鐵中杯」",
    },
    {
      id: "p3",
      title: "202602優惠價加購",
      type: "addon",
      period: "2026/02/01 00:00:00 - 2026/02/28 23:59:59",
      products: generateProducts(6, 300),
    },
    {
      id: "p4",
      title: "加購 | 快電商品牌 手提收納袋/中性筆/提袋",
      type: "addon",
      period: "2025/10/27 12:00:00 - 加購完為止",
      products: generateProducts(2, 400),
    },
    {
      id: "p5",
      title: "全館滿$699免運",
      type: "text",
      period: "2026/01/21 00:00:00 - 不限",
      rules: ["指定商品滿 699 元 享免運優惠", "限定指定物流"],
    },
  ],
  // --- 運送方式----
  shippingMethods: [
    { id: "s1", name: "黑貓", fee: "NT$ 100" },
    { id: "s2", name: "7-11", fee: "NT$ 80" },
    { id: "s3", name: "全家", fee: "NT$ 80" },
    { id: "s4", name: "海外-港澳", fee: "依結帳總重量計算" },
    { id: "s5", name: "海外-新加坡", fee: "依結帳總重量計算" },
    { id: "s6", name: "海外-日韓", fee: "依結帳總重量計算" },
    { id: "s7", name: "海外-東南亞", fee: "依結帳總重量計算" },
  ],
};
