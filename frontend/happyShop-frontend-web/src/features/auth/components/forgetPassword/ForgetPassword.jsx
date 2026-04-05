import { useForgetPassword } from "../../hooks/useForgetPassword.js";

export default function ForgetPassword() {
    const {
        email,
        setEmail,
        isSubmitting,
        isEmailValid,
        handleSubmit,
    } = useForgetPassword();

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-10">
                <label
                    htmlFor="email"
                    className="mb-3 block text-[18px] font-semibold text-black"
                >
                    忘記密碼
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="輸入電子信箱"
                    className="h-14 w-full rounded-xl border border-[#d9d3d3] bg-white px-5 text-[16px] text-black outline-none placeholder:text-[#b8b1b1] focus:border-[#bdb7b7]"
                />
            </div>

            <button
                type="submit"
                disabled={!isEmailValid || isSubmitting}
                className={`mt-10 h-14 w-full rounded-xl text-[18px] font-bold transition ${
                    isEmailValid && !isSubmitting
                        ? "bg-black text-white hover:opacity-90"
                        : "cursor-not-allowed bg-[#d9d2d2] text-white"
                }`}
            >
                {isSubmitting ? "寄送中..." : "送出電子郵件"}
            </button>
        </form>
    );
}