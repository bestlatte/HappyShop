// src/features/checkout/components/OrderSummaryCard.jsx
function formatCurrency(amount) {
    return `NT$ ${Number(amount || 0).toLocaleString("zh-TW")}`;
}

export default function OrderSummaryCard({
                                             items = [],
                                             subtotal = 0,
                                             shippingFee = 0,
                                             discount = 0,
                                             total,
                                             shippingLabel = "宅配運費",
                                             discountLabel = "優惠折抵",
                                             notes = [],
                                         }) {
    const finalTotal = total ?? subtotal + shippingFee - discount;

    return (
        <aside className="w-full rounded-2xl border border-neutral-200 bg-white p-5">
            {/* 商品列表 */}
            <div className="space-y-4">
                {items.map((item, index) => {
                    const lineTotal = (item.price || 0) * (item.quantity || 0);

                    return (
                        <div
                            key={item.productId ?? item.id ?? index}
                            className="flex gap-3 border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0"
                        >
                            {/* 商品圖片 */}
                            <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* 商品資訊 */}
                            <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-sm leading-5 text-neutral-900">
                                    {item.name}
                                </p>

                                {item.spec && (
                                    <p className="mt-1 text-xs text-neutral-400">{item.spec}</p>
                                )}

                                {item.vendorNote && (
                                    <p className="mt-1 text-xs text-neutral-400">
                                        {item.vendorNote}
                                    </p>
                                )}

                                <div className="mt-3 flex items-end justify-between gap-3">
                                    <p className="text-sm font-semibold text-neutral-900">
                                        數量：{item.quantity}
                                    </p>

                                    <p className="shrink-0 text-sm font-semibold text-neutral-900">
                                        {formatCurrency(lineTotal)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 金額摘要 */}
            <div className="mt-5 border-t border-neutral-200 pt-4">
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-neutral-600">商品金額</span>
                        <span className="font-medium text-neutral-900">
              {formatCurrency(subtotal)}
            </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-neutral-600">{shippingLabel}</span>
                        <span
                            className={`font-medium ${
                                shippingFee === 0 ? "text-emerald-600" : "text-neutral-900"
                            }`}
                        >
              {shippingFee === 0 ? "免運" : formatCurrency(shippingFee)}
            </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-neutral-600">{discountLabel}</span>
                        <span className="font-medium text-emerald-600">
              -{formatCurrency(discount)}
            </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-3">
                        <span className="font-semibold text-neutral-900">總價 (TWD)</span>
                        <span className="font-semibold text-neutral-900">
              {formatCurrency(finalTotal)}
            </span>
                    </div>
                </div>
            </div>

            {/* 備註 */}
            {notes.length > 0 && (
                <div className="mt-5 border-t border-neutral-200 pt-4 text-xs leading-5 text-neutral-500">
                    <p className="mb-2">＊本合併裝商品：</p>

                    <ol className="list-decimal space-y-1 pl-4">
                        {notes.map((note, index) => (
                            <li key={`${index}-${note}`}>{note}</li>
                        ))}
                    </ol>

                    <p className="mt-4">
                        ＊提醒您：下單時請務必確認訂購內容，訂單成立後恕無法立即為您修改收件、付款或配送資訊。
                    </p>
                </div>
            )}
        </aside>
    );
}