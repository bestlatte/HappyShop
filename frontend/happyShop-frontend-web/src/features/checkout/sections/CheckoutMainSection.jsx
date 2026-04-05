import ShippingMethodSection from "./ShippingMethodSection";
import RecipientInfoSection from "./RecipientInfoSection";
import PaymentMethodSection from "./PaymentMethodSection";
import InvoiceSection from "./InvoiceSection";
import OrderSummarySection from "./OrderSummarySection";

export default function CheckoutMainSection() {
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

                <ShippingMethodSection />
                <RecipientInfoSection />
                <PaymentMethodSection />
                <InvoiceSection />
            </div>

            {/* 右側 */}
            <aside>
                <OrderSummarySection />
            </aside>
        </section>
    );
}