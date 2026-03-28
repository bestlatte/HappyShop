import { useRegisterForm } from "./useRegisterForm.js";

export default function RegisterForm() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        isSubmitting,
        isFormValid,
        errorMessage,
        handleSubmit,
    } = useRegisterForm();

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-10">
                <label
                    htmlFor="register-email"
                    className="mb-3 block text-[18px] font-semibold text-black"
                >
                    電子信箱<span className="ml-1">*</span>
                </label>

                <input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="輸入電子信箱"
                    className="h-14 w-full rounded-xl border border-[#d9d3d3] bg-white px-5 text-[16px] text-black outline-none placeholder:text-[#b8b1b1] focus:border-[#bdb7b7]"
                />
            </div>

            <div>
                <label
                    htmlFor="register-password"
                    className="mb-3 block text-[18px] font-semibold text-black"
                >
                    密碼<span className="ml-1">*</span>
                </label>

                <div className="relative">
                    <input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="輸入密碼"
                        className="h-14 w-full rounded-xl border border-[#d9d3d3] bg-white px-5 pr-16 text-[16px] text-black outline-none placeholder:text-[#b8b1b1] focus:border-[#bdb7b7]"
                    />

                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                        className="absolute inset-y-0 right-4 flex items-center text-[14px] font-medium text-[#8d8787] hover:opacity-70"
                    >
                        {showPassword ? "隱藏" : "顯示"}
                    </button>
                </div>

                {errorMessage && (
                    <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`mt-10 h-14 w-full rounded-xl text-[18px] font-bold transition ${
                    isFormValid && !isSubmitting
                        ? "bg-black text-white hover:opacity-90"
                        : "cursor-not-allowed bg-[#d9d2d2] text-white"
                }`}
            >
                {isSubmitting ? "註冊中..." : "使用電子信箱註冊"}
            </button>
        </form>
    );
}