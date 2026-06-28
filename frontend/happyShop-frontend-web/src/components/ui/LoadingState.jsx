export default function LoadingState({
  message = "載入中...",
  className = "",
  compact = false,
}) {
  const containerClass = compact
    ? "flex items-center justify-center gap-3 text-gray-500"
    : "mx-auto mt-24 flex max-w-5xl flex-col items-center justify-center px-4 text-gray-400";

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-black" />
      <p className="font-medium">{message}</p>
    </div>
  );
}
