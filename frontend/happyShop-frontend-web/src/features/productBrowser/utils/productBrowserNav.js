// features/productBrowser/utils/productBrowserNav.js
import { defaultDatas } from "../data/defaultDatas.js"; // 你的路徑依實際調整

export function getDefaultCategoryForNav(nav) {
    return defaultDatas[nav]?.[0]?.key ?? "";
}

// URLSearchParams功用是先複製一份 問號後面的query參數
// 在複製品上增刪改查
// 最後再用 setSearchParams(sp) 更新回網址

export function buildProductBrowserSearchParams(searchParams, patch) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") sp.delete(key);
        else sp.set(key, String(value));
    });

    return sp;
}


/**
 * 導到 /product-browser（若已在該頁則只更新 searchParams）
 */
export function goProductBrowser({
                                     searchParams,
                                     setSearchParams,
                                     navigate,
                                     pathname,
                                     onClose,
                                     nav,
                                     category,
                                     replace = true,
                                 }) {
    onClose?.();

    const sp = buildProductBrowserSearchParams(searchParams, { nav, category });
    const url = `/product-browser?${sp.toString()}`;

    if (pathname !== "/product-browser") {
        navigate(url);
    } else {
        setSearchParams(sp, { replace });
    }
}

export function setProductBrowserParams({ searchParams, setSearchParams, nav, category, replace = true }) {
    const sp = buildProductBrowserSearchParams(searchParams, { nav, category });
    setSearchParams(sp, { replace });
}

