import ProductSection from "../sections/ProductSection.jsx";
import {useState} from "react";

export default function Home() {



    return (
        <div className="py-10 border-bS border-b border-black/10">

            <ProductSection title="新品上市" tag="New" categoryKey="new" />
            <ProductSection title="Tense 韓國套組" tag="Tense" categoryKey="tense" />

        </div>
    );
}
