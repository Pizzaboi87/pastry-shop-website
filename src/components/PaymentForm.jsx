import PaymentSelectButton from "./PaymentSelectButton";
import PayOnDelivery from "./PayOnDelivery";
import PayPal from "./PayPal";
import Stripe from "./Stripe";
import GooglePay from "./GooglePay";
import { CartContext, UserContext } from "../context";
import { useContext } from "react";
import {
  Theme_Div,
  myCartStyle,
  paymentFormStyle,
  paymentFormVariable,
} from "../styles";

const PaymentForm = () => {
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
      value: "googlePay",
      icons: ["logos:google-pay"],
    },
    {
      value: "payOnDelivery",
      icons: ["mdi:cash-multiple", "fontisto:shopping-pos-machine"],
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

      <div className={paymentFormStyle.paymentContainer}>
        <Theme_Div
          $bgcolor="background"
          $bordercolor="transparent"
          id="payment-form"
          className={paymentFormVariable(orderDetails.paymentMethod)}
        >
          {orderDetails.paymentMethod == "credit" && <Stripe />}

          {orderDetails.paymentMethod == "payPal" && <PayPal />}

          {orderDetails.paymentMethod == "googlePay" && <GooglePay />}

          {orderDetails.paymentMethod == "payOnDelivery" && <PayOnDelivery />}
        </Theme_Div>
      </div>
    </>
  );
};

export default PaymentForm;
