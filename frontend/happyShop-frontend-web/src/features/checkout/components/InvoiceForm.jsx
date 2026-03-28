import { useState } from "react";

export default function InvoiceForm() {
    const [invoiceOwnerType, setInvoiceOwnerType] = useState("personal");
    const [invoiceType, setInvoiceType] = useState("electronic");

    return (
        <div className="space-y-10">
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => setInvoiceOwnerType("personal")}
                    className={`rounded-full px-5 py-2 text-[14px] font-semibold transition ${
                        invoiceOwnerType === "personal"
                            ? "bg-black text-white"
                            : "border border-[#dddddd] bg-white text-black"
                    }`}
                >
                    非營業人
                </button>

                <button
                    type="button"
                    onClick={() => setInvoiceOwnerType("business")}
                    className={`rounded-full px-5 py-2 text-[14px] font-semibold transition ${
                        invoiceOwnerType === "business"
                            ? "bg-black text-white"
                            : "border border-[#dddddd] bg-white text-black"
                    }`}
                >
                    營業人
                </button>
            </div>

            <div className="space-y-6">
                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        type="radio"
                        name="invoiceType"
                        value="electronic"
                        checked={invoiceType === "electronic"}
                        onChange={(e) => setInvoiceType(e.target.value)}
                        className="h-[18px] w-[18px] accent-black"
                    />
                    <span className="text-[18px] text-black">電子發票</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        type="radio"
                        name="invoiceType"
                        value="mobileBarcode"
                        checked={invoiceType === "mobileBarcode"}
                        onChange={(e) => setInvoiceType(e.target.value)}
                        className="h-[18px] w-[18px] accent-black"
                    />
                    <span className="text-[18px] text-black">手機條碼載具</span>
                </label>
            </div>

            <div className="space-y-8">
                {invoiceOwnerType === "business" && (
                    <>
                        <div className="border-b border-[#dddddd] pb-4">
                            <input
                                type="text"
                                placeholder="公司抬頭"
                                className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                            />
                        </div>

                        <div className="border-b border-[#dddddd] pb-4">
                            <input
                                type="text"
                                placeholder="統一編號"
                                className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                            />
                        </div>
                    </>
                )}

                {invoiceType === "mobileBarcode" && (
                    <div className="border-b border-[#dddddd] pb-4">
                        <input
                            type="text"
                            placeholder="手機條碼載具（例如 /ABCD123）"
                            className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                        />
                    </div>
                )}
            </div>

            <p className="text-[14px] leading-6 text-[#8a8a8a]">
                發票將於付款完成後開立並寄送；若選擇手機條碼載具，將依您填寫的載具資訊歸戶。
            </p>
        </div>
    );
}