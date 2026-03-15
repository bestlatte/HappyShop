import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useNavbar() {
    const [accountOpen, setAccountOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const accountRef = useRef(null);
    const desktopSearchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const navInUrl = searchParams.get("nav");
    const isOnBrowser = location.pathname === "/product-browser";

    // 點擊外部關閉選單 & ESC 關閉
    useEffect(() => {
        function onDocClick(e) {
            //accountRef.current 是防呆 保證出現了   accountRef.current是指向被ref={accountRef}標記的DOM元素
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                console.log("target:", e.currentTarget);

                setAccountOpen(false);
            }
        }
        function onEsc(e) {
            if (e.key === "Escape") {
                setAccountOpen(false);
                setSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);

        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    // 開啟搜尋後自動 focus
    useEffect(() => {
        if (!searchOpen) return;
        requestAnimationFrame(() => {
            desktopSearchRef.current?.focus();
            mobileSearchRef.current?.focus();
        });
    }, [searchOpen]);

    function handleSearch() {
        const q = keyword.trim();
        if (!q) return;
        console.log("搜尋：", q);
        // 未來可以用來打API
        // navigate(`/search?q=${encodeURIComponent(q)}`)
    }

    return {
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
    };
}
