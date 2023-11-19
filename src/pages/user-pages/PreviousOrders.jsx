import {
  Loading,
  OrderAccordion,
  TransitionParent,
  UserPanel,
} from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import {
  Theme_H1,
  userPageStyle,
  previousOrdersStyle,
  Theme_Button,
} from "../../styles";

const PreviousOrders = () => {
  const { text, currentUser, userData } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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
            <div className={previousOrdersStyle.noOrderContainer}>
              <h1 className={previousOrdersStyle.message}>
                {text.previous.noOrder}
              </h1>
              <Theme_Button
                $bgcolor="logo"
                $textcolor="textlight"
                $bordercolor="transparent"
                $hoverbgcolor="dark"
                $hovertextcolor="textlight"
                onClick={() => navigate("/shop")}
                className={previousOrdersStyle.button}
              >
                {text.previous.goToShop}
              </Theme_Button>
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
