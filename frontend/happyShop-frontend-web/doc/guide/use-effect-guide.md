# useEffect 教學

這份文件用 HappyShop 目前的程式碼說明 React `useEffect` 的用途、執行時機、dependency array，以及 cleanup。

核心觀念：

> `useEffect` 是在畫面 render 並提交到 DOM 之後，才執行的副作用。

副作用包含：

```text
讀寫 localStorage
打 API
設定 timer
註冊事件監聽
操作 focus
同步 URL
```

---

## 1. useEffect 不是 render 本身

React component 執行時，大致流程是：

```text
1. React 呼叫 component function
2. component return JSX
3. React 根據 JSX 更新畫面 DOM
4. 畫面提交完成後，React 執行 useEffect
```

所以不是：

```text
return JSX
-> 立刻 useEffect
```

而是：

```text
return JSX
-> React 繼續處理 children
-> DOM 更新完成
-> useEffect 執行
```

可以把 JSX 想成「畫面藍圖」：

```text
return JSX = 交出畫面藍圖
DOM commit 完成 = React 真的把藍圖反映到畫面
useEffect = 畫面完成後再做額外事情
```

---

## 2. 基本語法

```js
useEffect(() => {
  // effect body
}, [dependencies]);
```

可以分成兩部分：

```text
第一個參數：要執行的副作用函式
第二個參數：dependency array，決定什麼時候重新執行
```

---

## 3. dependency array 是什麼？

### 3.1 沒有 dependency array

```js
useEffect(() => {
  console.log("每次 render 後都執行");
});
```

意思：

```text
每一次 render 完後都執行
```

通常比較少這樣寫，因為容易造成不必要的執行。

### 3.2 空陣列 []

```js
useEffect(() => {
  console.log("只在第一次 mount 後執行");
}, []);
```

意思：

```text
component 第一次出現在畫面後執行一次
之後不因為 state/props 改變而重新執行
```

常用在：

```text
初次載入資料
註冊全域事件
初始化第三方套件
```

### 3.3 有指定 dependencies

```js
useEffect(() => {
  console.log("cartItems 改變後執行");
}, [cartItems]);
```

意思：

```text
第一次 render 完會執行
之後只要 cartItems 改變，就重新執行
```

---

## 4. 專案例子一：CartProvider 同步 localStorage

位置：

```text
src/app/contexts/CartContext.jsx
```

目前程式：

```js
useEffect(() => {
  localStorage.setItem("happyShopCart", JSON.stringify(cartItems));
}, [cartItems]);
```

用途：

```text
當 cartItems 改變後，把購物車同步寫入 localStorage
```

流程：

```text
使用者點加入購物車
-> addToCart(cartItem)
-> setCartItems(...)
-> cartItems 更新
-> CartProvider 重新 render
-> DOM 更新完成
-> useEffect 執行
-> localStorage["happyShopCart"] 被更新
```

這裡的 `[cartItems]` 表示：

```text
只要 cartItems 有變，就重新執行這個 effect
```

注意：

```text
localStorage 寫入不是在 setCartItems 當下直接發生
而是在 cartItems 更新、畫面 render 完後由 useEffect 執行
```

---

## 5. 專案例子二：ProductBrowserSection 分類改變後抓商品

位置：

```text
src/features/productBrowser/sections/ProductBrowserSection.jsx
```

目前程式概念：

```js
useEffect(() => {
  const controller = new AbortController();

  if (!currentCategory) {
    return;
  }

  async function loadProducts() {
    const remoteProducts = await fetchProductsCategory({
      nav: currentNav,
      category: currentCategory,
      signal: controller.signal,
    });

    setProducts(remoteProducts);
  }

  loadProducts();

  return () => controller.abort();
}, [allowMockFallback, currentCategory, currentNav, localFallbackProducts]);
```

用途：

```text
根據目前 URL 解析出來的 currentNav/currentCategory 抓商品列表
```

流程：

```text
使用者點分類
-> setSearchParams 改 URL
-> ProductBrowserPage 重新 render
-> currentCategory 改變
-> ProductBrowserSection 收到新的 currentCategory
-> render 完成
-> useEffect 重新執行
-> fetchProductsCategory(nav, category)
-> setProducts()
-> ProductGrid 顯示新的商品
```

這裡的 dependency array 裡有：

```js
currentCategory
currentNav
```

所以分類或 nav 改變時，就會重新抓資料。

---

## 6. cleanup 是什麼？

`useEffect` 可以 return 一個 cleanup function：

```js
useEffect(() => {
  // setup

  return () => {
    // cleanup
  };
}, [deps]);
```

cleanup 會在這些時機執行：

```text
component 從畫面消失前
下一次 effect 重新執行前
```

---

## 7. 專案例子三：AbortController 取消舊 API

在 `ProductBrowserSection` 裡：

```js
const controller = new AbortController();
```

API 呼叫時帶入：

```js
signal: controller.signal
```

最後 cleanup：

```js
return () => controller.abort();
```

用途：

```text
避免使用者快速切分類時，舊 API 比新 API 晚回來，導致畫面被舊資料覆蓋
```

例子：

```text
使用者點 A 分類 -> 發出 API A
使用者馬上點 B 分類 -> 發出 API B
React 在 B 的 effect 執行前，先 cleanup A
controller.abort() 取消 API A
API A 不應該再更新畫面
```

這是避免 race condition 的常見做法。

---

## 8. 專案例子四：RequireAuth 延遲導頁

位置：

```text
src/app/routes/RequireAuth.jsx
```

目前概念：

```js
useEffect(() => {
  if (isAuthenticated) return undefined;

  const timerId = window.setTimeout(() => {
    navigate("/login", {
      replace: true,
      state: { from: location },
    });
  }, REDIRECT_DELAY_MS);

  return () => window.clearTimeout(timerId);
}, [isAuthenticated, location, navigate]);
```

用途：

```text
未登入進 checkout 時，先顯示提醒動畫
延遲一小段時間後再導到 login
```

為什麼要 cleanup？

```text
如果使用者在 timer 結束前離開頁面
或登入狀態突然改變
就清掉舊 timer，避免不該發生的導頁
```

---

## 9. 專案例子五：Navbar 註冊事件監聽

位置：

```text
src/components/navbar/useNavbar.js
```

目前概念：

```js
useEffect(() => {
  function onDocClick(e) {
    if (accountRef.current && !accountRef.current.contains(e.target)) {
      setAccountOpen(false);
    }
  }

  function onEsc(e) {
    if (e.key === "Escape") {
      setAccountOpen(false);
      setSearchOpen(false);
    }
  }

  document.addEventListener("mousedown", onDocClick);
  document.addEventListener("keydown", onEsc);

  return () => {
    document.removeEventListener("mousedown", onDocClick);
    document.removeEventListener("keydown", onEsc);
  };
}, []);
```

用途：

```text
點外部關閉帳號選單
按 Esc 關閉帳號選單與搜尋
```

這裡使用 `[]`，代表事件監聽只註冊一次。

cleanup 很重要，因為 component 消失時要移除事件監聽，避免 memory leak 或重複監聽。

---

## 10. 專案例子六：搜尋框打開後 focus

位置：

```text
src/components/navbar/useNavbar.js
```

目前概念：

```js
useEffect(() => {
  if (!searchOpen) return;

  requestAnimationFrame(() => {
    desktopSearchRef.current?.focus();
    mobileSearchRef.current?.focus();
  });
}, [searchOpen]);
```

用途：

```text
當搜尋框打開後，自動 focus input
```

為什麼放在 `useEffect`？

```text
因為 input 要等畫面 render 出來後，ref.current 才會指到實際 DOM
```

---

## 11. 常見誤解

### 誤解一：跑到 JSX 標籤就算 render 完成

不精準。

例如：

```jsx
<CartProvider>
  <BrowserRouter />
</CartProvider>
```

React 看到 `<CartProvider>` 時，還只是準備呼叫 `CartProvider()`。

真正流程是：

```text
React 呼叫 CartProvider()
-> CartProvider return JSX
-> React 繼續處理 children
-> DOM 更新完成
-> useEffect 執行
```

### 誤解二：useEffect 會在 return JSX 後立刻執行

不精準。

更正確是：

```text
return JSX
-> React 根據 JSX 更新 DOM
-> DOM commit 完成
-> useEffect 執行
```

### 誤解三：dependency array 可以隨便少放

不建議。

effect 裡用到的外部變數，通常應該放進 dependency array。

例如 effect 用到了：

```js
currentNav
currentCategory
```

dependency array 就應該包含它們：

```js
[currentNav, currentCategory]
```

否則可能出現 stale value，也就是 effect 拿到舊資料。

---

## 12. useEffect 適合做什麼？

適合：

```text
打 API
讀寫 localStorage
設定或清除 timer
註冊或移除事件監聽
DOM focus
根據 URL 或 props 同步外部資料
```

不適合：

```text
單純計算畫面要顯示什麼
可以直接在 render 階段算出的資料
事件 handler 裡可以直接做的事
```

例如 `cartTotal` 是由 `cartItems` 算出來的衍生資料，用 `useMemo` 比 `useEffect + useState` 更適合：

```js
const cartTotal = useMemo(
  () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  [cartItems],
);
```

---

## 13. 快速判斷表

| 情境 | 要不要用 useEffect？ | 原因 |
| --- | --- | --- |
| 使用者點按鈕後加入購物車 | 不一定 | 可以直接在 click handler 呼叫 `addToCart()` |
| cartItems 改變後寫入 localStorage | 要 | 這是同步外部儲存 |
| currentCategory 改變後打 API | 要 | 這是根據狀態抓外部資料 |
| 計算 cartTotal | 不一定 | 可用 `useMemo` 從 cartItems 算出 |
| 註冊 document click 事件 | 要 | 這是外部事件監聽 |
| input 出現後 focus | 要 | 要等 DOM 出現後才能 focus |
| 未登入時延遲導頁 | 要 | 需要 timer 與 cleanup |

---

## 14. 一句話總結

`useEffect` 是 React 在畫面更新完成後，用來處理「畫面以外的事情」。

在 HappyShop 裡，你可以這樣記：

```text
CartContext：cartItems 改變後，用 useEffect 同步 localStorage
ProductBrowserSection：分類改變後，用 useEffect 抓商品
RequireAuth：未登入時，用 useEffect 設 timer 導頁
useNavbar：用 useEffect 註冊事件與 focus input
```

所以：

```text
render 負責畫面
useEffect 負責畫面完成後的副作用
```
