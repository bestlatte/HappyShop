export default function RecipientForm() {
    return (
        <form className="space-y-10">
            {/* 真實姓名 */}
            <div className="border-b border-[#dddddd] pb-4">
                <input
                    type="text"
                    placeholder="真實姓名＊"
                    className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                />
            </div>

            {/* 手機號碼 */}
            <div className="border-b border-[#dddddd] pb-4">
                <input
                    type="text"
                    placeholder="手機號碼＊"
                    className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                />
            </div>

            {/* 城市 / 區 / 郵遞區號 */}
            <div className="grid grid-cols-3 gap-8">
                <div className="border-b border-[#dddddd] pb-4">
                    <label className="mb-2 block text-[14px] font-semibold text-black">
                        城市
                    </label>
                    <select className="w-full appearance-none bg-transparent text-[16px] text-black focus:outline-none">
                        <option>台北市</option>
                        <option>新北市</option>
                        <option>桃園市</option>
                        <option>台中市</option>
                        <option>台南市</option>
                        <option>高雄市</option>
                    </select>
                </div>

                <div className="border-b border-[#dddddd] pb-4">
                    <label className="mb-2 block text-[14px] font-semibold text-black">
                        區
                    </label>
                    <select className="w-full appearance-none bg-transparent text-[16px] text-[#5a5a5a] focus:outline-none">
                        <option>選擇地區</option>
                        <option>中正區</option>
                        <option>大安區</option>
                        <option>信義區</option>
                        <option>松山區</option>
                    </select>
                </div>

                <div className="border-b border-[#dddddd] pb-4">
                    <label className="mb-2 block text-[14px] font-semibold text-black">
                        郵遞區號
                    </label>
                    <input
                        type="text"
                        className="w-full border-none bg-transparent p-0 text-[16px] text-black focus:outline-none"
                    />
                </div>
            </div>

            {/* 地址 */}
            <div className="border-b border-[#dddddd] pb-4">
                <input
                    type="text"
                    placeholder="地址＊"
                    className="w-full border-none bg-transparent p-0 text-[16px] text-black placeholder:text-[#b3b3b3] focus:outline-none"
                />
            </div>

            {/* 儲存收件資訊 */}
            <label className="flex items-center gap-3 text-[16px] text-[#666666]">
                <input
                    type="checkbox"
                    className="h-[18px] w-[18px] rounded border border-[#cfcfcf]"
                />
                <span>儲存收件資訊</span>
            </label>
        </form>
    );
}