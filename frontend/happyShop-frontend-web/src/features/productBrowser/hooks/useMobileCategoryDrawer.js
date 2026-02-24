import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { defaultDatas } from "../data/defaultDatas.js";
import { getDefaultCategoryForNav, goProductBrowser } from "../utils/productBrowserNav.js";

export function useMobileCategoryDrawer({ open, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const currentNav = searchParams.get("nav") ?? "all";
    const currentCategory = searchParams.get("category");
    const items = defaultDatas[currentNav] ?? [];
    
    const titleMap = { topic: "主題", all: "分類", charity: "公益關懷" };
    const title = titleMap[currentNav];

    // 鎖住 body scroll
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = prev);
    }, [open]);

    // ESC 關閉
    useEffect(() => {
        if (!open) return;
        const onEsc = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [open, onClose]);

    const handleSelectCategory = (k) => {
        goProductBrowser({
            searchParams,
            setSearchParams,
            navigate,
            pathname: location.pathname,
            onClose,
            nav: currentNav,
            category: k,
        });
    };

    const handleSelectNav = (navKey) => {
        const firstKey = getDefaultCategoryForNav(navKey);
        goProductBrowser({
            searchParams,
            setSearchParams,
            navigate,
            pathname: location.pathname,
            onClose,
            nav: navKey,
            category: firstKey,
        });
    };

    return {
        currentNav,
        currentCategory,
        items,
        title,
        handleSelectCategory,
        handleSelectNav,
    };
}
