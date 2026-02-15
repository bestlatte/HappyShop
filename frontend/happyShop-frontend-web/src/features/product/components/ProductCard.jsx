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


                {/* 圖片 */}
                <div className="absolute inset-0 flex items-center justify-center">

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
