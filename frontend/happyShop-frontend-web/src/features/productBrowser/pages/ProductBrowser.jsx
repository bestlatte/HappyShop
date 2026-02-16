import { useSearchParams } from "react-router-dom";
import ProductBrowserSection from "../sections/ProductBrowserSection.jsx";
import { defaultDatas } from "../data/defaultDatas.js";

export default function ProductBrowser() {
    const [searchParams] = useSearchParams();

    const currentNav = searchParams.get("nav") ?? "all";
    const items = defaultDatas[currentNav] ?? [];

    const titleMap = { topic: "主題", all: "分類", charity: "公益關懷" };
    const title = titleMap[currentNav] ?? "分類";



    return <ProductBrowserSection title={title} items={items} />;
}
