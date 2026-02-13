import { useEffect, useRef, useState } from "react";
export default function Footer() {
    return (
        <footer className="bg-white text-neutral-900">
            <div className="mx-auto max-w-6xl px-4 py-7">
                {/* 公司資訊（置中、淡灰） */}
                <div className="text-center text-neutral-500">
                    <div className="text-sm tracking-wide">黑皮電商B2C buy 公司資訊</div>
                    <div className="mt-2 space-y-1 text-[13px] leading-7">
                        <div>營業人名稱：李軒毅有限公司｜統一編號：123456789</div>
                        <div>營業人名稱：李軒毅國際有限公司｜統一編號：123456789</div>
                    </div>
                </div>

                <div className="my-6 h-px w-full bg-neutral-200" />

                {/* 連結區 + 右上社群 */}
                <div className="relative">
                    {/* 三欄連結 */}
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
                        <div>
                            <div className="mb-4 text-sm font-semibold">選購與了解產品</div>
                            <ul className="space-y-3 text-[13px] text-neutral-800">
                                <li><a className="hover:underline" href="#">全部分類</a></li>
                                <li><a className="hover:underline" href="#">主題</a></li>
                                <li><a className="hover:underline" href="#">公益關懷</a></li>
                            </ul>
                        </div>

                        <div>
                            <div className="mb-4 text-sm font-semibold">常見問題</div>
                            <ul className="space-y-3 text-[13px] text-neutral-800">
                                <li><a className="hover:underline" href="#">C-Point 說明</a></li>
                                <li><a className="hover:underline" href="#">飛馬發財金 使用說明</a></li>
                                <li><a className="hover:underline" href="#">付款方式</a></li>
                                <li><a className="hover:underline" href="#">物流配送</a></li>
                                <li><a className="hover:underline" href="#">售後服務</a></li>
                                <li><a className="hover:underline" href="#">海外配送</a></li>
                            </ul>
                        </div>

                        <div>
                            <div className="mb-4 text-sm font-semibold">關於黑皮電商</div>
                            <ul className="space-y-3 text-[13px] text-neutral-800">
                                <li><a className="hover:underline" href="#">公司理念</a></li>
                                <li><a className="hover:underline" href="#">服務條款</a></li>
                                <li><a className="hover:underline" href="#">品牌承諾</a></li>
                                <li><a className="hover:underline" href="#">公益關懷</a></li>
                                <li><a className="hover:underline" href="#">廠商合作</a></li>
                                <li><a className="hover:underline" href="#">聯繫客服</a></li>
                                <li><a className="hover:underline" href="#">成為代理商</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* 右上社群 icon（跟截圖一致：靠右、同一列） */}
                    <div className="absolute right-0 top-0 hidden items-center gap-5 sm:flex">
                        <IconLink label="LINE" href="#"><LineIcon /></IconLink>
                        <IconLink label="YouTube" href="#"><YoutubeIcon /></IconLink>
                        <IconLink label="Instagram" href="#"><InstagramIcon /></IconLink>
                        <IconLink label="Facebook" href="#"><FacebookIcon /></IconLink>
                    </div>

                    {/* 小螢幕把 icon 放到下方，避免擠爆 */}
                    <div className="mt-8 flex items-center justify-center gap-6 sm:hidden">
                        <IconLink label="LINE" href="#"><LineIcon /></IconLink>
                        <IconLink label="YouTube" href="#"><YoutubeIcon /></IconLink>
                        <IconLink label="Instagram" href="#"><InstagramIcon /></IconLink>
                        <IconLink label="Facebook" href="#"><FacebookIcon /></IconLink>
                    </div>
                </div>

                <div className="my-6 h-px w-full bg-neutral-200" />

                {/* 版權 */}
                <div className="text-center text-xs text-neutral-400">
                    Copyright © 2026 黑皮電商 B2C BUY All rights reserved (2.1.0 2.1.0)
                </div>
            </div>
        </footer>
    );
}

function IconLink({ href = "#", label, children }) {
    return (
        <a
            href={href}
            aria-label={label}
            className="inline-flex h-7 w-7 items-center justify-center text-neutral-900/90 hover:text-neutral-900"
        >
      <span className="h-5 w-5 [&>svg]:h-5 [&>svg]:w-5">
        {children}
      </span>
        </a>
    );
}


/** 純 SVG*/
function LineIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fill-current"
        >
            <path d="M18.59 0H5.41C2.422 0 0 2.422 0 5.41V18.59C0 21.578 2.422 24 5.41 24H18.59C21.578 24 24 21.578 24 18.59V5.41C24 2.422 21.577 0 18.59 0ZM18.284 14.865c-1.679 1.932-5.432 4.286-6.286 4.646-.854.36-.728-.229-.693-.432.021-.12.114-.685.114-.685.027-.204.055-.521-.026-.723-.09-.223-.444-.338-.705-.395-3.845-.508-6.692-3.196-6.692-6.406 0-3.58 3.59-6.494 8.002-6.494s8.002 2.913 8.002 6.494c0 1.432-.555 2.723-1.716 3.995Z" />
            <path d="M15.81 10.012v.589h1.528c.084 0 .153.069.153.153v.568c0 .084-.068.153-.153.153H15.81v.589h1.528c.084 0 .153.069.153.153v.568c0 .084-.068.152-.153.152H15.09c-.084 0-.153-.068-.153-.152V9.292c0-.084.068-.153.153-.153h2.248c.084 0 .153.068.153.153v.567c0 .084-.068.153-.153.153H15.81Z" />
            <path d="M9.174 12.217v.568c0 .084-.068.152-.153.152H6.773c-.084 0-.152-.068-.152-.152V9.292c0-.084.068-.153.152-.153h.568c.084 0 .153.068.153.153v2.772h1.528c.084 0 .152.069.152.153Z" />
            <path d="M10.528 9.292v3.492c0 .084-.068.152-.153.152h-.567c-.084 0-.153-.068-.153-.152V9.292c0-.084.068-.153.153-.153h.567c.084 0 .153.068.153.153Z" />
            <path d="M14.391 9.292v3.492c0 .084-.068.152-.153.152h-.564c-.05 0-.099-.025-.128-.066l-1.6-2.16v2.074c0 .084-.068.152-.153.152h-.568c-.084 0-.153-.068-.153-.152V9.292c0-.084.068-.153.153-.153h.564c.053 0 .099.028.13.069l1.598 2.158V9.292c0-.084.068-.153.153-.153h.568c.084 0 .152.068.152.153Z" />
        </svg>
    );
}


function YoutubeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fill-current"
        >
            <path d="M23.498 6.186c-.276-1.039-1.089-1.858-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504C1.591 4.328.778 5.146.502 6.186.002 8.07 0 12 0 12s.002 3.93.502 5.814c.276 1.039 1.089 1.858 2.122 2.136C4.495 20.454 12 20.454 12 20.454s7.505 0 9.377-.504c1.033-.278 1.846-1.097 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.546 15.569V8.431L15.818 12l-6.272 3.569Z" />
        </svg>
    );
}


function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
            className="fill-current"
        >
            <g>
                <path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942C15.668,0.014,15.259,0,12,0z" />
                <path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
            </g>
        </svg>

    );
}

function FacebookIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fill-current"
        >
            <path d="M24 12.073c0 5.989-4.394 10.954-10.13 11.855v-8.363h2.789l.531-3.46H13.87V9.86c0-.947.464-1.869 1.95-1.869h1.509V5.045s-1.37-.234-2.679-.234c-2.734 0-4.52 1.657-4.52 4.656v2.637H7.091v3.46h3.039v8.363C4.395 23.025 0 18.061 0 12.073c0-6.627 5.373-12 12-12s12 5.372 12 12Z" />
        </svg>
    );
}




