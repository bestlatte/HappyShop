import { useNavigate } from "react-router-dom";
import { useCart } from "../../../app/contexts/useCart";
import useCheckoutForm from "../hooks/useCheckoutForm";
import ShippingMethodSection from "./ShippingMethodSection";
import RecipientInfoSection from "./RecipientInfoSection";
import PaymentMethodSection from "./PaymentMethodSection";
import InvoiceSection from "./InvoiceSection";
import OrderSummarySection from "./OrderSummarySection";
import InvoiceForm from "../components/InvoiceForm.jsx";
import OrderSummaryCard from "../components/OrderSummaryCard.jsx";
import SubmitOrderBar from "../components/SubmitOrderBar.jsx";
import PaymentMethodSelector from "../components/PaymentMethodSelector.jsx";
import RecipientForm from "../components/RecipientForm.jsx";
import ShippingMethodSelector from "../components/ShippingMethodSelector.jsx";

export default function CheckoutMainSection() {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();

    const shippingFee = 0;
    const discount = 0;
    const total = cartTotal + shippingFee - discount;

    const {
        shippingMethod,
        setShippingMethod,
        recipient,
        updateRecipient,
        paymentMethod,
        setPaymentMethod,
        creditCard,
        updateCreditCard,
        invoice,
        updateInvoice,
        isSubmitting,
        handleSubmit,
    } = useCheckoutForm({
        items: cartItems,
        onSuccess: () => {
            clearCart();
            navigate("/orders");
        },
    });

    return (
        <section className="grid grid-cols-[minmax(0,1fr)_420px] gap-14 mx-auto max-w-5xl px-6 py-10 ">
            {/* 左側 */}
            <div className="pr-6">
                <header className="mb-14">
                    <h1 className="mb-3 text-[26px] font-extrabold tracking-tight text-black">
                        檢查並付款
                    </h1>
                    <p className="text-[14px] leading-6 text-[#9b9b9b]">
                        您可以在選擇喜愛的配送方式，完成付款後即完成訂單。
                    </p>
                </header>

                <section className="border-b border-[#dddddd] pb-10">
                    <h2 className="mb-8 text-[22px] font-extrabold text-black">
                        配送地區：國內
                    </h2>

                    <div className="text-[15px] text-[#666666]">
                        <span>切換地區：</span>
                        <button
                            type="button"
                            className="font-semibold text-black hover:opacity-70"
                        >
                            前往購物車切換
                        </button>
                    </div>
                </section>

                <section className="border-b border-[#dddddd] py-12">
                    <h2 className="mb-10 text-[22px] font-extrabold text-black">
                        選擇配送方式
                    </h2>

                    <ShippingMethodSelector value={shippingMethod} onChange={setShippingMethod} />
                </section>
                <section className="py-12">
                    <h2 className="mb-12 text-[22px] font-extrabold text-black">
                        收件資訊
                    </h2>

                    <RecipientForm recipient={recipient} onFieldChange={updateRecipient} />
                </section>
                <section className="border-b border-[#dddddd] py-12">
                    <h2 className="mb-10 text-[22px] font-extrabold text-black">
                        付款方式
                    </h2>

                    <PaymentMethodSelector
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                        creditCard={creditCard}
                        onCreditCardChange={updateCreditCard}
                    />
                </section>
                <section className=" py-12">
                    <h2 className="mb-10 text-[22px] font-extrabold text-black">
                        電子發票
                    </h2>

                    <InvoiceForm invoice={invoice} onFieldChange={updateInvoice} />
                </section>
            </div>

            {/* 右側 */}
            <aside>
                <section className="sticky top-20">
                    <div className="space-y-4">
                        <OrderSummaryCard
                            items={cartItems}
                            subtotal={cartTotal}
                            shippingFee={shippingFee}
                            discount={discount}
                            total={total}
                            notes={[]}
                        />

                        <SubmitOrderBar
                            total={total}
                            isSubmitting={isSubmitting}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </section>

            </aside>
        </section>
    );
}

