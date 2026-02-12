import Price from "../../../components/ui/Price";

export default function ProductCard({ p }) {
    return (
        <div className="w-full">
            {/* 卡片上半：圖片區 */}
            <div
                className={[
                    "relative overflow-hidden rounded-2xl",
                    "aspect-[3/4]",
                    // p.cardBg || "bg-white",
                ].join(" ")}
            >
                {/*/!* 促銷時間/標籤（前兩張才有） *!/*/}
                {/*{p.promoTop && (*/}
                {/*    <div className="absolute left-0 right-0 top-0 px-6 pt-5 text-center">*/}
                {/*        <div className="text-sm font-extrabold tracking-wide text-white/90 drop-shadow">*/}
                {/*            {p.promoTop}*/}
                {/*        </div>*/}

                {/*        {p.promoTag && (*/}
                {/*            <div className="mx-auto mt-3 inline-flex items-center justify-center rounded-full bg-[#FFF2A6] px-6 py-2 text-xs font-bold text-gray-700 shadow-sm">*/}
                {/*                {p.promoTag}*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*/!* 白色內框（像你第一、二張） *!/*/}
                {/*{(p.promoTop || p.promoTag) && (*/}
                {/*    <div className="absolute inset-x-6 bottom-20 top-20 rounded-2xl bg-white shadow-sm" />*/}
                {/*)}*/}

                {/* 圖片 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/*<div*/}
                    {/*    className={[*/}
                    {/*        "relative",*/}
                    {/*        (p.promoTop || p.promoTag) ? "h-[100%] w-[100%]" : "h-full w-full",*/}
                    {/*        p.mediaBg || "bg-transparent",*/}
                    {/*        (p.promoTop || p.promoTag) ? "rounded-2xl" : "rounded-2xl",*/}
                    {/*        (p.promoTop || p.promoTag) ? "" : "overflow-hidden",*/}
                    {/*    ].join(" ")}*/}
                    {/*>*/}
                        <img
                            src={p.imageKey}
                            // alt={p.title}
                            className={[
                                "h-full w-full",
                                // (p.promoTop || p.promoTag) ? "object-contain" : "object-cover",
                                // (p.promoTop || p.promoTag) ? "p-6" : "",
                                "object-cover"
                            ].join(" ")}
                            loading="lazy"
                        />
                    {/*</div>*/}
                </div>

                {/* 底部大字優惠價（前兩張） */}
                {/*{p.salePrice && p.price && (p.promoTop || p.promoTag) && (*/}
                {/*    <div className="absolute inset-x-6 bottom-6 text-center">*/}
                {/*        <div className="text-xl font-black text-white/90 drop-shadow">*/}
                {/*            優惠價 ${p.salePrice.toLocaleString("zh-TW")}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* 左下 badge（第三張） */}
                {p.badge && (
                    <div className="absolute left-4 top-4 inline-flex rounded-md bg-black px-2 py-1 text-xs font-bold text-white">
                        {p.badge}
                    </div>
                )}


            </div>

            {/* 卡片下半：文字/價格 */}
            <div className="mt-4">
                <div className="line-clamp-2 text-[15px] font-bold text-gray-900">
                    {p.title}
                </div>
                <Price price={p.price} salePrice={p.salePrice} />
            </div>
        </div>
    );
}
