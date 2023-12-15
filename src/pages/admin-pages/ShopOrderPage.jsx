import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { adminPageStyle } from "../../styles";
import { PayOnDelivery } from "../../components";
import { changeDeliveryStatus, getAllUser } from "../../utils/firebase-admin";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useSwalMessage } from "../../utils/useSwalMessage";

const ShopOrderPage = () => {
  const { currentUser, text } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const location = useLocation();

  const [changeResult, setChangeResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [actualUser, setActualUser] = useState(location.state.user);
  const [actualOrder, setActualOrder] = useState(location.state.order);

  useEffect(() => {
    const refreshUser = async () => {
      setActualOrder((prevOrder) => ({
        ...prevOrder,
        isDelivered: !prevOrder.isDelivered,
      }));
      const users = await getAllUser(currentUser);
      const user = users.users.filter((user) => user.uid === actualUser.uid)[0];
      const order = user.orders.filter(
        (order) => order.orderID === actualOrder.orderID
      )[0];
      setActualUser(user);
      setActualOrder(order);
    };

    if (changeResult === "success") {
      setIsLoading(false);
      refreshUser();
    } else setIsLoading(false);
  }, [changeResult]);

  const changeStatus = async () => {
    setIsLoading(true);
    setChangeResult("");
    const result = await changeDeliveryStatus(
      actualUser.uid,
      actualOrder.orderID,
      !actualOrder.isDelivered,
      currentUser,
      text,
      showErrorSwal,
      showSuccessSwal
    );
    setChangeResult(result);
  };

  return (
    <div className={adminPageStyle.wrapperRelative}>
      <h1 className={adminPageStyle.title}>{text.orderPageTitle}</h1>

      <Icon
        icon={isLoading ? "eos-icons:loading" : "mdi:truck-delivery"}
        onClick={changeStatus}
        hFlip={actualOrder.isDelivered ? false : true}
        className={`${adminPageStyle.endIcon} ${
          actualOrder.isDelivered
            ? adminPageStyle.sentOrder
            : adminPageStyle.newOrder
        }`}
      />

      <PayOnDelivery oldOrder={actualOrder} isAdminPage={true} />
    </div>
  );
};

export default ShopOrderPage;
