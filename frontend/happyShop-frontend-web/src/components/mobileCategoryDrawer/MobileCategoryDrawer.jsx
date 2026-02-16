import {useEffect, useState} from "react";
import CategorySidebar from "../../features/productBrowser/components/CategorySidebar.jsx";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {defaultDatas} from "../../features/productBrowser/data/defaultDatas.js";

export default function MobileCategoryDrawer({ open, onClose, active}) {

    //導航到其他頁面
    const navigate = useNavigate();

    //判斷現在在哪個頁面。
    const location = useLocation();
    const [searchParam, setSearchParam] = useSearchParams();
    const currentNav = searchParam.get("nav")??"all";





    const items = defaultDatas[currentNav]??[];
    // const title =
    const titleMap = { topic: "主題", all: "分類", charity: "公益關懷" };
    const title = titleMap[currentNav];




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



    const handleSelect=(k)=>{
        onClose();
        const sp = new URLSearchParams(searchParam) ;
        sp.set("nav",currentNav);
        sp.set("category",k);

        if(location.pathname !== "/productBrowser"){
            navigate(`/productBrowser?${sp.toString()}`);
        }else{
            setSearchParam(sp, { replace: true });
        }

        }










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
                                    onClick={() => {
                                        const sp = new URLSearchParams(searchParam);
                                        sp.set("nav", t.key);

                                        const firstKey = defaultDatas[t.key]?.[0]?.key;
                                        if (firstKey) sp.set("category", firstKey);

                                        setSearchParam(sp, { replace: true });

                                        onClose?.(); // 可選：點tab就關抽屜，看你要不要
                                    }}
                                    className={[
                                        "text-sm font-semibold cursor-pointer pb-2",
                                        "hover:text-black hover:border-black",
                                        isOn
                                            ? "text-black border-b-2 border-black"
                                            : "text-gray-600 hover:text-black",
                                    ].join(" ")}


                                    // className={[
                                    //     "text-sm font-semibold cursor-pointer pb-2",
                                    //     "border-b-2 border-transparent",          // 平常看起來沒底線
                                    //     "hover:text-black hover:border-black",    // hover 出底線
                                    //     isOn ? "text-black border-black" : "text-gray-600", // active 出底線
                                    // ].join(" ")}
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
                        activeKey={active}
                        onSelect={handleSelect}
                    />
                </div>
            </aside>
        </div>
    );
}
