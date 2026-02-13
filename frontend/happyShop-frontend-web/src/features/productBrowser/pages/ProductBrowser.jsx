import { useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import ProductBrowserSection from "../sections/ProductBrowserSection.jsx";




{/*
從首頁點連結到
/productBrowser?category=tense\

React Router 看 path 是 /productBrowser 則就會渲染到瀏覽頁面

ProductBrowser 裡 useEffect 執行
→ 讀到 category=tense
→ setActive("tense")

active 變成 "tense"
→ ProductBrowserSection 重新 render
→ filter 得到 tense 的商品
→ 顯示 tense 全部商品  */ }

export default function ProductBrowser() {
    const { active, setActive } = useOutletContext();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const category = searchParams.get("category"); // "new" / "tense" ...
        if (category) setActive(category);
    }, [searchParams, setActive]);

    return <ProductBrowserSection active={active} setActive={setActive} />;
}
