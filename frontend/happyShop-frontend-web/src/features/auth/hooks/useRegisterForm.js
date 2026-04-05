import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../services/registerApi.js";

export function useRegisterForm() {
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

            const result = await fetchRegister({
                email: trimmedEmail,
                password,
            });

            console.log("註冊成功：", result);

            alert("註冊成功");
            navigate("/home");
        } catch (error) {
            console.error("註冊失敗", error);

            let message = "註冊失敗，請稍後再試";

            if (error?.status === 400) {
                message = "註冊失敗，請確認輸入資料是否正確";
            } else if (error?.status === 409) {
                message = "此電子信箱已被註冊";
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