import PaymentMethodSelector from "../components/PaymentMethodSelector";

export default function PaymentMethodSection() {
    return (
        <section className="border-b border-[#dddddd] py-12">
            <h2 className="mb-10 text-[22px] font-extrabold text-black">
                付款方式
            </h2>

            <PaymentMethodSelector />
        </section>
    );
}