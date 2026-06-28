# HappyShop DB Design Skill

## Skill 用途
協助 HappyShop 專案進行資料庫設計分析，從前端實際功能與資料需求出發，推導 DB v1 範圍、optional 功能與待確認事項。

## 使用時機
當需要設計或調整 HappyShop DB schema、ERD、資料表草稿、欄位規格、訂單/商品/會員/購物車資料模型時使用。

## 執行前必讀文件
執行 DB 設計任務前，需優先閱讀或重新檢查：

- frontend/happyShop-frontend-web/src/features
- frontend/happyShop-frontend-web/src/app
- frontend/happyShop-frontend-web/src/components
- frontend/happyShop-frontend-web/doc
- docs/full-system-functional-data-requirements.md
- 後端功能架構草稿
- skills/db-design/db-rules.md

## 輸入資料來源
- 前端實際程式碼：features、app、components、doc
- 前端 mock data 與 service API
- 後端功能架構圖 / 文件草稿
- 使用者補充的產品規則或商業規則
- skills/db-design/db-rules.md

## 資料來源優先順序
1. 前端目前已實作畫面、表單、顯示欄位、service payload
2. 前端文件中的架構與資料流規則
3. skills/db-design/db-rules.md
4. 後端功能架構草稿
5. mock data，僅作為顯示需求參考
6. 一般電商慣例，必須標記為推論

## 分析流程
1. 先盤點前端頁面、component、section、service、mock data。
2. 整理每個模組的表單欄位、顯示欄位、API endpoint、可能實體。
3. 再讀後端功能架構草稿，分為 core、needs-confirmation、optional。
4. 產出前後端功能對照表。
5. 只推導 DB v1，不把 future 功能直接放進核心表。
6. 對衝突與不明確處列出問題，不直接定案。
7. 若需要新增資料表，需先檢查是否已有既有表可支援，避免建立功能重複或生命週期不明確的表。

## 前端現況優先原則
前端已有畫面、表單、顯示欄位、service payload 或 routing 支持的資料需求，優先作為 DB v1 設計依據。

後端功能架構草稿只能作為輔助參考。若後端草稿中的功能尚未被前端畫面或資料需求支持，應標記為 optional 或 needs-confirmation，不得直接納入 DB v1 核心設計。

## 後端功能架構草稿的使用限制
後端文件在後端尚未開發前視為待確認草稿，不得直接作為最終 DB 規格。若與前端現況衝突，以前端現況為優先，並標記待確認。

## DB table 狀態標記
- core：前端已有明確畫面、表單、service 或資料需求支持，且屬於目前購物流程必要資料。
- needs-confirmation：前端有部分 UI 或 mock 顯示需求，但後端規則、資料生命週期或商業邏輯尚不明確。
- optional：後端草稿有規劃，但前端目前尚未實作或需求不明確，暫不進 DB v1 核心。
- derived：可由其他資料計算、彙整或快照產生的資料；除非有查詢效能、歷史保存或稽核需求，否則不優先獨立成表。

## DB v1 / optional 功能區分規則
DB v1 僅包含完成目前核心購物流程所需資料：會員、商品、分類、圖片、SKU/規格、購物車、訂單、訂單明細、收件/配送快照、付款紀錄。

評論、收藏、優惠券試算、RBAC、第三方登入、物流追蹤、退貨退款、推薦加購等一律先列 optional，除非使用者明確確認為 v1。

## 禁止事項
- 不得直接把後端草稿功能全部建成 DB v1。
- 不得把 mock data 當成正式 DB 規格。
- 不得為 optional/future 功能直接建立核心資料表。
- 不得自行決定前後端衝突內容；必須標記衝突並提出確認問題。
- 不得在未要求時直接產生 SQL DDL。
- 不得保存完整信用卡號、CVC 等敏感付款資料。
- 不得在未確認資料生命週期與查詢需求前，建立多張功能重複的資料表。

## 輸出格式
- 前端功能模組盤點
- 前端資料需求表
- 後端功能分類 A/B/C
- 前後端功能對照表
- DB v1 建議範圍
- table 狀態標記：core / needs-confirmation / optional / derived
- optional/future 清單
- 待確認問題
- 不直接產生 SQL，除非使用者明確要求

## 發現衝突時的處理方式
保留兩邊資訊來源，標記衝突點、影響範圍與建議決策問題。不得自行把草稿規劃升級為正式需求，也不得直接覆蓋前端現況。
