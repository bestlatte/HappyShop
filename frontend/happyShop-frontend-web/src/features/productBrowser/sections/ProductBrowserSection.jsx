import { useState, useEffect, useMemo } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import { mockProducts } from "../../product/data/mockProducts.js";
import CategorySidebar from "../components/CategorySidebar.jsx";
import { useSearchParams  } from "react-router-dom";
import { fetchProductsCategory } from "../services/categoryApi.js";



function SortBar() {
    return (
        <div className="mb-6 flex items-center justify-end gap-3">
            <button className="cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900">
                新至舊 <span className="ml-1">▾</span>
            </button>
            <button className="cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-500">
                金額範圍
            </button>
            <button className="cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900">
                商品標籤 <span className="ml-1">▾</span>
            </button>
        </div>
    );
}

export default function ProductBrowserSection({title , items  }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentNav = searchParams.get("nav") ?? "all";
    const currentCategory = searchParams.get("category") ?? items[0]?.key ;
    const [products, setProducts] = useState([]);

    const localFallbackProducts = useMemo(
        () => mockProducts.filter((p) => p.category === currentCategory),
        [currentCategory],
    );

    const handleSelect = (k) => {
        const sp = new URLSearchParams(searchParams);
        sp.set("nav", currentNav);
        sp.set("category", k);
        setSearchParams(sp, { replace: true });
    };

    useEffect(() => {
        if (!currentCategory) {
            setProducts([]);
            return;
        }

        const controller = new AbortController();

        async function loadProducts() {
            try {
                const remoteProducts = await fetchProductsCategory({
                    nav: currentNav,
                    category: currentCategory,
                    signal: controller.signal,
                });
                const normalizedProducts = remoteProducts.filter(
                    (product) => product.category === currentCategory,
                );
                setProducts(normalizedProducts);
            } catch (error) {
                if (controller.signal.aborted) return;
                console.warn("Load products from backend failed, use mock data.", error);
                setProducts(localFallbackProducts);
            }
        }

        loadProducts();
        return () => controller.abort();
    }, [currentCategory, currentNav, localFallbackProducts]);


    return (
        <section className="w-full border-b border-black/10">
            <div className="mx-auto max-w-[2080px]">
                {/* ① SortBar：緊貼在 Navbar 下方，整個區塊 sticky */}
                <div className="sticky top-16 z-30 bg-white">
                    <div className="pt-6 flex justify-end">
                        <SortBar />
                    </div>
                </div>

                {/*  下面才是有 padding 的主內容 */}
                {/*px-10 左右留下間距10 b意思是下*/}
                <div className=" px-10 pb-20" >
                    <div className="grid  grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-14">
                        {/* 左：Sidebar */}
                        <div className="hidden md:block sticky top-[200px] left-[50px] h-fit">
                            <CategorySidebar title={title}   items={items} activeKey={currentCategory} onSelect={handleSelect} />
                        </div>

                        {/* 右：商品列表 */}
                        <div className="min-w-0">
                            <div className="flex flex-col gap-5">
                                <ProductGrid products={products} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
