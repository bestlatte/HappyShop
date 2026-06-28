# HappyShop 前端開發導引（Quick Onboarding Guide）

> 這份文件是新成員快速上手導引。  
> 前端規則、契約、準則以 `frontend-architecture-spec.md` 為唯一準據。

## 1. 先讀哪份文件

1. 主規範（必讀）：[`frontend-architecture-spec.md`](./frontend-architecture-spec.md)
2. API 需求盤點：[`frontend-api-planning.md`](./frontend-api-planning.md)
3. 本文件：快速了解「怎麼開始、怎麼避免常見錯誤」

## 2. 開工前 5 分鐘 Checklist

- [ ] 新功能是否放在正確 feature 目錄（`features/<featureName>/...`）
- [ ] 路由是否在 `src/app/App.jsx` 註冊
- [ ] API 是否走 `app/api/apiClient`，沒有在元件內直接 `fetch`
- [ ] service 是否有 normalize（UI 不直接吃 DTO）
- [ ] 是否處理 loading / error / empty

## 3. 你每天最常用的規則（快速版）

- 結構分層：`pages -> sections -> components -> services`
- URL state 優先：篩選、排序、分頁優先放 query string
- 非同步請求：使用 `AbortController`，避免 race condition
- 錯誤處理：先判斷 aborted，再處理一般錯誤
- 命名一致：元件 `PascalCase`，函式與變數 `camelCase`

詳細規範請看主文件：
- 架構與分層：`frontend-architecture-spec.md` 第 1 章
- 路由與 URL：`frontend-architecture-spec.md` 第 2 章
- API 與 service：`frontend-architecture-spec.md` 第 3、4 章
- 狀態管理：`frontend-architecture-spec.md` 第 5 章
- 命名與風格：`frontend-architecture-spec.md` 第 7 章

## 4. 常見踩雷（請先避開）

- 在 component 直接打 API。
- 在 UI 直接使用後端 DTO（沒有 normalize）。
- `useEffect` 沒有中止舊請求，切換條件後產生髒資料。
- 前端用舊路徑命名，未對齊目前 API 契約。
- 開發期依賴 mock，但沒有記錄移除條件與時程。

## 5. 建議開發流程（實務）

1. 先確認頁面路由與狀態來源（URL state / local state）。
2. 先寫 service 與 normalize，再接 section。
3. 最後接 component 呈現與互動細節。
4. 補上錯誤與 loading 狀態。
5. 自測至少含：正常、空資料、API fail 三種情境。

## 6. PR 最低交付標準

- 變更範圍（路由、元件、API、資料模型）
- API 契約差異（若有）
- 自測清單（happy path + error path）
- 若有 fallback/mock，註記移除條件

## 7. 文件維護規則

- 本文件只做導引，不新增規則。
- 若需改規則，請先更新 `frontend-architecture-spec.md`。
- 本文件可同步更新摘要與連結，但不可與主規範衝突。
