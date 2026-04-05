import p1 from "../assets/p1.jpg";
import p2 from "../assets/product1-0.jpg";

const getRandomImage = (index) =>
  new URL(`../assets/product1-${index}.jpg`, import.meta.url).href;

// 加購商品產生器
const generateProducts = (count, startId) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `addon_${startId + i}`,
    title: `加購商品範例 ${i + 1}`,
    imageUrl: getRandomImage(i % 6),
  }));
};

export const mockProductsData = [
  {
    // --- 基礎資訊 ---
    id: "p1",
    title: "超新商品 C2C 淨顏嫩嫩組",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "淨顏嫩嫩組",
    category: "new",
    nav: "all",
    badge: null,

    // --- 圖片資訊 ---
    images: [p1],

    // --- 標籤與分類 ---
    tags: ["保養"],
    categories: ["美妝", "保養", "新品"],

    // --- 警告與描述 ---
    warning: "",
    description: `
- 溫和潔淨
- 適合日常保養
- 組合內容依活動頁為準
    `,

    // --- 組合商品 ---
    bundles: [],

    // --- 相關商品 ---
    relatedProducts: [],

    // --- 優惠活動 ---
    promotions: [],

    // --- 運送方式 ---
    shippingMethods: [
      { id: "s1", name: "黑貓", fee: "NT$ 100" },
      { id: "s2", name: "7-11", fee: "NT$ 80" },
    ],

    // --- 商品規格與子規格 ---
    variants: {
      sizes: ["F"],
      subSpecs: [{ id: "sub_1", name: "一般款", sku: "SKU-P1-001" }],
    },
  },

  {
    // --- 基礎資訊 ---
    id: "p2",
    title: "韓國 超引力涼感棉系列・任選48包組",
    imageKey: p2,
    price: 2832,
    salePrice: 2019,
    promoTop: "01.30 12:00 - 02.05 23:59",
    promoTag: "愛康 超引力涼感棉系列・任選48包組",
    category: "tense",
    nav: "all",
    badge: null,

    // --- 標籤與分類 ---
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

    // --- 圖片列表 (左側 Gallery / 瀏覽頁主圖) ---
    images: Array.from({ length: 10 }, (_, index) => getRandomImage(index)),

    // --- 組合商品 ---
    bundles: [
      { id: "b101", title: "日用型衛生棉", imageUrl: getRandomImage(1) },
      { id: "b102", title: "夜用型衛生棉", imageUrl: getRandomImage(2) },
    ],

    // --- 相關商品 ---
    relatedProducts: [
      {
        id: "r201",
        title: "愛康 超引力涼感棉 - 日用 24cm",
        imageUrl: getRandomImage(1),
      },
      {
        id: "r202",
        title: "愛康 超引力涼感棉 - 夜用 28cm",
        imageUrl: getRandomImage(2),
      },
      {
        id: "r203",
        title: "愛康 超引力涼感棉 - 加長 33cm",
        imageUrl: getRandomImage(3),
      },
      {
        id: "r204",
        title: "愛康 隨身包涼感濕紙巾",
        imageUrl: getRandomImage(4),
      },
    ],

    // --- 優惠活動 ---
    promotions: [
      {
        id: "p2_1",
        title: "全館滿$499 + 7-11取件 · 即可獲得送中杯熱拿鐵兌換券乙張",
        type: "text",
        period: "2026/02/02 00:00:00 - 2026/02/08 23:59:59",
        rules: ["限定指定物流且訂單滿 499 元送贈品", "不可累計"],
        gift: "「202602 7-11中杯熱拿鐵」",
      },
      {
        id: "p2_2",
        title: "全館滿$499 + 全家取件 · 即可獲得送熱經典拿鐵中杯兌換券乙張",
        type: "text",
        period: "2026/01/17 00:00:00 - 2026/02/05 23:59:59",
        rules: ["限定指定物流且訂單滿 499 元送贈品", "不可累計"],
        gift: "「贈品 202601全家 熱經典拿鐵中杯」",
      },
      {
        id: "p2_3",
        title: "202602優惠價加購",
        type: "addon",
        period: "2026/02/01 00:00:00 - 2026/02/28 23:59:59",
        products: generateProducts(6, 300),
      },
      {
        id: "p2_4",
        title: "加購 | 快電商品牌 手提收納袋/中性筆/提袋",
        type: "addon",
        period: "2025/10/27 12:00:00 - 加購完為止",
        products: generateProducts(2, 400),
      },
      {
        id: "p2_5",
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

    // --- 商品規格與子規格 ---
    variants: {
      sizes: ["F"],
      subSpecs: [
        { id: "sub_1", name: "30顆/盒", sku: "4710582772887" },
        { id: "sub_2", name: "60顆/兩盒裝", sku: "4710582772888" },
        { id: "sub_3", name: "90顆/三盒裝 (多字測試)", sku: "4710582772889" },
      ],
    },
  },

  {
    // --- 基礎資訊 ---
    id: "p3",
    title: "【限購】 韓國FAT BEE 蘋安新春禮盒・附提袋",
    imageKey: p1,
    price: 888,
    salePrice: null,
    promoTop: "",
    promoTag: "",
    category: "tense",
    nav: "all",
    badge: "限購",

    // --- 圖片資訊 ---
    images: [p1],

    // --- 標籤與分類 ---
    tags: ["禮盒"],
    categories: ["節慶", "禮盒"],

    // --- 警告與描述 ---
    warning: "",
    description: "新春限定禮盒，附提袋。",

    // --- 組合商品 ---
    bundles: [],

    // --- 相關商品 ---
    relatedProducts: [],

    // --- 優惠活動 ---
    promotions: [],

    // --- 運送方式 ---
    shippingMethods: [],

    // --- 商品規格與子規格 ---
    variants: {
      sizes: [],
      subSpecs: [],
    },
  },

  {
    // --- 基礎資訊 ---
    id: "p4",
    title: "韓國 財源滾滾元寶擺件系列",
    imageKey: p1,
    price: 380,
    salePrice: null,
    promoTop: "",
    promoTag: "",
    category: "tense",
    nav: "all",
    badge: null,
    hasCarouselArrow: true,

    // --- 圖片資訊 ---
    images: [p1],

    // --- 標籤與分類 ---
    tags: ["擺件"],
    categories: ["居家", "擺飾"],

    // --- 警告與描述 ---
    warning: "",
    description: "居家擺飾商品。",

    // --- 組合商品 ---
    bundles: [],

    // --- 相關商品 ---
    relatedProducts: [],

    // --- 優惠活動 ---
    promotions: [],

    // --- 運送方式 ---
    shippingMethods: [],

    // --- 商品規格與子規格 ---
    variants: {
      sizes: [],
      subSpecs: [],
    },
  },

  {
    // --- 基礎資訊 ---
    id: "p5",
    title: "【限購】 韓國 FAT BEE 圓滾滾胖豬豬",
    imageKey: p1,
    price: 888,
    salePrice: null,
    promoTop: "",
    promoTag: "",
    category: "tense",
    nav: "all",
    badge: "限購",

    // --- 圖片資訊 ---
    images: [p1],

    // --- 標籤與分類 ---
    tags: ["玩偶"],
    categories: ["居家", "擺飾"],

    // --- 警告與描述 ---
    warning: "",
    description: "限購商品。",

    // --- 組合商品 ---
    bundles: [],

    // --- 相關商品 ---
    relatedProducts: [],

    // --- 優惠活動 ---
    promotions: [],

    // --- 運送方式 ---
    shippingMethods: [],

    // --- 商品規格與子規格 ---
    variants: {
      sizes: [],
      subSpecs: [],
    },
  },

  {
    // --- 基礎資訊 ---
    id: "p6",
    title: "超新商品 瘦巴巴喬八",
    imageKey: p1,
    price: 380,
    salePrice: null,
    promoTop: "",
    promoTag: "",
    category: "new",
    nav: "all",
    badge: null,
    hasCarouselArrow: true,

    // --- 圖片資訊 ---
    images: [p1],

    // --- 標籤與分類 ---
    tags: ["新品"],
    categories: ["新品", "居家"],

    // --- 警告與描述 ---
    warning: "",
    description: "新品展示用假資料。",

    // --- 組合商品 ---
    bundles: [],

    // --- 相關商品 ---
    relatedProducts: [],

    // --- 優惠活動 ---
    promotions: [],

    // --- 運送方式 ---
    shippingMethods: [],

    // --- 商品規格與子規格 ---
    variants: {
      sizes: [],
      subSpecs: [],
    },
  },

  {
    id: "p7",
    title: "超新商品 C2C 淨顏嫩嫩組",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "淨顏嫩嫩組",
    category: "new",
    // --- 圖片資訊 ---
    images: [p1],

    // --- 標籤與分類 ---
    tags: ["新品"],
    categories: ["新品", "居家"],

    // --- 警告與描述 ---
    warning: "",
    description: "新品展示用假資料。",

    // --- 組合商品 ---
    bundles: [],

    // --- 相關商品 ---
    relatedProducts: [],

    // --- 優惠活動 ---
    promotions: [],

    // --- 運送方式 ---
    shippingMethods: [],

    // --- 商品規格與子規格 ---
    variants: {
      sizes: [],
      subSpecs: [],
    },


  },
  {
    id: "p8",
    title: "超新商品 C2C 淨顏嫩嫩組",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "淨顏嫩嫩組",
    category: "new",
  },
  {
    id: "p9",
    title: "超新商品 C2C 淨顏嫩嫩組",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "淨顏嫩嫩組",
    category: "new",
  },
  {
    id: "p10",
    title: "超新商品 C2C 淨顏嫩嫩組",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "淨顏嫩嫩組",
    category: "onSale",
  },
  {
    id: "p11",
    title: "超新商品 C2C 淨顏嫩嫩組",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "淨顏嫩嫩組",
    category: "onSale",
  },
  {
    id: "p12",
    title: "超好吃的食物",
    imageKey: p1,
    price: 3580,
    salePrice: 2580,
    promoTop: "01.31-02.05 00:00-23:59",
    promoTag: "超好吃的食物",
    category: "food",
  },
];
