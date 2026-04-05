import InvoiceForm from "../components/InvoiceForm";

export default function InvoiceSection() {
    return (
        <section className=" py-12">
            <h2 className="mb-10 text-[22px] font-extrabold text-black">
                電子發票
            </h2>

            <InvoiceForm />
        </section>
    );
}