import { useEffect, useRef, useState } from "react";

export default function Navbar({
                                   cartCount = 16,
                                   brandMain = "黑皮電商",
                                   brandSub = "B2C buy",
                               }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef(null);

    const user = {
        name: "李軒毅",
        email: "b409105065@tmu.edu.tw",
    };

    useEffect(() => {
        function onDocClick(e) {
            if (!accountRef.current) return;
            if (!accountRef.current.contains(e.target)) setAccountOpen(false);
        }
        function onEsc(e) {
            if (e.key === "Escape") setAccountOpen(false);
        }

        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    const navItems = [
        { label: "全部分類", href: "#" },
        { label: "主題", href: "#" },
        { label: "公益關懷", href: "#" },
    ];

    return (
        <header className="w-full border-b bg-white">
            <div className="flex h-16 w-full items-center justify-between px-6">
                {/* Left: Brand */}
                <div className="flex items-center gap-2">
                    {/* Mobile: Hamburger (left side) */}
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100 md:hidden"
                        aria-label="選單"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 text-gray-800"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.75 6.75A.75.75 0 014.5 6h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25A.75.75 0 014.5 11.25h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25A.75.75 0 014.5 16.5h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Brand */}
                    <a href="#" className="flex items-end gap-2">
                        <span className="text-2xl font-black tracking-tight">{brandMain}</span>
                        <span className="mb-0.5 text-xs font-semibold text-gray-600">{brandSub}</span>
                    </a>
                </div>


                {/* Center: Nav (desktop) */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-semibold text-gray-800 hover:text-black"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* 導覽列右側 */}
                {/* 導覽列右側 */}
                <div className="flex items-center gap-6">
                    {/* 購物車 */}
                    <button
                        type="button"
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100"
                        aria-label="購物車"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 text-gray-800"
                        >
                            <path d="M2.25 3a.75.75 0 000 1.5h1.386l1.2 10.8A3 3 0 007.82 18h9.36a3 3 0 002.985-2.7l.835-7.5A.75.75 0 0020.25 7.5H6.21l-.3-2.7A.75.75 0 005.165 4.5H2.25z" />
                            <path d="M7.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>

                        {cartCount > 0 && (
                            <span className="absolute right-2 top-2 inline-flex min-w-[18px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
        {cartCount > 99 ? "99+" : cartCount}
      </span>
                        )}
                    </button>

                    {/* 搜尋 */}
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100"
                        aria-label="搜尋"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 text-gray-800"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 104.02 12.17l3.78 3.78a.75.75 0 101.06-1.06l-3.78-3.78A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* 會員（只這個需要 ref） */}
                    <div className="relative" ref={accountRef}>
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100"
                            aria-label="會員"
                            aria-expanded={accountOpen}
                            onClick={() => setAccountOpen((v) => !v)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-8 w-8 text-gray-800"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </button>

                        {accountOpen && (
                            <div className="absolute right-0 top-[52px] z-50  w-64 rounded-xl  bg-white shadow-lg ring-1 ring-black/5">
                                <div className="px-4 py-3">
                                    <div className="text-lg font-extrabold text-gray-900">{user.name}</div>
                                    <div className="mt-1 text-sm text-gray-500">{user.email}</div>
                                </div>

                                <div className="h-px bg-gray-200" />

                                <div className="py-1">
                                    {[
                                        { label: "所有訂單", href: "/orders" },
                                        { label: "C-Point歷程", href: "/points" },
                                        { label: "訂閱商品", href: "/subscriptions" },
                                        { label: "帳戶設定", href: "/account" },
                                        { label: "修改密碼", href: "/account/password" },
                                    ].map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="block px-4 py-2.5 text-[14px] font-medium text-gray-900 hover:bg-gray-50"
                                            onClick={() => setAccountOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}

                                    <div className="my-1 h-px bg-gray-200" />

                                    <button
                                        type="button"
                                        className="block w-full px-4 py-2.5 text-left text-[14px] font-medium text-gray-900 hover:bg-gray-50 hover:bg-gray-50"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            console.log("logout");
                                        }}
                                    >
                                        登出
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {mobileOpen && (
                <div className="border-t bg-white md:hidden">
                    <div className="mx-auto max-w-6xl px-4 py-3">
                        <div className="flex flex-col gap-2 md:hidden">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
