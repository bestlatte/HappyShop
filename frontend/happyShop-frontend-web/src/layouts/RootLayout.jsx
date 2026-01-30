import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer.jsx";

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar cartCount={12} />
            <main className="mx-auto max-w-6xl px-4 py-6">
                {children}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </main>
            <Footer/>
        </>
    );
}
