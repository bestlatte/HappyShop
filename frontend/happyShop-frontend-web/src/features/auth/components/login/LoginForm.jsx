import { useLoginForm } from "./useLoginForm.js";

export default function LoginForm() {
    const {
        navigate,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        isSubmitting,
        isFormValid,
        handleSubmit,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-10">
                <label className="mb-3 block text-[18px] font-semibold text-black">
                    電子信箱<span className="ml-1">*</span>
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="輸入電子信箱"
                    className="h-14 w-full rounded-xl border border-[#d9d3d3] bg-white px-5 text-[16px] text-black outline-none placeholder:text-[#b8b1b1] focus:border-[#bdb7b7]"
                />
            </div>

            <div>
                <label className="mb-3 block text-[18px] font-semibold text-black">
                    輸入目前的密碼<span className="ml-1">*</span>
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="輸入目前的密碼"
                        className="h-14 w-full rounded-xl border border-[#d9d3d3] bg-white px-5 pr-16 text-[16px] text-black outline-none placeholder:text-[#b8b1b1] focus:border-[#bdb7b7]"
                    />

                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-4 flex items-center text-[14px] font-medium text-[#8d8787] hover:opacity-70"
                    >
                        {showPassword ? "隱藏" : "顯示"}
                    </button>
                </div>

                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        className=" cursor-pointer text-[15px] font-bold text-black hover:opacity-70"
                        onClick={(()=>{navigate("/forget-password")})}
                    >
                        忘記密碼？
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`mt-10 h-14 w-full rounded-xl text-[18px] font-bold transition ${
                    isFormValid && !isSubmitting
                        ? "bg-black text-white hover:opacity-90"
                        : "bg-[#d9d2d2] text-white cursor-not-allowed"
                }`}
            >
                {isSubmitting ? "登入中..." : "使用電子信箱登入"}
            </button>

        </form>
    );
}