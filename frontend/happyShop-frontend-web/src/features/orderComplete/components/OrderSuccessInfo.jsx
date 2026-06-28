import { useNavigate } from "react-router-dom";
import { AnimatedCheckIcon } from "./AnimatedCheckIcon";

export const OrderSuccessInfo = () => {
  const navigate = useNavigate();
  const mockOrderId = "17776409698507407";
  const mockCPoints = 1;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-start">
        <h2 className="text-4xl font-bold mb-4 tracking-wider [-webkit-text-stroke:0.5px_black]">
          訂單已成立，請至我的訂單確認。
        </h2>

        <p className="text-gray-500 text-sm text-left leading-relaxed">
          感謝您的購買！您可以在我的訂單中查詢訂單狀態。(訂單編號：{mockOrderId}
          )<br />
          此筆訂單預計可獲得 {mockCPoints} C-Point。(以實際系統入帳為主)
        </p>

        <div className="w-full flex justify-center mt-32 mb-24">
          <AnimatedCheckIcon />
        </div>
      </div>

      <div className="mt-auto flex flex-col items-start w-full">
        <div className="flex flex-col items-start gap-4 mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-4 font-medium py-2 rounded-xl  hover:bg-gray-800 transition-colors"
          >
            前往我的訂單
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-black text-sm underline font-bold px-2 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            繼續購物
          </button>
        </div>

        <ul className="text-gray-400 text-sm space-y-1">
          <li>* 如需取消訂單，請至我的訂單中，進入該訂單即可取消。</li>
          <li>* 若訂單已處理、運送中，則無法進行取消。</li>
          <li>* 可由「前往我的訂單」確認訂單狀態。</li>
        </ul>
      </div>
    </div>
  );
};
