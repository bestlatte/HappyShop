import ProductCard from "../../product/components/ProductCard.jsx";

export default function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
                <ProductCard key={p.id} p={p} />
            ))}
        </div>
    );
}
