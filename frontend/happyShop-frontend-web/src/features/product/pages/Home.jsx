import ProductSection from "../sections/ProductSection.jsx";

export default function Home() {
    return (
        <div className="py-10 border-bS border-b border-black/10">
            <ProductSection />
            <ProductSection title="優惠商品" tag="Onsale"/>
            <ProductSection />
            <ProductSection />

        </div>
    );
}
