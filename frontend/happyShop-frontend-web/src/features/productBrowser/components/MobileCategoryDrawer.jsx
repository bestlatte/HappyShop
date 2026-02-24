import { useMobileCategoryDrawer } from "../hooks/useMobileCategoryDrawer.js";
import CategorySidebar from "./CategorySidebar.jsx";

export default function MobileCategoryDrawer({ open, onClose }) {
    const {
        currentNav,
        currentCategory,
        items,
        title,
        handleSelectCategory,
        handleSelectNav,
    } = useMobileCategoryDrawer({ open, onClose });

    return (
        <div
            className={[
                "fixed inset-0 z-[60] md:hidden",
                open ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            aria-hidden={!open}
        >
            {/* 遮罩 */}
            <div
                className={[
                    "absolute inset-0 bg-black/40 transition-opacity",
                    open ? "opacity-100" : "opacity-0",
                ].join(" ")}
                onClick={onClose}
            />

            {/* 面板 */}
            <aside
                className={[
                    "absolute left-0 top-0 h-full w-[86%] max-w-[360px] bg-white shadow-xl",
                    "transition-transform duration-200 ease-out",
                    open ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
            >
                <div className="flex items-center justify-between px-4 h-16 border-b">
                    <div className="text-lg font-black">分類</div>
                    <button
                        className="h-10 w-10 rounded-full hover:bg-gray-100"
                        onClick={onClose}
                        aria-label="關閉"
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4">
                    {/* 三個頁籤按鈕 */}
                    <div className="mb-4 flex items-center gap-5 border-b border-black/10 pb-3">
                        {[
                            { key: "all", label: "全部分類" },
                            { key: "topic", label: "主題" },
                            { key: "charity", label: "公益關懷" },
                        ].map((t) => {
                            const isOn = currentNav === t.key;
                            return (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => handleSelectNav(t.key)}
                                    className={[
                                        "text-sm font-semibold cursor-pointer pb-2",
                                        "hover:text-black hover:border-black",
                                        isOn
                                            ? "text-black border-b-2 border-black"
                                            : "text-gray-600 hover:text-black",
                                    ].join(" ")}
                                >
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* 你的 Sidebar */}
                    <CategorySidebar
                        title={title}
                        items={items}
                        activeKey={currentCategory}
                        onSelect={handleSelectCategory}
                    />
                </div>
            </aside>
        </div>
    );
}
