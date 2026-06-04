import ShippingMethodSelector from "../components/ShippingMethodSelector";

export default function ShippingMethodSection({ value, onChange }) {
    return (
        <section className="border-b border-[#dddddd] py-12">
            <h2 className="mb-10 text-[22px] font-extrabold text-black">
                選擇配送方式
            </h2>

            <ShippingMethodSelector value={value} onChange={onChange} />
        </section>
    );
}
