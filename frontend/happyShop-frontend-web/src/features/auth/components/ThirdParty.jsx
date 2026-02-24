export  default function ThirdParty(){


    return(
        <>
            <div className="w-full max-w-sm px-6">
                {/* 卡片/區塊 */}
                <div className="flex flex-col gap-6 text-center">
                    {/* 臉書按鈕 */}
                    <div className="flex flex-col gap-6">
                        <button
                            type="button"
                            className="w-full rounded-xl border px-10 py-2.5 font-semibold
                         inline-flex items-center justify-center gap-2
                         shadow-sm transition hover:shadow active:shadow-none active:translate-y-[1px]"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                                <path d="M24 12.073c0 5.989-4.394 10.954-10.13 11.855v-8.363h2.789l.531-3.46H13.87V9.86c0-.947.464-1.869 1.95-1.869h1.509V5.045s-1.37-.234-2.679-.234c-2.734 0-4.52 1.657-4.52 4.656v2.637H7.091v3.46h3.039v8.363C4.395 23.025 0 18.061 0 12.073c0-6.627 5.373-12 12-12s12 5.372 12 12Z" />
                            </svg>
                        </button>


                        {/* GOOGLE按鈕 */}


                        <button
                            type="button"
                            className="w-full rounded-xl border px-10 py-2.5 font-semibold
                         inline-flex items-center justify-center gap-2
                         shadow-sm transition hover:shadow active:shadow-none active:translate-y-[1px]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-5 w-5 fill-current"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="m12,0C5.373,0,0,5.373,0,12s5.373,12,12,12,12-5.373,12-12S18.627,0,12,0Zm8,12c0,4.411-3.589,8-8,8s-8-3.589-8-8S7.589,4,12,4c1.782,0,3.468.573,4.876,1.658l-1.859,2.415c-.871-.671-1.914-1.025-3.017-1.025-2.731,0-4.952,2.222-4.952,4.952s2.222,4.952,4.952,4.952c2.199,0,4.068-1.441,4.713-3.429h-4.713v-3.048h8v1.524Z"
                                />
                            </svg>

                        </button>
                    </div>


                    <div className="text-sm">
                        尚未建立帳戶？{" "}
                        <span
                            className=" font-bold   hover:opacity-50"
                        >
                            點選上方信箱註冊
                        </span>
                    </div>
                </div>
            </div>
        </>



    )


}