import { useNavigate } from "react-router-dom";
import { OrderCompleteSection } from "../sections/OrderCompleteSection";

export const OrderCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          ✕
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          關閉
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <OrderCompleteSection />
      </main>
    </div>
  );
};
