import { useContext, useEffect, useState } from "react";
import { allOrderStyle } from "../styles";
import { UserContext } from "../context";

const OrderForm = ({ updatedUsers, setFilteredUsers }) => {
  const { text } = useContext(UserContext);
  const [userFilter, setUserFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user") {
      setUserFilter(value);
    } else {
      setOrderFilter(value);
    }
  };

  useEffect(() => {
    const filteringResult = updatedUsers
      .map((user) => {
        const filteredOrders = user.orders.filter(
          (order) =>
            order.orderID.toLowerCase().includes(orderFilter.toLowerCase()) ||
            order.orderTime.toLowerCase().includes(orderFilter.toLowerCase()) ||
            order.paymentMethod
              .toLowerCase()
              .includes(orderFilter.toLowerCase()) ||
            order.amount
              .toString()
              .toLowerCase()
              .includes(orderFilter.toLowerCase())
        );

        return {
          ...user,
          orders: filteredOrders,
        };
      })
      .filter(
        (user) =>
          (user.fullName.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.email.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.phone.toLowerCase().includes(userFilter.toLowerCase())) &&
          user.orders.length > 0
      );

    setFilteredUsers(filteringResult);
  }, [userFilter, orderFilter]);

  return (
    <form onSubmit={() => {}} className={allOrderStyle.form}>
      <input
        className={allOrderStyle.input}
        type="text"
        placeholder={text.allOrder.placeholderUser}
        name="user"
        value={userFilter}
        onChange={handleChange}
      />

      <input
        className={allOrderStyle.input}
        type="text"
        placeholder={text.allOrder.placeholderOrder}
        name="order"
        value={orderFilter}
        onChange={handleChange}
      />
    </form>
  );
};

export default OrderForm;
