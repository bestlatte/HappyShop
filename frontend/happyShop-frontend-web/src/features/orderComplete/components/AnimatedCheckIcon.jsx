export const AnimatedCheckIcon = () => {
  return (
    <div className="relative flex justify-center items-center my-8">
      {/* 波紋（NOTE keyframes） */}
      <div className="absolute w-24 h-24 bg-gray-100 rounded-full animate-pulse"></div>

      {/* 黑圓&&白勾 */}
      <div className="relative w-16 h-16 bg-black rounded-full flex items-center justify-center transform transition-transform duration-700 hover:scale-110">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};
