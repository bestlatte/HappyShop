# 後端功能模組規劃文件

## 1. 文件目的

本文件用來規劃商城買家端電商系統的後端功能模組。後端模組應依照業務領域與系統職責切分，而不是依照前端頁面切分，因此不應設計成「首頁模組」、「商品詳情頁模組」或「購物車頁模組」。

前端頁面適合用來盤點 API，因為頁面能反映使用者實際會進行的操作；後端模組則適合依照業務功能切分，例如會員、認證、商品、購物車、訂單、付款、物流與庫存。一個前端頁面可能會使用多個後端模組，一個後端模組也可能被多個前端頁面共用。

本文件根據 `frontend-api-planning.md` 中整理出的 API，進一步歸納後端功能模組、資料表、業務流程與 Spring Boot 專案結構。

## 2. 後端功能模組總覽

| 模組名稱 | 模組職責 | 是否為第一階段必要模組 | 對應前端頁面 | 主要 API 類型 |
| --- | --- | --- | --- | --- |
| 會員模組 | 管理會員基本資料、聯絡資訊與會員狀態 | 是 | 登入頁面、結帳頁面、訂單頁面 | 會員註冊、會員資料查詢 |
| 認證模組 | 處理登入、Token 驗證、登出與身份識別 | 是 | 登入頁面、購物車頁面、結帳頁面、訂單頁面 | 登入、登出、查詢目前登入者 |
| 商品模組 | 管理商品基本資料、商品圖片、價格與上下架狀態 | 是 | 商品導覽頁、商品詳情頁、購物車頁面、結帳頁面 | 商品列表、商品詳情 |
| 商品分類模組 | 管理商品分類、分類階層與分類排序 | 是 | 商品導覽頁 | 分類清單、分類查詢 |
| 商品規格/SKU 模組 | 管理商品規格組合、SKU 價格與銷售單位 | 是 | 商品詳情頁、購物車頁面 | SKU 查詢、規格查詢 |
| 庫存模組 | 管理 SKU 庫存、可售數量與庫存扣減 | 是 | 商品詳情頁、購物車頁面、結帳頁面 | 庫存查詢、庫存檢查、扣庫存 |
| 購物車模組 | 管理會員購物車、購物車品項與購物車金額試算 | 是 | 商品詳情頁、檢視購物車頁面、結帳頁面 | 加入購物車、查詢購物車、修改數量 |
| 訂單模組 | 建立訂單、管理訂單狀態、查詢訂單與取消訂單 | 是 | 結帳頁面、付款結果頁面、訂單頁面 | 建立訂單、查詢訂單、取消訂單 |
| 付款模組 | 建立付款交易、查詢付款狀態、處理付款結果 | 是 | 結帳頁面、付款結果頁面、訂單頁面 | 付款方式、付款請求、付款結果 |
| 物流模組 | 管理配送方式、配送資訊與物流追蹤 | 建議補充 | 結帳頁面、訂單頁面 | 配送方式、物流狀態 |
| 優惠券模組 | 管理優惠券規則、折扣試算與使用紀錄 | 建議補充 | 購物車頁面、結帳頁面 | 優惠券套用、折扣試算 |
| 售後/退款模組 | 管理退貨、退款、售後申請與處理狀態 | 未來擴充 | 訂單頁面 | 退貨申請、退款狀態 |

## 3. 各後端功能模組詳細設計

### 會員模組

#### 模組職責

會員模組負責管理買家會員的基本資料，包括姓名、Email、電話、帳號狀態與註冊時間。會員模組不直接處理密碼驗證流程，密碼驗證與 Token 發放應由認證模組負責。

#### 主要功能

- 會員註冊
- 查詢會員基本資料
- 更新會員聯絡資料（建議補充）
- 管理會員狀態，例如啟用、停用

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| POST | `/api/members` | 建立會員帳號 |
| GET | `/api/members/{memberId}` | 查詢會員資料，通常由內部或管理端使用 |
| PATCH | `/api/members/me` | 更新目前登入會員資料，建議補充 |

#### 可能使用的資料表

- `members`
- `member_profiles`（可選，第一階段可併入 `members`）

#### 與其他模組的關聯

- 認證模組會使用會員資料驗證帳號是否存在與是否啟用。
- 訂單模組會使用會員 ID 建立訂單歸屬。
- 購物車模組會依會員 ID 維護購物車。
- 結帳流程會使用會員資料作為預設收件資訊來源。

### 認證模組

#### 模組職責

認證模組負責處理登入、Token 發放、Token 驗證、登出與目前登入者查詢。此模組是保護購物車、結帳、訂單與付款 API 的基礎。

#### 主要功能

- 會員登入
- 發放 Access Token
- 驗證 Authorization Header
- 查詢目前登入者
- 登出或 Token 黑名單（建議補充）
- Email 驗證（第二階段建議）

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| POST | `/api/auth/login` | 會員登入並取得 Token |
| GET | `/api/auth/me` | 查詢目前登入會員 |
| POST | `/api/auth/logout` | 登出 |
| POST | `/api/auth/email/verification` | 寄送 Email 驗證信，建議補充 |
| POST | `/api/auth/email/verification/confirm` | 確認 Email 驗證碼，建議補充 |

#### 可能使用的資料表

- `members`
- `auth_tokens`（若需要管理 Token 黑名單或 Refresh Token）
- `email_verifications`（第二階段建議）

#### 與其他模組的關聯

- 會員模組提供會員帳號與狀態資料。
- 購物車、訂單、付款與售後模組都需要認證模組提供目前登入會員身份。

### 商品模組

#### 模組職責

商品模組負責管理商品基本資料，包括商品名稱、描述、主圖、商品狀態、價格範圍與上下架資訊。商品模組提供商品列表與商品詳情，是商品導覽頁與商品詳情頁的核心資料來源。

#### 主要功能

- 查詢商品列表
- 查詢商品詳情
- 根據分類查詢商品
- 根據關鍵字搜尋商品
- 管理商品上下架狀態

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| GET | `/api/products` | 查詢商品列表 |
| GET | `/api/products/{productId}` | 查詢商品詳情 |
| GET | `/api/products?categoryId={categoryId}` | 依分類查詢商品 |
| GET | `/api/products?keyword={keyword}` | 依關鍵字搜尋商品 |

#### 可能使用的資料表

- `products`
- `product_images`
- `product_categories`

#### 與其他模組的關聯

- 商品分類模組提供分類資訊。
- SKU 模組提供商品可銷售規格。
- 庫存模組提供可售狀態。
- 購物車與訂單模組會引用商品資料作為購物與訂單明細。

### 商品分類模組

#### 模組職責

商品分類模組負責管理商品分類、分類階層與顯示順序。商品導覽頁可透過此模組取得分類清單並進行商品篩選。

#### 主要功能

- 查詢分類清單
- 查詢分類階層
- 管理分類啟用狀態
- 管理分類排序

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| GET | `/api/categories` | 查詢商品分類清單 |
| GET | `/api/categories/{categoryId}` | 查詢單一分類資料，建議補充 |

#### 可能使用的資料表

- `categories`
- `product_categories`

#### 與其他模組的關聯

- 商品模組會透過分類關聯查詢商品列表。
- 前端商品導覽頁會使用分類資料作為篩選條件。

### 商品規格/SKU 模組

#### 模組職責

商品規格/SKU 模組負責商品可銷售單位的管理。若一個商品有不同顏色、尺寸或包裝，每一種規格組合可對應一個 SKU。

#### 主要功能

- 查詢商品規格選項
- 查詢商品 SKU 列表
- 管理 SKU 價格
- 管理 SKU 啟用狀態

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| GET | `/api/products/{productId}/skus` | 查詢指定商品的 SKU 與規格 |
| GET | `/api/skus/{skuId}` | 查詢單一 SKU 資訊，建議補充 |

#### 可能使用的資料表

- `product_skus`
- `product_spec_options`
- `product_sku_spec_values`

#### 與其他模組的關聯

- 商品模組提供商品主資料。
- 庫存模組以 SKU 為庫存管理單位。
- 購物車與訂單明細應記錄 SKU ID 與當下的商品規格文字。

### 庫存模組

#### 模組職責

庫存模組負責管理 SKU 的可售庫存，並在建立訂單或付款流程中確保庫存一致性。庫存模組需避免超賣，並支援取消訂單時回補庫存。

#### 主要功能

- 查詢 SKU 庫存
- 檢查購買數量是否足夠
- 建立訂單時扣減或鎖定庫存
- 取消訂單時回補庫存
- 記錄庫存異動

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| GET | `/api/skus/{skuId}/stock` | 查詢 SKU 庫存 |

第一階段庫存扣減通常由訂單 Service 內部呼叫庫存 Service 完成，不一定需要提供公開 API。

#### 可能使用的資料表

- `inventories`
- `inventory_logs`

#### 與其他模組的關聯

- SKU 模組提供庫存管理單位。
- 購物車模組在修改數量時可檢查庫存。
- 訂單模組建立訂單時會呼叫庫存模組扣減或鎖定庫存。
- 訂單取消或付款失敗逾時時，可能需要回補庫存。

### 購物車模組

#### 模組職責

購物車模組負責管理會員購物車與購物車品項，包括加入商品、修改數量、刪除品項、清空購物車與金額試算。

#### 主要功能

- 加入購物車
- 查詢購物車
- 修改購物車品項數量
- 刪除購物車品項
- 清空購物車
- 購物車金額試算
- 套用優惠券（第二階段建議）

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| POST | `/api/cart/items` | 加入購物車 |
| GET | `/api/cart` | 查詢購物車 |
| PATCH | `/api/cart/items/{cartItemId}` | 修改購物車品項數量 |
| DELETE | `/api/cart/items/{cartItemId}` | 刪除購物車品項 |
| DELETE | `/api/cart/items` | 清空購物車 |
| POST | `/api/cart/coupon` | 套用優惠券，建議補充 |

#### 可能使用的資料表

- `carts`
- `cart_items`
- `coupon_usages`（若支援購物車優惠券）

#### 與其他模組的關聯

- 認證模組提供目前會員身份。
- 商品與 SKU 模組提供商品與規格資料。
- 庫存模組檢查可購買數量。
- 訂單模組建立訂單時會讀取購物車內容。
- 優惠券模組可提供折扣試算。

### 訂單模組

#### 模組職責

訂單模組負責建立訂單、儲存訂單明細、管理訂單狀態與提供訂單查詢。訂單模組是結帳後的核心業務模組。

#### 主要功能

- 根據購物車建立訂單
- 儲存訂單商品明細
- 計算訂單金額
- 查詢訂單列表
- 查詢訂單詳情
- 更新訂單狀態
- 取消訂單（第二階段建議）

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| POST | `/api/orders` | 建立訂單 |
| GET | `/api/orders` | 查詢會員訂單列表 |
| GET | `/api/orders/{orderId}` | 查詢訂單詳情 |
| PATCH | `/api/orders/{orderId}/cancel` | 取消訂單，建議補充 |

#### 可能使用的資料表

- `orders`
- `order_items`
- `order_status_logs`

#### 與其他模組的關聯

- 會員模組確認下單者身份。
- 購物車模組提供購物車內容。
- 庫存模組檢查並扣減庫存。
- 付款模組建立付款紀錄。
- 物流模組建立配送資料。
- 優惠券模組確認折扣規則與使用紀錄。

### 付款模組

#### 模組職責

付款模組負責管理付款方式、建立付款交易、查詢付款狀態，以及處理付款成功或付款失敗後的訂單狀態更新。

#### 主要功能

- 查詢可用付款方式
- 建立付款請求
- 查詢付款結果
- 更新付款狀態
- 重新付款（第二階段建議）
- 接收第三方金流回呼（若串接金流）

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| GET | `/api/payments/methods` | 查詢付款方式 |
| POST | `/api/orders/{orderId}/payment` | 建立付款請求 |
| GET | `/api/payments/{paymentId}` | 查詢付款結果 |
| POST | `/api/orders/{orderId}/payment/retry` | 重新付款，建議補充 |
| POST | `/api/payments/callback` | 金流回呼，若串接第三方金流 |

#### 可能使用的資料表

- `payment_methods`
- `payments`
- `payment_logs`

#### 與其他模組的關聯

- 訂單模組提供應付款金額與訂單狀態。
- 付款成功後需通知訂單模組更新付款狀態。
- 付款失敗或逾時時，可能需要通知訂單模組與庫存模組處理後續狀態。

### 物流模組

#### 模組職責

物流模組負責配送方式、收件資訊、物流狀態與物流追蹤資料。第一階段可先支援固定配送方式與基本收件資料，完整物流追蹤可列為第二階段。

#### 主要功能

- 查詢配送方式
- 建立訂單配送資料
- 查詢物流狀態
- 更新物流追蹤資訊（第二階段建議）

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| GET | `/api/shipments/methods` | 查詢配送方式 |
| GET | `/api/orders/{orderId}/shipment` | 查詢訂單物流狀態 |

#### 可能使用的資料表

- `shipment_methods`
- `shipments`

#### 與其他模組的關聯

- 訂單模組建立訂單時會建立配送資料。
- 會員模組可提供預設收件資訊。
- 訂單頁面會透過訂單模組與物流模組顯示配送狀態。

### 優惠券模組

#### 模組職責

優惠券模組負責管理優惠券規則、優惠券可用性檢查、折扣計算與使用紀錄。此模組建議列為第二階段，避免第一版購物流程過度複雜。

#### 主要功能

- 驗證優惠券代碼
- 計算折扣金額
- 檢查使用門檻與有效期限
- 記錄會員使用優惠券

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| POST | `/api/cart/coupon` | 在購物車套用優惠券 |
| POST | `/api/orders/{orderId}/coupon` | 訂單套用優惠券，未來擴充 |

#### 可能使用的資料表

- `coupons`
- `coupon_usages`

#### 與其他模組的關聯

- 購物車模組使用優惠券模組進行購物車金額試算。
- 訂單模組建立訂單時需確認優惠券仍有效，並記錄使用狀態。
- 會員模組可用來限制每位會員可使用次數。

### 售後/退款模組

#### 模組職責

售後/退款模組負責處理退貨、退款與售後申請。此功能目前不是既有前端頁面的核心流程，建議列為未來擴充。

#### 主要功能

- 建立退貨/退款申請
- 查詢售後申請狀態
- 審核售後申請
- 建立退款紀錄

#### 可能提供的 API

| API Method | API Path | API 用途 |
| --- | --- | --- |
| POST | `/api/orders/{orderId}/returns` | 建立退貨/退款申請，未來擴充 |
| GET | `/api/orders/{orderId}/returns` | 查詢售後申請狀態，未來擴充 |

#### 可能使用的資料表

- `return_requests`
- `refunds`

#### 與其他模組的關聯

- 訂單模組提供訂單與訂單明細。
- 付款模組處理退款狀態。
- 物流模組可能需要記錄退貨物流。
- 庫存模組可能需要在退貨完成後回補庫存。

## 4. 前端頁面與後端模組對應關係

| 前端頁面 | 使用到的後端模組 | 主要互動內容 | 說明 |
| --- | --- | --- | --- |
| 商品導覽頁（首頁） | 商品模組、商品分類模組、庫存模組 | 查詢商品列表、分類清單、商品可售狀態 | 不需要登入，是商品瀏覽入口 |
| 商品詳情頁 | 商品模組、商品規格/SKU 模組、庫存模組、購物車模組 | 查詢商品詳情、查詢 SKU、確認庫存、加入購物車 | 加入購物車建議要求登入 |
| 檢視購物車頁面 | 購物車模組、商品模組、SKU 模組、庫存模組、優惠券模組 | 查詢購物車、修改數量、刪除品項、優惠券試算 | 優惠券屬第二階段建議 |
| 登入頁面 | 認證模組、會員模組 | 登入、註冊、取得目前登入者 | 登入後取得 Token 供後續 API 使用 |
| 結帳頁面 | 購物車模組、會員模組、訂單模組、庫存模組、付款模組、物流模組、優惠券模組 | 取得結帳摘要、填寫收件資料、建立訂單、建立付款請求 | 是多模組整合最多的頁面 |
| 付款結果頁面 | 付款模組、訂單模組 | 查詢付款結果、查詢訂單摘要、重新付款 | 付款成功與失敗都應由後端狀態確認 |
| 訂單頁面 | 訂單模組、付款模組、物流模組、售後/退款模組 | 查詢訂單列表與詳情、取消訂單、查詢物流、售後申請 | 取消、物流追蹤與售後可分階段實作 |

## 5. 核心業務流程設計

### 1. 使用者瀏覽商品流程

1. 使用者進入商品導覽頁（首頁）。
2. 前端呼叫 `GET /api/categories` 取得商品分類。
3. 前端呼叫 `GET /api/products` 取得商品列表。
4. 使用者切換分類或輸入關鍵字時，前端帶上 `categoryId` 或 `keyword` 再次呼叫 `GET /api/products`。
5. 使用後端模組：商品模組、商品分類模組、庫存模組。
6. 可能操作資料表：`products`、`product_images`、`categories`、`product_categories`、`inventories`。

### 2. 使用者查看商品詳情流程

1. 使用者從商品導覽頁點擊商品，進入商品詳情頁。
2. 前端呼叫 `GET /api/products/{productId}` 查詢商品主資料。
3. 前端呼叫 `GET /api/products/{productId}/skus` 查詢規格與 SKU。
4. 使用者選擇規格時，前端可呼叫 `GET /api/skus/{skuId}/stock` 或直接使用 SKU 回應中的庫存資訊。
5. 使用後端模組：商品模組、商品規格/SKU 模組、庫存模組。
6. 可能操作資料表：`products`、`product_images`、`product_skus`、`product_spec_options`、`product_sku_spec_values`、`inventories`。

### 3. 加入購物車流程

1. 使用者在商品詳情頁選擇 SKU 與數量。
2. 前端檢查使用者是否已登入；若未登入，導向登入頁面。
3. 登入後前端呼叫 `POST /api/cart/items`，傳入 `skuId` 與 `quantity`。
4. 後端購物車模組確認會員身份，並呼叫商品/SKU 與庫存模組確認商品可購買。
5. 若同一 SKU 已存在購物車，更新數量；若不存在，新增購物車品項。
6. 使用後端模組：認證模組、購物車模組、商品模組、SKU 模組、庫存模組。
7. 可能操作資料表：`members`、`carts`、`cart_items`、`product_skus`、`inventories`。

### 4. 檢視購物車與修改數量流程

1. 使用者進入檢視購物車頁面。
2. 前端呼叫 `GET /api/cart` 查詢購物車內容。
3. 使用者修改數量時，前端呼叫 `PATCH /api/cart/items/{cartItemId}`。
4. 後端檢查商品是否仍上架、SKU 是否仍可售、庫存是否足夠。
5. 使用者刪除品項時，前端呼叫 `DELETE /api/cart/items/{cartItemId}`。
6. 若支援優惠券，前端呼叫 `POST /api/cart/coupon` 進行折扣試算。
7. 使用後端模組：購物車模組、商品模組、SKU 模組、庫存模組、優惠券模組。
8. 可能操作資料表：`carts`、`cart_items`、`products`、`product_skus`、`inventories`、`coupons`、`coupon_usages`。

### 5. 結帳建立訂單流程

1. 使用者從購物車頁面進入結帳頁面。
2. 前端呼叫 `GET /api/checkout` 取得結帳摘要。
3. 前端可呼叫 `GET /api/shipments/methods` 與 `GET /api/payments/methods` 取得配送與付款選項。
4. 使用者填寫收件資料並送出訂單。
5. 前端呼叫 `POST /api/orders`。
6. 後端訂單模組驗證購物車內容、價格、優惠券與庫存。
7. 後端在 Transaction 中建立訂單、訂單明細、付款紀錄、配送資料，並扣減或鎖定庫存。
8. 建立訂單成功後，前端呼叫 `POST /api/orders/{orderId}/payment` 建立付款請求。
9. 使用後端模組：購物車模組、會員模組、訂單模組、庫存模組、付款模組、物流模組、優惠券模組。
10. 可能操作資料表：`orders`、`order_items`、`payments`、`shipments`、`inventories`、`inventory_logs`、`carts`、`cart_items`、`coupons`、`coupon_usages`。

### 6. 付款成功 / 付款失敗流程

1. 使用者完成付款後被導回付款結果頁面，或前端取得付款單號。
2. 前端呼叫 `GET /api/payments/{paymentId}` 查詢付款狀態。
3. 若付款成功，後端付款模組更新 `payments` 狀態，並通知訂單模組將訂單更新為已付款或待出貨。
4. 若付款失敗，後端付款模組記錄失敗原因，訂單保持待付款或付款失敗狀態。
5. 前端可再呼叫 `GET /api/orders/{orderId}` 顯示訂單摘要。
6. 第二階段可提供 `POST /api/orders/{orderId}/payment/retry` 重新付款。
7. 使用後端模組：付款模組、訂單模組、庫存模組。
8. 可能操作資料表：`payments`、`payment_logs`、`orders`、`order_status_logs`、`inventories`。

### 7. 查詢訂單與取消訂單流程

1. 使用者進入訂單頁面。
2. 前端呼叫 `GET /api/orders` 查詢訂單列表。
3. 使用者點擊訂單後，前端呼叫 `GET /api/orders/{orderId}` 查詢訂單詳情。
4. 若支援取消訂單，前端呼叫 `PATCH /api/orders/{orderId}/cancel`。
5. 後端檢查訂單是否屬於目前會員、是否允許取消、是否已付款或已出貨。
6. 若取消成功，後端更新訂單狀態，必要時回補庫存並處理退款。
7. 使用後端模組：認證模組、訂單模組、付款模組、物流模組、庫存模組。
8. 可能操作資料表：`orders`、`order_items`、`order_status_logs`、`payments`、`shipments`、`inventories`、`inventory_logs`。

### 8. 退貨 / 售後申請流程

1. 使用者在訂單頁面查看已完成或已出貨訂單。
2. 若未來前端提供售後入口，使用者可送出退貨或退款申請。
3. 前端呼叫 `POST /api/orders/{orderId}/returns` 建立售後申請。
4. 後端檢查訂單狀態、商品是否可退、申請期限與申請原因。
5. 後端建立售後申請紀錄，後續由管理端審核。
6. 使用者可呼叫 `GET /api/orders/{orderId}/returns` 查詢申請狀態。
7. 使用後端模組：售後/退款模組、訂單模組、付款模組、物流模組、庫存模組。
8. 可能操作資料表：`return_requests`、`refunds`、`orders`、`order_items`、`payments`、`shipments`。

## 6. 資料庫設計初步建議

| 資料表名稱 | 對應模組 | 儲存內容 | 主要欄位建議 | 與其他資料表的關聯 | 是否第一階段必要 |
| --- | --- | --- | --- | --- | --- |
| `members` | 會員模組、認證模組 | 會員帳號與基本資料 | `id`、`name`、`email`、`password_hash`、`phone`、`status`、`created_at`、`updated_at` | 與 `carts`、`orders`、`coupon_usages` 關聯 | 是 |
| `products` | 商品模組 | 商品主資料 | `id`、`name`、`description`、`base_price`、`status`、`created_at`、`updated_at` | 與 `product_images`、`product_skus`、`product_categories` 關聯 | 是 |
| `product_images` | 商品模組 | 商品圖片 | `id`、`product_id`、`image_url`、`is_primary`、`sort_order` | 多筆圖片對應一個商品 | 是 |
| `categories` | 商品分類模組 | 商品分類 | `id`、`name`、`parent_id`、`sort_order`、`status` | 可自關聯父層分類；與 `product_categories` 關聯 | 是 |
| `product_categories` | 商品分類模組、商品模組 | 商品與分類關聯 | `product_id`、`category_id` | 連接 `products` 與 `categories` | 是 |
| `product_skus` | 商品規格/SKU 模組 | 商品 SKU | `id`、`product_id`、`sku_code`、`price`、`status` | 與 `products`、`inventories`、`cart_items`、`order_items` 關聯 | 是 |
| `product_spec_options` | 商品規格/SKU 模組 | 商品規格選項 | `id`、`product_id`、`spec_name`、`spec_value`、`sort_order` | 與 SKU 規格值關聯 | 建議補充 |
| `product_sku_spec_values` | 商品規格/SKU 模組 | SKU 對應規格值 | `sku_id`、`spec_name`、`spec_value` | 連接 SKU 與規格資料 | 建議補充 |
| `inventories` | 庫存模組 | SKU 庫存 | `id`、`sku_id`、`available_quantity`、`locked_quantity`、`updated_at` | 一個 SKU 對應一筆庫存 | 是 |
| `inventory_logs` | 庫存模組 | 庫存異動紀錄 | `id`、`sku_id`、`change_quantity`、`change_type`、`reference_id`、`created_at` | 對應訂單或取消訂單紀錄 | 建議補充 |
| `carts` | 購物車模組 | 會員購物車 | `id`、`member_id`、`created_at`、`updated_at` | 一個會員可對應一個有效購物車 | 是 |
| `cart_items` | 購物車模組 | 購物車品項 | `id`、`cart_id`、`sku_id`、`quantity`、`created_at`、`updated_at` | 關聯 `carts` 與 `product_skus` | 是 |
| `orders` | 訂單模組 | 訂單主資料 | `id`、`order_no`、`member_id`、`status`、`payment_status`、`total_amount`、`discount_amount`、`shipping_fee`、`created_at` | 與會員、付款、物流、訂單明細關聯 | 是 |
| `order_items` | 訂單模組 | 訂單商品明細 | `id`、`order_id`、`sku_id`、`product_name`、`sku_name`、`unit_price`、`quantity`、`subtotal` | 關聯 `orders` 與 `product_skus` | 是 |
| `order_status_logs` | 訂單模組 | 訂單狀態異動 | `id`、`order_id`、`from_status`、`to_status`、`reason`、`created_at` | 對應訂單 | 建議補充 |
| `payment_methods` | 付款模組 | 可用付款方式 | `id`、`name`、`type`、`status` | 被 `payments` 參照 | 建議補充 |
| `payments` | 付款模組 | 付款紀錄 | `id`、`order_id`、`payment_no`、`method_id`、`amount`、`status`、`paid_at`、`failed_reason` | 一筆訂單可有多筆付款嘗試 | 是 |
| `payment_logs` | 付款模組 | 付款狀態異動紀錄 | `id`、`payment_id`、`status`、`message`、`created_at` | 對應付款紀錄 | 建議補充 |
| `shipment_methods` | 物流模組 | 配送方式 | `id`、`name`、`fee`、`status` | 被 `shipments` 參照 | 建議補充 |
| `shipments` | 物流模組 | 訂單配送資料 | `id`、`order_id`、`method_id`、`recipient_name`、`recipient_phone`、`address`、`status`、`tracking_no` | 一筆訂單對應一筆配送資料 | 建議補充 |
| `coupons` | 優惠券模組 | 優惠券規則 | `id`、`code`、`discount_type`、`discount_value`、`min_amount`、`start_at`、`end_at`、`status` | 與使用紀錄關聯 | 第二階段 |
| `coupon_usages` | 優惠券模組 | 優惠券使用紀錄 | `id`、`coupon_id`、`member_id`、`order_id`、`used_at` | 關聯會員、訂單與優惠券 | 第二階段 |
| `return_requests` | 售後/退款模組 | 退貨/退款申請 | `id`、`order_id`、`member_id`、`reason`、`status`、`created_at` | 對應訂單與會員 | 未來擴充 |
| `refunds` | 售後/退款模組、付款模組 | 退款紀錄 | `id`、`return_request_id`、`payment_id`、`amount`、`status`、`refunded_at` | 對應售後申請與付款紀錄 | 未來擴充 |

## 7. Spring Boot 後端專案結構建議

以下以 Spring Boot、MySQL、前後端分離架構為前提，建議使用依功能模組切分的資料夾結構。每個模組內可再依 Controller、Service、Repository、DTO、Entity 分層。

```text
src/main/java/com/happyshop
├── HappyShopApplication.java
├── common
│   ├── response
│   │   ├── ApiResponse.java
│   │   └── PageResponse.java
│   ├── exception
│   │   ├── BusinessException.java
│   │   ├── ErrorCode.java
│   │   └── GlobalExceptionHandler.java
│   └── util
├── config
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── JwtConfig.java
├── auth
│   ├── controller
│   ├── service
│   ├── dto
│   └── security
├── member
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── product
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── category
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── inventory
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── cart
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── order
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── payment
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── shipment
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
├── coupon
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── entity
└── aftersale
    ├── controller
    ├── service
    ├── repository
    ├── dto
    └── entity
```

各層主要職責如下：

| 分層/資料夾 | 主要內容 |
| --- | --- |
| `controller` | 接收 HTTP Request、呼叫 Service、回傳 API Response |
| `service` | 處理業務邏輯、交易控制、跨模組協作 |
| `repository` | 負責資料庫存取，通常使用 Spring Data JPA |
| `dto` | Request DTO、Response DTO、查詢條件 DTO |
| `entity` | 對應資料表的 JPA Entity |
| `exception` | 自訂例外、錯誤碼、全域錯誤處理 |
| `config` | Security、CORS、JWT、Swagger/OpenAPI 等設定 |
| `common.response` | 統一 API 回應格式與分頁格式 |

## 8. 功能優先順序建議

### 第一階段：必要功能

第一階段應先完成基本購物流程，讓使用者可以從瀏覽商品一路完成下單與查詢訂單。

- 會員模組：會員註冊、會員資料查詢
- 認證模組：登入、Token 驗證、查詢目前登入者
- 商品模組：商品列表、商品詳情
- 商品分類模組：分類清單
- 商品規格/SKU 模組：SKU 與規格查詢
- 庫存模組：庫存查詢、庫存檢查、建立訂單時扣庫存
- 購物車模組：加入購物車、查詢購物車、修改數量、刪除品項
- 訂單模組：建立訂單、查詢訂單列表、查詢訂單詳情
- 付款模組：建立付款請求、查詢付款結果

### 第二階段：建議功能

第二階段可提升系統完整度與真實電商體驗，但可以在 MVP 穩定後再加入。

- 優惠券模組：優惠券試算、優惠券使用紀錄
- 物流模組：配送方式、物流狀態查詢
- 認證模組：Email 驗證、登出 Token 黑名單
- 訂單模組：取消訂單、訂單狀態異動紀錄
- 付款模組：重新付款、付款異動紀錄
- 庫存模組：庫存異動紀錄、取消訂單回補庫存

### 第三階段：進階功能

第三階段屬於未來擴充，應在基本購物、付款與訂單流程穩定後再規劃。

- 售後/退款模組：退貨申請、退款流程、售後狀態查詢
- 收藏商品：收藏、取消收藏、收藏清單
- 商品評論：評論列表、新增評論、評論審核
- 推薦商品：依商品、分類或會員行為推薦商品
- 管理後台支援：商品管理、訂單管理、庫存管理、會員管理

## 9. 後端設計注意事項

1. API 回應格式一致性
   - 建議統一格式，例如 `success`、`code`、`message`、`data`、`timestamp`。
   - 分頁資料建議統一使用 `items`、`page`、`size`、`totalElements`、`totalPages`。

2. 錯誤碼設計
   - 應區分驗證錯誤、登入錯誤、權限錯誤、資料不存在、庫存不足、訂單狀態不允許操作、付款失敗等情境。
   - 前端可依錯誤碼顯示對應提示。

3. 登入驗證與權限控管
   - 商品列表與商品詳情可公開存取。
   - 購物車、結帳、訂單、付款與會員資料必須驗證 Token。
   - 查詢訂單時必須確認訂單屬於目前登入會員，避免越權查詢。

4. 訂單狀態設計
   - 建議基本狀態包含：`PENDING_PAYMENT`、`PAID`、`PROCESSING`、`SHIPPED`、`COMPLETED`、`CANCELLED`。
   - 狀態轉換應由後端控制，不應讓前端任意指定狀態。

5. 付款狀態設計
   - 建議基本狀態包含：`PENDING`、`PAID`、`FAILED`、`CANCELLED`、`REFUNDED`。
   - 付款成功應以後端或金流回呼確認為準，不應只相信前端跳轉結果。

6. 庫存一致性
   - 建立訂單時需檢查庫存並在 Transaction 中扣減或鎖定庫存。
   - 若付款失敗或訂單取消，需要根據設計回補庫存。
   - 高併發情境可使用資料庫鎖、樂觀鎖版本欄位或原子更新避免超賣。

7. 避免重複下單
   - 建立訂單按鈕前端應防止重複點擊。
   - 後端可使用 idempotency key、購物車狀態或訂單建立鎖避免重複下單。

8. 資料交易 Transaction
   - 建立訂單、扣庫存、建立付款紀錄、清空購物車應在合理的 Transaction 邊界內處理。
   - 第三方付款請求通常不應長時間包在資料庫 Transaction 中，需清楚切分本地交易與外部服務呼叫。

9. 未來管理後台擴充
   - 即使目前只有買家端，也應保留商品上下架、訂單狀態、庫存異動與付款紀錄等欄位。
   - 管理後台可在未來使用相同的商品、訂單、庫存與會員模組延伸。

10. DTO 與 Entity 分離
   - Controller 不應直接回傳 Entity，避免資料欄位外洩與循環關聯問題。
   - Request DTO 應搭配 Bean Validation，例如 `@NotNull`、`@Email`、`@Min`。

## 10. 結論

後端模組應依照業務領域拆分，而不是直接以前端頁面名稱作為模組名稱。前端頁面負責呈現使用者流程，API 是前端頁面與後端模組之間的橋樑，後端模組則負責資料、業務規則與交易一致性。

良好的後端設計應支援目前既有的商城買家端頁面，包括商品導覽、商品詳情、購物車、登入、結帳、付款結果與訂單查詢；同時也應保留未來擴充彈性，例如物流追蹤、優惠券、取消訂單、售後退款、收藏商品與商品評論。

第一階段應優先完成基本購物流程，不要一開始就過度設計。建議先完成會員與認證、商品、分類、SKU、庫存、購物車、訂單與付款等核心模組，再依實際需求逐步補上優惠券、物流、售後與其他進階功能。
