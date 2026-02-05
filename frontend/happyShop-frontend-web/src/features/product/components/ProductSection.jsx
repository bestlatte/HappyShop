import ProductGrid from "./ProductGrid";
import { mockProducts } from "../data/mockProducts";
import ProductCarousel from "./ProductCarousel.jsx";

export default function ProductSection({ title = "新品上市", tag = "New" }) {
    return (
        <section className="mx-auto max-w-5xl px-6 py-10">
            {/* 標題 */}
            <div className="flex items-end gap-3">
                <h2 className="text-2xl font-black tracking-tight text-gray-900">
                    {title}
                </h2>
                <span className="text-1.5xl font-black text-gray-900">{tag}</span>
            </div>

            {/* 內容 */}
            <div className="mt-8">
                <ProductCarousel products={mockProducts} />
            </div>

            {/* 查看商品按鈕*/}
            <div className="mt-12">
                <button
                    type="button"
                    className="cursor-pointer rounded-xl border border-black-300 px-3 py-3 text-base font-extrabold text-gray-900 hover:bg-gray-50"
                >
                    查看所有商品
                </button>
            </div>
        </section>
    );
}
