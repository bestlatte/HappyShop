import ProductSection from "../components/ProductSection";

export default function Home() {
    return (
        <div className="py-10 border-b">
            <ProductSection />
            <ProductSection title="優惠商品" tag="Onsale"/>
            <ProductSection />
            <ProductSection />

        </div>
    );
}
