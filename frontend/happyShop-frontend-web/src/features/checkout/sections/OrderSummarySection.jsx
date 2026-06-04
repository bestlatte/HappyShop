import OrderSummaryCard from "../components/OrderSummaryCard.jsx";
import SubmitOrderBar from "../components/SubmitOrderBar.jsx";

export default function OrderSummarySection({
    items,
    subtotal,
    shippingFee,
    discount,
    total,
    notes = [],
    isSubmitting,
    onSubmit,
}) {
    return (
        <section className="sticky top-20">
            <div className="space-y-4">
                <OrderSummaryCard
                    items={items}
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    discount={discount}
                    total={total}
                    notes={notes}
                />

                <SubmitOrderBar
                    total={total}
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                />
            </div>
        </section>
    );
}
