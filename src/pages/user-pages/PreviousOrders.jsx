import {
  Loading,
  OrderAccordion,
  TransitionParent,
  UserPanel,
} from "../../components";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { Theme_H1, userPageStyle, previousOrdersStyle } from "../../styles";

const PreviousOrders = () => {
  const { text, currentUser, userData } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  console.log(orders);
  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    if (userData.orders) setOrders(userData.orders);
    else setOrders(["no_orders"]);
  }, [userData]);

  return (
    <TransitionParent isFlex={false}>
      <Theme_H1 $textcolor="title" className={userPageStyle.title}>
        {text.previousOrdersTitle}
      </Theme_H1>

      <UserPanel>
        <div className={previousOrdersStyle.container}>
          {orders[0] === "" ? (
            <Loading />
          ) : orders[0] === "no_orders" ? (
            <div>
              <h1>There's no order.</h1>
            </div>
          ) : (
            orders.map((order, index) => (
              <OrderAccordion key={index} order={order} />
            ))
          )}
        </div>
      </UserPanel>
    </TransitionParent>
  );
};

export default PreviousOrders;
