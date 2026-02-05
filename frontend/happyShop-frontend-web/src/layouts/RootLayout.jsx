import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";
import Home from "../features/product/pages/Home.jsx";

export default function RootLayout({ children }) {

    const user  = null ;
    // const user = {
    //     name : "李軒毅" ,
    //     email : "b409105065@tmu.edu.tw"
    // }


    return (
        <>
            <Navbar  user={user}  cartCount={12} />
            <Home></Home>
            <Footer/>
        </>
    );
}
