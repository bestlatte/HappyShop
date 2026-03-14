import {useState} from "react";
import {fetchLogin} from "../../services/loginApi.js";
import {useNavigate} from "react-router-dom";

export function useRegisterForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    async function handleSubmit(e) {
        e.preventDefault();

        if (!isFormValid || isSubmitting) return;

        try {
            setIsSubmitting(true);
            // 真正打 API 前，先故意停 100ms
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const result = await fetchLogin({ email, password });

            console.log("登入成功：", result);
            alert("登入成功");

            setTimeout(() => {
                navigate("/home");
            }, 1500);
        } catch (error) {
            const errorMessage = "登入失敗，帳號或密碼錯誤";
            console.error(errorMessage, error);
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }

    return {
        email,
        navigate,
        setEmail,
        password,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        isSubmitting,
        isFormValid,
        handleSubmit,
    };
}