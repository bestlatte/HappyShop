import { useState } from "react";
import { fetchLogin } from "../../services/loginApi.js";
import { useNavigate } from "react-router-dom";

export function useLoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const trimmedEmail = email.trim();
    const isFormValid = trimmedEmail !== "" && password !== "";

    async function handleSubmit(e) {
        e.preventDefault();

        if (!isFormValid || isSubmitting) return;

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            await new Promise((resolve) => setTimeout(resolve, 1000));
            const result = await fetchLogin({
                email: trimmedEmail,
                password,
            });


            console.log("登入成功：", result);
            alert("登入成功");
            navigate("/home");
        } catch (error) {
            console.error("登入失敗", error);
            alert("登入失敗，請稍後再試")
            let message = "登入失敗，請稍後再試";

            if (error?.status === 401 || error?.status === 403) {
                message = "登入失敗，帳號或密碼錯誤";
            }

            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }

    return {
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
    };
}