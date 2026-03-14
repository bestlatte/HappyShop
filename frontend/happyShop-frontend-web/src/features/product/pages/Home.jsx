import ProductSection from "../sections/ProductSection.jsx";

export default function Home() {



    return (
        <div className="py-10 border-bS border-b border-black/10">

            <ProductSection title="新品上市" tag="New" nav="topic"    categoryKey="new" />
            <ProductSection title="Tense 韓國套組" tag="Tense"  nav="topic" categoryKey="tense" />

        </div>
    );
}
