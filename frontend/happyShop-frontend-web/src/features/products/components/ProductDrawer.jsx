// // src/features/products/components/ProductDrawer.jsx
//==================已替換抽屜為模態框的版本==================
// import React from "react";
// import { InfoHeader } from "./product-info/InfoHeader";
// import { InfoBreadcrumb } from "./product-info/InfoBreadcrumb";
// import { ProductThumbnail } from "./product-info/ProductThumbnail";

// export const ProductDrawer = ({ isOpen, onClose, info }) => {
//   const drawerClasses = isOpen
//     ? "translate-y-0 opacity-100 pointer-events-auto"
//     : "translate-y-full opacity-0 pointer-events-none";

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onClose}
//       />

//       {/* 抽屜本體 */}
//       <div
//         className={`fixed bottom-0 left-0 right-0 bg-white z-50  shadow-2xl transition-all duration-300 ease-in-out transform flex flex-col h-[100vh] ${drawerClasses}`}
//       >
//         {/* --- Header 區塊 --- */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             {/* TODO X btn => => iconFile: tag.svg*/}
//             <svg
//               className="w-6 h-6 text-gray-900"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>

//           {/* 右上角購買按鈕 */}
//           <button className="bg-black text-white text-sm font-bold px-6 py-2 rounded rounded-md hover:bg-gray-800 transition-colors">
//             購 買
//           </button>
//         </div>

//         {/* --- Body 捲動區塊 --- */}
//         <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-24">
//           {/* 商品資訊 (紅色框區域) */}
//           <div className="mb-6">
//             <InfoHeader
//               tags={info.tags}
//               name={info.name}
//               price={info.price}
//               originalPrice={info.originalPrice}
//             />
//             <div className="mt-2">
//               <InfoBreadcrumb categories={info.categories} />
//             </div>
//           </div>

//           <h2 className="text-xl font-bold text-gray-900 mb-2">選擇組合商品</h2>
//           <p className="text-sm text-gray-500 mb-4">已完成選擇 48 件商品</p>

//           <div className="text-xs text-gray-500 mb-6 space-y-1">
//             <p>* 此組合包含以下商品。</p>
//             <p>* 消費者需選擇全部要求的數量才可以進行購買。</p>
//           </div>

//           {/* 綠色選購卡片 */}
//           <DrawerSelectionCard image={info.images[0]} />

//           {/* 修改 2: 內層的「立即購買」按鈕 */}
//           {/* 放在卡片下方，寬度約 1/3 (w-32 或 w-1/3)，靠左對齊 */}
//           <div className="mt-4">
//             <button className="w-32 bg-black text-white text-sm font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md active:scale-95 duration-200">
//               立即購買
//             </button>
//           </div>
//         </div>

//         {/* --- Footer 固定底部 (粉色框區域) --- */}
//         {/* 修改 3: 樣式改為左右文字分佈 */}
//         <div className="p-4 border-t border-gray-100 bg-white pb-safe shrink-0 flex items-center justify-between">
//           {/* 左側：文字 */}
//           <span className="text-sm text-gray-500 font-medium">
//             已完成選擇 <span className="text-black font-bold">48</span> 件商品
//           </span>

//           {/* 右側：文字按鈕 (根據截圖 image_dd334b.png，它是粗體底線或純文字按鈕) */}
//           <button className="text-sm font-bold text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors">
//             立即購買
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// // --- 子組件：綠色選購卡片 (維持不變) ---
// const DrawerSelectionCard = ({ image }) => {
//   return (
//     <div className="border border-green-500 bg-green-50/10 rounded-xl p-4 flex gap-4 items-center relative overflow-hidden">
//       <div className="absolute top-2 right-2 flex items-center gap-1 text-green-600 font-bold text-xs">
//         (已選擇 48/48)
//         <svg
//           className="w-5 h-5 bg-green-500 text-white rounded-full p-1"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={3}
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//       </div>

//       <div className="w-20 shrink-0">
//         <ProductThumbnail src={image} alt="組合圖" />
//       </div>

//       <div className="flex-1 pr-6">
//         <h4 className="font-bold text-sm text-gray-900 mb-1 leading-relaxed">
//           愛康 超引力涼感棉系列・多入優惠
//         </h4>
//         <p className="font-bold text-sm text-black">NT$ 59</p>
//       </div>
//     </div>
//   );
// };
