import RecipientForm from "../components/RecipientForm";

export default function RecipientInfoSection({ recipient, onFieldChange }) {
    return (
        <section className="py-12">
            <h2 className="mb-12 text-[22px] font-extrabold text-black">
                收件資訊
            </h2>

            <RecipientForm recipient={recipient} onFieldChange={onFieldChange} />
        </section>
    );
}
