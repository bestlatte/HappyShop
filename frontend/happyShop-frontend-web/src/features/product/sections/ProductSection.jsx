
import ProductCarousel from "../components/ProductCarousel.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {fetchProductsData} from "../services/productApi.js";
import {mockProductsData} from "../../../mockDatas/mockProductsData.js";





// import {mockProductsData} from "../data/mockProductsData.js";


export default function ProductSection({ nav , categoryKey, title = "新品上市", tag = "New" }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const allowMockFallback =
        //meta.env.DEVvite內建判斷 你是否在開發模式
        import.meta.env.DEV &&
        //True : 允許mockData傳入前端 注意:正式上線改成false 因為上線通常不希望假資料出現在前端頁面
        String(import.meta.env.VITE_ENABLE_API_MOCK_FALLBACK).toLowerCase() === "true";

    const localFallbackProducts = useMemo(
        () => mockProductsData.filter((p) => p.category === categoryKey),
        [categoryKey],
    );



    useEffect(() => {
        if (!categoryKey) {
            return;
        }

        const controller = new AbortController();

        async function loadProducts() {
            try {
                const remoteProducts = await fetchProductsData({
                    nav: nav,
                    category: categoryKey,
                    //當途中及時切換類別的時候 會丟出 AbortError → 進 catch
                    signal: controller.signal,
                });


                const normalizedProducts = remoteProducts.filter(
                    (product) => product.category === categoryKey,
                );

                setProducts(normalizedProducts);
            } catch (error) {
                //防止先選A 又選B類別 導致應該要顯示B資料 卻顯示了A資料的情形發生
                if (controller.signal.aborted) return ;

                if (!allowMockFallback) {
                    console.error("[home] product section fetch failed , fallback disabled", {
                        nav: nav,
                        category: categoryKey,
                        error,
                    });
                    setProducts([]);
                    return;
                }

                console.warn("[home] product section fetch failed , fallback to mock", {
                    nav: nav,
                    category: categoryKey,
                    error,
                });
                setProducts(localFallbackProducts);
            }
        }

        loadProducts();
        return () => controller.abort();//這段是useEffect的cleanUp

    }, [allowMockFallback, categoryKey, nav, localFallbackProducts]);


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
                <ProductCarousel products={products} />
            </div>

            {/* 查看商品按鈕*/}
            <div className="mt-12">
                <button
                    type="button"
                    // onClick={()=>navigate(`/product-browser?category=${categoryKey}`)}
                    onClick={() => navigate(`/product-browser?nav=${nav}&category=${categoryKey}`)}
                    className="cursor-pointer rounded-xl border border-black-300 px-3 py-3 text-base font-extrabold text-gray-900 hover:bg-gray-50"
                >
                    查看所有商品

                </button>
            </div>
        </section>
    );
}
