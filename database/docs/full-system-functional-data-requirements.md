---
name: full-system-functional-data-requirements
description: >
  Document HappyShop frontend modules, inferred data requirements, backend feature
  draft classification, frontend-backend mapping, DB v1 candidate scope, and
  optional or future database features.
---

# HappyShop 完整系統功能與資料需求規格書

## 1. 前端功能模組

### auth

**頁面 / 路由**
- `/login`
- `/register`
- `/forget-password`

**對應檔案重點**
- `auth/pages/*`
- `LoginForm.jsx`
- `RegisterForm.jsx`
- `ForgetPassword.jsx`
- `loginApi.js`
- `registerApi.js`
- `forgetPasswordApi.js`

---

### product

**頁面 / 路由**
- `/`
- 首頁商品區

**對應檔案重點**
- `product/pages/HomePage.jsx`
- `ProductSection.jsx`
- `ProductCard.jsx`
- `productApi.js`
- `mockProductsData.js`

---

### productBrowser

**頁面 / 路由**
- `/product-browser?nav=&category=`

**對應檔案重點**
- `ProductBrowserPage.jsx`
- `ProductBrowserSection.jsx`
- `CategorySidebar.jsx`
- `ProductGrid.jsx`
- `categoryApi.js`
- `defaultDatas.js`

---

### productsDetail

**頁面 / 路由**
- `/products/:productId/:title`

**對應檔案重點**
- `ProductDetailSection.jsx`
- `ProductInfo.jsx`
- `ProductModal.jsx`
- `ModalVariant.jsx`
- `productApi.js`

---

### cart

**頁面 / 路由**
- `/cart`

**對應檔案重點**
- `CartContext.jsx`
- `CartSection.jsx`
- `CartItemRow.jsx`
- `CartSummary.jsx`
- `cartApi.js`
- `cartMockData.js`

---

### checkout

**頁面 / 路由**
- `/checkout`

**對應檔案重點**
- `CheckoutMainSection.jsx`
- `RecipientForm.jsx`
- `PaymentMethodSelector.jsx`
- `InvoiceForm.jsx`
- `SubmitOrderBar.jsx`

---

### orderComplete

**頁面 / 路由**
- `/order-complete`

**對應檔案重點**
- `OrderCompleteSection.jsx`
- `OrderSuccessInfo.jsx`
- `OrderSummaryReceipt.jsx`

## 2. 前端推導出的資料需求

### auth

**表單欄位**
- email
- password

**顯示 / mock 欄位**
- accessToken 使用於 `apiClient.js`
- error status 400/401/403/409

**service API**
- `POST /login`
- `POST /register`
- `POST /forgetPassword`

**可能 DB 實體**
- `users`
- `user_credentials`

**備註**
- auth/password reset token 可待確認。
- `users` 保存會員基本身份資料。
- `user_credentials` 保存登入密碼憑證資料。
- `password_hash` 不放在 `users` table。

---

### product

**表單欄位**
- 無

**顯示 / mock 欄位**
- `id`
- `title`
- `imageKey/imageUrl`
- `price`
- `salePrice`
- `promoTop`
- `promoTag`
- `badge`
- `category`
- `nav`

**service API**
- `GET /product?nav=&category=`

**可能 DB 實體**
- `products`
- `product_categories`
- `product_images`
- price fields

**備註**
- mock 僅代表商品卡片目前需要顯示的資料。

---

### productBrowser

**表單欄位**
- nav/category query
- sort UI 尚未接 API

**顯示 / mock 欄位**
- category/topic: `key`
- category/topic: `label`
- category/topic: `badge`
- category/topic: `sub`
- product grid 同首頁

**service API**
- `GET /product?nav=&category=`

**可能 DB 實體**
- `product_categories`

**備註**
- sort/search 不進 v1 核心。

---

### productsDetail

**表單欄位**
- size
- subSpec
- quantity

**顯示 / mock 欄位**
- `name/title`
- `price`
- `originalPrice`
- `tags`
- `categories`
- `warning`
- `description`
- `images`
- `bundles`
- `relatedProducts`
- `promotions`
- `shippingMethods`
- `variants.sizes`
- `variants.subSpecs.{id,name,sku}`

**service API**
- `GET /products/:productId`
- `POST /cart/items`

**可能 DB 實體**
- `products`
- `product_images`
- `product_skus/product_variants`
- `cart_items`

**備註**
- promotions/bundles/related/tags 需確認。

---

### cart

**表單欄位**
- quantity change
- selected checkbox
- delivery region UI

**顯示 / mock 欄位**
- cart item: `id`
- cart item: `productId`
- cart item: `name`
- cart item: `spec`
- cart item: `price`
- cart item: `quantity`
- cart item: `imageUrl`
- cart item: `selected`
- cart item: `isPreorder`
- summary total
- promotion display

**service API**
- `GET /cart`
- `GET /cart/promotions`
- `POST /cart/items`
- `PUT /cart/items/:itemId`
- `DELETE /cart/items/:itemId`
- `POST /cart/checkout`

**可能 DB 實體**
- `carts`
- `cart_items`

**備註**
- cart promotions optional。
- `selected` 可能只是前端狀態。

---

### checkout

**表單欄位**
- recipient name
- phone
- city
- district
- postal/area code
- address
- save recipient checkbox
- shipping method
- payment method
- card number/expiry/CVC/cardholder
- invoice owner/type/company tax id/title/mobile barcode
- agreement

**顯示 / mock 欄位**
- fixed total
- shipping fee
- submit order

**service API**
- 暫無 checkout feature service
- `submitCheckout` 在 `cartApi.js` 但未接 UI

**可能 DB 實體**
- `orders`
- `order_items`
- `recipient/shipping snapshot`
- `payments`

**備註**
- invoice snapshot 建議先列 needs-confirmation。
- 不保存完整卡號/CVC。

---

### orderComplete

**表單欄位**
- 無

**顯示 / mock 欄位**
- `orderId`
- C-Point
- item receipt
- item subtotal
- product subtotal
- shipping fee
- total

**service API**
- 無

**可能 DB 實體**
- `orders`
- `order_items`
- `payment_records`

**備註**
- points optional。

## 3. 後端功能架構圖分類

### A. 優先納入 DB v1

前端已有畫面或資料需求支持，開發權重高。

- 登入 / 註冊 / 忘記密碼
- 首頁內容 / 商品快速列表
- 分類 / 品牌 / 主題資料
- 商品詳情、SKU / 規格
- 加入購物車、檢視購物車
- 金額摘要：商品小計、運費、應付金額
- 結帳頁面、地址 / 收件資料、運費、建立訂單
- 付款方式、付款結果基本紀錄
- 訂單完成頁需要的訂單編號與摘要

### B. 需確認項目

前端已有部分畫面，但後端規則、資料生命週期或商業邏輯尚未明確。

- 發票資料：個人 / 公司、統編、公司抬頭、手機條碼
- 商品 tags、breadcrumb categories 的正式分類層級
- 商品促銷文字、加購品、組合 / 相關商品
- 配送方式是否為商品層級、訂單層級，或固定字典
- 購物車 selected 狀態是否需後端保存
- C-Point 顯示是否真的要進 v1
- 結帳同意條款是否需保存版本

### C. 未來 / 選配項目

後端有規劃但前端目前尚未實作或不明確，暫列 future / optional。

- 評論 + 評分系統
- 收藏功能
- 多組優惠券試算
- RBAC
- 第三方登入
- 全站搜尋
- 即時庫存查詢 / 庫存不足攔截
- 購物車合併規則
- 金流 webhook 完整流程
- 付款失敗處理 / 重新付款
- 訂單列表 / 訂單詳情 / 取消訂單
- 物流追蹤
- 退貨 / 售後申請
- 退款狀態查詢
- 推薦加購

## 4. 前端與後端功能對照表

### Auth

**前端是否已有畫面**
- 是

**前端對應檔案**
- `auth/*`

**後端草稿是否有提到**
- 是

**可能 DB table**
- `users`
- `user_credentials`

**狀態**
- core

**備註**
- reset token 先待確認。
- `users` 保存會員基本身份資料。
- `user_credentials` 保存登入密碼憑證資料。
- `password_hash` 不放在 `users` table。

---

### 商品列表

**前端是否已有畫面**
- 是

**前端對應檔案**
- `product/*`
- `productBrowser/*`

**後端草稿是否有提到**
- 是

**可能 DB table**
- `products`
- `product_categories`
- `product_images`

**狀態**
- core

**備註**
- mock 僅代表卡片顯示。

---

### 商品詳情

**前端是否已有畫面**
- 是

**前端對應檔案**
- `productsDetail/*`

**後端草稿是否有提到**
- 是

**可能 DB table**
- `products`
- `product_images`
- `product_skus`

**狀態**
- core

**備註**
- tags/promotions/related 另列確認。

---

### 購物車

**前端是否已有畫面**
- 是

**前端對應檔案**
- `cart/*`
- `CartContext.jsx`

**後端草稿是否有提到**
- 是

**可能 DB table**
- `carts`
- `cart_items`

**狀態**
- core

**備註**
- selected 可能只是前端狀態。

---

### 結帳 / 建立訂單

**前端是否已有畫面**
- 是

**前端對應檔案**
- `checkout/*`
- `cartApi.submitCheckout`

**後端草稿是否有提到**
- 是

**可能 DB table**
- `orders`
- `order_items`
- shipping snapshot

**狀態**
- core

**備註**
- UI 尚未實際串 submit。

---

### 付款

**前端是否已有畫面**
- 是

**前端對應檔案**
- `PaymentMethodSelector.jsx`

**後端草稿是否有提到**
- 是

**可能 DB table**
- `payments/payment_records`

**狀態**
- core

**備註**
- 不保存完整卡號/CVC。

---

### 發票

**前端是否已有畫面**
- 是

**前端對應檔案**
- `InvoiceForm.jsx`

**後端草稿是否有提到**
- 不明確

**可能 DB table**
- maybe `order_invoice_snapshots`

**狀態**
- needs-confirmation

**備註**
- 不直接塞 core，需確認。

---

### 商品促銷 / 加購

**前端是否已有畫面**
- 部分

**前端對應檔案**
- detail promotions
- cart promotions

**後端草稿是否有提到**
- 是

**可能 DB table**
- maybe promotions tables

**狀態**
- optional

**備註**
- DB v1 不建核心促銷模型。

---

### 評論評分

**前端是否已有畫面**
- 無

**前端對應檔案**
- 無

**後端草稿是否有提到**
- 是

**可能 DB table**
- reviews

**狀態**
- optional

**備註**
- future

---

### 收藏

**前端是否已有畫面**
- 無

**前端對應檔案**
- 無

**後端草稿是否有提到**
- 是

**可能 DB table**
- wishlists

**狀態**
- optional

**備註**
- future

---

### 訂單查詢 / 取消

**前端是否已有畫面**
- 無

**前端對應檔案**
- 無

**後端草稿是否有提到**
- 是

**可能 DB table**
- orders 狀態欄位即可預留

**狀態**
- optional

**備註**
- v1 只支援建立與完成摘要。

---

### 物流 / 退貨 / 退款

**前端是否已有畫面**
- 無

**前端對應檔案**
- 無

**後端草稿是否有提到**
- 是

**可能 DB table**
- shipments
- returns
- refunds

**狀態**
- optional

**備註**
- 不進 v1 核心。

## 5. 建議 DB v1 範圍

本章節記錄目前根據前端現況、後端功能架構草稿與前後端對照後，初步建議納入 DB v1 的候選資料表。

### 5.1 優先表

以下資料表優先納入 DB v1 討論範圍：

- `users`
- `user_credentials`
- `products`
- `product_categories`
- `product_images`
- `product_skus` 或 `product_variants`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `order_shipping_snapshots`，或在 `orders` 保存 recipient / shipping snapshot 欄位
- `payment_records`

帳號與憑證資料分工：

- `users` 保存會員基本身份資料。
- `user_credentials` 保存登入密碼憑證資料。
- `password_hash` 不放在 `users` table。

### 5.2 先不直接加入，但建議備註

以下資料表目前不直接納入 DB v1 核心，但應保留為待確認或備註項目：

#### `order_invoice_snapshots`

checkout 已有發票表單，但後端草稿尚未明確定義，需確認是否真的需要保存發票快照。

#### `shipping_methods`

前端有配送方式顯示，但目前可能只是靜態選項；若後台需要維護配送方式，再考慮建立正式資料表。

#### `product_tags` / `product_relations` / `promotions`

前端商品詳情頁有顯示需求，但不應直接變成 DB v1 核心。需確認是否只是靜態顯示、前端 mock，或真的需要後台維護。

---

## 6. Optional / Future 清單

以下功能或資料表目前歸類為 optional / future，不直接納入 DB v1 核心設計，除非使用者或團隊明確確認為 v1 必做功能：

- `reviews`
- `ratings`
- `wishlists`
- `coupons`
- `coupon_trials`
- `roles`
- `permissions`
- `social_accounts`
- `inventory_reservations`
- `payment_webhooks`
- `shipments`
- `shipment_tracking_events`
- `returns`
- `refunds`
- `recommendations`
- `product_bundles`
- `product_related_items`
- `promotion_rules`
