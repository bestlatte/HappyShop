import { useState } from "react";

export default function PaymentMethodSelector() {
    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    return (
        <div>
            <div className="space-y-6">
                <label className="flex cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === "creditCard"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-[18px] w-[18px] accent-black"
                        />
                        <span className="text-[18px] text-black">信用卡</span>
                    </div>
                </label>

                <label className="flex cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="linePay"
                            checked={paymentMethod === "linePay"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-[18px] w-[18px] accent-black"
                        />
                        <span className="text-[18px] text-black">LINE Pay</span>
                    </div>
                </label>

                <label className="flex cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="jkoPay"
                            checked={paymentMethod === "jkoPay"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="h-[18px] w-[18px] accent-black"
                        />
                        <span className="text-[18px] text-black">街口支付</span>
                    </div>
                </label>
            </div>

            {paymentMethod === "creditCard" && (
                <div className="mt-10 space-y-8">
                    <div>
                        <h3 className="mb-6 text-[18px] font-bold text-black">
                            信用卡資訊
                        </h3>

                        <div className="mb-6 flex items-center gap-2 text-[12px] text-[#888888]">
                            <span className="rounded border border-[#d9d9d9] px-2 py-1">VISA</span>
                            <span className="rounded border border-[#d9d9d9] px-2 py-1">Mastercard</span>
                            <span className="rounded border border-[#d9d9d9] px-2 py-1">JCB</span>
                        </div>

                        <div className="space-y-8">
                            <div className="border-b border-[#dddddd] pb-4">
                                <input
                                    type="text"
                                    placeholder="卡號"
                                    className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="border-b border-[#dddddd] pb-4">
                                    <input
                                        type="text"
                                        placeholder="有效期限 MM / YY"
                                        className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                                    />
                                </div>

                                <div className="border-b border-[#dddddd] pb-4">
                                    <input
                                        type="text"
                                        placeholder="安全碼"
                                        className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="border-b border-[#dddddd] pb-4">
                                <input
                                    type="text"
                                    placeholder="持卡人姓名"
                                    className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}