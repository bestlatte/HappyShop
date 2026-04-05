import { useState } from "react";
import { fetchForgetPassword } from "../services/forgetPasswordApi.js";

export function useForgetPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const trimmedEmail = email.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!isEmailValid || isSubmitting) return;

        try {
            setIsSubmitting(true);

            const result = await fetchForgetPassword({ email: trimmedEmail });

            console.log("寄送成功", result);
            alert("重設密碼信已寄出，請檢查您的電子郵件。");
        } catch (error) {
            console.error("忘記密碼寄送失敗", error);

            const errorMessage =
                error?.message || "寄送失敗，請稍後再試。";

            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        email,
        setEmail,
        isSubmitting,
        isEmailValid,
        handleSubmit,
    };
}