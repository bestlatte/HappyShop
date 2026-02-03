//圖片區
export const getMockProductImages = () => {
  const totalImageCount = 10;

  return Array.from({ length: totalImageCount }, (_, index) => {
    return new URL(`../../../assets/product1-${index}.jpg`, import.meta.url)
      .href;
  });
};
//商品資訊區
export const getMockProductInfo = () => {
  return {
    tags: ["衛生用品"],
    categories: ["日用 • 清潔 • 居家 • 旅行", "衛生用品", "衛生棉"],
    name: "愛康 超引力涼感棉系列・任選48包組",
    price: 2019,
    originalPrice: 2832,
    warning:
      "依消保法公告此為個人衛生用品，基於衛生考量無法接受退換，請同意再下單。",
    description: `
- 3,000+導流孔導流孔，提升2倍瞬吸
- 仙人掌舒緩精華，呵護敏感私密肌
- 雙層晶片科技封存涼感+抑菌+保養精華
- 品牌品名：愛康 超引力涼感棉系列
- 主要成分：超導菱格棉柔層、舒緩晶片、高分子吸水聚合物、透氣底膜
- 配方成分：歐薄荷、迷迭香等草本複方精油、仙人掌萃取、深海礦物元素
- 【日用】尺寸：約24cm / 容量：8片/包
- 【夜用】尺寸：約28cm / 容量：7片/包
- 【加長】尺寸：約33cm / 容量：6片/包
    `,
  };
};
