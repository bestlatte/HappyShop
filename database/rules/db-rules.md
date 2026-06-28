---
name: db-rules
description: >
  Define HappyShop database design rules, including naming conventions,
  table status labels, PK and FK principles, order snapshot rules, payment data
  restrictions, mock data limits, optional feature handling, and MySQL DDL rules.
---

# HappyShop DB Rules

## DB 命名規則

使用英文、snake_case、語意清楚。避免縮寫，除非是通用名詞如 sku、url、id。

## Table 命名規則

table 使用複數名詞，例如 users、products、orders、order_items。
關聯表使用兩個實體名稱組合，例如 product_categories。

## Table 狀態標記

每個候選 table 都應標記狀態：

- core：DB v1 核心表，支援目前前端已存在且購物流程必要的功能。
- needs-confirmation：前端已有部分需求，但商業規則、後端責任或資料生命週期尚未確認。
- optional：future 功能或後端草稿規劃，暫不納入 DB v1 核心。
- derived：可由其他資料計算、彙整或快照產生，需說明是否真的需要落表。

## 欄位命名規則

欄位使用 snake_case。時間欄位使用 created_at、updated_at、deleted_at。
金額欄位需明確標示用途，例如 unit_price、subtotal_amount、shipping_fee、discount_amount、total_amount、currency。

每張核心表至少包含 `created_at`、`updated_at`。

若資料需要軟刪除，可加入 `deleted_at`，但不得預設所有表都必須軟刪除，需依資料生命週期判斷。

時間欄位命名統一使用 `created_at`、`updated_at`、`deleted_at`。

## PK / FK 原則

每張核心表需有主鍵 `id`。

純關聯表可使用複合主鍵，例如 `PRIMARY KEY(product_id, category_id)`，不一定強制建立獨立 `id`。

FK 預設使用 `{singular_table}_id`，例如 `user_id`、`product_id`、`order_id`。

若專案已有既定命名規則，應保持一致，不得為了套用規則而破壞既有命名。

訂單明細應同時保存 FK 與交易當下快照，避免商品日後修改影響歷史訂單。

## 帳號密碼與憑證資料規則

1. 密碼不得以明碼保存。
2. 密碼不得使用 MD5、SHA-1、單純 SHA-256、單純 SHA-512 等快速雜湊方式保存。
3. 密碼需使用專門的 password hashing 演算法，例如 bcrypt。
4. 本專案規範：密碼憑證資料不得直接存放在 users table，需獨立存放於 user_credentials table。
5. 使用 bcrypt 時，資料庫應保存 bcrypt 產出的完整 hash 字串。bcrypt hash 內已包含 salt 與 cost 參數，不需另外拆出 salt 欄位。
6. 不得自行設計密碼雜湊流程，後端實作時應使用成熟框架或函式庫，例如 Spring Security 的 BCryptPasswordEncoder。

## Schema 變更原則

若既有資料表已能支援需求，優先考慮擴充欄位或調整既有結構。

避免在未確認資料生命週期、查詢需求或商業規則前，建立重複功能的新資料表。

例如付款失敗、重新付款、付款紀錄等需求，應先評估是否可由 `payment_records` 擴充欄位或狀態支援，不應一開始就建立多張高度重複的 payment log / retry table。

新增資料表前，需說明：

- 為什麼既有表無法支援
- 該資料表的資料生命週期
- 是否屬於 core / needs-confirmation / optional / derived
- 是否會造成與既有資料表功能重疊

## 電商訂單快照規則

orders / order_items 必須保存下單當下資料：

- 商品名稱
- SKU / 規格名稱
- 單價
- 數量
- 收件人姓名、電話、地址
- 配送方式與運費
- 付款方式與付款狀態摘要

不得只依賴 products 或 users 現況資料重建歷史訂單。

## 商品價格保存規則

products 可保存目前售價與原價。
order_items 必須保存下單當下 unit_price、subtotal_amount。
付款紀錄保存實際請款金額，不依即時計算覆蓋歷史。

## 付款資料保存規則

不得保存完整信用卡號、CVC、完整磁軌資料或任何可直接完成付款的敏感資料。

payment_records 僅保存 payment_method、provider、transaction_id、amount、currency、status、paid_at、failed_reason 等必要資訊。

若需要顯示信用卡資訊，只能保存必要的非敏感摘要，例如 `card_brand`、`card_last_four`，且需確認實際金流服務規範。

## Mock Data 使用限制

mock data 只能代表前端目前需要顯示的資料形狀，不等於正式 DB schema。
mock 中的促銷、相關商品、加購、配送方式、tags、breadcrumb categories 若無正式需求，不得直接建為核心表。

## 未定案功能處理規則

若功能只在後端草稿出現，或前端只有部分靜態 UI，標記為 needs-confirmation 或 optional。
需列出確認問題，不直接建表。

## Optional 功能不得直接進入 DB v1 核心設計

評論評分、收藏、多組優惠券試算、RBAC、第三方登入、物流追蹤、退貨、退款、推薦加購等，除非使用者明確確認為 v1，否則不得放入 DB v1 核心表。

## SQL DDL 產出限制

除非使用者明確要求，DB 設計任務只輸出分析、表格、欄位草案與待確認問題，不直接產生 SQL DDL。

## SQL Dialect 規則

若使用者明確要求產生 SQL DDL，預設使用 MySQL 語法。

SQL DDL 需避免使用非 MySQL 相容語法。

若需要使用特定版本功能，例如 MySQL 8 的 `CHECK` constraint、JSON 欄位或 generated column，需在輸出中標記原因與相容性注意事項。
