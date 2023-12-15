import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { adminPageStyle, allOrderStyle, tooltipStyle } from "../styles";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useSwalMessage } from "../utils/useSwalMessage";
import { changeDeliveryStatus } from "../utils/firebase-admin";
import { Tooltip } from "react-tooltip";

const OrderList = ({ order, user }) => {
  const [changeResult, setChangeResult] = useState("");
  const [actualOrder, setActualOrder] = useState(order);
  const [isLoading, setIsLoading] = useState(false);
  const { text, currentUser } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const { orderID, orderTime, amount, currency, paymentMethod, isDelivered } =
    actualOrder;
  const navigate = useNavigate();

  const goToOrderPage = (orderID) => {
    navigate(`${orderID}`, { state: { user: user, order: order } });
  };

  useEffect(() => {
    if (changeResult === "success") {
      setIsLoading(false);
      setActualOrder((prevOrder) => ({
        ...prevOrder,
        isDelivered: !prevOrder.isDelivered,
      }));
    } else setIsLoading(false);
  }, [changeResult]);

  const changeStatus = async () => {
    setIsLoading(true);
    setChangeResult("");
    const result = await changeDeliveryStatus(
      user.uid,
      order.orderID,
      !order.isDelivered,
      currentUser,
      text,
      showErrorSwal,
      showSuccessSwal
    );
    setChangeResult(result);
  };

  return (
    <motion.ul
      className={allOrderStyle.container}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <li className={allOrderStyle.bigDetailContainer}>
        <p
          className={allOrderStyle.hoverText}
          onClick={() => goToOrderPage(orderID)}
        >
          {orderID}
        </p>
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
          onClick={() => goToOrderPage(orderID)}
        />
        <Icon
          icon={isLoading ? "eos-icons:loading" : "mdi:truck-delivery"}
          onClick={isLoading ? null : changeStatus}
          hFlip={isDelivered ? false : true}
          className={`${allOrderStyle.orderIcon} ${allOrderStyle.hoverText} ${
            isDelivered
              ? `${adminPageStyle.sentOrder} delivered`
              : `${adminPageStyle.newOrder} new`
          }`}
        />
      </li>
      <Tooltip
        anchorSelect=".delivered"
        content={text.tooltip.delivered}
        style={tooltipStyle}
        place="top"
      />
      <Tooltip
        anchorSelect=".new"
        content={text.tooltip.new}
        style={tooltipStyle}
        place="top"
      />
    </motion.ul>
  );
};

export default OrderList;
