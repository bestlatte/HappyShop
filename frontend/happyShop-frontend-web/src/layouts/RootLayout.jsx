import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";
import Home from "../features/product/pages/Home.jsx";

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar cartCount={12} />
            <Home></Home>
            <Footer/>
        </>
    );
}
