const defaultItems = [
    { key: "new", label: "新品上市", badge: "NEW" },
    { key: "bundle", label: "內褲露發悄・買3送2", sub: "優惠 -2/12" },
    { key: "tense", label: "Tense韓國套組", sub: "優惠 -2/12" },
    { key: "wear", label: "穿搭懶救 買1送1", sub: "加碼 -2/12" },
    { key: "lunar", label: "年貨大街" },
    { key: "gift2026", label: "2026 年菜禮盒" },
    { key: "lucky", label: "招財開運小物" },
    { key: "sleep", label: "今晚超好睡" },
    { key: "top50", label: "銷售排行", badge: "TOP 50" },
    { key: "hueair", label: "HUE AIR 登機系列" },
    { key: "exclusive", label: "獨家・穿出好溫度" },
    { key: "fast", label: "快電商 獨家商品" },
    { key: "charity", label: "快電商 毛起來愛公益" },
];



export default function CategorySidebar({
                                            title = "主題",
                                            items = defaultItems,
                                            activeKey,
                                            onSelect,
                                        }) {


    return (
        <aside className="w-[220px] shrink-0">
            {/* 標題 */}
            <div className="mb-6 text-[15px] font-semibold text-gray-900">
                {title}
            </div>

            {/* 清單 */}
            <nav aria-label={title}>
                <ul className="space-y-5">
                    {items.map((it) => {
                        const isActive = it.key === activeKey;
                        return (
                            <li key={it.key}>
                                <button
                                    type="button"
                                    //onSelect?.(it.key)  =  setActive("it.key") 父層的狀態改變 進而做出商品區塊的過濾
                                    onClick={() => onSelect?.(it.key)}
                                    className={[
                                        "cursor-pointer",
                                        "w-full text-left",
                                        "text-[14px] leading-6",
                                        isActive ? "font-bold text-gray-900" : "font-semibold text-yellow-800",
                                        "hover:opacity-80",
                                    ].join(" ")}
                                >
                                <span className="inline-flex items-baseline gap-2">
                                 <span>{it.label}</span>
                                 {it.badge && (
                                 <span className="text-[12px] font-bold tracking-wide text-gray-900/80">
                                 {it.badge}
                                </span>
                                     )}
                                </span>

                                    {/* 次要資訊（像你圖上：優惠 -2/12、買3送2 之類） */}
                                    {it.sub && (
                                        <div className="mt-1 text-[13px] font-medium text-gray-600">
                                            {it.sub}
                                        </div>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}




