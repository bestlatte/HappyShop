export default function ErrorState({
  title = "發生錯誤",
  message = "請稍後再試",
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`mx-auto mt-24 max-w-5xl px-4 text-center text-red-500 ${className}`.trim()}
    >
      <p className="mb-2 text-xl font-semibold text-red-600">{title}</p>
      <p className="text-sm text-red-500">{message}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          className="mt-6 rounded-lg bg-black px-6 py-2 font-semibold text-white hover:bg-gray-800"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
