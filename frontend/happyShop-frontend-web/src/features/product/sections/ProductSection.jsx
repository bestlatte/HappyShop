import ProductGrid from "../../productBrowser/components/ProductGrid.jsx";
import { mockProducts } from "../data/mockProducts.js";
import ProductCarousel from "../components/ProductCarousel.jsx";
import {useNavigate} from "react-router-dom";

export default function ProductSection({categoryKey, title = "新品上市", tag = "New" }) {
    const navigate = useNavigate();

    const filterProducts =
    mockProducts.filter((p) =>
        p.category === categoryKey
    );

    return (
        <section className="mx-auto max-w-5xl px-6 py-10 " >
            {/* 標題 */}
            <div className="flex items-end gap-3">
                <h2 className="text-2xl font-black tracking-tight text-gray-900">
                    {title}
                </h2>
                <span className="text-1.5xl font-black text-gray-900">{tag}</span>
            </div>

            {/* 內容 */}
            <div className="mt-8">
                <ProductCarousel products={filterProducts} />
            </div>

            {/* 查看商品按鈕*/}
            <div className="mt-12">
                <button
                    type="button"
                    // onClick={()=>navigate(`/productBrowser?category=${categoryKey}`)}
                    onClick={() => navigate(`/productBrowser?category=${categoryKey}`)}
                    className="cursor-pointer rounded-xl border border-black-300 px-3 py-3 text-base font-extrabold text-gray-900 hover:bg-gray-50"
                >
                    查看所有商品

                </button>
            </div>
        </section>
    );
}
