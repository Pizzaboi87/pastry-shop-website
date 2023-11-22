import PayOnDelivery from "./PayOnDelivery";
import { UserContext } from "../context";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { accordionStyle } from "../styles";

const OrderAccordion = ({ order }) => {
  const { text } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className={accordionStyle.container}>
      <motion.div
        onClick={handleAccordion}
        className={accordionStyle.accordion}
      >
        <h1 className={accordionStyle.text}>
          {" "}
          <strong className={accordionStyle.strong}>
            {text.delivery.orderTime}
          </strong>
          {order.orderTime.slice(0, 19)}
        </h1>
        <h1 className={accordionStyle.text}>
          <strong className={accordionStyle.strong}>
            {text.delivery.orderAmount}
          </strong>
          {order.amount}
          {order.currency.symbol}
        </h1>
      </motion.div>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <PayOnDelivery oldOrder={order} />
        </motion.div>
      )}
    </div>
  );
};

export default OrderAccordion;
