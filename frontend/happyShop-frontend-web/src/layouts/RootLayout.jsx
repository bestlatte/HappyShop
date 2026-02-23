import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import Home from "../features/product/pages/Home.jsx";
import {useState} from "react";
import MobileCategoryDrawer from "../components/mobileCategoryDrawer/MobileCategoryDrawer.jsx";

export default function RootLayout( ) {




    const user  = null ;
    // const user = {
    //     name : "李軒毅" ,
    //     email : "b409105065@tmu.edu.tw"
    // }


    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);


    return (
        <>
            <div className="sticky top-0 z-50 bg-white">

                <Navbar  onHamburgerClick={()=>setMobileCategoryOpen(true)}  user={user}  cartCount={15} />
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


