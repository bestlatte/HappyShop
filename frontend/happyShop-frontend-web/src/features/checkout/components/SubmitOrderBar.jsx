import { useState } from "react";

function formatCurrency(amount) {
    return `NT$ ${Number(amount || 0).toLocaleString("zh-TW")}`;
}

export default function SubmitOrderBar({
                                           total = 0,
                                           onSubmit,
                                           isSubmitting = false,
                                       }) {
    const [agreed, setAgreed] = useState(false);

    const handleSubmitClick = () => {
        if (!agreed || isSubmitting) return;
        onSubmit?.();
    };

    return (
        <div className="rounded-[20px] border border-[#e5e5e5] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-6 flex items-center justify-between">
                <span className="text-[14px] text-[#777777]">應付總額</span>
                <span className="text-[28px] font-extrabold tracking-tight text-black">
          {formatCurrency(total)}
        </span>
            </div>

            <label className="mb-5 flex items-start gap-3 text-[14px] leading-6 text-[#666666]">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed((prev) => !prev)}
                    className="mt-1 h-[18px] w-[18px]"
                />
                <span>
          我已閱讀並同意網站服務條款、隱私權政策與退換貨相關規範。
        </span>
            </label>

            <button
                type="button"
                disabled={!agreed || isSubmitting}
                onClick={handleSubmitClick}
                className="w-full rounded-full bg-black px-6 py-4 text-[16px] font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#d0d0d0]"
            >
                {isSubmitting ? "處理中..." : "確認並付款"}
            </button>

            <p className="mt-4 text-[13px] leading-6 text-[#8a8a8a]">
                點擊「確認並付款」後，系統將建立訂單並依您選擇的付款方式進行後續流程。
            </p>
        </div>
    );
}