import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { allOrderStyle } from "../styles";

const OrderList = ({ order }) => {
  const { orderID, orderTime, amount, currency, paymentMethod, status } = order;

  return (
    <motion.ul
      className={allOrderStyle.container}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <li className={allOrderStyle.bigDetailContainer}>
        <p className={allOrderStyle.normalText}>{orderID}</p>
      </li>
      <li className={allOrderStyle.detailContainer}>
        <p className={allOrderStyle.normalText}>{orderTime.slice(0, 19)}</p>
      </li>
      <li className={allOrderStyle.smallDetailContainer}>
        <p className={allOrderStyle.normalText}>
          {amount}
          {currency.symbol}
        </p>
      </li>
      <li className={allOrderStyle.detailContainer}>
        <p className={allOrderStyle.normalText}>{paymentMethod}</p>
      </li>
      <li className={allOrderStyle.iconContainer}>
        <Icon
          icon="raphael:edit"
          className={`details ${allOrderStyle.icon} ${allOrderStyle.hoverText}`}
        />
        <Icon
          icon="mdi:truck-delivery"
          className={`${allOrderStyle.icon} ${allOrderStyle.hoverText}`}
        />
      </li>
    </motion.ul>
  );
};

export default OrderList;
