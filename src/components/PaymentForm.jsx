import PaymentSelectButton from "./PaymentSelectButton";
import PayPal from "./PayPal";
import Stripe from "./Stripe";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import { myCartStyle, paymentFormStyle } from "../styles";

const PaymentForm = ({ children }) => {
  const { text } = useContext(UserContext);
  const { orderDetails, setOrderDetails } = useContext(CartContext);

  const handlePayment = (e) => {
    setOrderDetails((orderDetails) => ({
      ...orderDetails,
      paymentMethod: e.target.value,
    }));
  };

  const buttons = [
    {
      value: "credit",
      icons: ["logos:mastercard", "logos:visaelectron"],
    },
    {
      value: "payPal",
      icons: ["logos:paypal"],
    },
    {
      value: "cashDelivery",
      icons: ["mdi:cash-multiple"],
    },
    {
      value: "creditDelivery",
      icons: ["fontisto:shopping-pos-machine"],
    },
  ];

  const buttonList = buttons.map((button) => (
    <PaymentSelectButton
      key={button.value}
      value={button.value}
      icons={button.icons}
      handlePayment={handlePayment}
    />
  ));

  return (
    <>
      <form className={paymentFormStyle.container}>
        <h1 className={myCartStyle.subTitle}>{text.payment.title}</h1>
        <div className={paymentFormStyle.buttonContainer}>{buttonList}</div>
      </form>

      {orderDetails.paymentMethod == "credit" && <Stripe>{children}</Stripe>}

      {orderDetails.paymentMethod == "payPal" && <PayPal />}
    </>
  );
};

export default PaymentForm;
