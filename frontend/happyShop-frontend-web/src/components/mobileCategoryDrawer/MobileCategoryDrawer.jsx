import { useEffect } from "react";
import CategorySidebar from "../../features/productBrowser/components/CategorySidebar.jsx";

export default function MobileCategoryDrawer({ open, onClose, active, setActive }) {
    // 鎖住 body scroll（避免背景跟著一起滑動）
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = prev);
    }, [open]);

    // ESC 關閉
    useEffect(() => {
        if (!open) return;
        const onEsc = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [open, onClose]);

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

                    <CategorySidebar
                        activeKey={active}
                        onSelect={(k) => {
                            setActive(k);
                            onClose();
                        }}
                    />
                </div>
            </aside>
        </div>
    );
}
