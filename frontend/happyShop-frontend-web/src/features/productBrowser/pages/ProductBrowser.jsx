import { useSearchParams } from "react-router-dom";
import ProductBrowserSection from "../sections/ProductBrowserSection.jsx";
import { defaultDatas } from "../data/defaultDatas.js";
import {useEffect} from "react";
import {setProductBrowserParams} from "../utils/productBrowserNav.js";

export default function ProductBrowser() {
    const [searchParams , setSearchParams] = useSearchParams();


    const currentNav = searchParams.get("nav") ?? "all";
    const items = defaultDatas[currentNav] ?? [];
    const currentCategory = searchParams.get("category") ?? items[0]?.key ;


    const categoryInUrl = searchParams.get("category") ;
    
    //若items沒有值 defaultCategory就會是undefined ，不能硬塞一個預設 category
    const defaultCategory = items[0]?.key ;




    const titleMap = { topic: "主題", all: "分類", charity: "公益關懷" };
    const title = titleMap[currentNav] ?? "分類";






    //如果URL發生錯誤 下面的功能會自行補正URL的錯誤
    useEffect(() => {
        const sp = new URLSearchParams(searchParams);
        if(!defaultCategory){
            if(!categoryInUrl) return ;
            sp.delete("category");
            setSearchParams(sp,{replace:true});
            return ;
        }

        const isValidCategory = items.some((item) => item.key === categoryInUrl);
        if (isValidCategory) return;

        sp.set("nav",currentNav) ;
        sp.set("category",defaultCategory) ;
        setSearchParams(sp,{replace:true});





    }, [categoryInUrl, currentNav, defaultCategory, items, searchParams, setSearchParams]);



    return <ProductBrowserSection title={title} items={items} currentNav={currentNav} currentCategory={currentCategory}
                                   searchParams={searchParams} setSearchParams={setSearchParams} />;
}
