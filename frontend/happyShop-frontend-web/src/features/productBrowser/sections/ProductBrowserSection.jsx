// features/product/sections/ProductBrowserSection.jsx
import { useState } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import { mockProducts } from "../../product/data/mockProducts.js";
import CategorySidebar from "../components/CategorySidebar.jsx";

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

export default function ProductBrowserSection({items , active, setActive }) {

    const filterProducts =
         mockProducts.filter((p)=>p.category === active)


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
                            <CategorySidebar items={items} activeKey={active} onSelect={setActive} />
                        </div>

                        {/* 右：商品列表 */}
                        <div className="min-w-0">
                            <div className="flex flex-col gap-5">
                                <ProductGrid products={filterProducts} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
