import {useState} from "react";
import {fetchLogin} from "../../services/loginApi.js";


export default function ForgetPassword(){
    const [email ,setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isFormValid = email.trim() !== "";


    async function handleSubmit(e) {
        e.preventDefault();

        if (!isFormValid || isSubmitting) return;

        try {
            setIsSubmitting(true);
            // 真正打 API 前，先故意停 1500ms
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("寄送成功");
            alert("送出電子郵件成功");
        } catch (error) {
            const errorMessage = "帳號尚未註冊";
            console.error(errorMessage, error);
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }


    return(
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-10">
                    <label className="mb-3 block text-[18px] font-semibold text-black ">
                        忘記密碼
                    </label>

                    <input
                        type="email"
                        value={email}
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="輸入電子信箱"
                        className="h-14 w-full rounded-xl border border-[#d9d3d3] bg-white px-5 text-[16px] text-black outline-none placeholder:text-[#b8b1b1] focus:border-[#bdb7b7]"
                    />
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
                    {isSubmitting ? "登入中..." : "送出電子郵件"}
                </button>
            </form>
        </>


    )

}