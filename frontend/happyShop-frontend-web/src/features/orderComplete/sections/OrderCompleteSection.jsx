import { OrderSuccessInfo } from "../components/OrderSuccessInfo";
import { OrderSummaryReceipt } from "../components/OrderSummaryReceipt";

export const OrderCompleteSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 justify-center items-start mt-8">
      {/* left */}
      <div className="w-full md:flex-1 ml-8">
        <OrderSuccessInfo />
      </div>

      {/* right */}
      <div className="w-full md:w-100 mr-6">
        <OrderSummaryReceipt />
      </div>
    </div>
  );
};
