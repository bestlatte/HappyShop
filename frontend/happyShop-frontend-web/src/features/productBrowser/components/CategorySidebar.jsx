


export default function CategorySidebar({
                                            title = "主題",
                                            items=[],
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




