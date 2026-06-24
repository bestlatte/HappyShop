# HappyShop Web 前端架構與開發規格（Source of Truth）

> 本文件為前端規範唯一真相來源（single source of truth）。  
> `DEVELOPMENT_GUIDE.md` 僅作為導引摘要，若有衝突以本文件為準。

## 0. 文件治理

- `MUST`：必須遵守，若偏離需在 PR 說明原因與替代方案。
- `SHOULD`：建議遵守，可依需求調整，但要維持一致性。
- 規則更新流程：先改本文件，再同步導引文件。

---

## 1. 當前技術基線

### 1.1 技術棧

- React + Vite
- React Router
- Tailwind CSS
- Fetch + 自製 `apiRequest`

### 1.2 專案分層（現況）

```text
src/
  app/
    App.jsx
    api/
      apiClient.js              # MUST: 全站唯一 HTTP client
    contexts/
      AuthContext.jsx
      CartContext.jsx
  layouts/
    RootLayout.jsx
  components/
    ui/
      LoadingState.jsx
      ErrorState.jsx
      Price.jsx
  features/
    <feature>/
      pages/
      sections/
      components/
      services/
      hooks/
      data/
      utils/
```

### 1.3 分層職責（MUST）

1. `pages`：路由入口與場景組裝。
2. `sections`：頁面業務流程（載入/錯誤/fallback）。
3. `services`：API I/O + normalize，不放 UI 邏輯。
4. `components`：以展示為主，不直接打 API。

---

## 2. 路由規範

### 2.1 命名規則

- `MUST` 使用小寫 kebab-case。
- 例：`/product-browser`、`/forget-password`。

### 2.2 既有相容策略

- 目前保留 `/productBrowser` -> `/product-browser` 的轉址，避免舊連結失效。
- `SHOULD`：新功能不得新增 camelCase 路徑。

### 2.3 Query String（商品瀏覽）

- `MUST` 將可分享狀態放在 URL（例如 `nav`, `category`）。
- 頁面初始化時需做 URL 合法化（當類別無效時自動修正）。

---

## 3. API 與資料層規範

### 3.1 API Client（MUST）

- 一律透過 `src/app/api/apiClient.js` 的 `apiRequest` 呼叫。
- 禁止在 components 內直接 `fetch`。
- `apiRequest` 支援：
  - `query` 自動過濾空值
  - `body` 非 FormData 時自動 JSON 化
  - `withAuth` 自動帶 `Authorization: Bearer <token>`
  - 失敗丟出含 `status`/`payload` 的 Error

### 3.2 Endpoint 命名現況與治理

- 目前 API 命名已完成第一波收斂（例如 `/products/:id`、`/auth/login`、`/members`、`/orders`）。
- `SHOULD`：逐步收斂到 REST 命名（複數資源）。
- `MUST`：Service 層 absorb 命名差異，UI 不直接依賴 endpoint 細節。

### 3.3 Service 去重策略（已落地）

- 商品清單共用邏輯已集中到：
  - `features/product/services/productCatalogApi.js`
- `productApi.js` 與 `categoryApi.js` 僅保留薄封裝差異。
- `MUST`：後續若調整商品卡片欄位，優先改 `normalizeProductCard()` 單點。

### 3.4 DTO -> ViewModel（MUST）

- UI 只吃 normalize 後資料。 U
- UI 只吃 normalize 後資料。
- 後端欄位異動應只修改 service normalize，不直接改各頁 UI。

---

## 4. Auth / Session 規範（已落地）

### 4.1 全域來源

- 登入態以 `AuthContext` 為全域單一來源。
- `RootLayout`、`Navbar` 透過 `useAuth()` 讀取 `user` 與 `logout`。

### 4.2 Session 儲存

- 使用 `features/auth/utils/authStorage.js` 統一管理：
  - `happyShopAccessToken`
  - `happyShopUser`
- `MUST`：不要在其他檔案自行拼接 localStorage key。

### 4.3 開發環境 mock auth

- `AuthContext` 支援 dev mock session，便於無後端時測試頭像與會員選單。
- 受 `.env` 變數控制（見第 7 章）。

---

## 5. 非同步請求 / Fallback / UI 狀態

### 5.1 非同步請求（MUST）

- 使用 `AbortController` 避免 race condition。
- `catch` 先判斷 `signal.aborted`。

### 5.2 Mock fallback（現況）

- 目前多數 section 使用規則：
  - `import.meta.env.DEV && VITE_ENABLE_API_MOCK_FALLBACK === "true"`
- `MUST`：fallback 決策放在 section/page，不放 service。

### 5.3 共用狀態元件（已落地）

- `components/ui/LoadingState.jsx`
- `components/ui/ErrorState.jsx`
- `SHOULD`：新頁面優先使用共用元件，不重寫一套。

---

## 6. 命名與程式風格

- 檔名：React component 使用 PascalCase。
- 變數與函式：camelCase。
- 常數：UPPER_SNAKE_CASE。
- API 函式命名建議：`fetch/create/update/delete` 前綴。
- 註解優先解釋「為什麼」，避免重述程式碼本身。

---

## 7. 環境變數規範

### 7.1 必備變數

```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_API_MOCK_FALLBACK=true
VITE_ENABLE_DEV_MOCK_AUTH=false
VITE_DEV_MOCK_USER_NAME=Demo User
VITE_DEV_MOCK_USER_EMAIL=demo@happyshop.dev
```

### 7.2 使用原則

- `VITE_API_BASE_URL`：API base URL（未設定 fallback `/api`）。
- `VITE_ENABLE_API_MOCK_FALLBACK`：控制 section fallback。
- `VITE_ENABLE_DEV_MOCK_AUTH`：僅開發環境提供假登入狀態。

---

## 8. 目前已知技術債（需持續收斂）

1. 後端尚未正式落地，前端 endpoint 命名仍需在後端實作時做最終契約確認。
2. 部分頁面仍使用 `alert` 作錯誤回饋（建議收斂為一致 toast/error UI）。

---

## 9. PR 檢查清單（MUST）

- [ ] 路由是否遵守 kebab-case。
- [ ] API 是否只透過 `apiClient.js`。
- [ ] service 是否有 normalize，UI 不直接吃 DTO。
- [ ] 是否處理 loading / error / empty。
- [ ] 是否有 race condition 防護（AbortController）。
- [ ] 若使用 mock fallback，是否明確記錄條件與移除策略。
- [ ] 已完成至少一次 lint 與關鍵路徑手測。