import { useNavbar } from "./useNavbar.js";

//在react 中 函示參數的傳遞是透過prop物件來做傳遞，所以參數才都是物件
export default function Navbar({user=false,
                                   cartCount = 0,
                                   brandMain = "黑皮電商",
                                   brandSub = "B2C buy",
                                   onHamburgerClick,
                                   onNavClick, // 新增：由父組件傳入導航處理函數
                               }) {

    const {
        accountOpen, setAccountOpen,
        searchOpen, setSearchOpen,
        keyword, setKeyword,
        accountRef,
        desktopSearchRef,
        mobileSearchRef,
        handleSearch,
        navInUrl,
        isOnBrowser,
        navigate
    } = useNavbar();

    const navItems = [
        { key: "all", label: "全部分類" },
        { key: "topic", label: "主題" },
        { key: "charity", label: "公益關懷" },
    ];

    function GuestMenu(){
        return (
            <div className="flex items-center gap-6">
                <button className="cursor-pointer text-sm font-semibold hover:underline" onClick={()=>navigate("/login")}>
                    登入
                </button >

                <button className="cursor-pointer text-sm font-semibold hover:underline"  onClick={()=>navigate("/login")} >
                    註冊
                </button>

            </div>
        );
    }

    function AuthMenu({ user : authUser}){
        return (
            <div className="relative" ref={accountRef}>
                <button
                    type="button"
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 active:scale-95"
                    aria-label="會員"
                    aria-expanded={accountOpen}
                    onClick={()=>setAccountOpen((v)=>!v)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-8 w-8 text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

                {accountOpen && (
                    <div className="absolute right-0 top-[52px] z-50 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                        <div className="px-4 py-3">
                            <div className="text-lg font-extrabold text-gray-900">{authUser?.name}</div>
                            <div className="mt-1 text-sm text-gray-500">{authUser?.email}</div>
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
                                    onClick={()=>setAccountOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}

                            <div className="my-1 h-px bg-gray-200" />

                            <button
                                type="button"
                                className="block w-full px-4 py-2.5 text-left text-[14px] font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
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
        );
    }

    // 放大鏡圖
    const SearchIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 text-gray-800"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 104.02 12.17l3.78 3.78a.75.75 0 101.06-1.06l-3.78-3.78A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
                clipRule="evenodd"
            />
        </svg>
    );

    // X SVG
    const XIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-700"
            aria-hidden="true"
        >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L10.94 12l-5.72 5.72a.75.75 0 101.06 1.06L12 13.06l5.72 5.72a.75.75 0 101.06-1.06L13.06 12l5.72-5.72a.75.75 0 00-1.06-1.06L12 10.94 6.28 5.22z" />
        </svg>
    );

    return (
        <header className="sticky top-0 z-50 w-full h-16 border-b border-black/10 bg-white relative">
            {/* ===== 第一列 Navbar ===== */}
            <div className="flex h-16 w-full items-center justify-between px-6">
                {/* 左側 */}
                <div className="flex items-center gap-2">
                    {/* Mobile: Hamburger */}
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100 md:hidden cursor-pointer"
                        aria-label="選單"
                        onClick={() => onHamburgerClick?.()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7 text-gray-800"
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
                    <button  className=" cursor-pointer flex items-end gap-2 whitespace-nowrap"
                             onClick={()=>navigate("/")}>
                        <span className="text-2xl font-black tracking-tight"


                        >{brandMain}</span>
                        <span className="mb-0.5 text-xs font-semibold text-gray-600">{brandSub}</span>
                    </button>
                </div>

                {/* 中間：網頁選單 */}
                <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 md:flex">
                    {navItems.map((item) => {
                        const isActive = isOnBrowser && navInUrl === item.key;

                        return (
                            <button
                                type="button"
                                key={item.key}
                                onClick={() => onNavClick?.(item.key)} // 使用傳入的 onNavClick
                                className={
                                    isActive
                                        ? "cursor-pointer text-sm font-extrabold text-black underline underline-offset-8"
                                        : "cursor-pointer text-sm font-semibold text-gray-800 hover:text-black"
                                }
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* 右側 */}
                <div className="flex items-center gap-6">
                    {/* 購物車 */}
                    <button
                        type="button"
                        className="relative inline-flex cursor-pointer h-11 w-11 items-center justify-center rounded-full hover:bg-gray-100"
                        aria-label="購物車"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-800">
                            <path d="M2.25 3a.75.75 0 000 1.5h1.386l1.2 10.8A3 3 0 007.82 18h9.36a3 3 0 002.985-2.7l.835-7.5A.75.75 0 0020.25 7.5H6.21l-.3-2.7A.75.75 0 005.165 4.5H2.25z" />
                            <path d="M7.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>

                        {cartCount > 0 && (
                            <span className="absolute right-2 top-2 inline-flex min-w-[18px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </button>

                    {/* 網頁：搜尋 icon / 搜尋bar（同一列） */}
                    <div className="hidden md:flex items-center gap-2">
                        {!searchOpen ? (
                            <button
                                type="button"
                                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
                                aria-label="搜尋"
                                onClick={() => setSearchOpen(true)}
                            >
                                {SearchIcon}
                            </button>
                        ) : (
                            <>
                                <div className="flex h-11 w-[320px] items-center rounded-full bg-gray-100 px-4">
                                    <input
                                        ref={desktopSearchRef}
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="想找什麼商品？"
                                        className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                                        onKeyDown={(e)=>e.key === "Enter" && handleSearch()}
                                    />
                                    <button
                                        type="button"
                                        className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer"
                                        aria-label="清除"
                                        onClick={() => {
                                            if (keyword) setKeyword("");
                                            else setSearchOpen(false);
                                        }}
                                    >
                                        {XIcon}
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white hover:opacity-90 cursor-pointer"
                                    aria-label="執行搜尋"
                                    onClick={handleSearch}
                                >
                                    {/* 用原本放大鏡，但變白色 */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                        <path
                                            fillRule="evenodd"
                                            d="M10.5 3.75a6.75 6.75 0 104.02 12.17l3.78 3.78a.75.75 0 101.06-1.06l-3.78-3.78A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* 手機：只保留搜尋 icon（點了顯示第二列） */}
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 md:hidden"
                        aria-label="搜尋"
                        onClick={() => setSearchOpen((v) => !v)}
                    >
                        {SearchIcon}
                    </button>

                    {/* 會員 : 如果有user登入就切換成user頁面 */}
                    {user?<AuthMenu user={user} />:<GuestMenu/>}
                </div>
            </div>

            {/* 手機：搜尋BAR 第二列（避免跑版） */}
            {searchOpen && (
                <div className="absolute left-0 right-0 top-full border-t bg-white md:hidden shadow-sm">
                    <div className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="flex h-11 flex-1 items-center rounded-full bg-gray-100 px-4">
                                <input
                                    ref={mobileSearchRef}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="想找什麼商品？"
                                    className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                                <button
                                    type="button"
                                    className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer"
                                    aria-label="清除"
                                    onClick={() => {
                                        if (keyword) setKeyword("");
                                        else setSearchOpen(false);
                                    }}
                                >
                                    {XIcon}
                                </button>
                            </div>

                            <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white hover:opacity-90 cursor-pointer"
                                aria-label="執行搜尋"
                                onClick={handleSearch}
                            >
                                {/* 放大鏡圖*/}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.5 3.75a6.75 6.75 0 104.02 12.17l3.78 3.78a.75.75 0 101.06-1.06l-3.78-3.78A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </header>
    );
}
