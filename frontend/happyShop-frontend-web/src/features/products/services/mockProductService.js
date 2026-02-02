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
    id: 1,
    name: "商品名稱",
    price: 2990,
    description: "這是一個很棒的商品，值得購買！",
  };
};
