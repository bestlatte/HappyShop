# 前端 API 規劃文件

## 1. 文件目的

本文件用來整理「前端頁面與 API 需求」之間的關係，重點是從目前已完成或已規劃的商城買家端前端頁面出發，分析每個畫面需要哪些後端資料與操作。

前端頁面適合用來盤點使用者實際會進行的操作，例如瀏覽商品、查看商品詳情、加入購物車、登入、結帳、查看付款結果與查詢訂單。API 則是前端與後端溝通的介面，前端透過 API 取得資料、送出操作結果，後端則負責資料驗證、業務規則、資料庫存取與交易一致性。

本文件不負責詳細說明後端模組的內部設計，也不直接決定資料表與 Service 架構。後端功能模組、資料表與 Spring Boot 專案結構的詳細規劃，將放在另一份文件 `backend-module-planning.md` 中說明。

## 2. 前端頁面架構總覽

| 頁面名稱 | 頁面目的 | 使用者主要操作 | 是否需要登入 | 頁面可能顯示的資料 |
| --- | --- | --- | --- | --- |
| 商品導覽頁（首頁） | 讓使用者瀏覽商品、分類與商品列表，是進入購物流程的起點 | 查看商品列表、切換分類、搜尋商品、排序或篩選、點擊商品進入詳情頁 | 否 | 商品列表、分類清單、商品圖片、商品名稱、價格、促銷標示、庫存狀態摘要 |
| 商品詳情頁 | 顯示單一商品的完整資訊，讓使用者選擇規格並加入購物車 | 查看商品資訊、選擇規格/SKU、選擇數量、加入購物車 | 否；加入購物車可依系統策略要求登入 | 商品名稱、圖片、描述、價格、規格選項、SKU、庫存數量、商品狀態 |
| 檢視購物車頁面 | 讓使用者確認購物車內容並調整購買數量 | 查看購物車、修改數量、刪除品項、套用優惠券、前往結帳 | 建議需要登入 | 購物車品項、商品名稱、規格、單價、數量、小計、優惠折抵、總金額 |
| 登入頁面 | 讓使用者登入帳號，取得購物與訂單查詢權限 | 輸入帳號密碼、登入、註冊帳號、查看登入錯誤訊息 | 否 | 登入表單、註冊表單、錯誤訊息、登入狀態 |
| 結帳頁面 | 讓使用者填寫收件與付款資訊，並建立訂單 | 查看結帳明細、填寫收件資訊、選擇付款方式、送出訂單 | 是 | 購物車明細、收件人資訊、配送方式、付款方式、訂單金額、優惠折抵 |
| 付款結果頁面 | 顯示付款成功或失敗結果，讓使用者確認訂單狀態 | 查看付款結果、查看訂單摘要、重新付款（建議補充）、前往訂單頁 | 是 | 付款狀態、訂單編號、付款金額、付款時間、錯誤原因、下一步操作 |
| 訂單頁面 | 讓使用者查詢自己的訂單與訂單明細 | 查看訂單列表、查看訂單詳情、取消訂單（建議補充） | 是 | 訂單列表、訂單狀態、付款狀態、物流狀態、商品明細、金額、建立時間 |

## 3. 各前端頁面 API 需求盤點

### 商品導覽頁（首頁）

#### 頁面功能說明

商品導覽頁是商城買家端的主要入口，使用者可以在此瀏覽商品列表、查看分類、依分類切換商品、搜尋商品，並點擊商品進入商品詳情頁。此頁面主要需要商品模組與商品分類模組提供資料。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 進入首頁取得商品列表 | GET | `/api/products` | 查詢商品列表 | `page`、`size`、`categoryId`、`keyword`、`sort` | 商品 ID、名稱、主圖、價格、促銷價、庫存狀態、分頁資訊 | 否 | 商品模組、庫存模組 |
| 取得商品分類 | GET | `/api/categories` | 查詢商品分類清單 | 無，或 `parentId` | 分類 ID、分類名稱、父層分類、排序 | 否 | 商品分類模組 |
| 依關鍵字搜尋商品 | GET | `/api/products?keyword={keyword}` | 根據關鍵字查詢商品 | `keyword`、`page`、`size` | 商品列表、分頁資訊 | 否 | 商品模組 |
| 依分類篩選商品 | GET | `/api/products?categoryId={categoryId}` | 根據分類查詢商品 | `categoryId`、`page`、`size` | 商品列表、分頁資訊 | 否 | 商品模組、商品分類模組 |

### 商品詳情頁

#### 頁面功能說明

商品詳情頁用來顯示單一商品的完整資訊，包含商品描述、圖片、價格、規格、SKU 與庫存狀態。使用者可以選擇規格與數量，並將商品加入購物車。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 進入商品詳情頁 | GET | `/api/products/{productId}` | 查詢商品詳細資料 | `productId` | 商品名稱、描述、圖片、價格、分類、上下架狀態 | 否 | 商品模組 |
| 取得商品規格與 SKU | GET | `/api/products/{productId}/skus` | 查詢商品可選規格與 SKU | `productId` | SKU ID、規格名稱、規格值、價格、庫存數量、是否可售 | 否 | 商品規格/SKU 模組、庫存模組 |
| 選擇規格後確認庫存 | GET | `/api/skus/{skuId}/stock` | 查詢指定 SKU 庫存 | `skuId` | SKU ID、可售庫存、庫存狀態 | 否 | 庫存模組 |
| 加入購物車 | POST | `/api/cart/items` | 將商品 SKU 加入購物車 | `skuId`、`quantity` | 購物車品項 ID、商品資訊、數量、小計、購物車總數 | 是 | 購物車模組、商品模組、庫存模組 |

### 檢視購物車頁面

#### 頁面功能說明

檢視購物車頁面用來顯示目前使用者的購物車內容。使用者可以調整商品數量、刪除購物車品項、查看金額試算，並前往結帳。優惠券試算可作為建議補充功能，不一定是第一版必要功能。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 查看購物車 | GET | `/api/cart` | 查詢目前登入使用者的購物車 | 無 | 購物車 ID、品項列表、商品資訊、SKU 規格、數量、小計、總金額 | 是 | 購物車模組、商品模組、庫存模組 |
| 修改商品數量 | PATCH | `/api/cart/items/{cartItemId}` | 更新購物車品項數量 | `cartItemId`、`quantity` | 更新後品項、購物車金額彙總 | 是 | 購物車模組、庫存模組 |
| 刪除購物車品項 | DELETE | `/api/cart/items/{cartItemId}` | 移除指定購物車品項 | `cartItemId` | 更新後購物車摘要 | 是 | 購物車模組 |
| 清空購物車 | DELETE | `/api/cart/items` | 清空目前購物車 | 無 | 清空結果、購物車摘要 | 是 | 購物車模組 |
| 套用優惠券（建議補充） | POST | `/api/cart/coupon` | 套用優惠券並重新試算金額 | `couponCode` | 折扣金額、總金額、優惠券狀態 | 是 | 購物車模組、優惠券模組 |

### 登入頁面

#### 頁面功能說明

登入頁面提供會員登入功能，讓使用者取得後續購物車、結帳與訂單查詢所需的身份驗證。若前端登入頁面同時提供註冊入口，則需要會員註冊 API。Email 驗證可列為第二階段建議功能。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 會員登入 | POST | `/api/auth/login` | 驗證帳號密碼並取得 Token | `email` 或 `username`、`password` | `accessToken`、會員基本資料、Token 到期時間 | 否 | 認證模組、會員模組 |
| 會員註冊 | POST | `/api/members` | 建立會員帳號 | `name`、`email`、`password`、`phone` | 會員 ID、姓名、Email、註冊時間 | 否 | 會員模組、認證模組 |
| 查詢目前登入者 | GET | `/api/auth/me` | 取得目前 Token 對應的會員資料 | Authorization Header | 會員 ID、姓名、Email、電話、會員狀態 | 是 | 認證模組、會員模組 |
| 登出 | POST | `/api/auth/logout` | 讓前端清除登入狀態，後端可記錄 Token 失效 | Authorization Header | 登出結果 | 是 | 認證模組 |

### 結帳頁面

#### 頁面功能說明

結帳頁面是從購物車進入訂單建立流程的頁面。使用者需要確認商品明細、填寫收件資訊、選擇配送方式與付款方式，最後送出訂單。此頁面會同時使用購物車、訂單、付款、物流、庫存與優惠券等模組。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 進入結帳頁取得結帳資料 | GET | `/api/checkout` | 取得購物車結帳摘要 | 無 | 商品明細、數量、金額、優惠、可用付款方式、預設收件資料 | 是 | 購物車模組、會員模組、優惠券模組 |
| 查詢配送方式 | GET | `/api/shipments/methods` | 取得可用配送方式 | 無 | 配送方式 ID、名稱、運費、預估天數 | 是 | 物流模組 |
| 查詢付款方式 | GET | `/api/payments/methods` | 取得可用付款方式 | 無 | 付款方式 ID、名稱、描述、是否啟用 | 是 | 付款模組 |
| 建立訂單 | POST | `/api/orders` | 依購物車內容建立訂單 | `recipientName`、`recipientPhone`、`address`、`shipmentMethodId`、`paymentMethodId`、`couponCode` | 訂單 ID、訂單編號、總金額、訂單狀態、付款資訊 | 是 | 訂單模組、購物車模組、庫存模組、付款模組、物流模組 |
| 建立付款請求 | POST | `/api/orders/{orderId}/payment` | 對指定訂單建立付款交易 | `orderId`、`paymentMethodId` | 付款單號、付款狀態、付款導向 URL 或付款參數 | 是 | 付款模組、訂單模組 |

### 付款結果頁面

#### 頁面功能說明

付款結果頁面用來顯示使用者付款後的成功或失敗結果。前端可以透過訂單 ID 或付款單號向後端查詢付款結果，避免只依賴前端跳轉參數判斷付款狀態。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 查詢付款結果 | GET | `/api/payments/{paymentId}` | 查詢付款交易狀態 | `paymentId` | 付款狀態、付款金額、付款時間、失敗原因、訂單 ID | 是 | 付款模組 |
| 查詢訂單摘要 | GET | `/api/orders/{orderId}` | 顯示付款結果頁需要的訂單資訊 | `orderId` | 訂單編號、訂單狀態、付款狀態、金額、商品摘要 | 是 | 訂單模組、付款模組 |
| 重新付款（建議補充） | POST | `/api/orders/{orderId}/payment/retry` | 付款失敗時重新建立付款請求 | `orderId`、`paymentMethodId` | 新付款單號、付款導向 URL 或付款參數 | 是 | 付款模組、訂單模組 |

### 訂單頁面

#### 頁面功能說明

訂單頁面讓登入使用者查詢自己的訂單列表與訂單詳情。若系統支援取消訂單，前端可提供取消操作；若支援物流追蹤或售後申請，則可在第二階段或第三階段擴充。

#### API 需求表

| 使用者操作 | API Method | API Path | API 用途 | Request 主要參數 | Response 主要資料 | 是否需要登入 | 對應後端模組 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 查看訂單列表 | GET | `/api/orders` | 查詢目前會員的訂單列表 | `page`、`size`、`status` | 訂單 ID、訂單編號、總金額、訂單狀態、付款狀態、建立時間 | 是 | 訂單模組 |
| 查看訂單詳情 | GET | `/api/orders/{orderId}` | 查詢指定訂單完整資料 | `orderId` | 訂單基本資料、商品明細、收件資料、付款資訊、物流資訊 | 是 | 訂單模組、付款模組、物流模組 |
| 取消訂單（建議補充） | PATCH | `/api/orders/{orderId}/cancel` | 取消尚未出貨或尚未付款的訂單 | `orderId`、`cancelReason` | 取消後訂單狀態、退款狀態（若有） | 是 | 訂單模組、庫存模組、付款模組 |
| 查詢物流追蹤（建議補充） | GET | `/api/orders/{orderId}/shipment` | 查詢訂單物流狀態 | `orderId` | 配送方式、物流狀態、追蹤編號、更新時間 | 是 | 物流模組、訂單模組 |

## 4. 前端頁面與 API 對應總表

| 前端頁面 | API Method | API Path | API 用途 | 對應後端模組 | 備註 |
| --- | --- | --- | --- | --- | --- |
| 商品導覽頁（首頁） | GET | `/api/products` | 查詢商品列表 | 商品模組、庫存模組 | 第一階段必要 |
| 商品導覽頁（首頁） | GET | `/api/categories` | 查詢商品分類 | 商品分類模組 | 第一階段必要 |
| 商品詳情頁 | GET | `/api/products/{productId}` | 查詢商品詳情 | 商品模組 | 第一階段必要 |
| 商品詳情頁 | GET | `/api/products/{productId}/skus` | 查詢商品規格/SKU | 商品規格/SKU 模組、庫存模組 | 第一階段必要 |
| 商品詳情頁 | GET | `/api/skus/{skuId}/stock` | 查詢 SKU 庫存 | 庫存模組 | 可併入 SKU 查詢回應 |
| 商品詳情頁 | POST | `/api/cart/items` | 加入購物車 | 購物車模組、庫存模組 | 第一階段必要 |
| 檢視購物車頁面 | GET | `/api/cart` | 查看購物車 | 購物車模組 | 第一階段必要 |
| 檢視購物車頁面 | PATCH | `/api/cart/items/{cartItemId}` | 修改購物車數量 | 購物車模組、庫存模組 | 第一階段必要 |
| 檢視購物車頁面 | DELETE | `/api/cart/items/{cartItemId}` | 刪除購物車品項 | 購物車模組 | 第一階段必要 |
| 檢視購物車頁面 | DELETE | `/api/cart/items` | 清空購物車 | 購物車模組 | 可作為第一階段補充 |
| 檢視購物車頁面 | POST | `/api/cart/coupon` | 套用優惠券 | 購物車模組、優惠券模組 | 第二階段建議 |
| 登入頁面 | POST | `/api/auth/login` | 會員登入 | 認證模組、會員模組 | 第一階段必要 |
| 登入頁面 | POST | `/api/members` | 會員註冊 | 會員模組、認證模組 | 第一階段必要 |
| 登入頁面 | GET | `/api/auth/me` | 查詢目前登入者 | 認證模組、會員模組 | 第一階段必要 |
| 登入頁面 | POST | `/api/auth/logout` | 登出 | 認證模組 | 可由前端清 Token，後端登出為補充 |
| 結帳頁面 | GET | `/api/checkout` | 取得結帳摘要 | 購物車模組、會員模組、優惠券模組 | 第一階段必要，可由購物車 API 延伸 |
| 結帳頁面 | GET | `/api/shipments/methods` | 查詢配送方式 | 物流模組 | 第二階段可做固定選項 |
| 結帳頁面 | GET | `/api/payments/methods` | 查詢付款方式 | 付款模組 | 第一階段可先固定一種付款方式 |
| 結帳頁面 | POST | `/api/orders` | 建立訂單 | 訂單模組、庫存模組、付款模組 | 第一階段必要 |
| 結帳頁面 | POST | `/api/orders/{orderId}/payment` | 建立付款請求 | 付款模組、訂單模組 | 第一階段必要，若採貨到付款可簡化 |
| 付款結果頁面 | GET | `/api/payments/{paymentId}` | 查詢付款結果 | 付款模組 | 第一階段必要 |
| 付款結果頁面 | GET | `/api/orders/{orderId}` | 查詢訂單摘要 | 訂單模組、付款模組 | 第一階段必要 |
| 付款結果頁面 | POST | `/api/orders/{orderId}/payment/retry` | 重新付款 | 付款模組、訂單模組 | 第二階段建議 |
| 訂單頁面 | GET | `/api/orders` | 查詢訂單列表 | 訂單模組 | 第一階段必要 |
| 訂單頁面 | GET | `/api/orders/{orderId}` | 查詢訂單詳情 | 訂單模組、付款模組、物流模組 | 第一階段必要 |
| 訂單頁面 | PATCH | `/api/orders/{orderId}/cancel` | 取消訂單 | 訂單模組、庫存模組、付款模組 | 第二階段建議 |
| 訂單頁面 | GET | `/api/orders/{orderId}/shipment` | 查詢物流追蹤 | 物流模組、訂單模組 | 第二階段建議 |

## 5. API 優先順序建議

### 第一階段：必要 API

第一階段應以完成「瀏覽商品、登入、加入購物車、結帳、建立訂單、查詢訂單」為目標。

| API Method | API Path | 用途 |
| --- | --- | --- |
| GET | `/api/products` | 商品列表 |
| GET | `/api/categories` | 商品分類 |
| GET | `/api/products/{productId}` | 商品詳情 |
| GET | `/api/products/{productId}/skus` | 商品 SKU 與規格 |
| POST | `/api/auth/login` | 會員登入 |
| POST | `/api/members` | 會員註冊 |
| GET | `/api/auth/me` | 查詢目前登入者 |
| POST | `/api/cart/items` | 加入購物車 |
| GET | `/api/cart` | 查看購物車 |
| PATCH | `/api/cart/items/{cartItemId}` | 修改購物車數量 |
| DELETE | `/api/cart/items/{cartItemId}` | 刪除購物車品項 |
| GET | `/api/checkout` | 取得結帳摘要 |
| POST | `/api/orders` | 建立訂單 |
| POST | `/api/orders/{orderId}/payment` | 建立付款請求 |
| GET | `/api/payments/{paymentId}` | 查詢付款結果 |
| GET | `/api/orders` | 查詢訂單列表 |
| GET | `/api/orders/{orderId}` | 查詢訂單詳情 |

### 第二階段：建議 API

第二階段功能可以提升完整度與真實電商流程，但不是第一版 MVP 一定要完成。

| API Method | API Path | 用途 |
| --- | --- | --- |
| POST | `/api/cart/coupon` | 優惠券試算 |
| POST | `/api/auth/email/verification` | Email 驗證寄送 |
| POST | `/api/auth/email/verification/confirm` | Email 驗證確認 |
| GET | `/api/orders/{orderId}/shipment` | 物流追蹤 |
| PATCH | `/api/orders/{orderId}/cancel` | 取消訂單 |
| POST | `/api/orders/{orderId}/payment/retry` | 重新付款 |
| GET | `/api/shipments/methods` | 查詢配送方式 |

### 第三階段：進階 API

第三階段屬於未來擴充功能，應在基本購物流程穩定後再規劃。

| API Method | API Path | 用途 |
| --- | --- | --- |
| POST | `/api/favorites/products/{productId}` | 收藏商品 |
| DELETE | `/api/favorites/products/{productId}` | 取消收藏商品 |
| GET | `/api/favorites/products` | 查詢收藏商品 |
| GET | `/api/products/{productId}/reviews` | 查詢商品評論 |
| POST | `/api/products/{productId}/reviews` | 新增商品評論 |
| GET | `/api/products/{productId}/recommendations` | 推薦商品 |
| POST | `/api/orders/{orderId}/returns` | 退貨/退款申請 |
| GET | `/api/orders/{orderId}/returns` | 查詢售後申請狀態 |

## 6. 前端串接注意事項

1. 登入後 Token 保存方式
   - 登入成功後，前端應保存 `accessToken`。
   - 若使用瀏覽器儲存，需注意 XSS 風險；若使用 HttpOnly Cookie，需配合後端設定 Cookie、CORS 與 CSRF 防護。
   - Token 過期時，前端應引導使用者重新登入，或在未來補充 Refresh Token 機制。

2. Authorization Header
   - 需要登入的 API 應帶上 `Authorization: Bearer {accessToken}`。
   - 購物車、結帳、訂單、付款結果、會員資料等 API 都應視為需要登入。
   - 商品列表、商品詳情與商品分類可不需要登入。

3. API 錯誤訊息顯示
   - 前端應依後端錯誤碼顯示清楚訊息，例如登入失敗、庫存不足、商品已下架、訂單不存在、付款失敗。
   - 表單欄位錯誤應顯示在對應欄位附近；系統錯誤可用全域提示或對話框顯示。

4. Loading 狀態處理
   - 商品列表、商品詳情、購物車、結帳摘要與訂單查詢都應有 Loading 狀態。
   - 建立訂單與付款請求送出後，按鈕應暫時停用，避免使用者重複送出。

5. 表單驗證與後端驗證
   - 前端應先做基本格式驗證，例如 Email 格式、密碼長度、收件人電話、地址必填。
   - 後端仍必須做完整驗證，因為前端驗證可以被繞過。
   - 後端驗證錯誤應回傳明確欄位與錯誤原因，讓前端可以正確顯示。

6. 付款成功與付款失敗頁面
   - 付款結果頁不應只依賴網址參數判斷成功或失敗。
   - 前端應呼叫 `/api/payments/{paymentId}` 或 `/api/orders/{orderId}` 取得後端確認後的付款狀態。
   - 若付款成功，顯示訂單編號、付款金額與訂單狀態。
   - 若付款失敗，顯示失敗原因，並在第二階段提供重新付款操作。

7. 購物車與庫存狀態
   - 加入購物車前可以顯示庫存，但真正扣庫存應在建立訂單或付款流程中由後端控制。
   - 修改數量時若超過庫存，後端應回傳庫存不足錯誤，前端顯示可購買數量。

## 7. 結論

本文件是以前端頁面為基礎整理 API 需求，目標是讓目前既有的商城買家端頁面能順利串接後端資料與操作。

每個前端頁面可能會呼叫多個後端模組的 API，例如結帳頁面會同時涉及購物車、訂單、付款、物流、庫存與會員資料。API 設計應支援目前前端畫面，不應脫離既有頁面過度設計，也不應一開始加入過多尚未出現在買家端流程中的大型功能。

後端功能模組的詳細規劃、資料表建議、業務流程與 Spring Boot 專案結構，請參考 `backend-module-planning.md`。
