export default function ShippingMethodSelector({ value, onChange }) {
    return (
        <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="radio"
                    name="shippingMethod"
                    value="blackCat"
                    checked={value === "blackCat"}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-[18px] w-[18px] accent-black"
                />
                <span className="text-[18px] text-black">黑貓</span>
            </label>

            <div className="flex items-center gap-3 text-[18px]">
                <span className="text-[#222222] line-through">NT$ 100</span>
                <span className="font-semibold text-[#69c8a0]">免運</span>
            </div>
        </div>
    );
}
