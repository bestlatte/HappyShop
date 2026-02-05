export default function Price({ price, salePrice }) {
    const fmt = (n) => `NT$ ${n.toLocaleString("zh-TW")}`;

    if (salePrice && salePrice < price) {
        return (
            <div className="mt-2 flex items-center gap-3">
                 <span className="text-sm font-semibold text-gray-900 line-through opacity-70">
                    {fmt(price)}
                 </span>

                <span className="text-sm font-extrabold text-red-600">
                  {fmt(salePrice)}
                </span>
            </div>
        );
    }

    return (
        <div className="mt-2">
            <span className="text-sm font-extrabold text-gray-900">{fmt(price)}</span>
        </div>
    );
}
