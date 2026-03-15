import ThirdParty from "../components/thirdParty/ThirdParty.jsx";
import LoginForm from "../components/login/LoginForm.jsx";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#f5f5f5] px-6 py-10">
            <div className="mx-auto w-full max-w-[560px]">
                <LoginForm />

                <div className="my-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#d8d1d1]" />
                    <span className="shrink-0 text-[15px] text-[#222]">
                        或透過以下方式快速登入
                    </span>
                    <div className="h-px flex-1 bg-[#d8d1d1]" />
                </div>

                <ThirdParty />
            </div>
        </div>
    );
}