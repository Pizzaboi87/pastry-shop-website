import { useState } from "react";
import PayOnDelivery from "./PayOnDelivery";

const OrderAccordion = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="accordion-item flex flex-col w-full xl:w-[75%] mx-auto mt-4">
      <div
        onClick={handleAccordion}
        className="cursor-pointer border border-1 shadow-xl bg-white px-1 rounded-t-xl"
      >
        <h1>{order.orderTime}</h1>
        <h1>
          {order.amount}
          {order.currency.symbol}
        </h1>
      </div>
      <div
        className={`${
          isOpen ? "visible" : "hidden"
        } ease-in-out transition-all duration-500`}
      >
        <h1
          className={`${
            isOpen ? "opacity-1" : "opacity-0"
          } ease-in-out transition-all duration-500`}
        >
          <PayOnDelivery oldOrder={order} />
        </h1>
      </div>
    </div>
  );
};

export default OrderAccordion;
