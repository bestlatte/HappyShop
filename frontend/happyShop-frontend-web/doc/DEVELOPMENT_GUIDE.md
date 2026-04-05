# HappyShop 前端開發規範書 (Frontend Development Specification)

## 1. 專案架構 (Project Architecture)

本專案採用 **Feature-based (功能導向)** 的目錄結構。所有的業務邏輯應盡量封裝在 `src/features` 下的對應功能資料夾中，避免全域汙染。

### 目錄結構範例

```
src/
├── app/
│   └── api/               # 全域 API 設定 (apiClient)
├── layouts/               # 全域佈局 (RootLayout, AuthLayout)
├── features/
│   └── productBrowser/    # [Feature Name]
│       ├── pages/         # 路由頁面 (Page Level)
│       ├── sections/      # 頁面區塊 (Section Level, 組合多個 Components)
│       ├── components/    # 功能專屬元件 (UI Level)
│       ├── hooks/         # 邏輯封裝 (Custom Hooks)
│       ├── services/      # API 請求與資料正規化
│       ├── data/          # Mock Data 或靜態設定檔
│       └── utils/         # 該功能專用的工具函式
└── ...
```

---

## 2. 分層職責說明 (Layer Responsibilities)

為了確保代碼的可維護性與一致性，請嚴格遵守以下分層職責：

| 層級 (Layer) | 主要職責 | 關鍵字 | 範例                               |
| :--- | :--- | :--- |:---------------------------------|
| **Pages** (`pages/`) | **路由入口**、讀取 URL 參數、SEO 設定 | `Route`, `useParams`, `Meta` | `ProductBrowserPage.jsx`         |
| **Sections** (`sections/`) | **業務邏輯核心**、數據獲取、狀態管理、組合 Components | `useEffect`, `useState`, `API Call` | `ProductBrowserSection.jsx`      |
| **Components** (`components/`) | **純 UI 展示**、樣式、互動 (不含複雜邏輯) | `Props`, `CSS`, `Presentational` | `ProductCard.jsx`, `Sidebar.jsx` |
| **Hooks** (`hooks/`) | **邏輯抽離**、復用、關注點分離 | `use...` | `useMobileCategoryDrawer.js`     |
| **Services** (`services/`) | **API 請求**、數據正規化 (Normalization) | `fetch`, `axios`, `normalize` | `categoryApi.js`                 |
| **Utils** (`utils/`) | **純函數工具** (無副作用) | `format`, `validate` | `formatCurrency.js`              |

---

## 3. 命名規範 (Naming Conventions)

| 類型 | 規範 | 範例 | 備註 |
| :--- | :--- | :--- | :--- |
| **資料夾** | camelCase | `productBrowser`, `userProfile` | |
| **React 組件檔案** | PascalCase | `ProductGrid.jsx`, `SortBar.jsx` | 副檔名使用 `.jsx` |
| **Hook 檔案** | camelCase (use開頭) | `useMobileCategoryDrawer.js` | 副檔名使用 `.js` |
| **一般 JS 檔案** | camelCase | `categoryApi.js`, `formatDate.js` | 副檔名使用 `.js` |
| **組件名稱** | PascalCase | `function ProductBrowser() {}` | |
| **變數/函式** | camelCase | `fetchProducts`, `handleSelect` | |
| **常數** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` | 僅限全域或靜態常數 |

---

## 4. 資料層與 API (Data Layer & API)

所有的 API 請求必須封裝在 `features/{feature}/services/` 目錄下，**禁止在 Component 內直接呼叫 `fetch` 或 `axios`**。

### 4.1 API 定義規範
1.  使用 `src/app/api/apiClient` 進行請求。
2.  函式需支援 `AbortSignal` 以處理競態條件 (Race Condition)。
3.  **資料正規化 (Normalization)**：API 回傳的資料必須在 Service 層轉換為前端易用的格式，Component 只接收乾淨的資料。

**範例 (`features/productBrowser/services/categoryApi.js`):**

```javascript
import { apiRequest } from "../../../app/api/apiClient.jsx";

// 正規化函式：確保欄位存在，處理預設值
function normalizeProduct(raw = {}) {
    return {
        id: raw.id,
        title: raw.title,
        image: raw.imageKey ?? raw.imageUrl ?? "", // 處理欄位不一致
        price: raw.price,
        category: raw.category,
    };
}

export async function fetchProductsCategory({ nav, category, signal } = {}) {
    const payload = await apiRequest("/product", {
        method: "get",
        query: { nav, category },
        signal, // 必須透傳 signal
    });

    const items = Array.isArray(payload) ? payload : (payload.items ?? []);
    return items.map(normalizeProduct);
}
```

---

## 5. 組件開發模式 (Component Patterns)

### 5.1 邏輯與 UI 分離 (Logic/UI Separation)
當組件邏輯（路由跳轉、副作用、資料計算）過於複雜時，應抽離為 **Custom Hook**。

*   **Component**: 只負責接收 props 並渲染 UI。
*   **Hook**: 負責處理 `useEffect`, `useNavigate`, `useSearchParams` 等邏輯。

**範例:**
*   UI: `MobileCategoryDrawer.jsx`
*   Logic: `hooks/useMobileCategoryDrawer.js`

### 5.2 URL 作為單一真理來源 (URL as Source of Truth)
對於列表、篩選、搜尋等功能，**狀態應優先同步到 URL Search Params**，而非僅存在於 `useState`。
*   點擊篩選 -> 更新 URL。
*   URL 變更 -> 觸發 `useEffect` 重新抓取資料 -> 更新 UI。

---

## 6. 資料獲取標準寫法 (Data Fetching Standard)

在 `useEffect` 中獲取資料時，必須遵守以下 **防禦性程式設計** 規範：

1.  **Race Condition 處理**：必須使用 `AbortController`。
2.  **錯誤處理**：區分 `AbortError` 與真實錯誤。
3.  **Mock Fallback**：支援開發環境的 Mock 資料切換。
4.  **依賴管理**：`useEffect` 的依賴陣列必須完整。

**標準樣板 (Template):**

```javascript
useEffect(() => {
    // 1. 邊界檢查：若必要參數不存在，清空資料並返回
    if (!currentCategory) {
        setData([]);
        return;
    }

    // 2. 建立 AbortController
    const controller = new AbortController();

    async function loadData() {
        try {
            // 3. 發送請求，傳入 signal
            const result = await fetchData({ 
                category: currentCategory, 
                signal: controller.signal 
            });
            
            // 4. 再次過濾/確認 (Double check，視後端實作而定)
            if (!controller.signal.aborted) {
                setData(result);
            }
        } catch (error) {
            // 5. 忽略 Abort 錯誤
            if (controller.signal.aborted) return;

            // 6. Mock Fallback 機制
            if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_MOCK_FALLBACK === 'true') {
                console.warn("API failed, using mock data", error);
                setData(mockData);
            } else {
                console.error("API failed", error);
                setData([]);
            }
        }
    }

    loadData();

    // 7. Cleanup function：取消請求
    return () => controller.abort();

}, [currentCategory]); // 依賴項需完整
```

---

## 7. 效能優化 (Performance)

1.  **useMemo**: 對於過濾、排序等昂貴計算，或**作為 useEffect 依賴的物件/陣列**，必須使用 `useMemo` 保持引用穩定。
    ```javascript
    // 正確範例
    const fallbackData = useMemo(() => 
        allData.filter(d => d.type === type), 
    [type]);
    ```

2.  **Lazy Loading**: 對於非首屏可見的重型組件或路由，使用 `React.lazy` 和 `Suspense` (視專案需求而定)。

---

## 8. 樣式規範 (Styling)

*   全面使用 **Tailwind CSS**。
*   避免撰寫行內樣式 (`style={{ ... }}`)，除非屬性是動態計算的（如座標、動態顏色值）。
*   複雜的 class 組合可使用陣列 join 方式增加可讀性：
    ```javascript
    className={[
        "fixed inset-0 z-50",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    ].join(" ")}
    ```

---

## 9. 開發環境設定 (Environment)

*   `.env.development`:
    ```properties
    VITE_ENABLE_API_MOCK_FALLBACK=true
    ```
*   `.env.production`:
    ```properties
    VITE_ENABLE_API_MOCK_FALLBACK=false
    ```
*   開發時若後端尚未完成，請確保 Mock Data 結構與預期 API 回傳結構一致（透過 Service 層的正規化函式來橋接）。

---

### 附錄：Git Commit 規範

推薦使用 Conventional Commits：
*   `feat`: 新增功能
*   `fix`: 修復 bug
*   `refactor`: 重構代碼（不影響功能）
*   `style`: 樣式調整
*   `docs`: 文件修改
*   `chore`: 建置過程或輔助工具的變動


範例：`fix(ProductBrowser): fix race condition in category switching`
