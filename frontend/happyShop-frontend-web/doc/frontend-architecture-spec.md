# HappyShop Web 前端架構與開發規格（Team Spec）

> 目的：讓後續所有頁面開發都遵循同一套架構、命名、資料流與 API 封裝規則，降低維護成本與整合風險。

## 1. 架構總覽

### 1.1 技術棧
- React + Vite
- React Router（頁面路由）
- Tailwind utility class（樣式）
- Fetch + 自製 `apiRequest`（HTTP client）

### 1.2 專案分層（Web）
```text
src/
  app/
    App.jsx                 # 路由註冊入口
    api/
      apiClient.jsx         # 全站共用 HTTP 封裝
  layouts/
    RootLayout.jsx          # 全站骨架（Navbar/Footer/Outlet）
  components/
    ui/                     # 可重用無商業邏輯元件
    ...                     # 共用版型元件
  features/
    <featureName>/
      pages/                # 路由頁
      sections/             # 頁內區塊
      components/           # feature 內共用元件
      services/             # 該 feature API 呼叫
      data/                 # mock/static data
```

### 1.3 資料流原則
1. `pages` 負責 URL 與場景組裝。
2. `sections` 負責頁面業務流程（載入、切換、fallback）。
3. `services` 只做 API IO + normalize，不放 UI 邏輯。
4. `components` 只接 props 顯示，盡量保持可重用。

---

## 2. 路由與頁面規格

### 2.1 路由配置規範
- 路由統一在 `src/app/App.jsx` 註冊。
- 所有前台頁面掛在 `RootLayout` 下。
- path 命名使用小寫 + kebab-case（例如 `/product-browser`），避免混用 camelCase (駝峰)。

### 2.2 Query String 規範
- 可篩選列表頁（如商品瀏覽）必須以 URL 儲存狀態（例如 `nav`, `category`, `sort`）。
- 頁面初始化時要做 URL 合法化（invalid value 自動修正為預設值）。
- 任一 UI 操作改變篩選條件時，優先更新 URL，再觸發資料重新載入。

---

## 3. API 封裝規格（必須遵守）

## 3.1 基礎原則
- 禁止在元件內直接 `fetch`。
- 一律透過 `app/api/apiClient.jsx` 的 `apiRequest`。
- 各 feature 只能透過 `features/<name>/services/*Api.js` 對外提供資料方法。

### 3.2 apiClient 契約
- `apiRequest(path, options)`：
  - `method`：預設 GET，自動轉大寫。
  - `query`：物件轉 query string，忽略 `undefined/null/""`。
  - `body`：非 FormData 自動 JSON.stringify 並加 `Content-Type`。
  - `token`：存在時自動加 `Authorization: Bearer <token>`。
  - 錯誤時丟出包含 `status` 與 `payload` 的 Error。

### 3.3 環境變數規範 (還沒研究好)
- API base URL 統一使用 `import.meta.env.VITE_API_BASE_URL`。
- 未設定時 fallback `/api`。
- `.env` 建議：
```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3.4 Service 規範
每個 service 檔案都要有：
1. `normalizeXxx(raw)`：把後端欄位整理成前端標準格式。
2. `fetchXxx(params)`：呼叫 `apiRequest` 並回傳 normalized data。
3. 不可在 service 回傳 React 元件所需之外的混亂欄位。

範例（概念）：
```js
export async function fetchProducts({ nav, category, signal }) {
  const payload = await apiRequest('/product', { method: 'GET', query: { nav, category }, signal });
  const items = Array.isArray(payload) ? payload : (payload.items ?? []);
  return items.map(normalizeProduct);
}
```

---

## 4. 資料層設計規範

### 4.1 Domain Model（前端標準）
以商品為例，前端統一欄位：
```ts
Product {
  id: string
  title: string
  imageKey: string
  price?: number
  salePrice?: number
  promoTop?: string
  promoTag?: string
  badge?: string
  category?: string
}
```

### 4.2 DTO vs ViewModel (還沒研究)
- **DTO（後端回傳）**：不可直接在 UI 使用。
- **ViewModel（前端標準）**：只允許 UI 使用 normalize 後資料。
- 若後端欄位改名，只改 normalize，不動 UI 元件。

### 4.3 Mock/Fallback 策略
- `features/*/data/` 放 mock data。
- API 失敗時可 fallback mock（限開發期/特定頁），並輸出可追蹤 warning。
- 上線前需在 README 或環境旗標標記哪些頁面仍用 fallback。

#### 4.3.1 在本專案的落地方式
1. **每個 feature 只在 section 層決定是否 fallback**
  - 例如 `features/productBrowser/sections/ProductBrowserSection.jsx`。
  - `services/*Api.js` 保持純 API + normalize，不要在 service 內塞 mock 判斷。
2. **加上環境旗標控制 fallback 是否允許** (還在研究，先遵守)
  - 建議使用：`VITE_ENABLE_API_MOCK_FALLBACK=true|false`。
  - 預設規則：開發環境可開；正式環境應關閉。
3. **warning 要可追蹤**
  - 統一格式：`[feature] api failed, fallback to mock`。
  - 需附上頁面條件（如 `nav`、`category`）與 error。
4. **README 維護 fallback 清單**
  - 至少記錄：頁面、啟用條件、移除時機、負責人。

#### 4.3.2 參考實作片段（ProductBrowser）
```js
const allowMockFallback = import.meta.env.DEV || import.meta.env.VITE_ENABLE_API_MOCK_FALLBACK === 'true';

try {
  const remoteProducts = await fetchProductsCategory({ nav: currentNav, category: currentCategory, signal: controller.signal });
  setProducts(remoteProducts.filter((p) => p.category === currentCategory));
} catch (error) {
  if (controller.signal.aborted) return;

  if (!allowMockFallback) {
    throw error; // 或改成 setError(error)
  }

  console.warn('[productBrowser] api failed, fallback to mock', {
    nav: currentNav,
    category: currentCategory,
    error,
  });
  setProducts(localFallbackProducts);
}
```

#### 4.3.3 上線前檢查（Release Gate）
- `VITE_ENABLE_API_MOCK_FALLBACK` 在 production 應為 `false`。
- README 的 fallback 清單不可為「未知狀態」。
- 若頁面仍依賴假資料，PR 必須寫清楚移除日期與阻塞原因。

---

## 5. 狀態管理規格

### 5.1 狀態分層
- URL state：可分享/可重整保留（篩選、分頁、排序）。
- Page state：頁面資料、loading/error（`useState/useEffect`）。
- Global state：登入態、購物車數量（後續建議導入 store，如 Zustand/Redux）。

### 5.2 非同步請求
- 一律使用 `AbortController` 避免 race condition。
- 依賴變更就中止前一個請求。
- catch 時先判斷 `signal.aborted`。

---

## 6. UI 元件規範

### 6.1 元件職責
- `components/ui`：純展示、最大重用。
- `features/*/components`：只服務該 feature。
- 避免「超大元件」，超過 ~200 行建議拆分。

### 6.2 Props 設計
- props 命名語意化（`activeKey`, `onSelect`, `items`）。
- callback 一律 `onXxx` 命名。
- 禁止 child 直接改 URL 或做 API，透過父層傳入 handler。

---

## 7. 命名與程式碼風格

- 檔名：React component 使用 PascalCase；一般模組/工具用 camelCase 或 kebab-case。
- 常數：`UPPER_SNAKE_CASE`。
- API 方法：`fetchXxx/createXxx/updateXxx/deleteXxx`。
- 註解：優先解釋「為什麼」，不要重複程式碼本身。
- 移除未使用 import 與 dead code。

---

## 8. 錯誤處理與可觀測性

- service 層 throw 統一 Error（含 status/payload）。
- section/page 層決定 UI fallback：
  - 可恢復錯誤：提示 + 重試。
  - 不可恢復錯誤：導回安全頁或顯示空狀態。
- console 訊息格式建議：`[feature] action failed`。

---

## 9. 團隊協作流程（PR 規範）

每張 PR 至少包含：
1. 變更範圍（路由、元件、API、資料模型）。
2. API 契約（endpoint、request、response、錯誤碼）。
3. 自測清單（URL 情境、空資料、API fail、RWD）。
4. 若有 fallback/mock，需明確註記何時移除。

---

## 10. 下一步落地建議（建議優先順序）

1. **統一路由路徑命名**：`/productBrowser` 改成 `/product-browser`。
2. **拆分 service 重複邏輯**：避免 `productApi` 與 `categoryApi` 重複。
3. **補齊 auth/session 層**：將 `user` 由 layout 暫時常數改為全域狀態來源。
4. **建立錯誤與 loading 共用元件**：避免每頁重複寫。
5. **新增 `.env.example`**：讓新成員可快速啟動。

---

## 11. 新頁面開發 Checklist（可直接複製到 Issue）

- [ ] 新頁面已在 `App.jsx` 註冊並掛在正確 layout。
- [ ] 篩選狀態可由 URL 還原。
- [ ] API 呼叫透過 `apiRequest`，無元件內直呼 fetch。
- [ ] service 有 normalize，UI 不直接吃 DTO。
- [ ] 處理 loading / error / empty 三種狀態。
- [ ] 主要互動有基本可用性（鍵盤、aria-label）。
- [ ] 已完成最少一次 lint 與 build 檢查。

