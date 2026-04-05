import ThirdParty from "../components/thirdParty/ThirdParty.jsx";
import LoginForm from "../components/login/LoginForm.jsx";
import RegisterForm from "../components/register/RegisterForm.jsx";
import {useRegisterForm} from "../hooks/useRegisterForm.js";
import {useLoginForm} from "../hooks/useLoginForm.js";

export default function RegisterSection() {
    const registerForm = useRegisterForm();

    return (

            <div className="mx-auto w-full max-w-[560px]">
                <RegisterForm form={registerForm}/>

                <div className="my-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#d8d1d1]" />
                    <span className="shrink-0 text-[15px] text-[#222]">
                        或透過以下方式快速登入
                    </span>
                    <div className="h-px flex-1 bg-[#d8d1d1]" />
                </div>

                <ThirdParty hideRegisterLink={"True"}/>


            </div>

    );
}