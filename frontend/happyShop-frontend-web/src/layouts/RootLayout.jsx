import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import {useState} from "react";
import MobileCategoryDrawer from "../features/productBrowser/components/MobileCategoryDrawer.jsx";
import { defaultDatas } from "../features/productBrowser/data/defaultDatas.js";

export default function RootLayout( ) {
    const navigate = useNavigate();
    const user  = null ;
    // const user = {
    //     name : "李軒毅" ,
    //     email : "b409105065@tmu.edu.tw"
    // }


    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

    // 定義導航邏輯：當 Navbar 點擊某個 nav 時，決定跳轉到哪裡
    const handleNavClick = (navKey) => {
        const firstKey = defaultDatas[navKey]?.[0]?.key;
        // 構建 URL
        const url = `/product-browser?nav=${navKey}&category=${firstKey || ""}`;
        navigate(url);
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-white">
                <Navbar 
                    onHamburgerClick={()=>setMobileCategoryOpen(true)} 
                    onNavClick={handleNavClick} // 傳入導航處理函數
                    user={user} 
                    cartCount={15} 
                />
            </div>

            <MobileCategoryDrawer
                open={mobileCategoryOpen}
                onClose={() => setMobileCategoryOpen(false)}
            />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}
