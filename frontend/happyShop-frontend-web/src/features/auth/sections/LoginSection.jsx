import LoginForm from "../components/login/LoginForm.jsx";
import ThirdParty from "../components/thirdParty/ThirdParty.jsx";
import { useLoginForm } from "../hooks/useLoginForm.js";

export default function LoginSection() {
    const loginForm = useLoginForm();

    return (
        <div className="mx-auto w-full max-w-[560px]">
            <LoginForm form={loginForm} />

            <div className="my-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#d8d1d1]" />
                <span className="shrink-0 text-[15px] text-[#222]">
                    或透過以下方式快速登入
                </span>
                <div className="h-px flex-1 bg-[#d8d1d1]" />
            </div>

            <ThirdParty />
        </div>
    );
}