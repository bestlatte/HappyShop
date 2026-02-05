import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products = [] }) {
    const trackRef = useRef(null);

    {/*我按下按鈕後，程式透過 trackRef.current 取得橫向容器（不管我點哪裡），
    再從容器內抓第一張 data-card 量出卡片寬度，
    最後用 el.scrollBy(卡寬 + gap) 讓容器水平捲動一格*/}

    const scrollByOneCard = (dir) => {
        const el = trackRef.current;
        if (!el) return;

        const first = el.querySelector("[data-card]");
        if (!first) return;

        const cardWidth = first.getBoundingClientRect().width;

        // 等等會用 gap-10，所以 gap=40px（Tailwind gap-10 = 2.5rem = 40px）
        const gap = 40;

        el.scrollBy({
            left: dir * (cardWidth + gap),
            behavior: "smooth",
        });
    };

    return (
        <div className="relative ">
            {/* 左右按鈕：控制整排滑動 */}

            <button
                type="button"
                onClick={() => scrollByOneCard(-1)}
                className="absolute left-2 top-[150px] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow hover:bg-white cursor-pointer"
                aria-label="上一個商品"
            >
                <span className="text-xl leading-none">‹</span>
            </button>

            <button
                type="button"
                onClick={() => scrollByOneCard(1)}
                className="absolute right-2 top-[150px] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow hover:bg-white cursor-pointer"
                aria-label="下一個商品"
            >
                <span className="text-xl leading-none">›</span>
            </button>

            {/* 橫向軌道 */}
            <div
                ref={trackRef}
                className="hide-scrollbar flex gap-10 overflow-x-auto scroll-smooth"
            >
                {products.map((p) => (
                    <div
                        key={p.id}
                        data-card
                        className="

                        shrink-0 w-[calc((100%_-_120px)_/_4)] min-w-[180px]
                        "
                    >
                        <ProductCard p={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}
